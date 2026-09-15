---
version: implementation-2026-09-15
name: HAY Minimal Editorial
description: A calm Scandinavian retail system with airy whitespace, restrained black accents, and an elegant editorial voice.
colors:
  primary: "#0A0A0A"
  secondary: "#F2F2F2"
  tertiary: "#E5E7EB"
  neutral: "#FFFFFF"
  surface: "#F2F2F2"
  on-surface: "#0A0A0A"
  error: "#B00020"
  primary-90: "#1A1A1A"
  primary-60: "#666666"
  primary-30: "#B3B3B3"
  surface-90: "#E8E8E8"
typography:
  headline-display:
    fontFamily: "NeueHelvetica55Roman"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: "38px"
    letterSpacing: "0px"
  headline-lg:
    fontFamily: "NeueHelvetica55Roman"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "29px"
    letterSpacing: "0px"
  headline-md:
    fontFamily: "NeueHelvetica55Roman"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "22px"
    letterSpacing: "0px"
  headline-sm:
    fontFamily: "ITCNewBaskervilleRoman"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: "28px"
    letterSpacing: "1.1px"
  body-lg:
    fontFamily: "NeueHelvetica55Roman"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "1px"
  body-md:
    fontFamily: "NeueHelvetica55Roman"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "NeueHelvetica55Roman"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0px"
  label-lg:
    fontFamily: "NeueHelvetica55Roman"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "1px"
  label-md:
    fontFamily: "NeueHelvetica55Roman"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "18px"
    letterSpacing: "1px"
  label-sm:
    fontFamily: "NeueHelvetica55Roman"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
    letterSpacing: "0.12em"
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 26px
  lg: 40px
  xl: 130px
  gutter: 32px
  margin: 24px
responsive:
  breakpoints:
    tablet: 768px
    desktop: 1024px
    wide: 1440px
  container-max: 1440px
  page-inset-mobile: 24px
  page-inset-tablet: 32px
  section-gap-mobile: 64px
  control-target-min: 44px
font-fallbacks:
  sans: "Helvetica, Arial, sans-serif"
  serif: "Baskerville, Georgia, serif"
motion:
  duration:
    instant: 0ms
    feedback: 100ms
    drilldown: 150ms
    fast: 200ms
    control: 250ms
    header: 300ms
    reveal: 400ms
    navigation: 500ms
    tile: 600ms
    editorial: 800ms
    loading: 1000ms
    image: 1200ms
  easing:
    standard: ease
    exit: ease-out
    symmetric: ease-in-out
    linear: linear
    block: "cubic-bezier(0.03, 0.69, 0.36, 1.01)"
  delay:
    none: 0ms
    title: 100ms
    stagger-step: 120ms
    detail: 200ms
    action: 250ms
    close: 300ms
    preview: 500ms
  distance:
    reveal-mobile: 16px
    reveal-desktop: 24px
  header:
    expanded-desktop: 130px
    compact-desktop: 55px
    mobile: 88px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    size: "120px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    size: "120px"
    height: "44px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  chip:
    backgroundColor: "{colors.surface-90}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
---
# HAY Minimal Editorial

## Overview
This system feels quiet, premium, and highly curated, with a distinctly Scandinavian retail sensibility. It favors spacious composition, restrained contrast, and an editorial tone that makes product imagery the hero. The audience is design-conscious shoppers and professionals who expect clarity, refinement, and minimal visual noise.

