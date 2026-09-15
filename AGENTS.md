# Normod Cyprus — Agent Guide

## Status and authority

- The user approved the measured HAY rebuild with “Now, implement this design.” It is implemented and verified with the limits in [reports/verification.md](reports/verification.md). PLAN.md Phase14 distinguishes completed implementation from remaining font/photo assets and release QA; do not call system fonts a pixel-perfect raster match.
- The user's project brief is the source of truth and overrides conflicting skill guidance.
- Read [PLAN.md](PLAN.md) for scope, decisions, implementation steps, and approval status.
- Read [DESIGN.md](DESIGN.md) before design or styling work; keep it synchronized with approved design changes.
- Record every repository modification batch in [CHANGELOGS.md](CHANGELOGS.md). Mark plan checkboxes complete only when their work is verified.

## Current design authority — deep HAY audit, 2026-09-15

- [DESIGN.md](DESIGN.md) now contains a 14-page reference audit, exact layout/type/card measurements, a 10-width homepage matrix, observed interactions, source-only motion families and known evidence limits. Read it before changing visual code.
- The previous approximate design and discretionary adaptations are superseded. In particular, do not retain the reversed masthead rows, 103px compact header, 88px mobile header, alternate-image product hover, uniform collection/product grids or generic four-column footer as accepted decisions.
- Desktop HAY navigation sits above its centered logo; header states are 130px and 55px total. Mobile is 70px. Media insets derive from row/column padding: 20px below 640, 35px through 900, 55px through 1600, then a centered maximum row. Grid, navigation and hover have independent breakpoints.
- Home uses full-width landscape → three portraits → two landscapes. Collections index uses two landscape cards below640px and three from640px (settled source correction); product families use JSON-authored mixed-span collages. Product detail has equal adjacent image/information panels with a #ECECEC surface.
- Editorial hover settles at image opacity 0.4. Desktop product hover fades the image to zero and shows a centered label over a JSON-defined color in 600ms. Mobile labels remain beneath images. Live news hover also settles at 0.4/600ms and suppresses the generic EXAMINE circle; inactive bundled CSS must not override tested behavior.
- DESIGN.md YAML is migrated and active. `pnpm design:generate` writes145 CSS variables plus `src/styles/generated/layout.json`; image sizes consume that shared geometry. Collection category layout was corrected after observing the source's settled `small-6 medium-4 large-4` classes and fixed submenu. Do not restore the earlier pre-layout full-width interpretation.
- [reports/design/hay-measurements.json](reports/design/hay-measurements.json) contains supporting measurements. [reports/design/initial-design-superseded.md](reports/design/initial-design-superseded.md) is historical, not instruction authority.
- Keep Normod branding/content, Turkish/English JSON, truthful store information, existing functional behavior and native accessibility. Additional Cyprus photographs and matching licensed typography are asset gaps; do not invent assets or silently call a fallback font pixel-perfect.
- Before claiming visual completion, compare the same viewport/client width and settled states, cover responsive boundary pairs, document font/content differences, and complete Phase 14 checkboxes. Pixel-perfect is a verification target, not a synonym for no overflow.

## Application requirements

- Build a pre-rendered Normod Furniture Cyprus showroom using Next.js Pages Router, TypeScript, next-i18next, shadcn/ui, Tailwind CSS, and Zustand.
- **User clarification, 2026-09-15: static export is not required.** Use the normal Next.js runtime and Pages Router locale routing. Do not set `output: 'export'`, introduce a manual `[locale]` route tree, or migrate to App Router.
- Turkish is primary; English is required. Localized JSON belongs in `public/locales/`.
- All site content, UI labels, assets, brand details, collection/product information, and contact information must come from structured JSON. No database, prices, cart, checkout, or purchasing controls.
- Direct visitors to the physical Cyprus store. Do not invent store details or assume the Turkish website's commercial policies apply in Cyprus.
- Use `DESIGN.md` as the style source of truth and HAY as the layout/motion reference. Most imagery will come from Normod URLs, with some files in `public/`; reference both through JSON.
- Use lowercase dash-separated application filenames, named component exports, and boolean names beginning with `is`, `has`, `does`, or `should`. Preserve required framework filenames and exports.
- Prefer semantic HTML and native browser controls with progressive enhancement. Resolve native dialog/popover/select requirements before selecting a library primitive.
- This is a showroom with product discovery and physical-store contact actions. No product prices, monetary fields, shopping basket, checkout, account, order processing, or online sample-order flow, including in JSON-LD or serialized page data.

## Repository baseline — inspected 2026-09-15

