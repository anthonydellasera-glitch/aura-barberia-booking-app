---
name: Aura Barbería
colors:
  surface: '#f9f9f6'
  surface-dim: '#dadad7'
  surface-bright: '#f9f9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#404944'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f1f1ee'
  outline: '#707973'
  outline-variant: '#bfc9c2'
  surface-tint: '#2d6952'
  primary: '#004430'
  on-primary: '#ffffff'
  primary-container: '#1f5c46'
  on-primary-container: '#95d2b6'
  inverse-primary: '#96d3b7'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#333d3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#4a5451'
  on-tertiary-container: '#bdc8c3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b2f0d3'
  primary-fixed-dim: '#96d3b7'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#10503b'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#dae5e0'
  tertiary-fixed-dim: '#bec9c4'
  on-tertiary-fixed: '#141d1b'
  on-tertiary-fixed-variant: '#3f4946'
  background: '#f9f9f6'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.03em
  display-md:
    fontFamily: Manrope
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a high-craft, editorial atmosphere for a premier grooming salon. The aesthetic fuses classical sartorial discipline with contemporary minimalism. It balances heritage masculine ritual with an airy, hospitable luxury that sets the experience apart from abrasive urban streetwear shops or sterile clinical chains.

The visual direction uses tailored minimalism: generous warm negative space, sculptural proportions, crisp hairline separations, and tactile feedback. The UI evokes quiet assurance, cleanliness, precision, and tactile indulgence. Micro-interactions are deliberate and grounded, featuring soft mechanical presses rather than bouncy, playful transitions.

## Colors

The palette is anchored by natural materials and organic patinas:

- **Primary (`#1F5C46` - Deep Forest Green):** The brand anchor. Applied to primary CTAs, active navigation indicators, time-slot selection states, and brand badges.
- **Secondary / Deep Neutral (`#1A1A1A` - Deep Charcoal):** High-contrast typography, primary iconography, and structural line emphasis. Replaces pure black to preserve warmth against off-white surfaces.
- **Surface & Background (`#F7F7F4` - Warm Calico/Alabaster):** The main canvas background tone, avoiding cold clinical whites.
- **Surface Raised (`#FFFFFF` - Pure White):** Used for elevated cards, modal sheets, and floating surface components to provide crisp layered contrast against the warm canvas.
- **Muted Text (`#71717A` - Slate Gray):** For metadata, service durations, inactive icons, and helper descriptions.
- **Borders & Dividers (`#E5E5E0` - Soft Limestone):** Hairline borders that cleanly segment sections without harsh visual breaks.
- **Success / Tint Badge (`#E8F3EE` - Sage Wash):** Subtle green ground for status badges, tags, and confirmed booking pills, paired with `#1F5C46` text.

## Typography

The design system exclusively adopts **Manrope** across all typographic applications. Manrope's open apertures, geometric construction, and high x-height combine functional clarity with sharp geometric accents that match classic grooming instruments.

- **Editorial Display & Headlines:** Headings utilize tight negative tracking (`-0.02em` to `-0.03em`) and high contrast weights (SemiBold, Bold) to project editorial presence.
- **Service Listings & Pricing:** Body copy prioritizes clear spatial separation, with monetary values and titles aligned in semi-bold charcoal.
- **Currency & Numerals:** Prices in USD (`$XX.00`) use tabular figures where vertical alignment is required.
- **Language Consideration:** Layouts in Spanish account for an average of 15–25% longer string lengths than English counterparts, especially on buttons and status tags.

## Layout & Spacing

Designed for mobile portrait viewports (390px–428px iPhone frame standards) as the primary form factor:

- **Canvas Frame:** Screen margins adhere to a strict `1.25rem` (20px) horizontal inset, preventing elements from pressing against screen bevels while maximizing content width.
- **Rhythm Scale:** Built upon an 8pt base grid with a 4pt sub-grid (`0.25rem` intervals) for micro-adjustments.
- **Content Blocks:** Vertical sections (e.g., "Nuestros Servicios", "Barberos Disponibles", "Próxima Cita") sit `2rem` (32px) apart with a consistent title-to-content gap of `1rem` (16px).
- **Safe Areas:** Native top notch/island safe clearance (min 44px–54px padding) and bottom home indicator safe zone clearance (34px) are preserved, with sticky booking CTAs suspended above the tab bar.

