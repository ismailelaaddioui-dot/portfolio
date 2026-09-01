#!/usr/bin/env python3
"""Download every image from a public Pinterest board into a folder.

Standard library only - no pip install needed. Works with the system Python 3
that ships with macOS (3.9+).

Usage:
    python3 scripts/pinterest_board_download.py \
        https://www.pinterest.com/ismaelaaddioui/authentic-brand/ \
        -o ~/Desktop/authentic-brand

Options:
    -o, --out DIR        Destination folder (default: ./<board-slug>)
    -n, --limit N        Stop after N pins (default: all)
    -j, --jobs N         Parallel downloads (default: 4)
    --no-originals       Skip the i.pinimg.com "originals" upgrade attempt
    --cookies FILE       Netscape cookies.txt, for secret/private boards
    --manifest           Also write manifest.json (title, description, source link)

Notes:
    * Pinterest serves boards through an internal JSON endpoint. It is public
      but undocumented, so it can change without warning; if pin extraction
      starts returning zero results, that is the usual cause.
    * Secret boards need your session: export cookies for pinterest.com from
      your browser into a cookies.txt and pass --cookies.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from http.cookiejar import MozillaCookieJar

BASE = "https://www.pinterest.com"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
)
PAGE_SIZE = 25
SLEEP_BETWEEN_PAGES = 0.6

_opener: urllib.request.OpenerDirector | None = None


# --------------------------------------------------------------------------- #
# HTTP
# --------------------------------------------------------------------------- #
def build_opener(cookies_file: str | None) -> urllib.request.OpenerDirector:
    handlers = []
    if cookies_file:
        jar = MozillaCookieJar()
        jar.load(os.path.expanduser(cookies_file), ignore_discard=True, ignore_expires=True)
        handlers.append(urllib.request.HTTPCookieProcessor(jar))
    return urllib.request.build_opener(*handlers)


def fetch(url: str, headers: dict[str, str] | None = None, retries: int = 3) -> bytes:
    hdrs = {
        "User-Agent": UA,
        "Accept-Language": "en-US,en;q=0.9",
    }
    hdrs.update(headers or {})
    last: Exception | None = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=hdrs)
            with _opener.open(req, timeout=45) as resp:
                return resp.read()
        except urllib.error.HTTPError as exc:
            last = exc
            if exc.code in (403, 404, 410):
                raise
            time.sleep(2 ** attempt)
        except Exception as exc:  # noqa: BLE001 - network flakiness
            last = exc
            time.sleep(2 ** attempt)
    raise RuntimeError(f"failed to fetch {url}: {last}")


def api_get(resource: str, options: dict, source_url: str) -> dict:
    payload = json.dumps({"options": options, "context": {}}, separators=(",", ":"))
    qs = urllib.parse.urlencode({"source_url": source_url, "data": payload})
    url = f"{BASE}/resource/{resource}/get/?{qs}"
    raw = fetch(
        url,
        headers={
            "Accept": "application/json, text/javascript, */*, q=0.01",
            "X-Requested-With": "XMLHttpRequest",
            "X-APP-VERSION": "a89ec0e",
            "X-Pinterest-AppState": "active",
            "Referer": BASE + source_url,
        },
    )
    return json.loads(raw.decode("utf-8", "replace"))


# --------------------------------------------------------------------------- #
# Board / pin parsing
# --------------------------------------------------------------------------- #
def parse_board_url(url: str) -> tuple[str, str]:
    """https://www.pinterest.com/<user>/<board>/ -> ('user', 'board')."""
    path = urllib.parse.urlparse(url).path if "://" in url else url
    parts = [p for p in path.split("/") if p]
    if len(parts) < 2:
        raise SystemExit(f"Not a board URL (need /username/board-slug/): {url}")
    return parts[0], parts[1]


def get_board_id(username: str, slug: str, source_url: str) -> str:
    data = api_get(
        "BoardResource",
        {"username": username, "slug": slug, "field_set_key": "detailed"},
        source_url,
    )
    board = data.get("resource_response", {}).get("data") or {}
    board_id = board.get("id")
    if not board_id:
        raise SystemExit(
            "Could not read the board id. If the board is secret, pass --cookies."
        )
    print(
        f"Board: {board.get('name', slug)}  "
        f"({board.get('pin_count', '?')} pins, id {board_id})"
    )
    return board_id


def _size_of(key: str, entry: dict) -> int:
    if isinstance(entry.get("width"), int):
        return entry["width"]
    m = re.match(r"(\d+)x", key)
    return int(m.group(1)) if m else 0