| Area | Existing setup |
| --- | --- |
| Runtime | Next.js `16.3.5`; React and React DOM `19.2.8`; TypeScript strict mode |
| Package manager | pnpm `12.3.4`, recorded in package.json; retain pnpm-lock.yaml |
| Localization | next-i18next `16.3.1`, i18next `26.4.2`, react-i18next `17.0.14` |
| State | Zustand `5.0.15` |
| UI | shadcn `4.21.0`, `base-nova`, `@base-ui/react`, Lucide, CVA, `cn` |
| Styling | Tailwind CSS v4, CSS variables enabled, `tw-animate-css` |
| Router | `src/pages/` with all showroom routes; starter and demo API removed |
| Assets | JSON-registered Normod photography/logo and public SVG fallback; no licensed brand fonts supplied |
| Configuration | React Compiler and Strict Mode already enabled; shadcn `rsc: false` |

These are the inspected versions, not instructions to upgrade. Recheck the manifest and local docs when implementation begins. Application folders were moved to `src/` during approved implementation.

## Required working order

1. Read this guide, PLAN.md, DESIGN.md, and the most recent CHANGELOGS.md entry.
2. Check Git status and preserve changes made by the user or another task.
3. Read installed Next.js guides relevant to the change before writing code. Some Pages Router files contain only a `source:` pointer: read the corresponding `01-app/` document and apply shared/`PagesOnly` sections, not App Router-only examples.
4. Plan approval was given on 2026-09-15. Continue authorized implementation/fixes without asking for it again. Deployment/publication is a separate user request.
5. Implement the next approved unchecked phase, keeping data, presentation, and state separate.
6. Verify the behavior appropriate to that phase. Mark only verified tasks `[x]`; record failures or deferred work beside the task.
7. Add a dated CHANGELOGS.md entry for every modification batch, including documentation/configuration changes. Keep DESIGN.md synchronized whenever style decisions change.

## Architecture contract

### Rendering and routing

- Use `getStaticProps` for every content page and `getStaticPaths` with `fallback: false` for product, collection, article, and editorial detail routes. Generate every published Turkish and English variant at build time.
- No `getServerSideProps`, runtime content API, ISR, database, CMS, Server Actions, App Router metadata API, or App Router middleware/proxy is needed for this scope.
- The runtime serves prebuilt pages and optimizes images. JSON edits require a rebuild/deployment; browser fetching must not become the primary content renderer.
- Configure locales `tr` and `en`, `defaultLocale: 'tr'`, and `localeDetection: false`. Turkish has no prefix; English uses `/en`. Avoid unsolicited language redirects.
- Use one route registry and stable entity IDs. Localized entity slugs must be resolved by ID when switching language; do not simply prepend `/en` to a Turkish product slug.
- Keep `/us/contact` and the five specified editorial topics within the physical `src/pages/us/` directory. PLAN.md contains the full route inventory.

### next-i18next v16 specifics

- Use `appWithTranslation` and `useTranslation` from **`next-i18next/pages`**.
- Import `serverSideTranslations` from **`next-i18next/pages/serverSideTranslations`** and call it inside `getStaticProps`, despite its name.
- The root `next-i18next` entry now targets App Router. Do not use older root-entry examples for Pages Router.
- Use shared `next-i18next.config.cjs` and pass the same locale settings to `next.config.ts`. Pass the config explicitly to both `appWithTranslation(App, config)` and `serverSideTranslations(locale, namespaces, config)`: the installed loader otherwise searches for `next-i18next.config.js`. Load translations from `public/locales/{locale}/{namespace}.json`; resolve build-time filesystem paths from `process.cwd()`.
- Wrap `_app` once with the translation provider; do not add `_app.getInitialProps`, which would compromise static optimization.
- Serialize only necessary UI namespaces and the route's localized view model. Do not preload every product, article body, and both languages into every page.

### JSON content and assets

