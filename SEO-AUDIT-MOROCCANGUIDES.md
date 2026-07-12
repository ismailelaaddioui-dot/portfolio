# SEO Audit & Growth Plan — moroccanguides.com

**Date:** July 12, 2026
**Platform:** Webflow
**Data sources:** Google Search Console — Performance (Apr 11 – Jul 12, 2026) and Coverage drilldown ("Crawled – currently not indexed", 50 URLs), live sitemap.xml, Google index sampling.

---

## 1. Executive summary

Over the last 3 months the site earned **~57 clicks from ~3,870 impressions (1.5% CTR, avg position ~30)**. The single most important finding:

> **Every one of the 57 clicks went to the homepage.** All 31 other pages receiving impressions — including the /tours listing page (639 impressions) and every tour and blog page — got **zero clicks**.

Three root causes, in order of impact:

1. **The homepage's authority is split across domain variants.** Google still indexes and serves `http://www.moroccanguides.com/` (25 clicks, 2,020 impressions, avg position **5.1**) as a *separate page* from `https://moroccanguides.com/` (32 clicks, 951 impressions, avg position **44.8**). The old `http://www` variant holds your best rankings; the canonical `https` non-www version ranks on page 4–5 for the same query space. Until Google consolidates these, you are effectively competing against yourself with half your link equity on each side.
2. **Titles and descriptions don't earn clicks.** You already rank on page 1–2 for real commercial queries — "guide morocco tour" (pos 2.9), "morocco trips guide" (pos 5.2), "tour guides in morocco" (pos 9.6), "guide morocco tours" (pos 10.6) — with **0% CTR** on ~660 combined impressions. Indexed titles like "Rabat from Casablanca — Moroccan Guides" or "Mgoun Geopark — Moroccan Guides" say nothing about private tours, price, duration, or trust, so searchers pick competitors.
3. **Duplicate and legacy URLs are diluting the crawl.** 50 URLs sit in "Crawled – currently not indexed": leftover WordPress URLs (`/?p=2628`, `/?tour=imlil-valley`, `/tours/<slug>`, `?amp`, trailing-slash and www/http variants) **plus blog posts that duplicate tour pages almost 1:1** (e.g. `/blog/day-tour-el-jadida-from-casablanca` vs `/tour/day-tour-el-jadida-from-casablanca`). Google indexed the *blog* version of El Jadida while the *tour* (bookable) version languishes at position 74.

Also notable: the site returned **HTTP 403 to non-Google fetchers** during this audit. If a WAF/bot-protection rule is blocking crawlers beyond Googlebot (Bingbot, AI assistants like ChatGPT/Perplexity), you're invisible in those channels — and your GSC queries show AI-assistant-style questions already surfacing your site ("what are the best travel guides or tour companies to use for planning a first trip to morocco?" — position 5.8). That's a growth channel worth protecting.

Realistic expectation if the plan below is executed: consolidating the homepage variants + rewriting titles alone should multiply clicks several times within 6–10 weeks, because the impressions and rankings already exist — they're just split and unclickable.

---

## 2. What the data says

### Traffic snapshot (Apr 11 – Jul 12, 2026)

| Metric | Value |
| --- | --- |
| Clicks | ~57 |
| Impressions | ~3,870 |
| Avg CTR | ~1.5% |
| Clicks to homepage variants | 57 (100%) |
| Clicks to tour/blog pages | 0 |

### The homepage split (the #1 issue)

| Indexed URL | Clicks | Impressions | Avg position |
| --- | --- | --- | --- |
| `http://www.moroccanguides.com/` | 25 | 2,020 | **5.1** |
| `https://moroccanguides.com/` | 32 | 951 | 44.8 |

Google's chosen canonical for much of your query space is still the **insecure www** URL. Live index sampling confirms `https://www.moroccanguides.com/faq`, `https://www.moroccanguides.com/tailor-made-tours`, `https://www.moroccanguides.com/tour/...` pages are still indexed under www, and the old WordPress URL `https://moroccanguides.com/cultural-tours/` (trailing slash) is still indexed too.

### Where you already rank but get no clicks (striking distance + snippet problem)

| Query | Impressions | Position | Clicks |
| --- | --- | --- | --- |
| guide morocco tours | 212 | 10.6 | 0 |
| tour guides in morocco | 186 | 9.6 | 0 |
| morocco trips guide | 117 | 5.2 | 0 |
| guide morocco tour | 86 | **2.9** | 0 |
| tour guides morocco | 55 | 10.7 | 0 |
| morocco local tour guide | 15 | 4.0 | 0 |
| morocco 7 day itinerary | 6 | **1.0** | 0 |
| 7 day morocco tour | 8 | 1.25 | 0 |