def best_image(node: dict) -> str | None:
    """Largest image URL on a pin-ish dict."""
    images = node.get("images")
    if isinstance(images, dict):
        orig = images.get("orig")
        if isinstance(orig, dict) and orig.get("url"):
            return orig["url"]
        best, best_w = None, -1
        for key, entry in images.items():
            if isinstance(entry, dict) and entry.get("url"):
                w = _size_of(key, entry)
                if w > best_w:
                    best, best_w = entry["url"], w
        if best:
            return best
    for key in ("image_orig_url", "image_large_url", "image_medium_url"):
        val = node.get(key)
        if isinstance(val, str) and val:
            return val
        if isinstance(val, dict) and val.get("url"):
            return val["url"]
    return None


def pin_image_urls(pin: dict) -> list[str]:
    """Every image belonging to one pin: single, carousel, or idea-pin pages."""
    urls: list[str] = []

    main = best_image(pin)
    if main:
        urls.append(main)

    carousel = (pin.get("carousel_data") or {}).get("carousel_slots") or []
    for slot in carousel:
        if isinstance(slot, dict):
            url = best_image(slot)
            if url:
                urls.append(url)

    pages = (pin.get("story_pin_data") or {}).get("pages") or []
    for page in pages:
        for block in (page.get("blocks") or []):
            if isinstance(block, dict) and isinstance(block.get("image"), dict):
                url = best_image(block["image"])
                if url:
                    urls.append(url)

    seen, out = set(), []
    for url in urls:
        if url not in seen:
            seen.add(url)
            out.append(url)
    return out


def iter_pins(board_id: str, source_url: str, limit: int | None):
    """Yield pin dicts, walking the board feed page by page."""
    bookmark: str | None = None
    seen_ids: set[str] = set()
    while True:
        options = {"board_id": board_id, "page_size": PAGE_SIZE, "field_set_key": "react_grid_pin"}
        if bookmark:
            options["bookmarks"] = [bookmark]
        payload = api_get("BoardFeedResource", options, source_url)

        rr = payload.get("resource_response", {})
        batch = rr.get("data") or []
        if isinstance(batch, dict):
            batch = batch.get("results") or []

        for pin in batch:
            if not isinstance(pin, dict):
                continue
            pid = str(pin.get("id") or "")
            if pid and pid in seen_ids:
                continue
            if pid:
                seen_ids.add(pid)
            yield pin
            if limit and len(seen_ids) >= limit:
                return

        bookmark = rr.get("bookmark")
        if not bookmark:
            marks = (payload.get("resource", {}).get("options", {}) or {}).get("bookmarks") or []
            bookmark = marks[0] if marks else None
        if not batch or not bookmark or bookmark == "-end-":
            return
        time.sleep(SLEEP_BETWEEN_PAGES)


# --------------------------------------------------------------------------- #
# Downloading
# --------------------------------------------------------------------------- #
SIZE_SEGMENT = re.compile(r"/(?:\d+x\d*|originals)/")


def originals_variant(url: str) -> str | None:
    """i.pinimg.com/736x/ab/cd/xy.jpg -> .../originals/ab/cd/xy.jpg"""
    if "i.pinimg.com" not in url or "/originals/" in url:
        return None
    swapped = SIZE_SEGMENT.sub("/originals/", url, count=1)
    return swapped if swapped != url else None


def safe_name(index: int, pin_id: str, url: str, part: int) -> str:
    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower()
    if ext not in (".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"):
        ext = ".jpg"
    pid = re.sub(r"[^A-Za-z0-9_-]", "", pin_id) or "pin"
    suffix = f"_{part}" if part else ""
    return f"{index:04d}_{pid}{suffix}{ext}"


def download_one(url: str, dest: str, try_originals: bool) -> tuple[str, str, bool]:
    """Returns (dest_path, url_used, downloaded_now)."""
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return dest, url, False

    candidates = []
    if try_originals:
        alt = originals_variant(url)
        if alt:
            candidates.append(alt)
    candidates.append(url)

    last: Exception | None = None
    for candidate in candidates:
        try:
            blob = fetch(candidate, headers={"Referer": BASE + "/"}, retries=2)
            if not blob:
                raise RuntimeError("empty body")
            tmp = dest + ".part"
            with open(tmp, "wb") as fh:
                fh.write(blob)
            os.replace(tmp, dest)
            return dest, candidate, True
        except Exception as exc:  # noqa: BLE001 - fall through to next candidate
            last = exc
    raise RuntimeError(f"could not download {url}: {last}")