## Colors
- **Primary (#0A0A0A):** A near-black used for core text, navigation, and strong calls to action. It provides crisp contrast without feeling harsh.
- **Secondary (#F2F2F2):** A soft gallery-gray used as the main background and neutral surface color. It keeps the interface light and airy.
- **Tertiary (#E5E7EB):** A subtle divider tone for borders, separators, and low-emphasis structure.
- **Neutral (#FFFFFF):** Pure white for lifted surfaces, text reversal, and clean highlights.
- **Surface (#F2F2F2):** The default container and page surface color, matching the brand’s misty, understated backdrop.
- **On-surface (#0A0A0A):** The primary readable foreground color on light backgrounds.
- **Error (#B00020):** Reserved for validation and destructive states; it should appear sparingly to preserve the calm aesthetic.
- **Primary scale variants (#1A1A1A, #666666, #B3B3B3):** Use these for hover states, secondary text, metadata, and disabled content without introducing new hues.
- **Surface variant (#E8E8E8):** A slightly deeper neutral for section separation and pressed or selected surfaces.

## Typography
The system uses a clean sans-serif foundation based on Neue Helvetica, paired selectively with ITC New Baskerville for editorial accent text. Headlines are strong but not aggressive: `headline-display` and `headline-lg` are bold, compact, and centered when used in mastheads. Body and label styles stay regular-weight and rely on spacing rather than weight contrast, with `body-lg` and `label-lg` using subtle 1px tracking that creates an airy, uppercase-adjacent retail feel.

The serif `headline-sm` style brings an elevated magazine quality to product captions and feature labels. Use uppercase or all-caps sparingly for navigation and meta text, with generous letter-spacing to match the screenshot’s refined, spaced-out top nav.

## Layout
The layout is built around a wide, fixed-max-width editorial container with large side margins and generous vertical breathing room. Content is centered and image-led, with the hero/media block occupying most of the viewport width while typography remains compact and disciplined above and below it.

Spacing follows a measured rhythm: `8px` for tight internal relationships, `16px` for standard padding, `26px` and `40px` for section separation, and `130px` for major vertical breaks. Cards and modules should feel inset and calm rather than crowded, with clear whitespace framing key assets.

## Elevation & Depth
The design is intentionally flat. Hierarchy comes from contrast, scale, and whitespace rather than shadow or layering. Borders are minimal and soft, and the occasional lift should be achieved through tonal separation or a faint border instead of dramatic elevation.

## Shapes
The shape language is understated and architectural. Corners are usually sharp or only gently rounded, with `4px` radius on buttons and small controls and `8px` for cards. Full-rounded pills are appropriate only for chips or status tags where a softer editorial badge is needed.

## Components
Buttons are restrained and functional. `button-primary` uses a solid black fill with white text and compact `8px 16px` padding, making it suitable for the main action. `button-secondary` reverses the treatment with a white background and black outline for secondary actions. `button-tertiary` is text-only and should be used for low-emphasis actions, links, or utility navigation. Keep button heights at least `44px` and avoid oversized, pill-like forms.

Cards should use `card` styling with a light surface fill, subtle `1px` border, and `8px` radius. They should not cast visible shadows; structure should come from spacing and border contrast instead. Inputs should be simple, bordered, and low-friction, with the same visual language as secondary buttons. Chips should be small, rounded, and neutral-toned, functioning as metadata or filters rather than loud interactive elements.

Navigation links and category labels should use uppercase or spaced small caps behavior with generous tracking, echoing the top navigation in the screenshot. Product captions and editorial references can use the serif accent style to add sophistication without disrupting the minimal system.

## Do's and Don'ts
- Do keep layouts spacious and centered, with product imagery as the dominant visual element.
- Do use black only for key text and primary actions; let light neutrals carry most of the interface.
- Do preserve the subtle 1px tracking on labels and navigation to maintain the editorial retail feel.
- Do prefer borders and tonal shifts over shadows for hierarchy.
- Don't introduce bright accent colors or multi-hue palettes.
- Don't use heavy rounded corners, glossy effects, or playful decorations.
- Don't crowd text blocks or reduce white space around hero imagery and captions.
- Don't overuse the serif accent; reserve it for moments that need a refined editorial note.

## Normod Cyprus application rules

Added 2026-09-15 during research/planning. The original palette/type/spacing defaults above remain the starting point. The additional responsive/motion tokens are proposed implementation defaults subject to the user's plan approval. They do not indicate an implemented UI.

- Use the Normod identity and photography with HAY's editorial layout rhythm. Navigation, discovery, language switching and physical-store contact replace commercial source-site controls.
- The page is light by default. Do not inherit the starter's automatic dark-mode override; add a separate dark design only if requested.
- Primary editorial photography is square-cornered, unbordered and edge-aligned within the content grid. The existing generic `card` token applies to actual boxed UI, not to every product/editorial image.
- Product cutouts use neutral backgrounds and `object-fit: contain`; lifestyle blocks use deliberate cover crops. A title/description is never embedded in the image as the only accessible copy.
- Keep serif editorial captions selective. Use sans-serif for controls, navigation, specifications and body text. Include Turkish glyph coverage before enabling supplied webfonts.
- The named Neue Helvetica / ITC New Baskerville families are design references. Their font files have not been supplied. Use the documented system fallbacks; do not hotlink HAY's font service.
- Mobile uses one editorial column with visible captions; tablet can pair modules; desktop can mix full-width, paired and asymmetric modules. Keep the same semantic order at every size.
- Match the approximate desktop HAY header proportions while reserving its layout space. Compact behavior must not introduce layout shift or hide the store action/focus targets.
- Controls may retain the 40px visual height above while their interactive hit area reaches the 44px target token. Avoid fixed 120px button widths where translated text would overflow.
- DESIGN.md's structured token block is the authoring source. Generate shared CSS variables and map them to Tailwind/shadcn tokens; never hand-edit generated CSS. Component variants own reusable control styles and shared layout primitives own repeated spacing.
- Asset addresses remain exclusively in the JSON registry at implementation time, including local fonts/logos. Any generated font CSS must derive its path from that registry.

## HAY research evidence

### Scope and method

Reference: [HAY homepage](https://www.hay.com/), inspected 2026-09-15. The live browser loaded [haybrand.css](https://www.hay.com/b18.0.0.2/Frontend/CSS/haybrand.css). All transition/animation declarations accessible in that main stylesheet were traversed through browser CSSOM, including responsive overrides, and are grouped below. Inline consent-widget motion was also visible.

Desktop homepage and a 390px-wide mobile homepage were visually inspected. Desktop showed a centered wordmark, tracked navigation, broad lifestyle hero, light-gray surface and editorial imagery below. The mobile page showed a hamburger trigger, centered wordmark, single-column images and centered serif captions. The desktop header measured 130px before scrolling; the compact stylesheet state is 55px. These are observations of that version, not permanent HAY specifications.

Direct HTTP requests for the CSS/JavaScript source returned 403. Reading the already-loaded browser stylesheet succeeded. Script elements referenced older grid/navigation/scroll modules, but their runtime algorithms were not read or reproduced. A complete expanded-mobile-menu, every product/editorial state, hover timing sequence and third-party campaign variation was not exercised.

Evidence labels:

- **Observed:** the element/layout/state was seen in the browser and associated style was inspected.
- **CSS:** the declaration/state exists in the loaded stylesheet; runtime activation was not fully tested.
- **Third party:** inline widget rules, separate from HAY's design system.

This inventory records all inspected motion families; it is not a claim of exhaustive animation coverage across every HAY URL or historical widget. Preserve this distinction in future progress reports. Adaptation means recreating visible behavior using native APIs and shared styles, not copying HAY's scripts into the application.

### Layout, navigation and link motion

| Family / source selector | Evidence | Inspected timing/state | Normod implementation |
| --- | --- | --- | --- |
| Header `.site-header` | Observed + CSS | Height and top padding, 300ms ease; desktop expanded 130px, compact 55px | Shared header response; reserve space, prefer CSS scroll state/timeline; stable fallback |
| Wordmark `.site-header__logo` | CSS | 300ms opacity; mobile delay 300ms; desktop adds transform; compact state opacity 0, scale 0.5 with upward offset | Preserve brand/navigation usability; do not hide the only home link or focused control |
| Compact trigger `.minimized-trigger` | CSS | 200ms opacity normally, 1000ms in compact state | Adapt only if an additional compact trigger is used |
| Primary navigation `.site-navigation` | CSS | 300ms opacity; compact state may hide it | Keep keyboard-accessible compact navigation; native menu/dialog provides access |
| Hamburger/action icon `.navigation-icon__line`, `.site-actions__link` | Observed trigger + CSS | 500ms transforms; middle-line opacity 500ms normally, 200ms on opening | CSS icon state on native dialog trigger; reduced motion changes instantly |
| Menu panel `.navigation__overlay` | CSS | 500ms opacity/transform | Native non-modal popover on desktop; native modal dialog on mobile |
| Menu close `.navigation-overlay__close` | CSS | 500ms fade/line rotation, desktop delay 300ms; lines rotate to ±45 degrees | Keep close control immediately operable; decoration may animate |
| Nested navigation `.navigation__list.level-4` | CSS | 300ms transform/height/opacity; expand indicator transform/top also 300ms | Semantic disclosure; avoid animating layout when a simple state change suffices |
| Navigation/footer/country/sitemap underlines | CSS | Pseudo-element transform, 500ms ease | One reusable underline treatment for hover and keyboard focus |
| Submenu `.sub-menu` | CSS | 300ms top; desktop top/transform, compact hides with upward movement and scaleY | Only for needed local subnavigation; no duplicate navigation system |
| Navigation preview `.navigation__hover-image` | CSS | 300ms opacity; default 500ms delay, explicit visible/invisible states remove delay | Optional registered preview image; focus equivalent and no extra eager downloads |
| Navigation spot image / `.pulse-page a:hover img` | CSS | 500ms opacity on hover | Shared image-link opacity variant where useful |
| Header backlink `.backlink` | CSS | 300ms margin in normal/compact states | Breadcrumb/backlink remains readable; no animation required for basic navigation |

### Editorial, image, grid and product motion

| Family / source selector | Evidence | Inspected timing/state | Normod implementation |
| --- | --- | --- | --- |
| General reveal `.trans` | CSS | Opacity 400ms, transform 800ms, ease; in-view resolves to opacity 1/no offset | Below-fold CSS view timeline; visible baseline and shorter tokenized travel |
| Hero `.hero` | Observed media + CSS | 800ms general transition; in-view clears offset/opacity | Primary image starts visible; do not reproduce a hidden/delayed LCP image |
| Sections/headings/text/media `.section`, `.content-section`, `.image-container`, `.living-box` | CSS | Common 400ms opacity / 800ms transform; several children use 800ms general transition | Shared editorial reveal; no per-section motion implementation |
| View heading `h1.view` | CSS | Starts at opacity 0 and +90px Y; 400ms opacity / 800ms transform | Do not hide page H1. Optional below-fold headings use proposed 16/24px offsets |
| Mixed grid `.mix-item`, `.box` | CSS | 400ms opacity / 800ms transform | Regular CSS Grid first; optional native transitions for settled state changes |
| Dynamic tile background `.dynamic-background` | CSS | 200ms color entering; leaving 400ms with 300ms delay; reveal opacity/transform timings persist | Use explicit JSON swatch/semantic token if needed, not runtime color-extraction code |
| Tile image/text `.box img`, `.box-text` | CSS | 600ms transition; some hover states hide image and show text | Essential title remains visible outside image; desktop decorative overlay may crossfade |
| Tile action `.box-text a` | CSS | 400ms transform/opacity, 250ms delay | One reusable action reveal; no delayed keyboard operability |
| Information tile `.box.info` | CSS | Hover image opacity 0.2; centered info mark fades/scales over 400ms | Optional editorial help uses native popover with accessible name; no hidden essential copy |
| General image hover `a.box-hover` | CSS | Image/video hover opacity 0.4; hero override retains opacity 1 | Keep the hero clear; use restrained opacity treatment only where it preserves legibility |
| Product reveal `.product` | CSS | 400ms opacity / 1000ms transform | Optional below-fold product entry, shortened travel and no staggered discovery delay |
| Product image `.product-image img` | CSS | 1200ms opacity | Image loading itself remains prompt; optional secondary image fade must not obscure primary content |
| Product action `.product-action a/button` | CSS | 250ms general transition | Store/discovery controls use shared control tokens, no buying action |
| Lazy media `[responsive-img-load].fadeIn`, `[lazy-bg-image].fadeIn` | CSS | 1000ms opacity | Lazy-load below-fold images; visible fallback, reserved dimensions; no delay on important media |
| Video `.video-wrapper iframe` | CSS | 800ms opacity | Only if approved video exists; native video/poster first, lazy embed if truly necessary |
| Footer section `footer > .row` | Observed footer structure + CSS | 400ms opacity / 800ms transform | Footer contact/navigation starts accessible; optional nonessential reveal |
| Block fade `.block-fading` | CSS | 500ms, cubic-bezier(0.03, 0.69, 0.36, 1.01) | Shared optional motion token; no duplicated effect implementation |

### Disclosure, hotspots and legacy/control families

| Family / source selector | Evidence | Inspected timing/state | Scope decision |
| --- | --- | --- | --- |
| Expand/load more `.btn-expand`, `.btn-loadmore` | CSS | Background 250ms; icon transform 500ms; load-more container 1000ms | Use for native disclosure affordances if needed; initial catalog does not require load more |
| Hotspot entry `.image-pin` | CSS | Transform/opacity 400ms; 120ms increments across ten pins | Optional inspiration enhancement only if actual hotspot data exists; no forced long stagger |
| Hotspot icon/popup | CSS | Icon transform 500ms, popup opacity 400ms | Native popover; keyboard/close/light-dismiss behavior |
| Hotspot contents | CSS | Title 400ms with 100ms delay; price 400ms/200ms; actions 400ms/250ms | Record source price timing only; omit all price content/markup in Normod |
| Buttons `.button` | CSS | Background/text color 250ms ease-out | Shared shadcn button variant with native element behavior |
| Form fields | CSS | Shadow 500ms ease; border 250ms ease-in-out | Search/control focus style; visible immediate focus ring |
| Generic overlay `.overlay__inner` | CSS | 300ms general transition | Native dialog/popover, properties restricted to opacity/transform |
| Repeated Angular entry/leave `.animateRpt`, `.animateInOnly` | CSS | 500ms general entry/exit transitions | Recreate only meaningful UI state, no Angular dependency |
| Toggle fade `.animateToggle` | CSS | Opacity 500ms | Optional shared CSS state fade |
| Drilldown `.is-drilldown-submenu` | CSS | Transform 150ms linear | Semantic nested mobile navigation if needed |
| Off-canvas wrappers/content/exit | CSS | Transform/background 500ms | Native dialog replaces legacy off-canvas plumbing |
| Slider fill/handle | CSS | 200ms ease-in-out, 0ms while dragging | No slider requirement initially; archive for reference |
| Switch paddle/knob | CSS | 250ms ease-out | No preference switch requirement initially; archive |
| Tabs content | CSS | General transition 500ms | Prefer ordinary content/disclosures unless tabs are justified |
| Thumbnail | CSS | Shadow 200ms ease-out | Gallery selection can use a shared border/focus treatment without shadow |
| Loading cross `.cross.spinning` | CSS | Named `spinning`, 1.2s ease, infinite | Static showroom should not need perpetual loading decoration; omit |
| Search icon `.search.searching` | CSS | Named `searching`, 4s ease, infinite | Local catalog search uses no long-running loading indicator; omit |
| Purchase splash `.buysplash` | CSS | Named `pageFadein`, 2s ease | Outside showroom scope; archive, do not implement purchase splash |
| Footer smiley | CSS | 800ms with cubic-bezier(0.68, -0.55, 0.27, 1.55) | HAY-specific element, not a Normod component |
| Footer dropdown entries | CSS | General transition 800ms | Use native locale links/select; no decorative footer dropdown required |
| Store locator input/map | CSS | Input 100ms; map images explicitly disable transition | Contact uses real directions link; no map animation/library |
| `.notrans` and map/drag overrides | CSS | Explicitly disable transitions | Honor immediate states and reduced-motion behavior |

### Third-party motion observed in loaded inline rules

Consent UI includes a 400ms ease-in-out entrance, 100ms control changes, 150–300ms arrow/detail transitions, 200/400ms toggle pieces, and asymmetric 100ms opening/250ms closing disclosure timing. These are third-party widget styles, not a requirement to add a consent platform or trackers. A newsletter teaser was visible, but its full entrance/interaction timing was not measured. The Normod showroom currently requires neither tracking nor newsletter capture.

### Native implementation constraints

- Reuse duration/easing/distance tokens above; replace broad `transition: all` with explicit properties. Source timing is a reference, not an instruction to animate layout indiscriminately.
- CSS scroll-driven reveals may use `view()`/`animation-range`; scroll-state containers can style a sticky element where supported. Unsupported browsers get readable static content. Any IntersectionObserver fallback is minimal and cannot leave content invisible on failure.
- Keep HAY's larger source travel distances in this research record; proposed Normod distances are 16px mobile/24px desktop for comfort and reduced visual disruption.
- Use native `popover` for non-modal previews and `<dialog>` for blocking menu/gallery views. Exit animation must not delay focus return or require custom focus traps.
- Native `<select>` is the sorting control; `appearance: base-select` and picker styling are optional enhancements. Use CSS Grid baseline before masonry/Grid Lanes.
- View Transition API is optional for meaningful state changes; normal Next.js route navigation remains the baseline. Cross-document opt-in alone does not animate client-side Pages Router transitions.
- Apply hover effects only on hover-capable devices, mirror actionable states with `:focus-visible`/`:focus-within`, and expose captions/actions normally on touch.
- `prefers-reduced-motion: reduce` removes translation, scale, stagger and looping effects. Set content to its fully visible resting state and use instant native control changes.
- Do not reproduce source commerce, tracking or HAY-specific decoration merely because its CSS contains motion.

## Image references and JSON registration

These are research references, not application source declarations. On implementation, place every selected URL in `content/assets.json`, provide both locale descriptions and use IDs everywhere in the UI.

| Asset candidate | Observed source | Status |
| --- | --- | --- |
| Cyprus showroom | [kibris.png](https://normod.com/cdn/shop/files/kibris.png?v=1769436522&width=1200) | Loaded on official Lefkoşa detail page, 1020 × 573; suitable contact source pending crop review |
| Normod logo | [normod-logo.png](https://normod.com/cdn/shop/files/normod-logo.png?v=1762847820&width=800) | Loaded source logo; inspected rendered source dimensions 691 × 144 |
| Large homepage poster | [Normod poster](https://normod.com/cdn/shop/files/preview_images/70412e117e4c465a9339da3a8eea024d.thumbnail.0000000000.jpg?v=1764679287&width=1920) | Source URL resolved; inspect visual subject/dimensions before hero use |
| Collection/menu imagery | [Collection preview](https://normod.com/cdn/shop/files/hp_menu_collections_3.png?v=1764671039&width=600) | DOM source found; not loaded/visually verified during research |

Do not use small preview thumbnails as full-width hero images. Do not claim an unverified lifestyle image depicts the Cyprus showroom. Product image records must match actual product IDs/variants and retain source provenance.

## Design verification checklist

- [x] Preserve the existing design defaults and document new proposed responsive/motion values.
- [x] Fetch/inspect HAY and catalogue the accessible loaded motion families with evidence labels.
- [x] Record native adaptations, reduced-motion rules and source inspection limitations.
- [ ] After plan approval, implement shared tokens and primitives.
- [ ] Compare finished desktop/mobile navigation, editorial grids and product galleries with applicable reference behavior.
- [ ] Verify all breakpoints, both languages, keyboard/touch, reduced motion, no-JS baseline and unsupported-feature fallbacks.
- [ ] Record final approved style changes here and summarize their verification in CHANGELOGS.md.


## Implemented design and verification — 2026-09-15

- `src/styles/generated/tokens.css` is generated from the YAML above. `globals.css` maps these tokens to shadcn/Tailwind and shared page patterns; `motion.css` owns motion. All controls have a 44px minimum target. The supplied font families remain unsupplied; system sans/serif fallbacks are active with no external font requests.
- The centered Normod wordmark retains the source artwork and its colour. Desktop uses the wordmark/utility row above tracked navigation. This adapts HAY's centered two-level masthead to the wider Normod logo. Mobile keeps the logo between the native menu and language controls.
- Desktop header space begins at 130px (82px wordmark row + 48px navigation). In supporting browsers, only the wordmark row contracts to 55px, for a 103px total, retaining both logo and navigation. HAY's source 55px total hides the large wordmark; that behavior is deliberately adapted here for navigation clarity. Unsupported browsers retain the expanded header.
- Home/collection/editorial images have square CSS corners, mixed landscape proportions and restrained captions. Any small rounded edge baked into a remote placeholder is part of the source image and can be removed by replacing that asset. No photograph is boxed in a generic rounded card.
- Native popover handles non-modal language/mobile navigation; native dialog handles modal filters and the expanded gallery. Native select/disclosure and CSS scroll snap provide the baseline. There is no animation, carousel or modal library.
- HAY's expanded mobile menu was inspected on 2026-09-15: a hamburger/close control, centered identity, a search line and centered uppercase category links, with page content remaining present. Normod uses the same light background and restrained link rhythm, with larger touch targets and a complete navigation list in a light-dismiss popover. Search belongs to the catalog.
- Applicable motion: 500ms underlines/popover entrances, 600ms alternate-image fades, CSS scroll-driven header/reveals and a 200ms native cross-document transition where supported. No client-side transition framework is added to Pages Router navigation. Reduced motion removes decorative transitions and movement. Essential content starts visible; the hero uses eager/high-priority loading without an opacity entrance.
- The first product hover image containing Turkish promotional text was replaced with a text-free close-up. The showroom image is an exterior entrance photo, with matching Turkish/English alt text. Contact coordinates were subsequently verified from the official source record.
- Browser checks covered 320, 390, 768, 1024 and 1440px across both languages, with no document overflow or broken visible images. Keyboard/Escape/focus return were verified for native menus, filters and the gallery. Broader browser-engine, reduced-motion emulation, 200% zoom, axe and Lighthouse runs are still release QA items; do not represent them as measured.