Ranking top-3 with 0% CTR is not a ranking problem — it's a snippet problem (title/description) plus possible SERP-feature cannibalization. These are the fastest wins available.

### Big-demand queries stuck on page 8–10 (content + authority problem)

| Query | Impressions | Position |
| --- | --- | --- |
| morocco guided tours | 304 | 89 |
| morocco jewish tours (+ variants) | ~160 | 81–88 |
| guided tours in/of morocco (variants) | ~175 | 84–87 |
| morocco tailor-made tours (+ variants) | ~140 | 77–91 |

These map to `/tours` (639 impressions, pos 79), `/tailor-made-tours` (208, pos 64) and `/blog/morocco-jewish-tour` (177, pos 79). All three pages have demand but insufficient content depth and internal/external authority.

### Markets

| Country | Clicks | Impressions | Position |
| --- | --- | --- | --- |
| Morocco | 22 | 948 | 11.7 |
| United States | 11 | 1,592 | 45.8 |
| United Kingdom | 4 | 459 | 60.9 |
| Canada | 4 | 151 | 45.0 |

Your paying market (US/UK/CA) sees you on page 4–6; most current clicks come from inside Morocco (largely not customers). Desktop position (41.5) is far worse than mobile (22.2) — another symptom of the split-domain problem, since the www variant ranks well and the https variant doesn't.

### Coverage: the 50 "Crawled – currently not indexed" URLs

Breakdown of the drilldown:

- **Legacy WordPress URLs** (~15): `/?p=2628`, `/?tour=imlil-valley`, `/about/?amp`, `/tour/agafay-desert/` and other trailing-slash variants, `/tours/<slug>` plural paths, `/contact/`, `/faq/`, `/blog/`. Expected to drop out naturally *if* they 301 to the canonical page — verify (Section 3).
- **www / http duplicates** (~12): `https://www.moroccanguides.com/tour/...` etc. Will resolve with the domain consolidation fix.
- **Genuine current pages not indexed** (~20): real blog posts and tours in your sitemap, e.g. `/blog/things-to-do-while-visiting-morocco`, `/blog/whats-the-best-7-day-itinerary-for-morocco`, `/tour/ouzoud-waterfalls-day-tour`, `/tour/moroccan-highlights-fes-sahara-marrakech-5-day`. These need the duplicate-content and internal-linking fixes below, then re-inspection.

---

## 3. P0 — Fix this week (technical foundation)

### 3.1 Kill the www split for good

You've done the 301s and Webflow strips trailing slashes — good. But GSC proves Google still serves `http://www...`, so verify each layer:

1. **Webflow → Site settings → Publishing:** confirm `moroccanguides.com` is set as the **default domain** (the arrow/star next to it), so `www.moroccanguides.com` 301s to it. If www was ever the default in the past, Google's memory of it is why it still ranks.
2. **SSL:** confirm "Enable SSL" is on, and that `http://` requests 301 straight to `https://` (Webflow does this when SSL is enabled — but the old `http://www` chain should be `http://www → https://www → https://` or ideally one hop).
3. **Global canonical tag:** Webflow → Site settings → SEO → **Global canonical tag URL** → set to `https://moroccanguides.com`. This stamps a self-referencing canonical on every page and is the strongest signal you can give. This also neutralizes the `?p=2628` / `?tour=` / `?amp` parameter URLs, which Webflow's redirect UI cannot match (it ignores query strings).
4. **GSC:** use **URL Inspection → Request indexing** on `https://moroccanguides.com/` and your top 10 pages. Then check "Page indexing → Page with redirect / Duplicate, Google chose different canonical" reports weekly until the www variants disappear (expect 2–6 weeks).
5. If you have any control over old links you own (Facebook page, GBP, directories, email signatures), update them from `www`/`http` to `https://moroccanguides.com` — every live www link keeps the ghost alive.

### 3.2 Resolve the blog/tour duplicate content

These near-duplicate pairs exist (blog post ≈ tour page):

