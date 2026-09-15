# Normod Cyprus — Implementation Plan

## 1. Status, scope, and approval

**Status: approved implementation completed for local review, 2026-09-15. Release QA and owner-supplied publication details remain tracked below.**

Implement all twelve phases below. Release-specific unknowns remain tracked separately.

**Confirmed clarification, 2026-09-15:** use Next.js Pages Router; **static export is not required**. Content pages will be generated at build time and served by the normal Next.js runtime. Do not add `output: 'export'`, a manual `[locale]` route tree, or App Router.

### Preparation

- [x] Inspect the repository, Pages Router starter, packages, shadcn configuration, public assets, and DESIGN.md.
- [x] Expand AGENTS.md and create PLAN.md and CHANGELOGS.md before application work.
- [x] Read every supplied technical resource and the five supplied Normod editorial pages.
- [x] Read applicable installed Next.js documentation and shared sources behind Pages Router stubs.
- [x] Verify and preserve the generated Next.js instruction block.
- [x] Inspect HAY desktop/mobile homepage and loaded stylesheet motion families; record evidence limits.
- [x] Find the official Cyprus showroom and read its rendered contact details and photo.
- [x] Record API changes, source links, content constraints, and handoff rules in AGENTS.md.
- [x] Define architecture, data contracts, routes, delivery phases and acceptance criteria below.
- [x] Verify final consistency of all four documents and prepare them for approval review.
- [x] Receive explicit approval of the completed plan.

### Outcome and priorities

Build a Turkish-first furniture showroom with English support and HAY's image-led editorial layout. Visitors discover products and collections, understand materials and comfort, and find/contact the Cyprus store. All content and asset addresses are edited through structured JSON. No prices or online purchasing functionality are included.

| Priority | Deliverables |
| --- | --- |
| High | Shared header/footer, landing, contact, localization/data foundation |
| Medium | Collections listing/detail; products listing/detail; filters and gallery |
| Low | Blog listing/MDX articles; inspiration, why Normod, fabrics, comfort and quality under `/us` |

Priority determines order, not exclusion. All requested page families are in the final scope.

## 2. Architecture decisions

| Area | Contract |
| --- | --- |
| Framework | Existing Next.js 16.3.5, React 19.2.8 and strict TypeScript; Pages Router |
| Rendering | `getStaticProps`; complete `getStaticPaths`, `fallback: false`; normal Next.js deployment |
| Languages | `tr` at unprefixed URLs; `en` at `/en`; `localeDetection: false` |
| Localization | next-i18next v16 **Pages subpath APIs**; localized JSON in `public/locales/` |
| Data | Git-owned JSON, build-time validation and typed view models; no database/runtime content service |
| Blog | MDX syntax inside localized JSON, compiled at build time; allowlisted editorial components |
| UI | Existing shadcn Base UI preset with native browser behavior where requested |
| State | Provider-owned Zustand for shared transient UI; URL for committed catalog filters |
| Styling | DESIGN.md tokens → generated CSS; reusable shadcn variants/layout primitives |
| Media | Asset registry for Normod URLs/public files; Next.js image optimization |
| SEO | Per-page `next/head`, initial-head JSON-LD, locale alternates, generated sitemap/robots |
| Conversion | Store contact, directions, phone/email; WhatsApp only after verifying a local destination |

No cart, pricing, checkout, accounts, order processing, stock claims, online sample orders, fake reviews, unconnected forms, newsletter capture, CMS, or paid integrations. There is no need for `getServerSideProps`, ISR, Server Actions, or content API routes. JSON content edits require rebuild/deployment.

### Missing information and release handling

These do not block implementation after approval. Use the interim behavior rather than inventing facts.

| Item | Evidence | Interim behavior / release requirement |
| --- | --- | --- |
| Final domain | User confirmed https://www.normodcyprus.com during implementation | Use canonical origin; preview remains noindex until publication |
| Store contact | Official page supplies address, hours, local phone, email, directions | Seed sourced values; verify current details and international phone target before release |
| WhatsApp | No Cyprus-specific WhatsApp destination verified | Omit; email, directions and verified phone remain available |
| Coordinates | Official directions short link exists | Use link; omit `geo` and map embed until coordinates are verified |
| Local policies | Source includes Turkey commercial terms | Omit Cyprus warranty, returns, delivery and sample-shipping promises until confirmed |
| Local assortment | Real Normod product families exist | Curate representative products without on-display/in-stock claims; owner reviews assortment |
| Fonts | DESIGN.md names proprietary fonts; files not supplied | Use documented system fallbacks until licensed webfonts are provided |
| Local branding | Only starter icons currently exist locally | Register source Normod logo provisionally; replace favicon/social artwork with approved assets |
| Photography | Normod assets and a Cyprus showroom photo found | Track source, dimensions and placeholder state; review final replacements |

## 3. Route and navigation inventory

Fixed section paths are shared across languages; their visible names are localized. Entity slugs live in localized JSON and may differ. Build links from a route key, locale and stable entity ID, never by string-matching names.

