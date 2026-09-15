# Changelogs

All repository modification batches must receive a dated entry here. State what changed, why, and what was verified. Record unfinished work and limitations honestly.

## 2026-09-15

### Planning initialization

- Expanded AGENTS.md with the project scope, user-authority rules, approval gate, and references to PLAN.md, DESIGN.md, and this changelog.
- Created PLAN.md with completed preparation tasks and pending research/approval checkboxes.
- Created this change history. Preserved the existing Next.js managed instruction block and DESIGN.md defaults.
- Verification: inspected the clean Git worktree, Pages Router starter, dependency manifest, shadcn configuration, and installed Next.js documentation directory. No application code or dependencies changed.

### Research and architecture plan

- Expanded AGENTS.md with installed-version findings, next-i18next v16 Pages imports, JSON/localization contracts, native/shadcn composition, state/SEO requirements, and source references.
- Incorporated the user's clarification: use ordinary Pages Router, pre-rendered content, built-in locale routing and Next.js image optimization; static export is not required.
- Replaced the outline in PLAN.md with routes, repository ownership, structured JSON records, JSON-owned MDX, page behavior/SEO/performance criteria, and twelve implementation phases with checkboxes.
- Verified the official Lefkoşa showroom's rendered address, hours, local phone, email, directions and photo. Recorded unknown phone normalization/WhatsApp/domain/policies and omitted conflicting template ratings.
- Read every supplied resource and applicable installed Next.js guides. Inspected HAY desktop/mobile homepage and loaded motion rules; recorded source-only/unverified interaction limits.
- Application implementation remains pending explicit plan approval. No source code, dependency installation, package version or deployment changes are included.

### Design reference and motion specification

- Preserved DESIGN.md's original design language and added proposed responsive, fallback-font and motion tokens.
- Added a grouped inventory of the HAY homepage's loaded animation/transition rules, including responsive variants, shared UI/legacy families and separately identified third-party widget motion.
- Distinguished observed layouts from stylesheet-only behavior; documented direct source-fetch 403 responses and the unverified expanded-menu/product interaction scope.
- Specified native browser adaptations, reduced motion, visible initial content, static image-loading priorities, shared token generation and JSON-only asset registration.
- Added source links/status for the verified Cyprus photo, source Normod logo and candidate imagery. No media files were downloaded into the application.

### Planning verification

- Verified the next-i18next loader's default `.js` configuration filename and documented explicit configuration passing for the proposed `.cjs` file.
- Checked local Markdown links, balanced code fences, final newlines, valid DESIGN.md YAML frontmatter and the single preserved Next.js managed instruction block.
- `git diff --check` passed. Only AGENTS.md, PLAN.md, DESIGN.md and CHANGELOGS.md are changed/new; application files and the lockfile are unchanged.
- Completed the planning-review checkbox. User approval and all implementation/website-verification tasks remain pending. No application tests or build were run for these documentation-only changes.

### Approved implementation — foundation

- Recorded user approval and began the twelve implementation phases.
- Moved application folders into `src/` and updated TypeScript/shadcn paths together.
- Rechecked installed framework and Pages Router guides. Application validation follows after the foundation is connected.

### Content, shared UI and page implementation

- Added structured bilingual JSON, 12 sourced products, three collections, the Cyprus contact record, five editorial topics and two unpublished article drafts. Recorded the user-confirmed production origin.
- Added build-time content loaders, localized-slug resolution, provider-owned Zustand state and explicit next-i18next Pages configuration.
- Generated design tokens from DESIGN.md, installed shadcn input/native-select/breadcrumb/separator, and composed native overlays, gallery and filters.
- Implemented landing, contact, catalog, collection/product details, editorial pages, errors, blog templates, build-only MDX and page-specific SEO.
- Verification in progress: initial typecheck/build and content tests follow. Blog publication credits and international telephone target remain unconfirmed.

### Verification and refinements