- `/blog/day-tour-el-jadida-from-casablanca` ↔ `/tour/day-tour-el-jadida-from-casablanca` (Google indexed the **blog** one)
- `/blog/private-marrakech-tour` ↔ `/tour/private-marrakech-tour`
- `/blog/day-tour-rabat-from-casablanca` ↔ `/tour/day-tour-rabat-from-casablanca`
- `/blog/day-tour-meknes-and-volubilis-from-casablanca` ↔ `/tour/...`
- `/blog/highlights-of-morocco-casablanca-to-essaouira-15-days` ↔ `/tour/...`
- `/blog/ait-ben-haddou-and-telouet` ↔ `/tour/ait-ben-haddou-and-telouet`
- `/blog/casablanca-to-marrakech-7-days` ↔ `/tour/casablanca-to-marrakech-7-days`

**Rule: one intent, one URL.** The `/tour/` page is the bookable, money page — it must win. For each pair, either:

- **301 the blog post to the tour page** (Webflow → Publishing → 301 redirects: `/blog/private-marrakech-tour` → `/tour/private-marrakech-tour`), *or*
- **Rewrite the blog post into a genuinely different intent** (e.g. the blog becomes "What to expect in El Jadida: history, food, photos" and links prominently to the tour page as the CTA).

Redirecting is the fast, safe default. Doing this will pull ~7 tour pages out of index limbo.

### 3.3 Verify the 403 / bot-blocking issue

During this audit the site returned **403 Forbidden** to standard HTTPS fetchers. Webflow itself doesn't do this, so something in front (Cloudflare proxy, a firewall rule, or a Webflow "password/bot" setting) is blocking non-browser agents. Test with:

- GSC URL Inspection → "Test live URL" (must pass — it probably does),
- Bing Webmaster Tools URL inspection (register the site there too — free traffic),
- `curl -A "Mozilla/5.0" https://moroccanguides.com/` from any machine.

If Cloudflare is in the stack, set Security → Bots to allow **verified bots**, and don't block AI crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot` etc.) — your GSC data shows AI-assistant queries already recommending you; those assistants must be able to read the site to keep doing it.

### 3.4 Legacy URL spot-check (15 minutes)

