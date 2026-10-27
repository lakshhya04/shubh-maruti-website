# Handover: Shubh Maruti site on the SCT Consulting design

Written 2026-10-20 at the end of a chat that was in the wrong workspace (the Erlin one). Pick up from here in the Website Development workspace.

## What this is

A **private design study**: Shubh Maruti Logistics' approved content laid out in the style of https://sctconsulting.com.au/. It is one self-contained page, `index.html`; open it in a browser to view.

- **Not for publishing as it is.** It follows another company's design closely, which the workspace rules don't allow for a live site. If Shubh Maruti likes the direction, turn it into an original design inside the real project.
- **Content is approved, word for word.** It comes from `Website Development workspace/projects/shubh-maruti-logistics/src/content/` (brief, services, network, about, contact, FAQ). Don't invent facts.
- **Brand:** logo `assets/logo.png` (copied from the project, white background, so it sits on a white chip on dark areas), blue #002372, red #DC0B11, dark text #1F2937.
- **Font:** Nunito Sans (Google Fonts), standing in for SCT's Avenir, which isn't free.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole page: HTML, CSS and JS in one file |
| `assets/logo.png` | Shubh Maruti logo |
| `assets/photos/` | Photo slots: a file named after its slot replaces the line drawing automatically (jpg, jpeg, png or webp) |
| `assets/photos/CREDITS.md` | Credits for the photos currently in the folder. **These are being replaced; see below.** |
| `PHOTO-PROMPTS.md` | Slot names, where each appears, and AI prompts if images are generated instead |

## Section order (Lakshhya's, final)

1. Hero: a 3-slide slider covering airport cargo, road transport and ODC
2. About us: statement, story paragraph, three points, company facts
3. Why clients choose us: dark band with numbers (2011, 7 services, 0.5 kg) and 8 strengths
4. Services: navy band; hover or click one of the 7 names to see its details and picture
5. Our network: 7 locations plus "Connected by one team", in SCT's sectors-grid style
6. Sectors (who we work with): multinational companies, Japanese companies, businesses across industries, industrial areas. Only what the brief says; no invented industries.
7. How we work: 4 steps from enquiry to delivery
8. FAQs: 6 approved questions, as an accordion
9. Tell us what needs moving: dark contact block, footer columns, red legal strip

The reorder, Sectors and FAQs were just added and **haven't been checked in a screenshot yet**.

## Problem 1: the sections don't match SCT closely enough

Lakshhya's feedback: "it's not catching the exact section design". The cause: the page was built by eye from one shrunk full-page screenshot, not from measurements. Also, SCT is photo-led and this page still has drawings or poor photos.

**Do it section by section, with proof:**

1. Capture each SCT section at full size (1440 px wide) and read its computed styles with puppeteer: font sizes and weights, line heights, padding and margins, column positions on the 4-column grid, image sizes and aspect ratios, colours. A capture script that works is in the Erlin repo, `~/Downloads/erlin-website-main 3/scripts/verify/lib.mjs`, with `launch()` and `load()` (puppeteer-core is installed there).
2. Rebuild the matching Shubh Maruti section to those exact numbers.
3. Make a **side-by-side image** (SCT section | ours) for each section and fix the differences until they match. Show Lakshhya these comparisons.
4. Sections SCT doesn't have (Why us, FAQs) are built only from SCT's own parts: the 4-column hairline grid, the eyebrow label with a rule from the edge, the circle-and-arrow link, the diamond icons, and its list and type styles.

SCT's sections, top to bottom, for reference: a full-screen photo slider (title top, caption bottom-left, counter and round arrows); About (eyebrow, large statement, tall photo left, three blue-headed points in two columns); a navy services band (stacked service names, active one white, photo bottom-right); a sectors grid (intro in column 1, a 2-column grid with a diamond icon, title and photo); a dark featured-projects band (staggered images, full-width "View all" bar); a news list; a green initiative band; a dark contact block with offices; a coloured legal strip.

## Problem 2: photos

The photos in `assets/photos/` now are **low resolution (about 1,000 px) and the rawpixel ones carry a faint watermark**. Replace all of them except `coordinator.jpg`, which is clean.

**Chosen replacements (full resolution, not downloaded yet):**