| Page | Turkish URL | English URL | Priority |
| --- | --- | --- | --- |
| Landing | `/` | `/en` | High |
| Collections | `/collections` | `/en/collections` | Medium |
| Collection detail | `/collections/{slug}` | `/en/collections/{slug}` | Medium |
| Products | `/products` | `/en/products` | Medium |
| Product detail | `/products/{slug}` | `/en/products/{slug}` | Medium |
| Blog | `/blog` | `/en/blog` | Low |
| Article | `/blog/{slug}` | `/en/blog/{slug}` | Low |
| Contact | `/us/contact` | `/en/us/contact` | High |
| Inspiration | `/us/ilham-al-ve-kesfet` | `/en/us/inspiration` | Low |
| Why Normod | `/us/neden-normod` | `/en/us/why-normod` | Low |
| Fabric samples | `/us/kumas-numunesi-iste` | `/en/us/fabric-samples` | Low |
| Comfort | `/us/normod-konforu` | `/en/us/comfort` | Low |
| Quality | `/us/kalite` | `/en/us/quality` | Low |
| Not found | Unknown URL, HTTP 404 | Unknown `/en/...`, HTTP 404 | Supporting |

Implement explicit `src/pages/us/contact.tsx` and `src/pages/us/[slug].tsx` for exactly the five registered editorial topics. Reserve `contact` against dynamic slug collision. A separate `/us` landing page is not required.

- Header: home/brand link, product and collection discovery, inspiration/blog/about discovery, prominent store/contact action, locale switch and catalog search entry.
- Desktop navigation can use a non-modal native popover. Mobile navigation uses a native modal dialog with nested semantic disclosures.
- Search entry links to `/products`; enhancement can focus its search field. The ordinary link works without JavaScript; no extra search route is required.
- Footer: localized catalog and `/us` links, brand, store contact, known social profiles, language switch. No empty links or invented profiles.
- Breadcrumbs: home → section → entity. Collections link to members, products to collections, and editorial/article blocks to registered IDs.
- Locale switching resolves the same entity's translated slug and preserves valid committed filters. Missing translation is a build error, not a silent redirect to unrelated content.
- Keep fixed section directory names stable; do not add rewrites solely to translate directory names.

## 4. Repository ownership and component structure

Move the existing application folders into `src/` together after approval, updating aliases and shadcn CSS paths in the same batch. Keep root configuration, `content/`, `public/`, and project documents at the root. Never leave both root `pages/` and `src/pages/` active.

```text
AGENTS.md / CHANGELOGS.md / DESIGN.md / PLAN.md / README.md
components.json / next.config.ts / next-i18next.config.cjs
package.json / pnpm-lock.yaml
content/
  config/site.json                # locale/origin/features/build configuration
  config/navigation.json          # ordered route references and label keys
  config/routes.json              # route templates, namespaces, reserved slugs
  assets.json                     # single address/dimensions/provenance registry
  taxonomy.json                   # category/material/fabric/color IDs
  store.json                      # verified contact targets, hours and sources
  collections/{id}.json
  products/{id}.json
  pages/{id}.json                  # ordered typed section descriptors
  posts/{id}.json                  # author/category/date/publication metadata
  authors.json
public/
  locales/
    tr/
      common.json / navigation.json / catalog.json
      home.json / contact.json / us.json / blog.json / errors.json
      brand.json / store.json / assets.json / taxonomy.json / authors.json
      products/{id}.json
      collections/{id}.json
      pages/{id}.json
      posts/{id}.json              # includes bodyMdx
    en/                           # equivalent required keys and entity coverage
  images/ / brand/ / fonts/        # actual owner-supplied local assets
  sitemap.xml / robots.txt         # generated, not hand-maintained
src/
  pages/
    _app.tsx / _document.tsx / index.tsx / 404.tsx / 500.tsx
    collections/index.tsx / [slug].tsx
    products/index.tsx / [slug].tsx
    blog/index.tsx / [slug].tsx
    us/contact.tsx / [slug].tsx
  components/
    ui/                           # shadcn source/native primitive adaptations
    layout/site-header/ / site-footer/ / page-container/
    media/ / seo/ / content/       # shared primitives, not page-specific logic
  features/
    home/ / catalog/ / product/ / contact/ / editorial/ / blog/
  lib/
    content/                      # build-only schemas, loaders, selectors, models
    i18n/ / routes/ / seo/ / media/ / mdx/
    utils.ts                      # existing cn helper
  providers/showroom-store-provider.tsx
  stores/showroom-store.ts
  styles/
    globals.css                   # imports and base layers
    generated/tokens.css          # generated from DESIGN.md
    motion.css / typography.css
scripts/
  validate-content.ts / generate-content-schemas.ts
  generate-design-tokens.ts / generate-seo-files.ts / check-assets.ts
schemas/                          # generated JSON Schema editor artifacts
tests/content/ / tests/e2e/
```

Create files/folders as they become necessary; do not populate unused scaffolding.

### Component micro structure

Example `features/product/product-gallery/`: `product-gallery.tsx`, `gallery-thumbnails.tsx`, `gallery-dialog.tsx`, and `use-product-gallery.ts` only when coordination needs a hook. Add `types.ts` only for shared types and a focused test for real behavior.