## Elevation & Depth

Visual hierarchy combines warm ambient shadows with crisp surface boundaries:

- **Flat Canvas (`z-0`):** Base screen background rendered in `#F7F7F4`.
- **Card Tier (`z-1`):** Pure white background (`#FFFFFF`), bounded by a subtle `1px solid #E5E5E0` border and an ambient warm shadow: `0px 2px 8px -2px rgba(26, 26, 26, 0.04), 0px 1px 3px -1px rgba(26, 26, 26, 0.02)`.
- **Active / Raised Elements (`z-2`):** Selected items, focused barber profile cards, and dropdown pickers feature an expanded warm shadow: `0px 8px 24px -4px rgba(31, 92, 70, 0.08), 0px 4px 12px -2px rgba(26, 26, 26, 0.04)`.
- **Sticky / Navigation Surfaces (`z-3`):** Bottom tab bar and sticky CTA containers use `rgba(247, 247, 244, 0.88)` with a `backdrop-blur-md` (12px blur) overlay, bordered at the top with `#E5E5E0`.

## Shapes

The interface balances soft organic corners with structured silhouettes:

- **Primary Cards & Containers:** Standardized at `16px` (`rounded-2xl`). This accommodates image containers, service rows, barber portrait thumbnails, and detail summaries.
- **Interactive Action Elements:** Buttons and interactive pills are set to `12px` to `16px` (`rounded-xl` to `rounded-2xl`), matching the visual hierarchy of the card system.
- **Avatars & Service Chips:** Barber portraits use soft rounded corners (`rounded-2xl` or `16px`) rather than full circles to support a modern editorial look. Categorical pills and status badges use pill geometry (`rounded-full`).

## Components

### Buttons
- **Primary Action (CTA):** Fixed height of `52px` (`h-[52px]`), border-radius `14px` (`rounded-xl`), background `#1F5C46`, text color `#FFFFFF` (`label-lg`, weight 600). Active touch state drops scale to `0.98` and dims background to `#184A38`.
- **Secondary Action:** Height `52px`, background `#FFFFFF`, border `1px solid #E5E5E0`, text color `#1A1A1A`. Active touch state transitions to `#F7F7F4`.
- **Time Slot Pill Button:** Interactive grid items (`h-[44px]`). Default state: `#FFFFFF` background with `1px solid #E5E5E0`. Selected state: `#1F5C46` background with white text and a soft green glow.

### Cards
- **Service Card:** White background, 16px corner radius, 16px internal padding. Left-aligned service title (`headline-md`) and duration in `#71717A` (`body-sm`). Price right-aligned (`headline-md`, `$XX.00`). Optional trailing checkbox or selection border that transitions from `#E5E5E0` to `#1F5C46`.
- **Barber Profile Card:** Vertical card layout with a `4:5` ratio portrait thumbnail (`rounded-xl`), name in bold charcoal, star rating badge (`#E8F3EE` container, `#1F5C46` icon/text), and specialties listed in muted gray.

### Bottom Navigation Bar
- Fixed at the bottom of the viewport with a total height of 64px + dynamic safe-area-inset.
- Background: `#FFFFFF` or frosted `#F7F7F4/90` with top border `1px solid #E5E5E0`.
- 4 primary tabs: **Inicio**, **Reservas**, **Barberos**, **Perfil**.
- Active State: Tab icon and label set to `#1F5C46` with a small 4px circular forest-green dot below the label. Inactive state: `#71717A`.

### Status Badges & Chips
- Background `#E8F3EE`, text `#1F5C46`, typography `label-sm` (uppercase, letter-spacing `0.05em`). Internal padding: `4px 10px`, radius `rounded-full`.
- Used for booking statuses (e.g., *Confirmada*, *En Proceso*), popular services (*Más Popular*), and barber availability indicators.

### Form Inputs & Date Selectors
- Height `50px`, background `#FFFFFF`, border `1px solid #E5E5E0`, radius `12px`.
- Focus state: Border transitions to `#1F5C46` with no abrasive browser outlines.
- Horizontal calendar strip: Scrollable day cards displaying weekday name (`body-sm`) over day number (`headline-md`), highlighting the active appointment day in `#1F5C46`.