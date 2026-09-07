# Theme.md — Airnova Visual Theme & Design System

> **Reference Document:** [Airnova_Website_PRD.pdf](file:///Users/seondsilva/Desktop/Airnova_Website/Airnova_Website_PRD.pdf) (§2, §4, §5)  
> **Status:** Current & Active — Aligned with PRD v1.0 specifications

---

## 1. Brand Identity

- **Committee:** Airnova — Drone & Aerospace Committee
- **Tagline:** *"Flying Beyond Limits"* — prominent display in Hero section
- **Backdrop Watermark:** *"Where passion meets propulsion"* — large-scale typographic layer
- **Aesthetic Direction:** Aerospace & Aviation-Tech — dark, high-contrast cockpit/avionics visual style with technical precision, carbon-fiber undertones, blueprint grids, and luminous propulsion accents.

---

## 2. Color Palette & Tokens

The color system is engineered for dark-mode dominance, WCAG 2.1 AA legibility, and high-impact aerospace branding:

| Token Role | Color Name | Hex Code | RGB | Tailwind Class / CSS Variable | Usage |
|---|---|---|---|---|---|
| **Primary Background** | Deep Navy | `#0B1220` | `11, 18, 32` | `bg-brand-navy` / `--bg-primary` | Base background across all primary sections |
| **Secondary Background** | Charcoal Slate | `#111A2E` | `17, 26, 46` | `bg-brand-slate` / `--bg-secondary` | Alternating panels, cards, containers, modals |
| **Primary Accent** | Propulsion Orange | `#FF7A1A` | `255, 122, 26` | `text-brand-orange`, `bg-brand-orange` | Primary CTAs, active states, glowing borders, hero highlights |
| **Secondary Accent** *(Optional)* | Ion Blue | `#00D2FF` | `0, 210, 255` | `text-brand-ion`, `bg-brand-ion` | Telemetry tags, circuit indicators, avionics highlights |
| **Muted Text / Border** | Steel Blue-Grey | `#8FA3C4` | `143, 163, 196` | `text-brand-muted`, `border-brand-border` | Secondary text, captions, inactive icons, watermark text |
| **Primary Text** | Off-White | `#F5F7FB` | `245, 247, 251` | `text-brand-light` / `--text-primary` | Main titles, headings, and high-contrast body text |

---

## 3. Typography & Sizing

### Typefaces
- **Headings & Display:** Bold, futuristic sans-serif (*Orbitron* / *Space Grotesk* / *Poppins*). Conveys precision aerospace engineering and telemetry displays.
- **Body Text:** Modern, ultra-legible geometric sans-serif (*Inter* / *Roboto*). Optimized for technical descriptions, card copy, and navigation labels.

### Fluid Type Scale (CSS `clamp()`)
Typography scales dynamically across screen dimensions to avoid awkward line wraps on mobile and under-sized headings on large screens:

- **Hero Title (`H1`):** `clamp(2.5rem, 6vw + 1rem, 5rem)` — Bold, tracked uppercase (`letter-spacing: 0.05em`)
- **Section Titles (`H2`):** `clamp(1.75rem, 3.5vw + 0.5rem, 3rem)` — Semi-bold with subtle orange gradient accent
- **Card / Subsystem Titles (`H3`):** `clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)` — Medium weight
- **Body Copy:** `clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)` — Line-height: `1.6`, maximum line length: `75ch`

---

## 4. Watermark Implementation Specification (PRD §2.3)

- **Phrase:** `"Where passion meets propulsion"`
- **Scale:** Large-scale display (spanning 60%–90% of container width or angled across viewport).
- **Opacity Range:** Strictly **4% to 8%** (`opacity: 0.04` – `0.08`).
- **Positioning:**
  - **Hero Section:** Mandatory fixed/slow-parallax background layer behind heading and aircraft graphics.
  - **Vision & Mission:** Subtle repeat behind the split-card container.
  - **Timeline / Journey:** Background presence along the vertical milestone rail.
- **Implementation Strategy:** SVG text or CSS background typography with `pointer-events: none`, `user-select: none`, and `z-index: 0`.
- **Accessibility Rule:** Must never reduce foreground contrast ratios below WCAG 2.1 AA standards (minimum 4.5:1 for normal body text).

---

## 5. Responsive Breakpoints & Layout Tokens (PRD §5.1)

| Breakpoint | Viewport Range | Grid Structure | Nav State | Component Adaptations |
|---|---|---|---|---|
| **Mobile (`sm`)** | `< 640px` | 1 column | Hamburger menu + slide-in drawer | Stacked cards, min 44px tap targets, vertical timeline |
| **Tablet (`md`)** | `640px – 1024px` | 2 columns | Condensed horizontal nav | 2-col subsystem & project cards, vertical timeline |
| **Desktop (`lg`)** | `1024px – 1440px` | 4 columns (subsystems) | Full horizontal nav + CTA button | Side-by-side Vision/Mission, alternating timeline cards |
| **Large Desktop (`xl`)**| `> 1440px` | Max width `1280px–1440px` | Centered layout container | Generous negative space, expanded card margins |

---

## 6. Motion & Micro-Interaction System (PRD §2.1, §5.2)

- **Timing Function:** `cubic-bezier(0.16, 1, 0.3, 1)` (smooth deceleration).
- **Hover Transitions:** `200ms – 300ms ease`.
- **Propeller Micro-Interaction:** Custom drone/aircraft icons trigger a subtle, continuous 360-degree rotation (`animation: spin 0.8s ease-in-out`) when hovering on subsystem cards.
- **Card Lift:** On hover, cards elevate (`transform: translateY(-6px)`) accompanied by a luminous Propulsion Orange glow (`box-shadow: 0 10px 25px -5px rgba(255, 122, 26, 0.25)`).
- **Scroll Entrance:** Standardized `ScrollReveal` component using Framer Motion (`y: 30px, opacity: 0` → `y: 0px, opacity: 1` over `0.6s`).
- **Timeline Progressive Draw:** Vertical timeline SVG line draws dynamically as user scrolls down the page.
- **Accessibility Safeguard:** When `prefers-reduced-motion: reduce` is detected, all transform and continuous rotation animations are disabled.

---

## 7. Component Styling Guidelines

### Sticky Navbar
- **Initial (Hero):** Transparent background (`bg-transparent`), borderless, crisp white links.
- **Scrolled (> 50px):** Dark navy with backdrop blur (`bg-[#0B1220]/85 backdrop-blur-md border-b border-[#111A2E]`), active anchor highlighted in Propulsion Orange.

### Buttons & CTAs
- **Primary CTA:** Solid Propulsion Orange (`bg-[#FF7A1A] text-white hover:bg-[#E0640D] shadow-lg shadow-[#FF7A1A]/30 font-semibold rounded-md px-6 py-3`).
- **Secondary CTA / Ghost:** Outline style (`border border-[#8FA3C4]/40 text-[#F5F7FB] hover:border-[#FF7A1A] hover:text-[#FF7A1A] rounded-md px-6 py-3`).

### Subsystem Icons & Badges (PRD §4.3)
Each subsystem is paired with an icon and aerospace theme role:
- **Aerodynamics & Structure:** Wing / Airfoil
- **Propulsion:** Rocket / Thruster
- **Control Systems:** Circuit Board / Flight Joystick
- **Research & Development:** Microscope / Flask
- **Sponsorship:** Handshake / Collaboration
- **Documentation:** Clipboard / Technical Blueprint
- **Finance & Inventory:** Ledger / Hardware Vault
- **Social Media:** Megaphone / Broadcast Antenna

### Flagship Project Category Badges (PRD §4.6)
Project cards feature high-contrast category badges:
- **Fixed-wing / Aerodynamics** (`border-[#00D2FF]/40 text-[#00D2FF] bg-[#00D2FF]/10`)
- **Vertical Take-Off & Landing** (`border-[#FF7A1A]/40 text-[#FF7A1A] bg-[#FF7A1A]/10`)
- **Radio-controlled fixed-wing** (`border-[#8FA3C4]/40 text-[#8FA3C4] bg-[#8FA3C4]/10`)
- **Propulsion / Aerospace research** (`border-purple-400/40 text-purple-300 bg-purple-500/10`)
- **Control Systems / HCI innovation** (`border-emerald-400/40 text-emerald-300 bg-emerald-500/10`)
- **Bio-inspired flapping-wing flight** (`border-amber-400/40 text-amber-300 bg-amber-500/10`)
- **Bio-mimetic micro air vehicle** (`border-pink-400/40 text-pink-300 bg-pink-500/10`)

### Leadership / Captain Spotlight Card (PRD §4.4)
- **Photo Frame:** Circular or hexagonal frame with an outer 2px Propulsion Orange accent ring (`ring-2 ring-[#FF7A1A] ring-offset-4 ring-offset-[#0B1220]`).
- **Bio Container:** Charcoal Slate card (`bg-[#111A2E]`) with social profile icon links (LinkedIn, Instagram, Email).

---

## 8. Open Theme Decisions & Resolution Tracker

| Decision Item | Options Under Evaluation | Current Status |
|---|---|---|
| **Secondary Accent** | Ion Blue (`#00D2FF`) vs. pure monochrome | Adopted as optional telemetry/tag highlight color |
| **Primary Display Font** | Orbitron vs. Space Grotesk vs. Poppins | Orbitron for Hero branding; Space Grotesk for Section Titles |
| **Watermark Technique** | SVG element vs. CSS text vs. HTML5 Canvas | SVG text component with CSS pointer-events none |
| **Subsystem Icon Styling** | Outlined line art vs. filled duotone SVGs | Outlined Lucide/custom SVGs with hover propeller spin |