- Named component exports; mandatory Next.js route/default exports are the exception. Route files may default-export named page components.
- Route files orchestrate data. Feature components compose views. UI primitives receive labels/slots and know nothing about the catalog.
- A card receives a small `ProductSummary` and destination, not the whole database or many mode booleans.
- Compose `Section`, `SectionHeading`, `SectionMedia`, `SectionBody`, and `SectionLink`; avoid a universal many-prop section component.
- Keep lowercase dash-separated application filenames and auxiliary-verb boolean names. Keep required `_app`, `_document`, `[slug]`, and root document filenames.
- Share helpers after real reuse appears; avoid both copied style strings and premature abstractions.

## 5. JSON, localization and assets

### 5.1 Data layers

1. **Neutral JSON** owns IDs, relationships, numbers, dimensions, contact targets, asset/source URLs, dates and ordering.
2. **Localized JSON** under `public/locales/tr/` and `public/locales/en/` owns every human-readable string.
3. **Build-time view models** join and select those records for one page. They are generated values, not editable duplicate content.
4. **UI namespaces** load through next-i18next. Large localized entity files load through typed locale-aware loaders and become page props; do not turn the whole catalog into every page's translation bundle.

Every record has a stable ID/schemaVersion. Use `isPublished`, `isPlaceholder`, and similar boolean names. IDs survive name/slug changes.

### 5.2 Record contracts

| Record | Neutral fields | Localized fields |
| --- | --- | --- |
| Site/brand | locales, primary locale, origin, enabled features, build values | site/brand names, global description, title template |
| Asset | id, kind, URL/public path, dimensions, variants/poster IDs, usage, source/checked date, placeholder flag | alt, caption, credit, accessible description |
| Product | id, categoryId, collectionIds, galleryAssetIds, numeric dimensions/unit codes, material/fabric/color IDs, related IDs, publication/source | slug, name, summary, description blocks, care/prose specs, SEO |
| Collection | id, hero/gallery IDs, featuredProductIds, publication/source | slug, name, summary, narrative, SEO |
| Taxonomy | IDs, relationships, optional swatch hex/technical values | name, description, filter label, care copy |
| Store | targets, opening intervals, directions, verified coordinates if known, image IDs, per-field provenance | display address/name/hours/access text, introductions and labels |
| Editorial | id, ordered typed sections/references, publication/source | slug, heading, section copy, CTA labels, SEO |
| Article | id, author/category IDs, cover ID, dates, related IDs, publication state | slug, title, excerpt, bodyMdx, SEO |
| Navigation | id, route key/entity reference, children, order | labels/accessible names through translation keys |

Format dimensions with locale-aware numbers and localized units; do not duplicate measurements per language. Unknown values are omitted/null where allowed, never made-up or zero.

Product membership is owned by `product.collectionIds`. Collection lists are derived, with `featuredProductIds` as explicit editorial ordering only. Validate featured IDs are members. Related products use explicit IDs or deterministic same-category/collection selection, not randomness.

### 5.3 Asset contract

- Use a discriminated `remote` HTTPS URL / `local` public path source. All image/logo/font/icon-file/video/poster/map-image/download addresses go through this registry.
- Record actual dimensions and provenance. UI crop/aspect ratio belongs to reusable media presets; product cutouts use contain, lifestyle images use approved cover crops/focal points.
- Mobile art direction/responsive variants may refer to other asset IDs. Placement decides `sizes`/loading strategy, not repeated asset copies.
- Register a local fallback and localized accessible message. On image failure, replace once without a retry loop/layout shift.
- Register the verified Cyprus photo and source Normod logo. Inspect additional candidate images before using them; a source URL alone does not verify crop, text overlays, or subject suitability.
- Replacement workflow: edit one manifest record → update both alt/caption records if the subject changes → validate path/URL/dimensions → inspect affected crop → rebuild. Components remain unchanged.
- Keep deterministic content validation separate from remote-response checks; transient network failures must not be mislabeled as schema errors. Check changed images during work and all images before release.

### 5.4 Strings and translation policy

- No visible JSX literals, translation `defaultValue` prose, hard-coded SEO, raw asset URLs, inline label arrays, or repeated contact text in components.
- JSON includes skip links, menu/gallery controls, counts, filter summaries, error/empty messages, image fallback text, form labels and ARIA announcements.
- Use i18next interpolation/plurals and `Intl` for dates/numbers. Test Turkish dotted/dotless I in search/casing.
- Shared machine values do not need artificial translation. Their visible labels/presentation do. Code vocabulary such as HTML attributes/schema types, CSS classes, protocols and mandatory framework filenames is implementation syntax.
- TypeScript constants/enums are for repeated technical IDs, route keys, translation keys and variants; moving prose to constants does not satisfy the JSON requirement.
- Turkish fallback is resilience; complete English content remains a publication requirement. Build both languages for every published entity.
- Public locale files are public data. Keep secrets/embargoed drafts out of them. The included sample drafts are complete in both languages and safe to read publicly; `isPublished: false` excludes their pages and sitemap entries, not their JSON URLs.

### 5.5 Validation requirements

Use Zod as the single schema source, infer TypeScript types from it, and generate JSON Schema for editor assistance. Do not hand-maintain three competing schema/type definitions. Keep validation tools out of client bundles.

