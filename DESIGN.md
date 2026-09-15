---
version: hay-fidelity-2026-09-15
name: HAY Minimal Editorial
description: Measured HAY geometry and motion with Normod identity and bilingual
  showroom content.
colors:
  primary: "#0A0A0A"
  secondary: "#F2F2F2"
  tertiary: "#CCCCCC"
  neutral: "#FFFFFF"
  surface: "#F2F2F2"
  on-surface: "#0A0A0A"
  error: "#B00020"
  primary-90: "#1A1A1A"
  primary-60: "#666666"
  primary-30: "#B3B3B3"
  surface-90: "#E8E8E8"
  product-panel: "#ECECEC"
  action-border: "#55BBBA"
typography:
  headline-display:
    fontFamily: ITCNewBaskervilleRoman
    fontSize: 28px
    lineHeight: 39.2px
    letterSpacing: 2.5px
    fontWeight: 400
  headline-lg:
    fontFamily: ITCNewBaskervilleRoman
    fontSize: 35px
    lineHeight: 49px
    letterSpacing: 2.5px
    fontWeight: 400
  headline-md:
    fontFamily: ITCNewBaskervilleRoman
    fontSize: 20px
    lineHeight: 28px
    letterSpacing: 1.1px
    fontWeight: 400
  headline-sm:
    fontFamily: ITCNewBaskervilleRoman
    fontSize: 20px
    lineHeight: 28px
    letterSpacing: 1.1px
    fontWeight: 400
  body-lg:
    fontFamily: ITCNewBaskervilleRoman
    fontSize: 23px
    lineHeight: 33px
    letterSpacing: 0px
    fontWeight: 400
  body-md:
    fontFamily: NeueHelvetica55Roman
    fontSize: 12px
    lineHeight: 23px
    letterSpacing: 1px
    fontWeight: 400
  body-sm:
    fontFamily: NeueHelvetica55Roman
    fontSize: 13px
    lineHeight: 23px
    letterSpacing: 0px
    fontWeight: 400
  label-lg:
    fontFamily: NeueHelvetica55Roman
    fontSize: 12px
    lineHeight: 19.2px
    letterSpacing: 2px
    fontWeight: 400
  label-md:
    fontFamily: NeueHelvetica55Roman
    fontSize: 12px
    lineHeight: 18px
    letterSpacing: 1.5px
    fontWeight: 400
  label-sm:
    fontFamily: NeueHelvetica55Roman
    fontSize: 11px
    lineHeight: 16px
    letterSpacing: 1px
    fontWeight: 400
  headline-mobile:
    fontFamily: ITCNewBaskervilleRoman
    fontSize: 25px
    lineHeight: 35px
    letterSpacing: 2.5px
    fontWeight: 400
  product-mobile:
    fontFamily: ITCNewBaskervilleRoman
    fontSize: 26px
    lineHeight: 36.4px
    letterSpacing: 2.5px
    fontWeight: 400
rounded:
  none: 0px
  sm: 0px
  md: 0px
  lg: 0px
  xl: 0px
  full: 9999px
spacing:
  xs: 8px
  sm: 15px
  md: 25px
  lg: 40px
  xl: 130px
  gutter: 50px
  margin: 20px
responsive:
  breakpoints:
    small-menu: 410px
    grid: 640px
    navigation: 768px
    inset: 900px
    desktop: 1024px
    caption: 1300px
    wide: 1600px
  container-max: 1440px
  page-inset-mobile: 20px
  page-inset-tablet: 35px
  section-gap-mobile: 40px
  control-target-min: 44px
font-fallbacks:
  sans: Helvetica, Arial, sans-serif
  serif: Georgia, serif
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
    block: cubic-bezier(0.03, 0.69, 0.36, 1.01)
  delay:
    none: 0ms
    title: 100ms
    stagger-step: 120ms
    detail: 200ms
    action: 250ms
    close: 300ms
    preview: 500ms
  distance:
    reveal-mobile: 90px
    reveal-desktop: 90px
  header:
    expanded-desktop: 130px
    compact-desktop: 55px
    mobile: 70px
components:
  button-primary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 10px
    size: auto
    height: 40px
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    size: 120px
    height: 44px
  button-tertiary:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 0px
  card:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: 0px
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  chip:
    backgroundColor: "{colors.surface-90}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
geometry:
  row-padding-mobile: 10px
  row-padding-desktop: 30px
  column-padding-mobile: 10px
  column-padding-desktop: 25px
  gutter-mobile: 20px
  gutter-desktop: 50px
  item-gap-mobile: 20px
  item-gap-desktop: 40px
  header-gap-mobile: 35px
  portrait-ratio: 910 / 1100
  portrait-factor: 1.2087912087912087
  landscape-ratio: 1390 / 800
  hero-ratio: 2000 / 1151
  caption-padding: 20px 40px
  caption-padding-compact: 20px 0px 0px
  header-threshold: 360px
  footer-gap: 50px
---

# HAY design specification — measured reference

**Audit date: 2026-09-15. Status: measured design implemented; geometry and interaction verification recorded below. Licensed typography and final photography remain fidelity limits.**

The user requires the same pixel-perfect design as hay.com. The first implementation was superseded by the measured rebuild. This specification replaces the earlier approximate interpretation and discretionary adaptations. Layout, card types, typography, breakpoints and motion must follow the measured reference below. Preserve Normod identity, bilingual JSON content, Pages Router and the showroom-only business rules.

**Token migration complete:** the YAML above is the active source for 146 generated CSS variables and responsive layout JSON. Run `pnpm design:generate` after edits. The application uses the measured geometry, zero-radius surfaces, serif roles, 70/130/55px header states and 90px reveals. Do not edit generated files independently. Font family names record the reference; available system fallbacks render until licensed files are supplied.

## 1. Evidence, scope and measurement conventions