- Production build generates 50 published Turkish/English routes; 17 content, route, filter, serialization and MDX tests pass.
- HTTP audit passed all routes: unique titles, canonical/reciprocal alternates, language, initial-head schema, internal links, no commerce payload, real 404/500 statuses.
- Scoped build filesystem reads to content/locales directories to eliminate a whole-project tracing warning; ESLint and TypeScript are clean.
- Verified native mobile filters, locale switching, gallery arrows/Escape/focus return. Checked 78 responsive route/width combinations without document overflow or broken visible images.
- Corrected Marn image dimensions and showroom alt text. Replaced a Turkish promotional product image with a text-free fabric detail. Added newly verified showroom coordinates from the official source record.
- Measured representative initial JavaScript at 170–186 KB gzip; optimized hero responses are 11 KB at 640px and 65 KB at 1920px (AVIF). These are transfer measurements, not Lighthouse or field Core Web Vitals.

### Final implementation handoff

- Added strict site/contact validation, generated 12 editor schemas, checked literal UI translation keys in both languages and made product descriptions unique for SEO.
- Verified Turkish search/reset, browser back/forward, translated product routes and gallery reset. Retained the confirmed production domain, preview noindex and two unpublished MDX articles awaiting author/date details.
- Formatted application code and documented run commands, JSON editing, publishing, design adaptations and verification limits in README.md, AGENTS.md, DESIGN.md, PLAN.md and reports/verification.md.
- Final verification: production build, TypeScript, clean ESLint, 18 focused tests and formatting pass. A fresh production-server crawl passed all 50 routes, including unique titles/descriptions, localized links and head schema. All 30 assets passed response/dimension checks.
- Remaining release QA is explicitly unchecked in PLAN.md. No deployment or indexing change was made.
- Opened the verified local production preview for review and linked the handoff evidence.

### Deep HAY design audit — user-requested fidelity correction

- Inspected 14 representative HAY URLs covering home, collection banners/collages, product model/variant, news/article, inspiration/detail, contact/offices, store locator/store detail and search. Measured desktop/mobile page structures and a 10-width homepage media matrix.
- Exercised desktop product/editorial/news hover, compact-header restoration, mobile menu expansion, product information disclosure and news category/load-more. Distinguished settled computed values from generic or inactive bundled CSS.
- Replaced DESIGN.md's approximate design narrative with measured container geometry, independent breakpoints, card sizes, typography, page compositions, controls and a comprehensive inspected motion-family inventory. Corrected the live news hover to opacity0.4 with its generic EXAMINE circle hidden, and confirmed the homepage hero's opacity0.4 hover.
- Added reports/design/hay-measurements.json and archived the earlier design under reports/design/initial-design-superseded.md. Preserved the parsed YAML token values and all runtime files so this research batch does not silently alter the website.
- Updated AGENTS.md's design authority, corrected PLAN.md's visual-completion claims and added a detailed unchecked Phase 14 rebuild with measurable acceptance criteria. Existing functional/SEO checks remain historical evidence, not pixel-perfect acceptance.
- Documented remaining evidence limits, licensed-font availability and the need for additional genuine Cyprus store photos. No application implementation, dependency, indexing or deployment change is included.
- Verification passed: local documentation links, JSON/YAML parsing, unchanged parsed token values, 10 measurement rows, preserved Next.js instruction block, balanced code fences and `git diff --check`. Visual acceptance tasks remain unchecked; no application build or browser comparison of a new implementation is claimed.

### HAY design implementation — data foundation

- Began the explicitly requested visual rebuild. Read installed Pages Router image/link/CSS/static-props guides and retained the existing rendering/localization architecture.
- Added validated responsive tile placement, media-frame and per-product hover color contracts, authored the six-tile homepage and six-slot catalog collage in JSON, and added bilingual captions/control labels.
- Added editorial photo/placement records using existing sourced Normod placeholders. Store photography and licensed font gaps remain documented; no store imagery or business facts were invented.
- Implementation is in progress; content validation follows after loaders and consumers are migrated together.

### HAY design implementation — shared UI and page families

