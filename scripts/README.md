# scripts

## pinterest_board_download.py

Downloads every image from a Pinterest board into a local folder. Python 3
standard library only — nothing to install.

### Usage

```bash
python3 scripts/pinterest_board_download.py \
  https://www.pinterest.com/ismaelaaddioui/authentic-brand/ \
  -o ~/Desktop/authentic-brand
```

| Flag | Meaning |
| --- | --- |
| `-o, --out DIR` | Destination folder (default: `./<board-slug>`) |
| `-n, --limit N` | Stop after N pins — handy for a quick test run |
| `-j, --jobs N` | Parallel downloads (default 4) |
| `--manifest` | Also write `manifest.json` with title, description, source link per image |
| `--cookies FILE` | Netscape `cookies.txt`, needed only for secret boards |
| `--no-originals` | Skip the full-resolution upgrade attempt |

### What it does

- Walks the whole board page by page, not just the first screen.
- Grabs the largest available file, upgrading `i.pinimg.com/736x/...` to
  `/originals/...` and falling back if that resolution doesn't exist.
- Handles carousel pins and idea pins (saves every frame).
- Skips files already on disk, so re-running resumes instead of re-downloading.

### If it stops working

Pinterest's board feed is an internal, undocumented JSON endpoint. If the
script starts finding zero images, Pinterest likely changed its response
shape. `gallery-dl` (`brew install gallery-dl`) tracks those changes and is a
good fallback.