Measurements came from the live international HAY site, rendered browser screenshots, DOM rectangles, computed styles and the loaded first-party [haybrand.css](https://www.hay.com/b18.0.0.2/Frontend/CSS/haybrand.css). Approximately 1,412 CSS rules were traversed. CSS declarations alone do not establish whether an effect is active. Hover checks below include settled computed values; intermediate animation frames were excluded.

- **Observed:** rendered layout or interaction was exercised and inspected.
- **CSS:** source declaration exists; activation or exact runtime choreography remains unverified.
- **Derived:** calculation from measured dimensions or responsive classes.
- **Required:** Normod implementation requirement, not a claim about HAY's runtime.

All sizes are **CSS pixels**. The main desktop sample is viewport **1440 × 1000**, document client width **1425** because the browser reserves a 15px scrollbar. Mobile is **390 × 844**, client width **375**. Short pages without a scrollbar can have client width equal to viewport width. Coordinates are document positions unless identified as fixed/viewport positions. Measurements are rounded to 0.01px; fractional sizes and HAY's integer masonry placement can differ by roughly 1px.

Media loaded dimensions, reserved aspect-ratio boxes and filename dimensions can differ slightly. Preserve actual registered ratios; do not infer image dimensions from filenames. Text wrapping depends on content and actual font availability. A matching viewport, scrollbar, font, content and settled state are necessary for literal screenshot comparison.

### Pages and states inspected

| Reference | Coverage | Normod mapping |
| --- | --- | --- |
| [Homepage](https://www.hay.com/) | Desktop/mobile; 10-width media matrix; hero and lower rows; footer; editorial hover; expanded/compact header | `/`, `/en` |
| [Sofas](https://www.hay.com/products/furniture/seating/sofas) | Desktop category menu, intro, full-width family banners | Collections index |
| [Mimi family](https://www.hay.com/products/furniture/seating/sofas/mimi) | Desktop/mobile collage, product hover, card colors, inline touch captions | Collection detail; product discovery composition |
| [Mimi 1 Seater](https://www.hay.com/hay/furniture/seating/lounge/mimi-1-seater) | Desktop/mobile split/stack; details expansion; variants/family/story sections | Product detail |
| [Mimi upholstery variant](https://www.hay.com/hay/furniture/seating/lounge/mimi-1-seater-upholstery-bolgheri-lgg60) | Desktop square image variant and information layout | Alternate product media ratio |
| [HAY's World](https://www.hay.com/hays-world) | Desktop/mobile masonry; settled hover; category change; load more | Blog index |
| [Mimi article](https://www.hay.com/news/news-2026/mimi-sofa-by-philippe-malouin) | Desktop/mobile title, lead, video and editorial blocks | MDX article template |
| [Inspiration](https://www.hay.com/inspiration) | Desktop mixed-ratio two-column collage | `/us` inspiration |
| [High summer dining](https://www.hay.com/inspiration/summer-dining) | Desktop image composition, product caption links, absence of hotspots | Editorial story renderer |
| [Contact chooser](https://www.hay.com/footer/contact_1) | Desktop native topic select; navigating to Offices | Utility contact reference |
| [Offices](https://www.hay.com/footer/contact) | Desktop title, lead, square office cards | Supplementary contact reference |
| [Store locator](https://www.hay.com/functions/store-locator) | Desktop input, filters, list/map split | Reference only; one Cyprus store needs no worldwide locator |
| [Denmark stores](https://www.hay.com/functions/hay-stores/hay-stores-denmark) | Desktop/mobile photos, contact text and footer | Primary Cyprus contact composition |
| [Search](https://www.hay.com/functions/search) | Desktop input, live query, six Mimi results | Catalog search styling |

Header/menu coverage includes desktop Products overlay, compact-header expansion, mobile opening and Furniture expansion. No purchase, account, newsletter subscription or contact submission was performed.

Supporting structured values: [hay-measurements.json](reports/design/hay-measurements.json). The [initial design snapshot](reports/design/initial-design-superseded.md) is historical only. Old passing functionality/overflow checks in [verification.md](reports/verification.md) do not establish design fidelity.

## 2. Global geometry and responsive rules

### Container model

HAY uses a centered **90rem / 1440px maximum row**, outer row padding and separate column padding. An image does not reach the row boundary. Reproduce the resulting geometry with shared CSS primitives; importing Foundation or HAY's scripts is unnecessary.

| Viewport range | Row horizontal padding | Column padding per side | Visible image-to-image gutter | Visible outer media inset |
| --- | ---: | ---: | ---: | --- |
| Below 640px | 10 | 10 | 20 | 20px |
| 640–900px | 10 | 25 | 50 | 35px |
| Above 900 through 1600px | 30 | 25 | 50 | 55px while row fills document |
| Above 1600px | 0 | 25 | 50 | Centered 1440px row + 25px |

At 1440/client 1425: row width 1425; row content width 1365; full-width media 1315. At 1800/client 1785: centered row starts at 172.5; full-width media starts at 197.5 and is 1390 wide.

For a span of `n` in the 12-column grid: `mediaWidth = rowContentWidth × n / 12 − 2 × columnPadding`. Masonry placement may round positions, while widths remain fractional. Do not add another gap on top of column padding.

### Breakpoints are independent

| Threshold | Behavior |
| --- | --- |
| 374px | CSS social-icon wrapping adjustment below this width |
| 410px | Mobile menu category headings increase from 12px to 15px; top-level links increase from 12px bold to 20px bold until desktop navigation begins |
| 640px / 40em | Medium grid begins; column padding becomes 25px; homepage changes to three portrait tiles and two landscape tiles |
| 768px | Desktop masthead/navigation replaces hamburger navigation |
| 900px | Row inset changes from 10px to 30px above this width |
| 1024px / 64em | Four-column product collage, two-panel product detail and desktop product hover behavior. Homepage row spacing changes from20px to40px and caption bottom padding from0px to20px |
| Above 1300px | `.generalbrandsiteblock .section-text` resumes the base40px side padding; its≤1300px override is0px. Keep this scoped to that block type |
| 1600px | Row side padding is removed above this width; centered max-width row dominates |

The 640–767px homepage genuinely has three narrow portrait cards beneath a mobile header. Do not replace that with an invented two-column tablet layout. Each page family's span assignments differ.

### Homepage image size matrix — observed

| Viewport / client | Left inset | Hero width × height | Each third width × height | Each half width × height |
| --- | ---: | --- | --- | --- |
| 320 / 305 | 20 | 265 × 152.50 | 265 × 320.33 | 265 × 152.52 |
| 390 / 375 | 20 | 335 × 192.78 | 335 × 404.94 | 335 × 192.80 |
| 639 / 624 | 20 | 584 × 336.08 | 584 × 705.92 | 584 × 336.11 |
| 640 / 625 | 35 | 555 × 319.39 | 151.66 × 183.31 | 252.5 × 145.31 |
| 767 / 752 | 35 | 682 × 392.48 | 194 × 234.50 | 316 × 181.86 |
| 768 / 753 | 35 | 683 × 393.06 | 194.33 × 234.89 | 316.5 × 182.16 |
| 900 / 885 | 35 | 815 × 469.03 | 238.33 × 288.08 | 382.5 × 220.14 |
| 1024 / 1009 | 55 | 899 × 517.36 | 266.33 × 321.92 | 424.5 × 244.31 |
| 1440 / 1425 | 55 | 1315 × 756.78 | 405 × 489.55 | 632.5 × 364.02 |
| 1800 / 1785 | 197.5 | 1390 × 799.94 | 430 × 519.77 | 670 × 385.61 |

This matrix records media geometry only. Header/caption readings taken during viewport transitions were excluded from it.

## 3. Color, type, borders and controls

### Surfaces

| Role | Value |
| --- | --- |
| Default page, navigation overlay, footer | `#F2F2F2` |
| Main text | `#0A0A0A` |
| Product-detail body/header | `#FFFFFF` |
| Product image/information shared panel | `#ECECEC` |
| Store button / expansion circle outline | `#55BBBA`, 1px |
| Native contact select | `#FEFEFE`, border `#CCCCCC` |
| Secondary desktop menu links | `#404041` |
| New badge | `#DEDEE0` |
| Product hover background | Per-image/product JSON color, not a universal brand color |

Images and editorial/product cards have **zero corner radius, no border, no shadow and no padded card shell**. Product images include their photographic surroundings; do not automatically convert lifestyle photographs into contained cutouts. Generic rounded shadcn cards and pill filters are not this reference.

### Typography by role

Declared sans stack: `NeueHelvetica55Roman, Helvetica, Roboto, Arial, sans-serif`. Declared serif stack: `ITCNewBaskervilleRoman, Georgia, serif`. Computed family names establish CSS intent, not which licensed font actually rasterized. Font files are not supplied to this repository. Do not hotlink HAY's font service or claim a system fallback is a pixel match.

| Role | Size / line height | Weight | Tracking | Alignment/case |
| --- | --- | --- | --- | --- |
| Desktop top navigation | 12 / 19.2 | 400 sans | 2px | Center, uppercase |
| Category submenu | 12 / 18 | 400 sans | 1.5px | Center, uppercase |
| Desktop mega-menu category heading | 18 / 28.8 | 400 serif | 2px | Left, uppercase + slash |
| Desktop menu section link | 15.5 / 24.8 | 400 serif | 0.4px | Left |
| Desktop nested menu link | 14 / 22.4 | 400 | Role-dependent | Left, gray |
| Editorial image caption | 20 / 28 | 400 serif | 1.1px | Center, uppercase + slash |
| Collection descriptive text | 12 / 23 | 400 sans | 1px | Center, maximum 500px |
| Product h1 / major product sections, desktop | 35 / 49 | 400 serif | 2.5px | Center, uppercase |
| Product h1, 390px mobile | 26 / 36.4 | 400 serif | 2.5px | Center, uppercase |
| Product description | 13 / 23 | 400 sans | Normal | Center, maximum 450px desktop |
| Product overlay label | 12 / 23 | 300 sans | 1px | Center, uppercase |
| Touch product label | 11 / 23 | 300 sans | 1px | Center, uppercase, below image |
| News category/title | 11 / 16 | Sans | 1px | Center; category uppercase, title normal case |
| Article/store h1, desktop | 28 / 39.2 | 400 serif | 2.5px | Center, uppercase + slash; max 860px |
| Article/store h1, mobile | 25 / 35 | 400 serif | 2.5px | Center, uppercase + slash |
| Editorial lead | 23 / 33 | 400 serif | Normal | Center, max 710px desktop |
| Footer link | 12 / 20 | 400 sans | 2px | Center, uppercase |
| Footer base | 11 / 16.5 | 400 sans | 1px | Center |
| Store action | 12 / 18 | 500 sans | 1.1px | Uppercase |

Preserve appropriate semantic h1/h2 structure in Normod while matching these visual roles. HAY sometimes uses an h3 where a main title would be appropriate. Slash punctuation and all human-readable labels must come from localized JSON, consistent with the user brief. Case transformation must respect Turkish `i/İ`.

### Controls

- Product store action: measured **110.33 × 40px** for the English source label; padding 10px, 1px teal outline, transparent background, square corners. Width follows label length. Hover becomes white over 250ms ease.
- Expansion control: overall 250 × 80px; uppercase 12px/18, tracking 2px; 30 × 30px circular teal outline at top 30px. Two 11 × 1px black strokes form a plus, rotating to an X on expansion.
- Native contact select: desktop **670 × 39px** on the scrollbar-free 1440px page; 16px sans, padding 8px, white fill, 1px gray border, 16px bottom margin.
- Search page field: **400 × 50px**, 40px/50 sans, centered, transparent, x520/y180 in the initial scrollbar-free desktop state. No surrounding heavy search card.
- Keep a minimum 44px interaction target through surrounding hit area where the visual control is smaller. A focus indicator is required and must not cause layout shift.

## 4. Header and navigation states

### Expanded desktop — observed

Fixed header height **130px**, initial background matches the page. Top padding 11px. **Navigation is above the logo.** At 1440/client1425, the inner region is x55/width1315; navigation line starts y11 and is 39.19px high. Links have 10px vertical and 20px horizontal inner padding.

The centered HAY logo anchor is **100 × 35px**, x662.5/y62.19. The artwork inside that box is smaller than its link bounds. Search sits toward the right; there is no large utility/cart strip. Use the Normod artwork in the corresponding composition and document its differing aspect ratio. Do not reverse the rows to accommodate it.

### Compact desktop — observed resting state

Header becomes **55px total**, padding `11px 20px 0`. The large logo fades to zero and scales to 0.5 while translating upward. Primary navigation collapses to zero height/opacity. A centered trigger made of two 30 × 2px lines appears; the search entry remains at the right. Clicking “Show full header” restores the expanded masthead.

Header height/top-padding and logo changes take 300ms ease. Compact trigger appears over 1000ms; its default fade-out is 200ms. The exact source JavaScript scroll threshold/direction algorithm was not established. The earlier Normod **103px** compact header that retained both rows is incorrect.

### Desktop Products overlay — observed + CSS

- Full light-gray viewport overlay, fixed top 50px, padding-top 100px, nominal height 100vh; scroll content max-height `calc(100vh - 190px)`.
- Three left-aligned category groups plus right-side product preview space on large screens. Headings use the type table above; child row bottom margin 5px. Do not reuse the current small floating menu panel.
- Entry: opacity 0→1 and translateY(-30px)→0, 500ms ease. Close control centered near the top; 50px box with thin diagonal strokes, 500ms transitions and 300ms decorative delay.
- Fourth-level category list: opacity/height/transform 300ms; source hidden state translates X by -90px. A seven-item list has a 220px expanded height in CSS; avoid hard-coding that height for translated dynamic content.
- Hover preview opacity changes over 300ms; base delay 500ms, explicit visible/invisible state resets delay. Preview is hidden below 1024px; 1024–1200px has max-width300px. Exact category-preview pointer sequence is CSS evidence only.
- Underline: 2px, bottom5px, width `calc(100% - 44px)`, scaleX0→1 with centered origin, 500ms ease. Selected/current states retain it.

### Mobile — observed at 390 × 844

Header is **70px**, padding15px0. Logo anchor100×23 atx137.5/y24. Hamburger anchor24×40 atx20/y21, three thin strokes; opening converts it to an X. Main homepage/product media starts at **y105**, leaving35px beneath the fixed header.

Open navigation begins at y70 and fills the remaining viewport; width375, height774, padding `0 20px 100px`, background#F2F2F2. It scrolls internally. Search is an underline with a large outline search icon near the right. Links are centered; Products opens Furniture/Lighting/Accessories headings. Furniture expansion reveals bold 16px section links and normal 14px deeper links. No side preview image.

At390px, category headings are12px/19.2, tracking1.2; source increases them to15px from410px. Top-level links are12px bold below410px,20px bold from410px, then reset to12px regular at768px. Menu opacity300ms; hamburger strokes500ms, middle stroke disappears over200ms on opening. Mobile logo opacity has a300ms delay in CSS.

Native `<dialog>` or popover should reproduce the appropriate modality while retaining focus, Escape and return-focus behavior. Visual fidelity does not require inheriting inaccessible source focus/scroll behavior. Language selection is a Normod requirement absent from this header reference; place it as a quiet menu/footer utility without altering masthead row geometry.

## 5. Homepage composition

### Screenshot regression correction — 2026-09-15

The three-column switch at640px does **not** enable desktop vertical spacing. The collection category cards share this rule through their `.generalbrandsiteblock` ancestor. Live source CSS keeps `.mix-item` margin-bottom20px and `.generalbrandsiteblock .section-text` padding-bottom0px through1023px. At1024px these become40px and20px respectively. Caption side padding stays0px through1300px, then becomes40px. Keep these three breakpoints independent.

At the user's679px viewport /664px client width, the settled source hero is594×341.844 at(35,105); its one-line heading begins at466.844. The portrait row starts at529.844, with164.656×199.031 frames and50px gutters. The previous implementation started the portrait row40px too low because both caption bottom padding and row gap switched early. `flow-root` contains the tile's final15px heading margin.

Home portrait links require **cover photography**, including close-ups. Keep product cutouts in the catalog; a contained cutout on a portrait home frame creates visible letterboxing. The Klem home card now uses the existing verified upholstery photograph `klem-three-2`; all three frames fill to their edges. Use concise bilingual family captions, with words that fit a151.656px card at the640px boundary. Turkish uses “koltuk serisi”, “modüler serisi” and “ahşap serisi”; English uses the corresponding short “series” wording. Full collection names remain in the collection records. The localized decorative suffix starts with U+00A0 to keep the slash with the final word. Inspect **text bounds**, not just document overflow, before accepting captions.

The registered Normod wordmark renders in black in the masthead using a CSS brightness filter, matching the reference's contrast while retaining Normod's actual artwork.


**Sequence: one full-width landscape image → three portrait images → two landscape images → compact footer.** These are editorial links, not a hero marketing panel followed by a product grid. Each image has a centered uppercase serif caption ending in a slash. The inspected hero has no eyebrow, paragraph or button underneath.

### Desktop coordinates — 1440/client1425

| Element | x | y | Width | Height |
| --- | ---: | ---: | ---: | ---: |
| Hero image | 55 | 130 | 1315 | 756.78 |
| Hero caption box | 55 | 886.78 | 1315 | 83 |
| Portrait row images | 55 / 510 / 965 | 1009.78 | 405 each | 489.55 |
| Portrait caption boxes | Same columns | 1499.33 | 405 each | 111 for two-line labels |
| Landscape row images | 55 / 737.5 | 1650.33 | 632.5 each | 364.02 |
| Footer start | 0 | 2187.34 | 1425 | Content-dependent |

Hero reserved ratio is approximately2000:1151; portrait ratio910:1100; lower landscape ratio approximately1390:800. One-line desktop caption is83px: padding20px40px, line-height28, h3 margin `0 5px 15px`. Two-line caption becomes111px. Grid item bottom margin40px; the last item's margin can be removed. Do not replace this with a single arbitrary section-gap value.

### Mobile

All six images occupy one column below640px. At390/client375: hero x20/y105,335×192.78; its caption is two lines,20/28serif, padding20px0 0. The next image starts at **y408.78**. Parent item/caption margins include a15px heading margin outside the caption box; measure the resulting spacing rather than summing a clipped box. Item bottom margin20px. Portrait images335×404.94; lower landscapes335×192.80.

### Hover and entrance

The hero's actual `a.box-hover` photo **does fade to opacity0.4**, verified after pointer entry. Its computed transition is800ms. A separate `.hero` CSS exception does not apply to the inspected homepage hero markup. Earlier assumptions that this hero retained opacity1 on hover were wrong.

Below-fold images and caption containers use opacity plus **90px upward arrival**, generally800ms ease. Their wrappers also contain400ms opacity/800ms transform rules. Avoid applying the same90px travel twice to nested wrappers. The initially visible main image must load promptly; a visible initial baseline and reduced-motion handling remain required by the project.

## 6. Collections and product discovery cards

### Collections index reference: Sofas

**Settled-state correction during implementation:** the earlier full-width category-banner reading was taken before HAY's layout script finished. The settled Sofas page uses `small-6 medium-4 large-4`: two landscape cards below640px, three from640px. At1280/client1265, measured media are351.656×202.188px; positions x55/456/858 are rounded by HAY's masonry script. At1440/client1425 the derived media width is405px. Use1390:800 landscape ratio. This corrects the earlier full-width-banner direction in the audit and plan.

The category submenu is **fixed**, top110px, z-index120 above source header100, padding-top10px, total50.203px. Child anchors are35.203px high. Content beginsy170. Intro title20/28serif uppercase/slash, then max500px12/23 paragraph. Its text wrapper pads20px top/30px bottom; the following item margin adds40px. Thus media begin70px after the paragraph. Source first media y372 includes its three-line description; Normod's shorter copy changes the y position by whole23px lines.

The implementation retains a fixed category bar above the masthead surface; it moves below the compact header when that state is active. Three collections come from JSON. No source catalog download is invented.

### Collection detail reference: Mimi

After the centered collection introduction, products form a **mixed-span masonry collage on a four-column base**, not equal-height rows. Desktop first-product y625 is specific to the source's long description, not a universal fixed top offset.

| Source item | Small span / 12 | Medium span / 12 | Large span / 12 | Desktop image size | Desktop x / y |
| --- | ---: | ---: | ---: | --- | --- |
| First | 6 | 6 | 3 | 291.25 × 352.05 | 55 / 625 |
| Second | 6 | 6 | 3 | 291.25 × 352.05 | 396 / 625 |
| Third | 12 | 12 | 6 | 632.5 × 764.55 | 737 / 625 |
| Fourth | 6 | 6 | 6 | 632.5 × 764.55 | 55 / 1017 |
| Fifth | 6 | 6 | 3 | 291.25 × 352.05 | 737 / 1429 |
| Sixth | 6 | 6 | 3 | 291.25 × 352.05 | 1078 / 1429 |

40px bottom gaps. Native CSS masonry/Grid Lanes may progressively enhance a deterministic curated CSS Grid fallback. Store responsive spans/order in neutral JSON and preserve source/keyboard reading order. CSS multi-column layout must not silently change discovery order.

Mobile390/client375: small images **157.5×190.56**, full-span image **335×405.34** after loading. First two cards are side by side, third fills the row, fourth/fifth share a row, sixth begins the next. Small card box219.38px high includes the visible caption; bottom margin20px. The reserved ratio can differ fractionally from the loaded file.

### Desktop product hover — observed

`dynamic-background` cards fade the photograph **1→0**, revealing a per-product solid color, and fade the centered product label **0→1**. Both image and label take600ms ease. There is **no alternate photograph crossfade, zoom, shadow or lift** in the inspected state.

Verified source samples: Mimi1 background `#98562D` with white label; Mimi2 `#AD9270` with black label; third `#492814` with white label. These are source examples, not colors to assign to unrelated Normod products. Store suitable background/foreground pairs in JSON for each registered image.

Background color transition enters over200ms; leaving takes400ms with300ms delay. Overlay label is centered atleft50%/top50%, transform `translate(-50%, -60%)`, max-width320px, padding0 15px,12px/23 sans300,tracking1. The accessible name must remain present when the visual title is hidden. Keyboard focus should expose the same informative state immediately.

### Touch and smaller widths

At≤1023px, background becomes transparent, overlay behavior is disabled, text flows beneath the image with opacity1/no transform and padding-top5px,11px/23 sans. It remains a product link. Source “NEW” badge sits -4px top/left with6px12px padding and10px small/14px large type; add a Normod badge only when its status is supported by JSON.

## 7. Product detail

### Desktop: equal adjacent panels

White page/header. Product panel beginsy130 atx55,width1315. Image and information are **657.5px each**, with **no gutter between them**, over#ECECEC. The portrait model image is657.5×794.77; the inspected upholstery variant is657.5×657.5square. The media ratio controls panel height.

Information column has25px side padding; inner width607.5; `product-info` padding20px top/100px bottom and vertical centering. Centered35/49serif heading; maximum450px description13/23sans, margins25px top/20px bottom and13px bottom padding. Source model h1 beginsy223.38. Store button uses the outlined control defined above.

The download/more-info control sits at the bottom center of the information half. Clicking expands an **inline full-width details panel**, not a modal. Observed expanded height427.38px for the inspected content. Child max-width900px; desktop padding120px top/110px bottom/10px sides. Plus rotates intoX over500ms; background250ms. The source height animation appears script-controlled; exact duration was not measured and must not be invented.

Below: variants, family, story, designer, related products. Major headings35/49serifcaps tracking2.5. Initial desktop variant row shows three405×405square images with load-more behavior; family uses mixed-span product cards.

**Gallery evidence:** both inspected product `.product-image` containers contain a single image, with no thumbnail strip, carousel arrows, zoom button or lightbox control. The existing Normod gallery is a functional extension, not a verified HAY pattern. Keep the primary split composition faithful; decide the secondary gallery's placement explicitly in the rebuild plan.

### Mobile: stacked image and information

At390/client375, panelx20/y105,width335; image335×404.94. Information follows directly on gray, with10px side padding; innerwidth315. H1 is26/36.4 with40px top/15px bottom margin. Inner padding remains20px top/100px bottom. The long source description remains visible at13/23. The inspected complete panel is1321.33px tall; text length makes that value content-specific. Inline expanded details reduce vertical padding to40px in source CSS.

## 8. News, articles and inspiration

### News index

Two equal masonry columns at desktop: media width632.5; first image632.5×364.13, second632.5×764.41. Both starty170. Image ratio varies by asset; captions remain below the image. First tile total421.13, second821.41; desktop bottom gap40px. Mobile uses one335px-wide column; first landscape192.63 high, first total249.63, observed30px gap to the next tile. Keep this distinct from generic product-card spacing.

The small category submenu replaces a large promotional heading. Category/title labels use11/16sans tracking1. Category margin15px0 10px; title margin5px0 0. Category interaction updates a hash containing page size/page/category; load more increased10→20 records. Normod need not reproduce that legacy hash syntax; preserve local URL-based state requirements.

**Settled news hover is opacity0.4 with600ms computed transition.** This was exercised on the live `.box.info` inside the news page. The generic `.box.info` stylesheet has an opacity0.2 rule and80px white “EXAMINE” circle, but the news `.pulse` override sets the circle to `display:none`. Do not add the generic circle or use0.2 merely because those declarations appear in the bundle. This overrides the earlier source-only inventory.

### Article template

Centered h1 max860px,28/39.2serifcaps tracking2.5,45px bottom margin. At1440/client1425 it startsx282.5/y130. Lead max710px atx357.5/y219.19,23/33serif,30px bottom margin. Full-width video/image follows; the inspected article then interleaves asymmetric photo rows, compact captions, quotations, biography and related products.

Some rows deliberately leave grid columns empty: observed portrait photosx168.75 and851.25 rather than always touching the outer content edge. Preserve authored offsets/spans in JSON/allowlisted MDX blocks. Do not render every article as the current uniform wide prose column.

Mobile h1 is25/35 atx20/y85,width335 and wraps to70px for the inspected title. Media uses335px width; article video box335×197.44. Exact following y-coordinates depend on translated lead length. No author badge/date row was visible in this HAY sample; Normod author/date remain truthful metadata requirements and drafts stay unpublished until confirmed.

### Inspiration index and detail

Index: no large intro above the grid. Two columns each632.5px wide, mixed portrait/landscape images, serif uppercase20/28slash captions. First portrait atx55/y130,height764.55; second landscape atx737/y130,height364; next right image startsy617 while the left continues to~1017.

Summer-dining detail uses centered title/lead followed by paired portrait media, then three-column arrangements and linked product captions. Initial paired item boxes682.5px wide atx30/712.5,y449.19; image width632.5. **No `.image-pin` hotspot elements were present on this inspected detail.** Hotspot styles remain CSS-only evidence, not a mandatory observed feature.

## 9. Contact and store pages

### Reference choices

The HAY contact chooser is a sparse utility page: centered contact label and native topic select; choosing Offices navigates to another page. Offices uses28/39.2serifcaps title,23/33lead and four square291.25px posters with centered12/23contact copy. These are not a large contact-form hero.

For Normod's single physical store, use the **Denmark store page's editorial composition** as the primary reference:

- Desktop heading at y130; first row beginsy219.19.
- Three columns: two **405×489.55 portrait photos** atx55 and510; centered contact details in the third atx965. Text12/23sans,tracking1, underlined email/booking links.
- Further rows combine offset portrait and wider imagery.
- Mobile title25/35 atx20/y85; first335×404.94photo at y170; second at594.94; contact text follows at1019.88. One-column semantic order,20px item gaps.

Only one genuine Cyprus showroom photo is registered so far: a1020×573 exterior. Additional portrait/interior photographs are an asset gap. Do not label unrelated Normod interiors as the Cyprus store or stretch the existing landscape image into a portrait. Match the composition with honest sourced media and document any provisional crop/slot.

### Locator reference only

Source desktop locator has a City/Area underline field and restrained category text controls above a25% list /75% map split; list around313.75×700, map700px high. Map is muted gray/blue and map images disable transitions. A global retailer map, geolocation request and worldwide filters are unnecessary for this one-store scope. Keep the verified Cyprus address/email/directions data in JSON; no invented local services or policies.

## 10. Footer

HAY's footer is a **compact centered set of links, social icons and company information**, not the current large four-column brand/contact footer.

- Base11px/16.5sans,tracking1px; bottom margin30px.
- Link container margins30px top/bottom. Individual centered link wrappers use inline-block and margins5px15px. Links12px/20 uppercase,tracking2px; underline2px with500ms scale transition.
- Link wrappers are plain `.text-center` inline blocks with content-sized widths. Their parent carries `small-up-2 medium-up-6` classes, but the links are not `.column` children; those class names do **not** make this a two/six-column link grid. The containing block spans7/12 and is centered at large sizes; at medium sizes it spans8/12 with a2/12 offset.
- Centered “Follow us” lead12px/18, margin-bottom30; row of compact social icons. Below374px icons have a66.6666% container and38px line-height rule.
- Company items inline-block,12px type, margins7px3px; service line24px high; last service block padding40px top/20px bottom. Wrap naturally on small screens.
- Section entry uses400ms opacity/800ms transform from90px; no logo mega-block above the links.

Use only real Normod links/social destinations and localized company/store data. The HAY-specific corporate attribution, VAT, smiley, newsletter and country links are not Normod content.

## 11. Complete inspected motion-family inventory

This table covers the motion families found in the inspected first-party stylesheet plus separately observed widgets. It is not a claim that every route or third-party campaign on hay.com was exercised. Prefer narrow opacity/transform transitions over copying `transition: all` literally.

| Family / source selector | Timing and state | Evidence / implementation handling |
| --- | --- | --- |
| `.site-header` | Height/top padding300ms ease;130→55 desktop | Observed; match final states |
| `.site-header__logo` | Opacity/transform300ms; mobile opacity delay300ms; compact hides/scales/translates | Observed resting desktop states + CSS |
| `.minimized-trigger` | Default opacity200ms; minimized entry1000ms | Observed trigger + CSS |
| `.site-navigation` | Opacity300ms | Observed mobile/compact states |
| `.navigation-icon__line`, action icon | Transform500ms; middle opacity500ms normally/200ms opening | Observed icon change + CSS |
| `.navigation__overlay` | Opacity/translateY(-30px)500ms | Observed desktop opening + CSS |
| `.navigation-overlay__close` | Opacity/line rotation500ms, desktop300ms delay | CSS; close must be immediately usable |
| Fourth-level list/indicator | Height/opacity/translateX(-90px)300ms; indicator transform/top300ms | CSS; do not fix height to English content |
| Navigation/footer/country/sitemap underline | ScaleX500ms ease | Observed links + CSS |
| `.sub-menu` | Top/transform300ms; compact translates/scalesY | Observed resting submenu + CSS |
| Navigation hover preview | Opacity300ms; base delay500ms overridden by visible/invisible state | CSS; preview exists, full pointer sequence unverified |
| Navigation spot / `.pulse-page a:hover img` | Opacity500ms rule | CSS; inspect final specificity |
| `.backlink` | Margin300ms | CSS |
| `.trans`, `.mix-item`, `.box`, footer rows | Opacity400ms / transform800ms; source offset90px | Observed below-fold states + CSS |
| `.section` text/media, general editorial images |800ms ease, opacity0→1 and Y90→0 | Observed geometry/resting state + CSS |
| News masonry wrappers | Inline transform400ms override | Observed computed style |
| `.dynamic-background` | Color200ms enter;400ms leave after300ms delay | Observed product color state + CSS |
| Product `.box img`, `.box-text` | Image1→0/text0→1,600ms | Observed desktop; disabled≤1023px |
| `.box-text a` | Transform/opacity400ms, delay250ms | CSS-only nested action |
| General `a.box-hover` | Photo/video opacity0.4 | Observed home hero800ms; actual news600ms |
| Generic `.box.info` | Image0.2, white80px circle scale0.8→1/opacity0→1 over400ms | CSS-only generic; **news suppresses circle and settles image0.4** |
| `.hero` exception | Hover keeps opacity1 | CSS-only for matching markup; homepage hero does not match |
| `.product` entrance | Opacity400ms / transform1000ms | CSS; avoid delaying initial product media |
| `.product-image img` | Opacity1200ms | CSS; visible, reserved media baseline required |
| `.product-action`, `.product-action-alt` |250ms; outlined action hover becomes white | Observed action + CSS |
| `.btn-expand`, `.btn-loadmore` | Background250ms; plus/X transform500ms | Observed expanded panel/load-more + CSS |
| Load-more entry | Opacity/translateY20px1000ms | CSS; new results must remain discoverable |
| Lazy media `.fadeIn` | Opacity1000ms | CSS; never delay above-fold asset loading |
| Video iframe | Opacity800ms | Observed embed + CSS; no automatic Normod video sourcing |
| `.block-fading` |500ms cubic-bezier(0.03,0.69,0.36,1.01) | CSS |
| `.image-pin` entry | Opacity/transform400ms;120ms stagger increments across ten pins | CSS-only; none on inspected inspiration detail |
| Hotspot icon/popup | Icon500ms; popup opacity400ms | CSS-only; native popover if later justified by JSON |
| Hotspot contents | Title400ms after100ms; price400ms after200ms; action400ms after250ms | CSS-only; price entirely excluded from Normod |
| Generic `.button` | Background/text250ms ease-out | CSS |
| Form fields | Shadow500ms ease, border250ms ease-in-out | CSS; immediate accessible focus required |
| Generic `.overlay__inner` |300ms | CSS; use native top layer |
| `.animateRpt`, `.animateInOnly` | Entry/leave500ms | Legacy Angular CSS; do not import framework |
| `.animateToggle` | Opacity500ms | Legacy CSS |
| Drilldown submenu | Transform150ms linear | Legacy CSS; native nested controls preferred |
| Off-canvas wrappers/exit | Transform/background500ms | Legacy CSS; source runtime not needed |
| Slider fill/handle |200ms ease-in-out,0ms during drag | CSS-only; no slider requirement |
| Switch paddle/knob |250ms ease-out | CSS-only; no switch requirement |
| Tabs | General500ms | CSS-only; no tabs invented |
| Thumbnail | Shadow200ms ease-out | CSS-only; inspected product has no thumbnail gallery |
| Loading `.cross.spinning` | `spinning`1.2s ease infinite | CSS-only; no decorative loading loop required |
| `.search.searching` | `searching`4s ease infinite | CSS-only; source live search debounce500ms from DOM |
| `.buysplash` | `pageFadein`2s ease | Commerce source CSS; excluded |
| Footer smiley |800ms cubic-bezier(0.68,-0.55,0.27,1.55) | HAY-specific CSS; excluded |
| Footer dropdown entries |800ms | CSS-only |
| Store locator input/map | Input100ms; map images no transition | Observed map + CSS |
| `.notrans`, map/drag overrides | No transition | Preserve explicit immediate states |

### Third-party widgets, kept separate

The live site showed a pale blue/gray newsletter teaser near the bottom-right, including mobile. Consent/newsletter rules were present during the initial audit: 200ms teaser/button feedback, 300–500ms panel/overlay changes and widget-specific transitions. These are campaign/consent UI, not a shared HAY card pattern. No subscriptions were made, every campaign variation was not exercised, and the Normod brief excludes newsletter capture. Preserve source-only notes in the historical snapshot; do not install trackers or widgets for visual similarity.

### Native motion implementation requirements

- Shared CSS owns motion. Use CSS scroll/view timelines, scroll-state containers and View Transition API only where browser support and the required state semantics are appropriate. Native fallback remains readable and usable.
- Do not add GSAP, Framer Motion, legacy Angular, Foundation JavaScript or a masonry package to replicate these states.
- Recreate **90px reference travel** for applicable below-fold reveals; the prior arbitrary16/24px travel is superseded. Use a visible initial/no-JS baseline; do not delay LCP media to imitate a loading artifact.
- Reduced motion uses final opacity/position, removes translation/scale/staggers/loops and retains immediate controls. This is a project requirement; source reduced-motion behavior was not fully tested.
- Scope hover effects to hover-capable input, add focus equivalents, and keep mobile product captions visible. Avoid making labels available only to pointer users.
- Same-document Next.js navigation does not gain an animation from cross-document `@view-transition` alone. No HAY route-transition effect was verified, so the prior arbitrary200ms page transition is not reference evidence.
- Record runtime thresholds and measured interpolation separately from CSS durations; do not claim an unmeasured scroll threshold or inline expansion duration as a sourced value.

## 12. Implementation status and remaining fidelity differences

Implemented and browser-inspected: navigation above logo;70/130/55px headers; native desktop/mobile menus; six-tile homepage; three-column/two-column collection cards; authored six-slot product collages;600ms color-reveal product hover; equal product panels; native inline specifications; secondary gallery; contact; mixed-ratio inspiration/news; serif article/story layouts; compact footer and shared motion.

| Remaining difference | Current behavior |
| --- | --- |
| Licensed typography unavailable | Helvetica/Arial and Georgia render, with the measured sizes/weights/line-heights. Turkish glyphs display correctly. Font shape and line breaking are not an exact raster match. |
| Normod content and replaceable imagery | Geometry follows HAY; photos, product silhouettes, wordmark, localized copy length and image-intrinsic corners differ. Source URLs remain in the registry. |
| Only one genuine Cyprus photo | Natural1020:573 photo occupies two-thirds of the desktop contact row; contact occupies one-third. A second photo in `store.gallery` enables two photo columns. |
| News fallback | CSS columns preserve readable column order; native Grid Lanes/masonry enhances supporting engines. Chromium used here supports neither. Inspiration has an authored Grid fallback with source-order placements instead of runtime masonry. |
| Source-only interactions | No fabricated fourth-level taxonomy, preview choreography, unavailable downloads, variants, source social accounts or commerce. The existing gallery and URL filters remain useful Normod extensions. |
| Acceptance tooling | No multi-engine, physical touch, automated axe, reduced-motion emulation or full200% zoom result is claimed. Initial HTML and CSS fallbacks were checked separately. |

See [implementation verification](reports/design/implementation-verification.json) and [verification report](reports/verification.md). Controlled desktop/mobile media dimensions match the recorded reference within1px; this is not a claim that every text/photo pixel matches.

## 13. Data and component contracts for the rebuild

- Neutral JSON layout records need stable tile IDs, kind (`editorial`, `product`, `news`), asset/entity references, responsive spans/offsets/order, and per-card hover background/foreground. Human-readable captions, alt text and navigation labels remain in both locale trees.
- Asset records retain width/height, intended ratio, focal point if cropped, source provenance, placeholder flag and usage. Do not hide a missing photo by reusing an unrelated store photograph.
- Keep image and caption navigation consistent. A full card should have one clear accessible destination; avoid duplicate tab stops caused by separately linked identical content.
- Separate layout from appearance: container/column primitive; editorial image/caption; color-reveal product media/label; news image/meta; product split/information/disclosure; store photo/contact blocks.
- Suggested micro folders: `components/layout/site-header/{site-header,desktop-navigation,mobile-navigation,compact-trigger}.tsx`; `components/content/editorial-tile/{editorial-tile,editorial-caption}.tsx`; `components/catalog/product-tile/{product-tile,product-tile-media,product-tile-label}.tsx`; `components/editorial/story-layout/`; shared geometry and motion remain central. Adapt existing folders rather than adding duplicate systems.
- Named exports, dash filenames, minimal props, composition, JSON-only content and shadcn/native controls remain mandatory. A library's default rounding/padding must not overwrite the measured reference.

## 14. Acceptance and evidence limits

- [x] Inspect 14 representative HAY URLs and the page/state inventory above.
- [x] Record measured container/card/type values and a10-width homepage matrix.
- [x] Exercise desktop product/editorial/news hover, compact header, mobile menu expansion, product details and news load-more.
- [x] Resolve actual news hover/circle overrides and homepage hero selector mismatch.
- [x] Map first-implementation discrepancies and asset dependencies to PLAN.md.
- [x] Implement the measured design in shared tokens, JSON layouts and components.
- [ ] Compare fixed reference states at390×844 and1440×1000 with the same document client width; require≤1px difference in controlled container/media geometry.
- [x] Check640/768/900/1024/1300/1600 boundaries and320/1800 extremes; inspect caption wrapping and card families. See measured matrix and coverage limits.
- [ ] Verify resting/hover/leave/open/closed/compact/reduced-motion states, keyboard/touch and both languages after the rebuild.
- [ ] Capture durable reference/local screenshots with viewport/font/state metadata and record remaining differences. Browser screenshots were inspected during this audit, but no image files are claimed in this repository.

Not yet established: exact JavaScript header-collapse threshold/direction logic; exact inline details expansion duration; desktop preview-image pointer choreography; actual licensed-font rasterization; native touch-device behavior; every source browser engine; every archive/professional/country/download page; every gallery/hotspot/widget variant; source reduced-motion and no-JS accessibility. These limits do not weaken the measured rules above and must not be converted into invented behavior.

### Implementation choices — 2026-09-15

- Native IntersectionObserver marks initially below-fold items for a one-time800ms opacity/90px arrival. It leaves initial and no-JS content visible. No scroll listener or motion library is used.
- Header compaction observes a360px sentinel. This is an implementation threshold; source runtime threshold/direction behavior remains unverified.
- Native details opens immediately; its circle rotates plus→X in500ms. Height interpolation is intentionally not presented as a source-measured duration.
- Product cutout images use `mix-blend-mode: multiply` over#ECECEC; their frame fit and focal point are JSON-owned. Contain keeps the complete object visible where the placeholder has a different aspect ratio.
- Native popover, dialog, details and select retain browser semantics. Language links in menu/footer are a necessary bilingual utility.
- Development-only article previews show a localized draft label, omit missing author/date and force noindex. Production builds exclude draft routes and cards.
