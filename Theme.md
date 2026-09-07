# Theme.md — Airnova Visual Theme

Status: **Current / in progress** — reflects PRD v1.0 §2 (Brand & Design Language). Update this file whenever a theme decision changes so design and dev stay in sync.

## 1. Identity
- **Committee:** Airnova — Drone & Aerospace Committee
- **Tagline:** "Flying Beyond Limits" — shown prominently in Hero
- **Backdrop watermark:** "Where passion meets propulsion" — large, low-opacity typographic layer

## 2. Visual Direction
Aerospace / aviation-tech aesthetic: deep navy & charcoal backgrounds, propulsion-orange or ion-blue accent, subtle grid/circuit or blueprint textures, drone/aircraft silhouettes. Reference site (djsnova.space) sets the structural/navigation convention; Airnova's palette and imagery are aerospace-specific, not astronomy-specific.

## 3. Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary background | Deep Navy | `#0B1220` | Base background across sections |
| Secondary background | Charcoal Slate | `#111A2E` | Alternating section panels/cards |
| Accent | Propulsion Orange | `#FF7A1A` | CTAs, highlights, hover states, icons |
| Text (muted) | Steel Blue-Grey | `#8FA3C4` | Secondary text, captions, watermark |
| Text (primary) | Off-white | `#F5F7FB` | Headings & body text on dark backgrounds |

> Optional secondary accent to consider (not yet finalized): **Ion Blue** for control-systems/tech-forward callouts, kept distinct from Propulsion Orange so it reads as a deliberate second accent rather than a clash. Open decision — log outcome here once chosen.

## 4. Typography

| Role | Typeface direction | Notes |
|---|---|---|
| Headings/display | Bold, modern sans-serif (Orbitron / Space Grotesk / Poppins style) | Carries the "aerospace-tech" personality; used for Hero heading, section titles |
| Body | Clean, readable sans-serif (Inter / Roboto) | Used for descriptions, card copy, footer |

- Keep to one display face + one body face; avoid a third typeface.
- Line length target: under 80 characters for body copy.
- Type scales with viewport using `clamp()`/`rem` units per PRD §4.1.

## 5. Watermark Treatment
- Phrase: **"Where passion meets propulsion"**
- Opacity: ~4–8%, never interferes with foreground legibility/contrast.
- Placement: Hero/Intro (required); optionally repeated behind Vision & Mission and Timeline.
- Implementation: fixed or slow-parallax background layer — CSS background text, SVG, or canvas (component: `Watermark.tsx`, see `Architecture.md`).
- Must respect `prefers-reduced-motion` — parallax disabled/static for users who opt out.

## 6. Motion Language
- Subtle parallax on Hero background.
- Scroll-triggered fade/slide-up entrances per section (single shared variant via `ScrollReveal.tsx` — not ad-hoc per component).
- Animated counters for achievements (e.g., "X Competitions," "Y Projects Built").
- Drone-propeller spin micro-interaction on relevant hover states (e.g., subsystem icons).
- Timeline: scroll-driven line-draw with nodes lighting up as the user scrolls.
- Transition timing: 200–300ms ease for hover/interactive states.
- One orchestrated moment per section, not stacked effects — keep restraint per section rather than animating everything simultaneously.

## 7. Card & Surface Language
- Subsystem cards: hover-lift + orange glow border on hover.
- Captain/Leadership card: circular or hexagonal photo frame with orange accent ring.
- Alternating panel backgrounds (Deep Navy ↔ Charcoal Slate) to separate sections without hard borders.

## 8. Accessibility Guardrails on Theme
- WCAG 2.1 AA contrast maintained for all text over watermark/dark backgrounds — verify Steel Blue-Grey text against Deep Navy specifically, since it's the tightest contrast pair in the palette.
- No color-only signaling (e.g., category tags on Projects should pair color with a text label).

## 9. Open Theme Decisions (track here as resolved)
- [ ] Finalize whether a second accent (Ion Blue) is used, and where.
- [ ] Confirm final display typeface (Orbitron vs Space Grotesk vs Poppins) after a type-scale test.
- [ ] Decide watermark implementation method: CSS text vs SVG vs canvas.
- [ ] Confirm icon style for subsystems (line icons vs filled) once custom SVGs are drafted.