- Migrated DESIGN.md's generated tokens to measured geometry, sharp corners, serif typography roles, 70/130/55px headers and 90px motion travel. Responsive image sizing derives from generated geometry.
- Rebuilt header/menu/footer, six-tile landing, full-width collection banners, authored product collages, three distinct card treatments and equal adjacent product panels with inline details.
- Moved the existing keyboard-accessible gallery below the primary product composition. Added responsive editorial photo/text rows and JSON-owned MDX photo pairs; contact keeps the genuine store photo's natural ratio.
- Preserved native popovers, details, dialogs, selects, URL filters and provider-owned Zustand. Timed reveals use native IntersectionObserver with visible initial/no-JS content; no motion or masonry library was added.
- Initial validation identified that standalone MDX image compilation lacks Next's injected image configuration. Added a registry-backed image loader using the existing Next optimization endpoint. Verification continues with type checks, production build and browser comparisons.

### HAY design implementation — verification fixes

- Fixed contact photo props, retained the showroom photo's natural proportions, blended product cutout backgrounds into the shared panel and corrected hover-label contrast.
- Added validated focal-point bounds and presentation/menu target joins; removed obsolete alternate-image card payloads. Responsive image sizes now derive from generated design breakpoints.
- Added a CSS multi-column masonry fallback and desktop language utility. Native Grid Lanes/masonry remains progressive enhancement.
- Added development-only draft article/list previews with explicit localized labels, no fabricated author/date and forced noindex. Production paths still exclude drafts. Added three meaningful tests for presentation validation, safe photo pairs and unpublished preview behavior; 21 tests pass.
- Set TypeScript module detection to force so Next 16.3's development and production generated Pages validators do not collide in global scope. Dev inspection uses webpack polling after the default watcher exceeded the environment file limit.


### HAY design implementation — settled-state correction and final handoff

- Corrected the earlier category audit after HAY's masonry finished: collection cards use two mobile/three desktop columns. Matched1390:800 tile frames and fixed category navigation; kept the distinct2000:1151 home hero.
- Replaced the inspiration column fallback with JSON-authored Grid placements so visual and DOM order remain predictable. Added offset MDX photo pairs. Enabled translation JSON reload during development.
- Completed responsive/native-control browser checks, measured desktop/mobile box comparisons, settled product/news hover, bilingual editorial/store/product checks and private article previews. Documented source font/photo and tooling limits instead of claiming full raster equality.
- Passed production build54 documents,21 tests, strict TypeScript, ESLint, formatting, content/UI validation and50-route production audit with0 errors. Confirmed draft production routes404 and unchanged noindex/canonical settings.
- Updated AGENTS.md, DESIGN.md, PLAN.md checkboxes, README.md and verification reports. Historical audit/first-build entries remain as change history; the new settled-state correction supersedes their full-width category claim.
- Kept a local production preview available. No deployment, publication, indexing change or external message was performed.

- Final loading refinement: mark the masthead and the first visible collection/product/inspiration row eager so the large desktop collage tile does not wait for lazy-image scheduling. Below-fold gallery and related products retain lazy loading.

### Homepage screenshot correction — 2026-09-15

- Re-inspected HAY at the reported 679px viewport and confirmed the compact homepage caption padding and 20px row gap continue through 1023px. Corrected the previous 640px spacing switch while preserving the three-column media grid from 640px.
- Replaced the Klem homepage cutout with its existing sourced upholstery-detail photograph in a cover frame. All three portrait tiles now fill the same 910:1100 frame.
- Shortened Turkish/English collection captions in JSON and joined the decorative slash with a nonbreaking space. Contained heading margins inside the tile link so row spacing remains measurable.
- Restored black masthead contrast using the registered Normod logo. Short Turkish “serisi” captions avoid a long unbreakable word extending outside narrow cards; full collection records are unchanged.
- Applied the verified compact padding to shared editorial/collection captions and kept shared tile row gaps at20px until1024px. Both home and HAY Sofas category source styles confirm these rules.
- Passed26 homepage and36 related-page responsive typography checks: no text extending more than1px outside a heading, no stranded slash, no positive document overflow. At679px, the first portrait frame and caption start match the measured HAY positions exactly. Production build,21 tests, strict TypeScript, lint, formatting, content/UI checks and50-route audit pass. Refreshed the existing3002 production preview and reset temporary browser viewport overrides.