- [x] Validate the global schema version, record shapes, product/asset ID consistency, route uniqueness and mandatory fields.
- [x] Require both languages and all text/SEO/alt keys for published records; audit literal UI translation keys in both namespaces.
- [x] Reject empty required entity translations, duplicate locale/route slugs and reserved-slug collisions.
- [x] Validate navigation, section, taxonomy, product, collection, post and asset references.
- [x] Reject commerce fields and unsupported stock/rating fields in publishable records; audit rendered payloads as well.
- [x] Validate safe HTTPS/public asset paths, allowed URI schemes, dimensions and path traversal prevention.
- [x] Validate opening-hour intervals, real dates and required article publication details. An article update date is not currently supported; strict schemas reject extra fields.
- [x] Validate section types and MDX component names/attributes before compilation.
- [x] Fail builds with actionable content errors: schema errors include filename/JSON path (locale is in the filename); reference errors identify the affected record/ID.

## 6. Rendering, state and discovery behavior

### Build-time page pipeline

`getStaticProps(locale, params)` → guard locale and resolve stable entity ID → load neutral/localized records → resolve needed assets/links → build page SEO/schema → load required UI namespaces → return serializable props → render complete HTML.

Build every published `(slug, locale)` pair with `fallback: false`. Validate locale-specific resolution and use `notFound` for invalid records. Do not fetch Normod for content during normal builds: curated JSON is authoritative. Next.js's image optimizer can request registered source images independently.

Load common/navigation plus page-specific UI namespaces (`home`, `contact`, `catalog`, `us`, `blog`, `errors`) only where used. Select related entity summaries by ID. No article bodies in blog-list props or whole-catalog detail data on product pages.

### Zustand responsibilities

Use `createStore<ShowroomState>()(...)`, one provider-owned instance per app render tree, and selective hooks. Server and first client state must match. Do not read storage, random values, current time or viewport dimensions during initial rendering.

Initial shared state:

- Mobile filter draft selections until Apply; Reset restores the URL-derived baseline.
- Gallery selected image index shared by thumbnails and expanded gallery; reset on product ID change.
- Clear transient state on relevant completed route changes. Locale/content/metadata/translations and filtered results remain derived outside the store.

Native dialogs/popovers own open/close state unless another component truly needs to observe their native events. Do not maintain conflicting DOM and Zustand `isOpen` copies. Persistence is unnecessary initially.

### Catalog query contract

- Recognized keys: `q`, `category`, `collection`, `material`, `sort`. Filter values are stable IDs; query text is user input. Use one typed parser/serializer and one multi-value encoding.
- Default editorial sort; optional localized alphabetical sort with `Intl.Collator`. No price sorting.
- Search localized names, summaries, category and collection names with Turkish-aware normalization. No heavy search service/library for the small seed catalog.
- Render the same unfiltered content during static rendering and first hydration. Apply validated query state after `router.isReady` to avoid hydration mismatch.
- Desktop filters commit with shallow URL updates; mobile Apply commits drafts. Back/forward restores controls/results.
- Show localized count, reset and useful empty results. Announce settled results, not every keystroke.
- Query variants canonicalize to the clean listing. Do not create crawlable filter-query permutations or rely solely on client-updated robots tags for indexing policy.
- Render all initial catalog cards. Introduce real paginated routes only if catalog size requires them; avoid infinite scrolling that hides basic discovery.

## 7. Page composition

### Landing — high

1. Shared navigation with centered Normod identity.
2. Dominant lifestyle image, short localized heading and discovery link; image is immediately visible and the primary LCP candidate.
3. Broad and paired editorial image modules from ordered JSON sections; vary proportions while preserving clear reading order.
4. Featured collection and restrained product selections linking to real detail routes.
5. Concise materials/modularity story linking to `/us` topics.
6. Cyprus showroom invitation with the actual showroom photo and contact route.
7. Small article preview once published blog content exists; omit cleanly before then.
8. Shared footer.

Keep campaign ordering in JSON. No autoplay hero carousel or invented promotion. Mobile captions sit in document flow rather than depending on hover.

### Contact — high

- Showroom title/intro, sourced address, real directions link, email and verified phone actions.
- Static localized opening intervals; no live open-now badge without confirmed timezone/holiday rules.
- Actual showroom photo; extend gallery only with further verified/supplied local images.
- Sourced access note; omit unknown parking and conflicting source-template ratings.
- Use contact actions instead of an unconnected submission form. No map SDK is needed initially; the official directions link already serves the task.
- ContactPage/FurnitureStore schema and visible content read the same store model.

### Collections — medium

- Listing: introduction and image-led collection cards with consistent accessible link areas.
- Detail: name, story/hero, product grid derived from membership, related editorial block where useful, store invitation.
- Keep collection families distinct from product categories. No membership inferred from text matching.
- Exclude unpublished/empty collection routes or provide an intentional preview empty state.

### Products — medium

- Listing: heading/intro, native search/filter/sort, count, responsive product grid, reset/empty state.
- Detail: breadcrumbs, gallery/thumbnails, title/prose, known dimensions/materials, fabric/color references, care disclosures, related products and store CTA.
- Gallery uses native overflow/scroll snap, thumbnails, previous/next controls when useful and expanded native dialog. No carousel dependency.
- Fabric/color alternatives are informational; update media only when a matching registered image exists. Do not invent a full configurator or stock states.
- A product email inquiry can include JSON-derived name/URL with safe encoding. Opening the email composer must not claim a message was sent.
- Add descriptive Product/WebPage/BreadcrumbList schema without offers or fabricated reviews.

