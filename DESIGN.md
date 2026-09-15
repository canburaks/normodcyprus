---
version: alpha
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
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    size: "120px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    size: "120px"
    height: "40px"
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
Buttons are restrained and functional. `button-primary` uses a solid black fill with white text and compact `8px 16px` padding, making it suitable for the main action. `button-secondary` reverses the treatment with a white background and black outline for secondary actions. `button-tertiary` is text-only and should be used for low-emphasis actions, links, or utility navigation. Keep button heights near `40px` and avoid oversized, pill-like forms.

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