# Normod Cyprus

A Turkish-first, bilingual furniture showroom built with **Next.js Pages Router**. Products lead to the Cyprus store; the site contains no pricing or purchasing flow.

## Run locally

```sh
pnpm install
pnpm dev
```

Production preview:

```sh
pnpm build
pnpm start
```

Open [the local site](http://localhost:3000). Turkish uses `/`; English uses `/en`. The app uses the normal Next.js runtime, including image optimization. **Do not use static export.**

Use the pnpm version recorded in `package.json`. Node 20.9+ is required by Next.js; this implementation was verified with Node 26.8.2. Python 3 is optional, for the read-only HTTP audit.

## Content ownership

| Location | Edit here |
| --- | --- |
| `content/config/site.json` | Global schema version, locales, canonical origin, indexability, shared asset IDs |
| `content/config/routes.json` | Fixed route segments (changes also require the matching Pages Router files) |
| `content/config/navigation.json` | Header/footer link order, by stable ID |
| `content/assets.json` | Every remote image URL and public asset path, dimensions and provenance |
| `content/store.json` | Sourced contact destinations, hours, coordinates and verification history |
| `content/taxonomy.json` | Category/material IDs |
| `content/products/*.json` | Product references, membership, dimensions, ordering and publication |
| `content/collections/*.json` | Collection hero and featured product order |
| `content/pages/*.json` | Home composition references and editorial section IDs |
| `content/posts/*.json` | Blog publication, cover, author and related products |
| `content/authors.json` | Verified author IDs and Person/Organization type |
| `public/locales/tr/` and `public/locales/en/` | **All** visible text, SEO copy, alt text, names, slugs and MDX |
| `DESIGN.md` | Style/motion tokens and documented design decisions |

Data is read and validated at build time. There is no database, CMS, runtime content API or source-site scraping in a normal build. Publish JSON edits by rebuilding the application.

### Replace an image

1. Find its ID in `content/assets.json`, such as `living-room`.
2. Replace `src`, `width` and `height`; keep the ID to preserve references. Set `kind` to `remote` or `local`, and update provenance/placeholder status.
3. Remote images use `https://normod.com/cdn/shop/...`. Local images go in `public/images/` and use `/images/filename.ext` in JSON.
4. Update the same ID's `alt` in both `public/locales/{tr,en}/assets.json`.
5. Run `pnpm assets:check` and `pnpm content:validate`.

Use text-free photos for both languages. Do not use source promotional images with Turkish captions as English product photos. Do not paste URLs into components. A registry-owned SVG is used if a browser image fails.

### Add a product

1. Add `content/products/your-product-id.json`, following an existing product and `content/schemas/product.schema.json`.
2. Use stable IDs for category, materials, collections, images and related products. Collection membership belongs to the product record. Add measurements only when supported by the specific source.
3. Add `public/locales/tr/products/your-product-id.json` and its English equivalent. Translate the name, subtitle, summary, description, care, SEO and slug.
4. Include `isPublished: true` when ready. Published homepage/collection references must point to published products.
5. Run validation/build. The route and language alternates are generated automatically.

Never add monetary, availability, review or offer fields to make a source product match an online shop. The product schema rejects additional fields. Cyprus assortment is checked through store contact, not assumed from the source catalog.

### Add a collection or editorial page

Follow the matching neutral record and both localized records. A collection's `featuredProductIds` must be members of that collection. Additional members appear after the featured order.

Editorial records allow typed `text` sections, with translated heading/body content joined by section ID. Unsupported section types fail validation. Add a new renderer/schema together when a new section type is needed.

### Blog and MDX

Two original bilingual articles are included as **drafts**. No author credit was supplied, so their detail URLs return 404 and they are omitted from the sitemap. The journal shows a localized empty state.

To publish:

1. Register an actual author in `content/authors.json`, for example an existing verified ID with `type: "Person"` or `type: "Organization"`.
2. Add that ID's `name` and optional `url` to both `public/locales/{tr,en}/authors.json`.
3. Set the post's `authorId`, actual `publishedAt` date and `isPublished: true`.
4. Edit both locale records. `bodyMdx` is an array of MDX paragraphs/blocks; blocks are joined with blank lines. This keeps JSON the sole editable content source.
5. Run validation, tests and build.

Supported: Markdown paragraphs, emphasis, lists, links, blockquotes, level 2/3 headings, inline code, and these registered components:

```mdx
<Callout>A translated note from the JSON article.</Callout>
<Figure id="klem-three-2" />
<ProductLink id="klem-three">Translated link text</ProductLink>
<CollectionLink id="klem">Translated link text</CollectionLink>
```

Imports, exports, expressions, arbitrary HTML/components, event handlers, unsafe URLs and non-literal attributes are rejected. Compilation and static HTML rendering happen on the server at build time. No MDX compiler or evaluation runtime is sent to the browser.

## Source structure

```text
src/
  pages/                 # Pages Router entry points, static props and paths
  components/
    ui/                  # shadcn primitives + native dialog adapter
    layout/              # shell, navigation, site context and container
    content/             # headings, links and breadcrumbs
    media/               # responsive registered images and fallback
    seo/                 # next/head and initial-head JSON-LD
  features/
    catalog, product, contact, blog, errors
  lib/
    content/             # schemas, build-only readers/loaders/validation
    catalog/             # pure filter query and matching functions
    routes/              # fixed/localized/published route helpers
    mdx/                 # build-only AST validation and compilation
    seo/                 # safe serialization
  providers/, stores/    # instance-owned Zustand; no global server state
  styles/                # shared theme, motion, generated design tokens
scripts/                 # validation, generators and read-only audits
tests/                   # meaningful content/query/MDX/SEO tests
reports/                 # verification evidence and stated limitations
```

Components use named exports and lowercase dash-separated filenames. Framework page exports are the required exception. Keep feature components small and colocated; import directly rather than adding broad barrel exports.

The Pages API imports are `next-i18next/pages` and `next-i18next/pages/serverSideTranslations`. The v16 root package entry is for App Router. Pass the shared `.cjs` config explicitly.

Zustand holds transient gallery/filter drafts in a provider-owned store. Committed catalog filters live in the URL. Popovers/dialogs use native top-layer/focus behavior. CSS provides scroll snap, progressive motion and reduced-motion fallbacks.

## Commands and checks

```sh
pnpm content:validate  # shape, translations, slugs, joins, publication and MDX
pnpm content:lint      # hard-coded JSX prose and accessibility labels
pnpm content:schemas   # generated editor schemas
pnpm design:generate  # DESIGN.md → shared CSS variables
pnpm seo:generate     # published routes → sitemap and robots
pnpm assets:check     # remote/local responses and actual image proportions
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
# While pnpm start is running:
pnpm audit:production
```

`pnpm build` runs content validation and design/SEO generators first. `pnpm dev` validates content and generates design tokens before starting. Restart dev or rerun `design:generate` after token changes. Do not edit generated CSS/schema/sitemap files as independent sources.

The HTTP audit checks every sitemap route, language, unique titles, metadata, reciprocal alternates, initial-head JSON-LD, internal links and error status codes. It also measures gzip sizes of initial first-party JavaScript. It does not replace browser accessibility or performance testing.

## Publication checklist

- Canonical origin is confirmed as **https://www.normodcyprus.com**.
- `isIndexable` remains **false** for this local preview. Once the public deployment and business details are approved, set it to `true`, rebuild, and verify robots/canonical/sitemap on the deployed origin.
- Official Normod sources provide the store address, local phone display, email, hours, directions and coordinates. The international dialing target is not verified; `phoneHref` remains null. Add a confirmed `tel:+...` value to enable the phone link. WhatsApp is omitted.
- Confirm current Cyprus assortment and final imagery. Source images are intentionally replaceable placeholders; no Cyprus stock claims or Turkish commercial policies were imported.
- Add verified blog author/date data to publish the two drafts.
- Run release browser-engine, reduced-motion/200% zoom, axe and Lighthouse checks in the deployment environment. Local transfer measurements are not field Core Web Vitals.

See [PLAN.md](PLAN.md) for checked implementation tasks and remaining release checks, [AGENTS.md](AGENTS.md) for agent rules, [DESIGN.md](DESIGN.md) for the visual reference, and [CHANGELOGS.md](CHANGELOGS.md) for change history. Verification details are in [reports/verification.md](reports/verification.md).