### `/us` editorial — low

- Shared typed section renderer: text, image/text split, image grid, material/specification table, related catalog, disclosure and showroom CTA.
- Inspiration: style/room imagery and related ID-based links; filters only when content warrants them.
- Why Normod: modular construction, materials and showroom experience, avoiding competitor statistics and unsupported local commercial claims.
- Fabric samples: sourced fabric families/swatches/care; invite showroom inquiry instead of sample ordering or free-shipping promises.
- Comfort: sourced seating/ergonomic details scoped to applicable models, not universal unsupported dimensions.
- Quality: frame/material/manufacturing explanation; local guarantees require confirmation.
- Every page has distinct copy/images/metadata; shared layout does not imply duplicate content.

### Blog/MDX — low

- Listing: localized excerpt, author, date and category; deliberate empty state when no articles are published.
- Store `bodyMdx` as an array of lines in localized post JSON, joined with newlines by the loader. This keeps JSON the sole prose source while supporting MDX syntax.
- Compile with `@mdx-js/mdx` at build time and render static article HTML. Never ship the compiler/evaluator or fetch executable remote MDX in the browser.
- Allow normal Markdown plus registered Figure, Callout, ProductLink and CollectionLink components. Assets/destinations resolve from IDs.
- Reject imports/exports, arbitrary expressions, event handlers, script/style/iframe elements, unsafe links and unregistered components before evaluation. Only reviewed repository content may compile.
- Share responsive image-prop generation with the media layer; use semantic media HTML in isolated static article rendering. Do not assume router-context-dependent components can render in that pass.
- Page layout owns the H1; article content starts at H2. Derive stable heading IDs and optional table of contents from the parsed tree.
- Metadata, author names, labels and publication/update dates are JSON-derived. Keep unpublished articles out of routes/sitemap and public drafts out of locale files.
- Target two concise original bilingual starter articles on supported subjects; do not invent an author or publication date to make a draft look published.

## 8. Design, browser APIs and accessibility

DESIGN.md owns exact defaults/motion tokens and distinguishes HAY observations from proposed Normod adaptations. Preserve the restrained palette, sans-serif foundation, selective serif captions, broad imagery and whitespace.

| Need | Native default | Baseline/fallback |
| --- | --- | --- |
| Non-modal navigation/help | `popover="auto"` / `hint` as appropriate; shadcn-styled trigger | Semantic disclosures and reachable links |
| Mobile menu/expanded gallery | `<dialog>`, `showModal()`, native focus/inert behavior, `::backdrop` | Ordinary nav/gallery links remain usable without enhancement |
| Sorting | shadcn Native Select with real `<select>` | Platform select if base-select is unsupported |
| Details | `<details>`/`<summary>` | Native disclosure without animation |
| Galleries | CSS overflow/scroll snap | Horizontal scrolling and thumbnail navigation |
| Scroll motion/header | CSS view/scroll timelines and scroll-state queries | Static readable content/header; minimal IntersectionObserver only for required behavior |
| Editorial grid | CSS Grid; masonry/Grid Lanes enhancement | Ordered regular grid, same DOM reading order |
| State transitions | Native View Transition API where useful | Immediate state change/normal Next navigation |
| Autosizing fields | `field-sizing: content` with bounds if needed | Sensible native field sizing |

Cross-document `@view-transition` does not animate Next.js client navigation by itself. Any optional Pages Router adapter must preserve modifier clicks, history, focus, scrolling and cancellation. Do not add a transition framework or App Router experimental feature. Prefer ordinary navigation if an adapter adds delays.

Accessibility requirements:

- Landmarks, one H1, logical headings, skip link, current-page indicators and semantic controls.
- Visible focus, complete keyboard access, native Escape/light-dismiss and focus return; no hover-only essential content.
- At least 4.5:1 body text and 3:1 large text contrast, distinguishable controls/focus. Decorative light-gray tokens must not become inaccessible muted text.
- Aim for 44 × 44 px touch targets; adjust the small starter shadcn icon variants centrally.
- Test 320/390/768/1024/1440 px, 200% zoom, long English/Turkish labels and Turkish glyphs; no unintended horizontal scrolling.
- Reduced motion disables decorative movement/stagger/infinite motion; essential content remains visible. No hidden LCP image or automatic parallax.
- Essential content/images/links appear in initial HTML and remain usable without JavaScript. Optional filters/dialogs may need enhancement.
- Do not rely on Turkish text baked into source imagery for English content. Prefer text-free or locale-specific imagery.

## 9. SEO and performance by page

### SEO

