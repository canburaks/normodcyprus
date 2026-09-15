# Verification — 2026-09-15

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