# --------------------------------------------------------------------------- #
def main() -> int:
    global _opener

    ap = argparse.ArgumentParser(description="Download a Pinterest board's images.")
    ap.add_argument("board_url", help="https://www.pinterest.com/<user>/<board>/")
    ap.add_argument("-o", "--out", help="destination folder")
    ap.add_argument("-n", "--limit", type=int, default=None, help="max pins")
    ap.add_argument("-j", "--jobs", type=int, default=4, help="parallel downloads")
    ap.add_argument("--no-originals", action="store_true", help="skip originals upgrade")
    ap.add_argument("--cookies", help="Netscape cookies.txt for private boards")
    ap.add_argument("--manifest", action="store_true", help="write manifest.json")
    args = ap.parse_args()

    if args.cookies and not os.path.exists(os.path.expanduser(args.cookies)):
        print(f"Cookies file not found: {args.cookies}", file=sys.stderr)
        return 1
    _opener = build_opener(args.cookies)

    username, slug = parse_board_url(args.board_url)
    source_url = f"/{username}/{slug}/"
    out_dir = os.path.abspath(os.path.expanduser(args.out or slug))
    os.makedirs(out_dir, exist_ok=True)
    print(f"Saving to: {out_dir}")

    try:
        board_id = get_board_id(username, slug, source_url)
    except urllib.error.HTTPError as exc:
        if exc.code == 403:
            print(
                "Pinterest returned 403. That usually means the board is secret, or "
                "Pinterest is rate-limiting this IP.\n"
                "  - Secret board: export cookies for pinterest.com to cookies.txt "
                "and re-run with --cookies cookies.txt\n"
                "  - Rate limit: wait a few minutes and try again.",
                file=sys.stderr,
            )
        elif exc.code == 404:
            print(f"Board not found: {BASE}{source_url}", file=sys.stderr)
        else:
            print(f"Pinterest returned HTTP {exc.code}.", file=sys.stderr)
        return 1

    jobs: list[tuple[str, str, dict]] = []  # (url, dest, pin)
    for index, pin in enumerate(iter_pins(board_id, source_url, args.limit), start=1):
        urls = pin_image_urls(pin)
        if not urls:
            continue
        pin_id = str(pin.get("id") or index)
        for part, url in enumerate(urls):
            jobs.append((url, os.path.join(out_dir, safe_name(index, pin_id, url, part)), pin))

    if not jobs:
        print("No images found. The board may be empty, secret (try --cookies), "
              "or Pinterest changed its feed format.", file=sys.stderr)
        return 1

    print(f"Found {len(jobs)} image(s). Downloading with {args.jobs} workers...")
    manifest, failures, saved, skipped = [], [], 0, 0

    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, args.jobs)) as pool:
        futures = {
            pool.submit(download_one, url, dest, not args.no_originals): (url, dest, pin)
            for url, dest, pin in jobs
        }
        for done, future in enumerate(concurrent.futures.as_completed(futures), start=1):
            url, dest, pin = futures[future]
            try:
                path, used, fresh = future.result()
                saved += 1 if fresh else 0
                skipped += 0 if fresh else 1
                print(f"  [{done}/{len(jobs)}] {'saved' if fresh else 'exists'} "
                      f"{os.path.basename(path)}")
                manifest.append({
                    "file": os.path.basename(path),
                    "pin": f"{BASE}/pin/{pin.get('id')}/" if pin.get("id") else None,
                    "title": (pin.get("grid_title") or pin.get("title") or "").strip() or None,
                    "description": (pin.get("description") or "").strip() or None,
                    "source": (pin.get("link") or None),
                    "image_url": used,
                })
            except Exception as exc:  # noqa: BLE001 - report and continue
                failures.append((url, str(exc)))
                print(f"  [{done}/{len(jobs)}] FAILED {url}: {exc}", file=sys.stderr)

    if args.manifest:
        with open(os.path.join(out_dir, "manifest.json"), "w", encoding="utf-8") as fh:
            json.dump(manifest, fh, indent=2, ensure_ascii=False)

    print(f"\nDone. {saved} new, {skipped} already present, {len(failures)} failed.")
    print(f"Folder: {out_dir}")
    return 0 if not failures else 2


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\nInterrupted.", file=sys.stderr)
        sys.exit(130)