- Build typed metadata from locale JSON and route/entity registry. Render through one `PageSeo` in `next/head`.
- Absolute canonical per locale/entity; reciprocal `tr`/`en` alternate links and Turkish `x-default`; one URL normalizer.
- Remove starter hard-coded document language and verify Next.js locale output in initial HTML and language navigation.
- Generate sitemap and robots from the same published route enumeration/config used for static pages. Exclude errors, drafts, invalid routes and filter-query permutations.
- Preview uses noindex; release requires explicit production origin/indexability configuration.
- Stable JSON-LD node IDs and safe serialization escaping `<`. Scripts are direct children of Head with stable keys.
- Landing: WebPage plus shared WebSite/Organization. Catalog/collections: CollectionPage/ItemList. Product: Product/WebPage. Contact: ContactPage/FurnitureStore. Editorial: suitable WebPage/AboutPage. Blog: Blog; article: BlogPosting. Inner pages: BreadcrumbList.
- Local branch and parent brand are distinct records; do not infer ownership relationships beyond supplied facts.
- No Offer, priceRange, stock, copied ratings, fake review data or FAQ rich-result promises.
- A price-free/review-free Product may be valid Schema.org but ineligible for Google product rich results. Never invent values to satisfy a rich-result test.
- Verify unique titles/descriptions, alt text, social metadata, internal links, and real 404/500 status. Search ranking is not guaranteed by markup.

### Performance plan

| Page | Critical content | Specific optimization |
| --- | --- | --- |
| Landing | Header/first lifestyle image | One main image loading strategy, responsive sizes, no entrance opacity delay, lazy later media |
| Contact | Title/address/actions/photo | No map SDK, minimal interactive JS, no hydration dependency for contact information |
| Collections | Visible imagery/member summaries | Correct grid sizes, only relevant summaries, no product-detail payload |
| Products listing | First row/filters | Small search models, local filtering, no heavyweight service |
| Product | Main photo/description | Load first image promptly, lazy remaining media, split expanded-gallery code if worthwhile |
| Editorial | Title/first image | Shared static sections, lazy below-fold media, no animation library |
| Blog listing | Card summaries | Omit article bodies/compiler; optimize covers |
| Article | Text/cover | Build-time MDX, no unused syntax-highlighting/interactive dependencies |

Targets to measure in production mode, not unverified guarantees:

- LCP ≤ 2.5 seconds, CLS ≤ 0.1, eventual field INP ≤ 200 ms. Local interaction testing is not field INP.
- Median of three comparable mobile Lighthouse runs: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 on representative routes. Fix serious accessibility defects regardless of score.
- Initial compressed first-party JS target ≤ 200 KB on content routes; catalog/gallery additions ≤ 50 KB beyond shared runtime. Measure actual framework overhead and document justified budget adjustments.
- Tested mobile hero target ≤ 250 KB, desktop hero ≤ 450 KB; product cards ≤ 100 KB each. Review real images before accepting exceptions.
- Reserve dimensions, avoid duplicate preloads, use accurate `sizes`, lazy-load later media. Next 16 deprecates `priority`: choose documented `preload` or eager/fetchPriority behavior without conflicting combinations.
- Restrict image optimization to actual Normod CDN paths. Do not make normal content builds depend on source-site crawling.
- Keep filesystem, validation/schema generation, MDX compilation and unused dictionaries out of browser bundles. Register font paths and generate declarations; system fallbacks work until files arrive.

## 10. Implementation phases

Implementation tasks are tracked below. Complete checkboxes only after output exists and verification passes. Add CHANGELOGS.md entries after each modification batch, including configuration/documentation changes.

### Phase 1 — Foundation and localization

Dependency: explicit plan approval.

- [x] Record approval/date at the top of PLAN.md.
- [x] Recheck Git status, versions and relevant installed guides.
- [x] Move application folders to `src/`; update aliases and shadcn CSS path together.
- [x] Replace starter usage and remove demo API route; preserve user assets.
- [x] Retain current framework versions, Compiler, Strict Mode and pnpm lock unless a verified compatibility issue requires change.
- [x] Add shared JSON site/locale config and next-i18next configuration using v16 Pages imports; pass the `.cjs` config explicitly to appWithTranslation and serverSideTranslations because automatic discovery expects `.js`.
- [x] Compose translation and store providers in `_app` without `getInitialProps`.
- [x] Configure Turkish default, English prefix, disabled auto-detection and one trailing-slash convention.
- [x] Correct document language handling and seed minimal genuine localized UI/page content.
- [x] Add static page-data/translation helper and verify both locale HTML outputs and switching with a production build/typecheck.

### Phase 2 — Content system and seed data

Dependency: Phase 1.

- [x] Add Zod schemas/inferred types, generated editor JSON Schema, validation script and actionable error output.
- [x] Add route/navigation/taxonomy/asset/store registries and locale-aware loaders.
- [x] Implement stable ID/translated-slug resolution and published route enumeration.
- [x] Seed official Cyprus details with field-level sources/dates; keep unknowns absent.
- [x] Register logo, Cyprus photo, reviewed landing/editorial placeholders and fallback; add bilingual alt text.
- [x] Curate target 3 verified collection families and 12 real products across at least 3 categories. Record any supported-data shortfall rather than invent products to hit a count.
- [x] Add bilingual names/summaries/descriptions; verify specific source before adding measurements/material claims.
- [x] Add membership, featured order and related references; validate joins.
- [x] Document adding an entity, replacing an image and updating translations.
- [x] Test meaningful schema/slug/reference failures and validate seeded content/locale parity. Missing locale files fail the build-time reader; no separate fixture mutation test was added.

### Phase 3 — Tokens and shared UI

Dependency: Phases 1–2.