- `content/` owns neutral registries, IDs, relations, asset addresses, source provenance, and machine-readable values. `public/locales/tr/` and `public/locales/en/` own all human-readable content, including entity records and UI namespaces.
- Human-readable names, descriptions, alt text, captions, specifications, SEO text, navigation labels, error/empty states, form labels, ARIA labels, and contact display text must exist in both languages.
- IDs, numbers, dimensions, phone targets, email addresses, source URLs, and dates are shared machine values; do not create contradictory copies merely to translate them. Their visible labels and formatted presentation are localized.
- All image, logo, font, icon-file, video/poster, map-image, and download addresses must resolve through the asset manifest, including files under `public/`. UI components receive asset IDs or resolved typed assets, never scattered URLs.
- Asset records include source kind, URL/path, width/height, provenance, usage, and `isPlaceholder`; localized asset records supply alt text/captions. Image replacement is a manifest edit followed by validation/rebuild.
- Use JSON-schema validation before builds for locale completeness, referential integrity, slug uniqueness, safe URLs, asset dimensions, and prohibited commerce fields. PLAN.md defines concrete schemas and editing workflows.
- Do not move visible strings into TypeScript constants as a workaround. TypeScript enums/constants are for repeated technical identifiers, translation keys, route keys, variants, and protocols. Framework-required filenames/default exports and HTML/schema vocabulary are legitimate code syntax.
- Blog MDX source also lives in localized JSON. Compile reviewed MDX at build time; components reference registered product/collection/asset IDs. Do not create a second authoritative copy of prose in `.mdx` frontmatter/files.

### UI, styles, and native browser behavior

- Keep shadcn/ui as the default source for basic components, adapting the existing Base UI preset rather than reinitializing the project or mixing presets.
- The user's native-platform directions determine the underlying behavior: `<dialog>` for modal gallery/mobile navigation; Popover API for non-modal menus/help; native `<select>` for sorting; semantic `<details>` for simple disclosures; CSS Grid and scroll snap for layouts/galleries.
- Reuse shadcn control styling and composition around these native primitives. Do not introduce Radix/Embla/Framer Motion/GSAP or a second modal/select system when native behavior covers the requirement.
- Do not force Shadow DOM/custom elements into ordinary React page components. They are appropriate only for a real encapsulation requirement; keep static content crawlable in the normal document.
- Newer CSS features (scroll-driven animations, view transitions, anchor positioning, base-select, masonry/Grid Lanes, field-sizing, scroll-state containers) are progressive enhancements. Unsupported browsers retain functional controls, readable content, and ordinary grids.
- DESIGN.md is the normative style specification. Generate shared token CSS from its structured token block; component variants and common layout primitives own repeated styles. Never hand-edit generated token output.
- Honor reduced motion; essential content starts visible without JavaScript. Do not animate the landing page's main image from hidden or delay its loading.
- Prefer small named components composed from focused children, minimal props, and dash-separated micro folders. Mandatory Next.js page/default exports are the exception.

### Zustand and hydration

- Create a typed vanilla store factory and provide one instance per rendered application tree from `_app`. Do not share mutable server/build state through a module singleton.
- Server and first client render use identical deterministic state. Do not read localStorage, viewport size, current time, or random values during initial rendering.
- URL parameters own shareable catalog filters/search/sort. Zustand coordinates client UI such as a mobile filter draft and gallery selection; do not store a duplicate content database or translated labels there.
- Native dialog/popover open state remains browser-owned unless another component genuinely needs to observe it. Avoid redundant `isOpen` copies that can drift.
- Use selective subscriptions, typed `createStore<State>()(...)`, and immutable updates. No persistence is required initially.

### SEO and media

- Use a single composed `PageSeo` component with `next/head`: localized unique title/description, canonical URL, `hreflang` links (`tr`, `en`, `x-default`), Open Graph, and social metadata.
- Place JSON-LD in the initial **head** markup as requested; keep scripts direct children of `Head`, stable-keyed and safely serialized (`<` escaped). Use schema vocabulary constants and content from validated JSON.
- Use WebSite/Organization, WebPage, BreadcrumbList, CollectionPage/ItemList, Product, Blog/BlogPosting, and ContactPage/FurnitureStore where appropriate. No fabricated offers, prices, stock, reviews, ratings, or local business details.
- A descriptive Product without offers/reviews can be valid Schema.org markup while being ineligible for Google's product rich results. Do not add fake data to satisfy a rich-result test.
- Use `next/image`, explicit dimensions/aspect ratios and accurate `sizes`. Restrict remote images to actually used Normod CDN paths. In this version `priority` is deprecated; use the documented `preload` or `loading`/`fetchPriority` strategy and do not combine conflicting settings.
- Keep build-only file loading, MDX compilation, validation, and large registries out of browser bundles. Lazy-load below-fold media and optional interactive modules.

## Normod research and source handling

### Cyprus showroom — rendered official page, checked 2026-09-15