| Slot file | Photo | Size | Licence | Credit needed |
|---|---|---|---|---|
| `road-transport` | [NH 65 Hyd.jpg](https://commons.wikimedia.org/wiki/File:NH_65_Hyd.jpg) (truck on an Indian highway) | 6000×4000 | CC BY-SA 4.0 | Nikhilb239 |
| `odc` | [Trafo (Umspannanlage Uchtelfangen) 2019-02 (03).jpg](https://commons.wikimedia.org/wiki/File:Trafo_(Umspannanlage_Uchtelfangen)_2019-02_(03).jpg) (transformer on a modular trailer) | 7354×3600 | CC BY-SA 4.0 | Simon Mannweiler |
| `project-cargo` | [Modular transport.jpg](https://commons.wikimedia.org/wiki/File:Modular_transport.jpg) (wind-turbine sections on hydraulic trailers) | 2794×1846 | CC BY-SA 3.0 | Denny van Barreveld |
| `rail-terminal` | [BZA WAG-5A (16971439739).jpg](https://commons.wikimedia.org/wiki/File:BZA_WAG-5A_(16971439739).jpg) (Indian Railways loco with containers) | 4608×3456 | CC BY 2.0 | Belur Ashok |
| `warehouse` | [Modern warehouse with pallet rack storage system.jpg](https://commons.wikimedia.org/wiki/File:Modern_warehouse_with_pallet_rack_storage_system.jpg) | 2400×1870 | CC BY-SA 3.0 | Axisadman |
| `container-depot` | [Container Stack (StockSnap)](https://stocksnap.io/photo/container-stack-NDCVBXJMDJ) | large | CC0 | none |
| `coordinator` | [Man Office (StockSnap)](https://stocksnap.io/photo/man-office-OIYW6T2ZLT) | already in place | CC0 | none |

**Still to choose:** `airport-cargo`, `seaport` and `industrial-area`. Search Wikimedia Commons (see below). Candidates seen but not reviewed:
- Airport cargo: a UPS 767-300F freighter unloading at Boston, a Boeing 747-8F nose cargo door, a Nippon Cargo 747F. Avoid visible airline branding where possible.
- Seaport: try "Mundra Port" and "Jawaharlal Nehru Port" again for real Indian ports; otherwise "Container cranes in Tokyo Bay" or "Container cranes at the Port of Oakland".
- Industrial area: nothing good yet. Try "industrial area India trucks", "factory loading bay India", "IMT Manesar".

**How to get them without problems:**
- Use the **Wikimedia Commons API**, not Openverse: `commons.wikimedia.org/w/api.php` with `generator=search`, `gsrnamespace=6` and `prop=imageinfo`, with `iiprop=url|size|extmetadata` and `iiurlwidth=2400`. The returned `thumburl` is a properly sized file, which avoids rate limits.
  - Send a descriptive User-Agent and wait 1–2 seconds between requests; it rate-limits (429) quickly.
  - Strip the `?utm_...` part from Wikimedia URLs before building thumbnail links.
- **Don't use rawpixel** (free downloads are watermarked). Unsplash blocks scripts. Pollinations' free generator is low quality and watermarked; Flux needs a paid key. Canva's image generator would work if the Canva connector is connected.
- Size: **2400 px wide for the three hero slides**, 1600 px for the rest. Apply the same light treatment to all of them so they look like one set: slightly cooler, a little less saturated, metadata stripped. The earlier ffmpeg filter was `eq=saturation=0.82:contrast=1.04:brightness=-0.01,colorbalance=bs=0.05:bm=0.03:rh=-0.03`.
- **Credits:** CC BY and CC BY-SA photos need a credit. Add a small "Photo credits" line in the footer and update `assets/photos/CREDITS.md`.
- **Check every final image at full size for watermarks** before using it.

**Long term:** real photos of Shubh Maruti's own trucks, containers and team will beat any stock photo. Stock and AI images are fine for this study.

## Still open from the brief (don't guess)

- How "40 years of experience" fits with "established October 2011" (left out of the page until this is clarified)
- Phone and WhatsApp numbers (every button emails madan@shubhmaruti.com for now)
- Office address and working hours
- Whether to show the CIN and GST number
- The original vector logo file

## Checks before showing Lakshhya

- Screenshots at 1440 px and 390 px: no sideways scrolling, no console errors (missing-photo probes show as "file not found", which is expected)
- Every section compared side by side with SCT
- Nothing cut off or overlapping, and text readable on photos