- [x] Finalize approved DESIGN.md token values and generate shared CSS variables.
- [x] Map tokens to shadcn/Tailwind; remove duplicate starter theme rules and unintended automatic dark mode.
- [x] Retain Base UI preset and install only necessary shadcn components with the installed CLI.
- [x] Build reusable container/section/heading/media/link and editorial typography primitives.
- [x] Build native dialog/popover/select/disclosure adapters with shared styling and translated labels.
- [x] Implement asset resolver, responsive image properties, safe fallback and restricted image configuration.
- [x] Build header/mobile navigation/language switch/footer from JSON.
- [x] Add shared underline/fade/reduced-motion rules with visible no-JS content.
- [x] Verify keyboard, Escape, focus return, dismiss behavior, target widths and both languages.

### Phase 4 — SEO foundation

Dependency: Phases 1–3.

- [x] Implement canonical/alternate route helpers and typed metadata models.
- [x] Implement PageSeo and safely serialized initial-head JSON-LD.
- [x] Build shared brand/site/store/breadcrumb and page-type schemas without commerce fields.
- [x] Generate sitemap/robots from deployment data and published routes.
- [x] Add localized 404/500 content and verify actual error statuses.
- [x] Test alternate links, serialization, duplicate-head prevention and language navigation.

### Phase 5 — Landing and contact (high)

Dependency: Phases 1–4.

- [x] Add bilingual landing copy, hero and ordered editorial/featured section descriptors.
- [x] Build landing composition with varied media proportions and showroom CTA.
- [x] Keep the first hero visible immediately and correctly sized with one loading strategy.
- [x] Build contact from sourced Cyprus address/hours/photo/directions/email.
- [ ] Use verified international phone target. Official local number is displayed; phoneHref is null. WhatsApp/parking/ratings are omitted.
- [x] Add home/contact-specific metadata, schema and accessible actions.
- [x] Confirm high-priority links work without placeholder `#` actions.
- [ ] Review target widths, keyboard, reduced motion and no-JS reading/contact behavior.
- [ ] Complete production Lighthouse/Core Web Vitals measurement. Initial JS and optimized image transfers were measured and meet the stated byte budgets; detailed results are in reports/verification.md.

### Phase 6 — Collections (medium)

- [x] Build collection cards/listing and detail story/hero/member grid.
- [x] Generate every published collection slug/locale with fallback false.
- [x] Add collection-specific SEO, breadcrumbs and ItemList.
- [ ] Finish interactive empty-collection review. Membership/order, translated paths, invalid 404s and image dimensions passed; a localized empty-state renderer is implemented.

### Phase 7 — Product discovery (medium)

- [x] Build product cards/grid and native search, sort and filter controls.
- [x] Implement typed query parser/serializer, localized matching and alphabetical sort.
- [x] Use Zustand for mobile drafts; implement Apply/Reset/count/empty results.
- [x] Preserve history, shallow changes and valid filters across languages.
- [x] Prevent hydration mismatch when applying query parameters after router readiness.
- [x] Add catalog metadata/schema and query canonical behavior.
- [x] Verify Turkish characters, combined/invalid filters, reset, back/forward and no price output.

### Phase 8 — Product detail (medium)

- [x] Build detail composition with dimensions/materials, care disclosures and collection links.
- [x] Build scroll-snap gallery with shared thumbnail/expanded selection.
- [x] Implement expanded native dialog and translated previous/next/close/count controls.
- [x] Show informational material/color alternatives only when matching records/media exist.
- [x] Add store inquiry and deterministic related products.
- [x] Generate every published product/locale path with unique metadata/descriptive Product schema.
- [ ] Complete touch and simulated image-failure gallery QA. Keyboard, focus restoration, translated paths and no-commerce payload checks passed; source media responses were audited.

### Phase 9 — `/us` editorial (low)

- [x] Write original bilingual content for all five requested topics using recorded sources.
- [x] Add page descriptors and localized section/SEO records.
- [x] Implement typed shared editorial renderer and reject unknown sections.
- [x] Add supported swatches/media/related blocks and showroom discovery/inquiry CTAs.
- [x] Generate five topics in both languages with page-specific metadata/schema.
- [x] Review facts, translation, photo/caption fit and every link; omit unconfirmed local commercial claims.

### Phase 10 — Blog/MDX (low)

- [x] Add build-only MDX compiler and JSON article schema.
- [x] Implement AST validation, allowed components, media/route resolution and static rendering.
- [x] Derive headings, excerpt/reading time and article view model without another editable prose source.
- [x] Prepare two original bilingual articles with known authors/dates or keep unpublished until known.
- [x] Build blog listing/article with related links, covers and BlogPosting metadata.
- [x] Generate published paths; unknown/draft slugs return localized 404.
- [x] Test invalid source/forbidden constructs and verify compiler code is excluded from browser bundles.
- [ ] Verify article headings/figures/links/dates/translations and no-JS reading.

### Phase 11 — HAY motion and complete UI review

- [x] Implement applicable DESIGN.md inventory families with shared CSS/native controls.
- [x] Recheck desktop and expanded mobile navigation against HAY; distinguish measured adaptations from source-only patterns.
- [x] Add below-fold reveals/header compaction progressively without hiding content or decoration scroll listeners.
- [x] Provide hover/focus equivalents and visible mobile captions.
- [x] Add native state/view transitions only if behavior/support is reliable. Cross-document CSS transition is progressive; Pages Router state changes retain their native React update behavior.
- [ ] Verify reduced motion, unsupported-feature fallback, no-JS baseline, resize and zoom.
- [x] Review all page families in both languages at 320/390/768/1024/1440 px; fix crop/overflow/rhythm centrally.
- [x] Synchronize DESIGN.md with final style decisions and reference deviations.