Source: [Lefkoşa showroom detail](https://normod.com/pages/showroom-detail?handle=lefkosa-deneyim-merkezi), reached through [Normod showrooms](https://normod.com/pages/normod-deneyim-merkezlerimiz).

| Field | Official page value / handling |
| --- | --- |
| Name | Kıbrıs Deneyim Merkezi |
| Address | Hasane Ilgaz Sokak 11A, Lefkoşa 99010, Lefkoşa / Kıbrıs |
| Hours | Every day except Sunday, 10:00–18:00 |
| Phone display | 0533 889 28 23; verify international dialing target before release |
| Email | info@normodcyprus.com |
| Directions | [Official directions link](https://maps.app.goo.gl/VTDUrEpQ4ukm2BwH9) |
| Access note | Source describes a five-minute walk from Şehitler Meydanı |
| Parking | Source shows a dash; treat as unknown, not as available/unavailable |
| Photo | [Cyprus showroom image](https://normod.com/cdn/shop/files/kibris.png?v=1769436522&width=1200), loaded dimensions 1020 × 573 |

The page fills these values with JavaScript; the text-only fetch initially contained empty headings. The rendered browser page supplied the values above. Its generic review count/rating conflicts with the listing; omit ratings. The user subsequently confirmed the website domain, and the official source supplied coordinates (see implemented handoff below). Cyprus WhatsApp, international dialing target, local service policies and actual displayed product availability remain unconfirmed.

### Content references read

| Source | Reusable subject / constraint |
| --- | --- |
| [Normod homepage](https://normod.com) | Product families, room categories, modularity, customization, furniture imagery; strip commercial UI |
| [Inspiration](https://normod.com/pages/ilham-al-ve-kesfet) | Color/style-led room arrangements and collection discovery |
| [Why Normod](https://normod.com/pages/neden-normod) | Modular construction, materials, showroom experience; omit unsupported comparisons and Cyprus service promises |
| [Fabric samples](https://normod.com/pages/kumas-numunesi-iste) | Fabric families, colors, composition and care; use showroom inquiry instead of online sample ordering |
| [Comfort](https://normod.com/pages/normod-konforu) | Seating, foam, ergonomics and accessories; validate specifications per product/model |
| [Quality](https://normod.com/pages/kalite) | Frame, materials and manufacturing; do not transfer Turkey warranty/return terms to Cyprus |
| [Klem example product](https://normod.com/products/klem-280x171-moduler-kose-dogal-doku-ahsap) | Real product identity and reference for later detailed content seeding |
| [Marn example product](https://normod.com/products/marn-lake-orta-sehpa) | Coffee-table reference for later content seeding |
| [Carle collection](https://normod.com/collections/carle-koleksiyonu) | Verified family/collection reference |

Write concise original Turkish/English showroom copy from verified facts; do not mirror entire source pages, global reviews, promotions, or purchase processes. Preserve each record's source and verification date. A Normod product listing does not prove that item is on display in Cyprus.

## Technical resources read and applicable findings

| Resource | Application decision |
| --- | --- |
| [HAY](https://www.hay.com) | Layout and motion reference; full inspected-motion inventory and evidence boundaries live in DESIGN.md |
| [Next.js Pages internationalization](https://nextjs.org/docs/pages/guides/internationalization) | Built-in locale routing, locale-aware static paths and language switching; application supplies alternate links |
| [next-i18next README and translation files](https://github.com/i18next/next-i18next#2-translation-files) | `public/locales/`; use the installed v16 Pages subpath APIs rather than older examples |
| [shadcn llms.txt](https://ui.shadcn.com/llms.txt) | Component/guide index; individual component docs and installed code resolve stale generic summaries |
| [shadcn Next.js installation](https://ui.shadcn.com/docs/installation/next) | Continue the existing project; its App Router starter advice does not override Pages Router |
| [shadcn theming](https://ui.shadcn.com/docs/theming) | Shared semantic CSS-variable foreground/background pairs |
| [shadcn Tailwind configuration](https://ui.shadcn.com/docs/components-json#tailwind) | Keep Tailwind v4 config path empty, CSS variables enabled, `rsc: false`; update CSS/alias paths during src migration |
| [shadcn components](https://ui.shadcn.com/docs/components) / [Native Select](https://ui.shadcn.com/docs/components/native-select) | Use only necessary primitives; native select satisfies both component and browser requirements |
| [Zustand Next.js](https://zustand.docs.pmnd.rs/learn/guides/nextjs.html) | Provider-owned store, identical hydration state, appropriate store lifetime |
| [Zustand TypeScript](https://zustand.docs.pmnd.rs/learn/guides/advanced-typescript.html) | Curried typed creation; avoid reading `get()` while initializing state |
| [MDX compiler](https://mdxjs.com/packages/mdx/) | Accepts strings, enabling JSON-owned MDX; compilation/evaluation is build-only and restricted to trusted reviewed content |
| [FurnitureStore schema](https://schema.org/FurnitureStore) / [Google Product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) | Local store schema and the distinction between semantic markup and rich-result eligibility |
| [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) / [animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) | Progressive enhancement; a cross-document CSS rule does not animate Next.js client navigation by itself |

Local documentation read: `02-pages/02-guides/internationalization.md`, `02-pages/04-api-reference/03-functions/get-static-props.md`, `get-static-paths.md`, `02-pages/04-api-reference/01-components/head.md`, and the `01-app/` sources referenced by the Pages image, static-export, and MDX guides. The static-export example was researched before the user's clarification; it is not the chosen architecture. The Next.js managed-rule generator was verified at `node_modules/next/dist/server/lib/generate-agent-files.js`.

## Completion standards

- Run content validation, typecheck, ESLint, focused behavior tests, and production build. Add browser checks for localized navigation, native controls, filters, gallery, contact links, and metadata.
- Check 320, 390, 768, 1024, and 1440 px layouts, keyboard behavior, reduced motion, and a no-JavaScript reading/navigation baseline. Test modern Chromium, Firefox, and WebKit where tooling is available.
- Use the per-page performance/SEO acceptance criteria in PLAN.md. Report measured results; do not promise perfect search ranking, unmeasured Core Web Vitals, or universal animation support.
- No implementation, dependency installation, deployment, or code restructuring occurred in the research/planning task.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Implemented handoff — 2026-09-15

- See README.md for commands and JSON editing workflows. Build preparation validates content and generates design/SEO output. Zod schemas are in src/lib/content/schemas.ts; editor schemas are generated into content/schemas/.
- Run pnpm lint, pnpm typecheck, pnpm test and pnpm build after functional changes; use pnpm assets:check after registry edits. With a production server running, pnpm audit:production crawls all sitemap routes and writes reports/production-audit.json.
- Site origin was explicitly confirmed by the user: https://www.normodcyprus.com. Keep content/config/site.json isIndexable false for preview. Do not claim deployment or enable public indexing without a publication request.
- The two JSON MDX articles remain unpublished because no verified author credit was supplied. Publishing requires neutral author type, both localized author records, an actual date and isPublished true. Do not invent author/date values.
- The official showroom source now also verifies latitude 35.183864, longitude 33.357587. The local-format phone is displayed; an international tel target and Cyprus WhatsApp remain unconfirmed. Email and official directions are available.
- Browser verification used the in-app surface. Reports explicitly do not claim Lighthouse, axe, field Core Web Vitals, multi-engine, OS reduced-motion emulation or 200% zoom results. Do not convert those pending plan boxes to done without performing the corresponding checks.
- Keep new mutable UI data in JSON. Do not put source URLs or prose in components, fetch product content at runtime, add commerce schema, or switch to App Router/static export.

## Measured rebuild maintenance

- `content/config/presentation.json`: product collage slots, collection spans/frame, menu preview. Product records own media frame/hover colors/detail ratio; home owns six tile placements/targets/captions. Editorial sections own images, offsets and optional destinations; store owns its gallery. Validate all changes.
- `src/components/media/media-frame.tsx` and `src/lib/design/layout.ts` centralize ratio/focal-point and responsive size handling. `src/styles/globals.css` owns shared page/component geometry; `motion.css` owns motion.
- Navigation uses native Popover; product specifications use details; gallery/filter overlays use dialog. Product gallery stays below the faithful primary two-panel composition.
- MDX PhotoPair accepts literal registered `left`/`right` image IDs. Drafts are reviewable in `next dev` only; normal builds require verified author/date and keep drafts404. Translation JSON reloads on prerender only during development.
- `pnpm typecheck` uses a fresh non-incremental TypeScript pass; `moduleDetection: force` isolates generated Pages validator declarations when `.next/types` and `.next/dev/types` coexist. No source diagnostics are suppressed.
- If local watchers hit EMFILE, use `WATCHPACK_POLLING=true pnpm exec next dev --webpack --hostname 127.0.0.1 --port 3001`. Do not change OS limits or user settings to work around it.

## Homepage fidelity regression guard — 2026-09-15

- Read DESIGN.md section5's screenshot correction before changing home cards. Grid columns switch at640px; home vertical spacing switches at1024px; caption side padding switches above1300px. Do not combine those breakpoints.
- Home portrait photography must cover its frame. Use concise localized captions and keep the decorative slash with the final word; inspect text bounds at640px and679px in Turkish as well as English. Document-level overflow checks alone missed the original defect.
- Keep the real Normod wordmark with the black masthead treatment. Update PLAN.md14.9 and CHANGELOGS.md for this correction.
