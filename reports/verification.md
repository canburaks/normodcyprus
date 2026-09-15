# HAY rebuild verification — 2026-09-15

## Screenshot correction — current verification

Corrected the reported homepage defect: cover photography in all three portrait frames; concise bilingual captions with no isolated slash;20px row gaps and compact caption padding through1023px;40px gaps from1024px;40px caption side padding only above1300px. The shared collection-caption rule and black masthead contrast are corrected too.

At679px viewport/664px client width, the first portrait frame matches HAY at(35,529.844),164.656×199.031, with the caption starting at748.875. The previous extra40px vertical space is removed. Checked26 bilingual home cases at13 widths and36 related-page cases with actual text-range bounds:0 overflows above1px and0 isolated slashes. Development screenshots inspected at390,679and1440px. Production build, strict TypeScript,21 tests, lint, formatting, content/UI checks and50-route HTTP audit pass. Refreshed the existing production browser tab at3002.

[Correction evidence](design/caption-correction-verification.json) supersedes the earlier generic overflow-only acceptance for this defect. Font, photo and translated line-count differences remain; no full raster identity is claimed.

## Previous rebuild result

The measured design is implemented across home, collections, catalog/product, contact, editorial and MDX templates. The original functional implementation report below is historical. Current machine-readable evidence is in [design verification](design/implementation-verification.json) and [production audit](production-audit.json).

- Passed: production build54 documents/50 published routes; strict TypeScript; ESLint; formatting;21 focused tests; content/UI audits;13 editor schemas;146 generated design variables.
- Fresh production crawl:50 routes,0 errors; localized initial HTML, one H1, unique titles/descriptions, reciprocal alternates, canonical domain, JSON-LD in head, internal links, no commerce payload and correct404/500 statuses.
- Desktop media matches:1315px hero;405px thirds;632.5px halves;291.25×352.05px product tiles;657.5×794.77px portrait and657.5px square product panels. Mobile335px full media and157.5px product tiles. Measured reference tolerance is within1px for these controlled boxes.
- Home checked at17 breakpoint/extreme widths320–1800px without overflow. Both-language editorial/contact/square-product pages checked at390 and1440px; separate screenshots inspected for home, collections, catalog, contact, article, inspiration, product disclosure and gallery.
- Native menu focus/Escape, mobile hierarchy, details, gallery keyboard/focus return, search, empty results, native filters and browser history verified. Product image0/label1/600ms; news image0.4/600ms with no circle; editorial0.4/800ms rules centralized.
- Corrected a reference-audit error: settled HAY category cards are two-up mobile/three-up desktop, not full-width banners. Its category bar is fixed above the header surface. The correction and source dimensions are in DESIGN.md.
- Draft articles are reviewable only in development, with localized draft labels and no fabricated author/date. Production draft URLs return404; preview indexing remains disabled.

Initial first-party JavaScript is178–190KB gzip across representative pages. These are transfer measurements, not Lighthouse or field Core Web Vitals. Normod remote photos can take time on a cold image-optimizer cache.

## Honest limits

Typography uses available Helvetica/Arial and Georgia; no licensed matching fonts were supplied. Normod image contents, logo and translated copy lengths differ from HAY. The single real Cyprus landscape photo keeps its natural proportions in a two-thirds photo/one-third contact layout; the data/rendering supports a second real photo later.

CSS/native semantics provide reduced-motion and no-JS fallbacks; full preference emulation/JS-disabled browsing, physical touch, multi-engine/assistive technology,200% zoom, automated axe and durable paired screenshot files remain release acceptance work. Screenshots were inspected inline; no repository screenshot files or complete pixel-perfect raster comparison are claimed. No deployment or indexing change was performed.

---

## Historical first implementation evidence

### Initial implementation — 2026-09-15

## Passed

- Next.js 16.3.5 / React 19.2.8 production build: 54 generated documents, covering 50 published locale routes plus localized error documents. All content routes are pre-rendered; no content API, ISR or request-time page rendering was introduced.
- Strict TypeScript and ESLint.
- 18 focused tests: schema restrictions, site/contact validation, locale/reference integrity, slug mapping, Turkish matching, filter combinations, safe JSON-LD, draft exclusion, MDX rendering and rejection of executable constructs.
- HTTP crawl of all 50 published routes: correct language, one H1, unique title, description, canonical, reciprocal locale alternates, head JSON-LD, working internal links, preview noindex and no commerce fields in serialized data/schema. Unknown routes return 404; custom 500 routes return 500.
- Native mobile menu and language popovers: open, language links, Escape/light dismiss.
- Mobile native filter dialog: selection, apply, count, URL update and focus return. Turkish → English preserves active collection filter. Turkish search, reset and browser back/forward restore the expected query and result counts.
- Product gallery: selected image shared with expanded native dialog, previous/next, arrow key, Escape and focus restoration. Product language switching resolves the translated slug by ID and resets gallery selection.
- Responsive geometry checks: 78 route/width combinations in the in-app browser, covering both languages at 320/390/768/1024/1440px. No document overflow or broken visible images. Visual spot checks: mobile landing/catalog/filter/product/contact and desktop collection/contact.
- Initial HTML contains content/navigation/contact actions independently of hydration. Browser controls are semantic native elements.
- Thirty asset addresses respond and decode; actual dimensions audited. Corrected two Marn dimensions and the small source logo/hero dimensions. Replaced a Turkish promotional image with a text-free fabric close-up. Showroom alt text now describes the entrance.
- HAY desktop and expanded mobile menu were re-inspected; adaptations are recorded in DESIGN.md.

## Measurements

See `production-audit.json` and `image-audit.json` for machine-readable evidence.

| Representative route | Initial first-party JS, gzip |
| --- | ---: |
| Home | 172 KB |
| Contact | 175 KB |
| Catalog | 186 KB |
| Product detail | 180 KB |
| Collections | 170 KB |
| Editorial | 173 KB |
| Journal | 170 KB |

Optimized AVIF response sizes at quality 75: mobile hero (640px) 11 KB; desktop hero (1920px) 65 KB; mobile showroom image (640px) 13 KB; example product card (384px) 2 KB; example gallery (1080px) 7 KB. Browser format negotiation can return another format, and network/caching conditions change real load times.

## Limits and remaining release checks

- No Lighthouse score, field LCP/INP/CLS, automated axe result, or multi-engine browser pass is claimed. Browser tooling in this run provided one in-app surface; production browser/assistive-technology testing remains necessary.
- Reduced-motion behavior was implemented in CSS and reviewed in source; OS preference emulation and 200% zoom were not measured. Initial HTML was audited for no-JS content, but a fully JavaScript-disabled browser session was not run.
- Two complete bilingual MDX drafts compile successfully. Article publication and a browser review of published article pages await a verified author/date; drafts are intentionally absent from routes and the sitemap.
- The official showroom supplied a local-format telephone number; international dialing and WhatsApp were not verified. The email and directions actions are available.
- Domain was confirmed by the user. Preview indexing is disabled; deployment and enabling indexing were not requested or performed. Current assortment, final imagery and business details need owner review before release.