### Phase 12 — Production verification and handoff

- [x] Pass content validation, TypeScript, ESLint and focused tests; resolve introduced failures.
- [x] Build production app and confirm every published route/locale is pre-rendered with no accidental SSR/content API.
- [x] Run bilingual discovery → product → store browser journeys and native-control/history checks. Search/reset and back/forward restore the expected query and result count.
- [x] Check Chromium/Firefox/WebKit where available and record environment limits. One in-app browser surface was available; no multi-engine pass is claimed.
- [ ] Run accessibility scans and manual keyboard/contrast/zoom checks on representative page families.
- [x] Inspect initial HTML for locale content, lang, unique metadata and safe JSON-LD in head.
- [x] Check all published links, reciprocal alternates, canonical origin, sitemap/robots and error statuses.
- [x] Audit source/rendered payloads for hard-coded UI strings, unregistered URLs and commerce leakage.
- [x] Check all media paths/responses/dimensions/crops, distinguishing source blocking from invalid registry data.
- [x] Measure performance/bundles on representative routes and record actual results/deviations.
- [ ] Confirm domain/contact targets/local claims/assortment/final assets before calling the site release-ready.
- [x] Update README with commands, JSON editing examples, validation, translations and publishing procedure.
- [x] Update PLAN.md checkboxes and CHANGELOGS.md verification/limitations.
- [x] Present the completed local website and verification evidence. Deployment remains a separate requested action.


## 11. Commands, dependencies and tests

Use pnpm. The scripts below are implemented except the browser E2E runner; browser checks were performed through the available in-app browser tooling.

| Command | Purpose |
| --- | --- |
| `pnpm typecheck` | TypeScript no emit |
| `pnpm content:validate` | Shape/reference/locale/publication validation |
| `pnpm content:schemas` | Generate editor schemas from code schemas |
| `pnpm design:generate` | Generate tokens/font declarations from DESIGN.md + asset registry |
| `pnpm seo:generate` | Generate sitemap/robots from route/deployment JSON |
| `pnpm assets:check` | Changed/full local and remote media checks |
| `pnpm test` | Focused content/route/search/serialization/MDX tests |
| Browser tooling | Production journeys performed manually; an automated E2E/axe runner remains release QA |
| `pnpm audit:production` | Read-only Python HTTP crawl of every published route; initial JS byte measurements |

Build preparation: content validation → UI string/key audit → design generation → SEO generation → next build. MDX compiles through build-only loaders. Dev runs required generators before startup; document token regeneration rather than silently serving stale generated CSS.

Installed additions: Zod, YAML parser for DESIGN.md frontmatter, build-only @mdx-js/mdx, tsx and Prettier. Focused tests use Node's test runner. Browser checks used the in-app tooling; Playwright/axe are not installed. No motion/backend/form-service dependency was added.

Test meaningful failures: missing English data, incorrect localized slugs, invalid membership/media, unsafe JSON-LD/MDX, hydration drift, query history, keyboard traps, incorrect store links and prices in output. Do not snapshot every static copy paragraph or mirror implementation with trivial tests.

## 12. Evidence and research limits

AGENTS.md contains supplied links, version findings, source mapping and the official Cyprus contact record. DESIGN.md holds the style defaults, motion inventory, implementation adaptations and candidate asset references. CHANGELOGS.md records modification batches.

- HAY's loaded main stylesheet was inspected through browser CSSOM after direct HTTP source fetches returned 403. Presence of a rule does not prove that every historical widget runs on the homepage.
- Desktop/mobile homepage layout and expanded mobile navigation were observed. Every HAY product/editorial interaction was not inspected; DESIGN.md identifies the observed behaviors and implementation adaptations.
- The motion inventory groups all inspected declarations and separates inactive/out-of-scope families. It is not a claim that every animation across all HAY URLs and third-party widgets has been reproduced.
- The initial planning task performed documentation checks only. Approved implementation subsequently added the website and verification evidence in reports/verification.md. That report distinguishes executed checks from pending release QA.

## 13. Implementation handoff — 2026-09-15

- All requested page templates exist. The build generates 50 published locale routes plus localized 404/500 documents, using Pages Router static props/paths and the normal Next runtime.
- Data: 12 sourced products, three collections, five editorial topics, 30 registered assets and two original bilingual MDX drafts. Drafts require real author/date records before publication.
- User confirmed `https://www.normodcyprus.com`; preview indexing remains disabled until deployment review. Store coordinates were verified from the official source after planning. International phone/WhatsApp, current assortment and final imagery remain owner checks.
- Passed: content validation, TypeScript, ESLint, 18 focused tests, production build, all-route HTTP/SEO/link audit, asset response/dimension checks and responsive/native-control browser checks. See reports/verification.md and machine-readable reports for evidence and limits.
- Remaining unchecked tasks are specific release QA/publication checks, not missing page implementations. No deployment was requested or performed.