Confirm these 301 to their modern equivalents (they're all in the "crawled not indexed" list, so Google is still trying them):

- `/tours/marrakech-atlas-mountains-essaouira-9-days` → `/tour/marrakech-atlas-mountains-essaouira-9-days` (plural → singular)
- `/cultural-tours/` → a live page (it's still **indexed** on Google — either 301 it to `/tours` or rebuild it; see 5.2)
- `/tour/desert-tour-to-erg-chebbi/`, `/tour/ourika-valley-day-tour/` etc. — trailing-slash: handled by Webflow ✅ (just confirm it's a 301, not 404)
- `/blog/ait-bouguemez-trek` → `/tour/ait-bouguemez-trek`

---

## 4. P1 — Rewrite every title & description (week 1–2, highest ROI)

You rank top-10 for ~10 commercial queries with 0% CTR. Snippets are the entire battle at your current rankings. Current indexed titles ("About — Moroccan Guides Travel", "Rabat from Casablanca — Moroccan Guides") waste the space.

**Formula:** `{Primary keyword} | {differentiator: Private/Local/Price/Duration} – {Brand}` — under ~60 characters visible; description ~150 chars, front-load the promise, end with a soft CTA.

Recommended rewrites for the money pages:

| Page | New title | New meta description |
| --- | --- | --- |
| `/` (home) | Morocco Tour Guides – Private, Tailor-Made Tours by Locals | Private Morocco tours led by local guides with 20+ years' experience. Day trips, Sahara desert tours & custom itineraries. Trusted by US & UK travelers. |
| `/tours` | Morocco Guided Tours: Day Trips to 15-Day Adventures | Compare our private guided tours of Morocco — from Marrakech day trips to 2-week Sahara & Imperial Cities itineraries. Small groups, local guides, fair prices. |
| `/tailor-made-tours` | Tailor-Made Morocco Tours – Custom Private Itineraries | Tell us your dates and dreams; our local experts build your custom Morocco itinerary — desert, mountains, coast. Free planning, no obligation quote. |
| `/tour/casablanca-to-marrakech-7-days` | Morocco 7-Day Itinerary: Casablanca to Marrakech Private Tour | The best 7-day Morocco tour: Casablanca, Rabat, Fes, Sahara & Marrakech with a private local guide. See the full day-by-day itinerary & price. |
| `/tour/agafay-desert` | Agafay Desert Trip from Marrakech – Sunset, Dinner & Camel Ride | Escape to the Agafay desert: camel ride, Berber dinner under the stars, hotel pickup from Marrakech. Small private groups — check availability. |
| `/blog/morocco-jewish-tour` (→ see 5.2) | Morocco Jewish Heritage Tours – Synagogues, Mellahs & History | Guided Jewish heritage tours of Morocco: Casablanca, Fes & Marrakech synagogues, mellah quarters and living history, led by expert local guides. |
| `/about` | About Moroccan Guides – Local Guides from the High Atlas | We're a team of local guides, drivers and planners from the High Atlas. 20+ years showing travelers the real Morocco. Meet the team. |
| `/faq` | Morocco Travel FAQ – Safety, Visas, Costs & What to Pack | Honest answers from local guides: Is Morocco safe? What does a private tour cost? Visas, tipping, dress code and more. |

In Webflow: static pages get these in Page settings → SEO; **Tour and Blog CMS collections should bind Title tag / Meta description to CMS fields** (add "SEO Title" and "SEO Description" fields to each collection so every item gets a hand-written pair — never leave them auto-generated from the name field).

Also fix the pattern in every tour item: `{Tour name} from {City} – {Duration} Private Tour | Moroccan Guides` and include price or "from $X" in the description when possible — price in snippets measurably lifts CTR for tour queries.

---

## 5. P2 — Content plan mapped to demonstrated demand (weeks 2–8)

Your GSC data hands you the roadmap: build/upgrade pages exactly where impressions already exist.

### 5.1 Upgrade `/tours` into a real hub (target: "morocco guided tours", 304 imp @ pos 89)

Currently a thin listing at position 79–89. Make it the category powerhouse:

- 300–500 words of genuinely useful intro copy ("How our private guided tours work", who guides you, pickup logistics, group size, pricing approach).
- Group tours by duration (Day trips / 2–6 days / 7+ days) and by region — matching your own SERP title promise.
- Add an FAQ block (with FAQ schema) answering "How much does a guided tour of Morocco cost?", "Private vs group?", "Are Morocco tour guides licensed?".
- Internally link to it site-wide as "Guided Morocco Tours" (exact anchor), not just "Tours".

### 5.2 Build a Jewish Heritage hub (target: ~160 impressions across "morocco jewish tours" variants @ pos 81–88)

This is your clearest untapped cluster, and you already have `/tour/10-day-morocco-jewish-heritage-trip` in the sitemap plus the `/blog/morocco-jewish-tour` post (177 imp). Structure:

- **Money page:** promote the 10-day Jewish Heritage tour page with full itinerary, synagogues visited (Ibn Danan Fes, Slat al-Azama Marrakech, Bet-El Casablanca, mellahs, Jewish cemeteries), kosher/comfort notes, and testimonials.
- **Supporting posts:** "Jewish history of Morocco" (you already have `/blog/moroccan-history` to interlink), "Visiting the Mellah of Marrakech", "Synagogues of Fes". Each links to the money page with descriptive anchors ("Morocco Jewish heritage tour").
- The query "synagogues in morocco" already shows impressions — that's the supporting-post proof.
- This audience skews US — your biggest impression market. Also revive/redirect `/cultural-tours/` (still indexed!) into this cluster or 301 it to `/tours`.

### 5.3 Own the "7-day itinerary" cluster (you're already #1)

"morocco 7 day itinerary" and "7 day morocco tour" show you at position 1–1.25 with tiny impressions — likely from `/blog/whats-the-best-7-day-itinerary-for-morocco` (currently **not indexed** per coverage!). Fix its indexing (internal links + request indexing), make it the definitive day-by-day guide with a map, and CTA hard into `/tour/casablanca-to-marrakech-7-days`. Add 10-day and 14-day itinerary posts next ("morocco tour 10 days" impressions exist), each pairing with a bookable tour.

### 5.4 Tailor-made page depth (target: ~140 impressions @ pos 77–91)

`/tailor-made-tours` at 208 impressions/pos 64 needs: a concrete "how it works in 3 steps" flow, 2–3 sample custom itineraries with prices, testimonials naming trip types (family, women-only — "morocco tours for women" and "women's group trip to morocco" appear in your queries), and an inquiry form above the fold.

### 5.5 Blog cadence

Two posts/month is enough if each targets a query cluster from GSC data and links to a tour page. Priority queue from your own impressions: best time to visit Morocco (page exists — interlink it), Agafay desert dinner (9 imp — supports your Agafay tour), Ourika Valley tours, "is morocco safe / 10 things to know" (page exists, 9 imp @ pos 6 — expand it).

---

## 6. Structured data (week 2–3)

You get zero rich results today (Search appearance report is empty). On Webflow, add JSON-LD via per-page custom code / embeds bound to CMS fields:

- **Tour pages:** `Product` schema with `offers` (price, currency) + `aggregateRating` once you have review data — this earns price/review stars in SERPs, which fixes CTR at any position. Optionally `TouristTrip` with `itinerary`.
- **Organization/LocalBusiness** (`TouristInformationCenter` or `TravelAgency`) on the homepage: name, logo, phone (+212 673-794463), address, `sameAs` → Facebook, TripAdvisor.
- **FAQPage** on `/faq` and on the FAQ blocks of `/tours` and money pages.
- **BreadcrumbList** on tour and blog pages.

Validate with Google's Rich Results Test after publishing.

---

## 7. Authority & off-page (ongoing — this is what moves page-8 rankings)

Rankings at position 80–90 for "morocco guided tours" against Intrepid/G Adventures won't be fixed by on-page work alone:

1. **Google Business Profile** for the Marrakech office, categorized "Tour operator" — collect reviews there; this also feeds local-pack visibility for "tour guide marrakech" queries you already appear for.
2. **TripAdvisor + GetYourGuide/Viator listings** ("getyourguide morocco" appears in your queries). Even if OTAs take commission, their profile pages rank, funnel brand searches, and generate the review volume you need for schema stars.
3. **Review velocity:** after each tour, send a one-tap review link (GBP + TripAdvisor alternating). 20–30 reviews in 90 days changes everything for a tour operator.
4. **Digital PR / links:** pitch travel bloggers who write "Morocco itinerary" posts (offer expert quotes as High Atlas locals), get listed in Jewish-travel directories and cultural-tourism roundups for the heritage cluster, and reach out to the Amazigh culture angle (your Amazigh New Year post shows unique expertise no OTA has).
5. **Consistency:** every external profile must link to `https://moroccanguides.com` (no www, no http).

---

## 8. Measurement & expectations

Weekly in GSC:

- **Page indexing report:** watch "Duplicate/Google chose different canonical" and www URLs shrink; sitemap-submitted indexed count should climb toward 45.
- **Performance, filter Country = US/UK:** the goal metric is non-homepage clicks — currently **0**. First tour-page click is the milestone.
- **Queries at position 4–15:** re-check CTR two weeks after the title rewrites.

Realistic timeline:

| When | Expected effect |
| --- | --- |
| Weeks 1–3 | www/http variants start dropping; CTR rises on existing top-10 queries from new titles |
| Weeks 4–8 | Homepage signals consolidate → https non-www position improves toward the 5.1 the www version already holds; tour pages start getting first clicks |
| Weeks 8–16 | Hub pages + reviews + links lift "morocco guided tours"/"jewish tours"/"tailor-made" clusters from page 8 toward pages 2–3; compounding blog traffic |

---

## 9. 30 / 60 / 90-day checklist

**Days 1–7 (P0):**
- [ ] Confirm default domain = `https://moroccanguides.com` in Webflow; test all 4 variants redirect in one hop
- [ ] Set Global canonical tag URL in Webflow SEO settings
- [ ] 301 the 7 duplicate blog posts → tour pages
- [ ] Fix `/cultural-tours/` and `/tours/<slug>` legacy redirects
- [ ] Diagnose the 403-to-bots issue; allowlist verified crawlers and AI bots
- [ ] Register Bing Webmaster Tools; submit sitemap
- [ ] URL-Inspect + request indexing for homepage and top 10 pages

**Days 8–30 (P1):**
- [ ] Rewrite all titles/descriptions (table in §4); add SEO fields to CMS collections
- [ ] Upgrade `/tours` hub (copy, duration/region grouping, FAQ block)
- [ ] Add Product + Organization + FAQ + Breadcrumb schema
- [ ] Set up Google Business Profile; start review collection

**Days 31–60 (P2):**
- [ ] Jewish Heritage hub: money page upgrade + 2 supporting posts
- [ ] Tailor-made page rebuild with sample itineraries
- [ ] 7-day itinerary post fixed/expanded and indexed; 10-day post published
- [ ] TripAdvisor + GetYourGuide profiles live

**Days 61–90:**
- [ ] 4 more blog posts from the GSC query queue, each interlinked to a tour
- [ ] First outreach round (travel bloggers, Jewish-travel directories)
- [ ] Review GSC deltas; double down on whichever cluster moved most
