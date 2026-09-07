# Architecture.md — Airnova Website

> **Reference Document:** [Airnova_Website_PRD.pdf](file:///Users/seondsilva/Desktop/Airnova_Website/Airnova_Website_PRD.pdf) (v1.0)  
> **Benchmark Reference:** [djsnova.space](https://djsnova.space)

---

## 1. Overview

Airnova's website is a modern, high-performance, single-page-application (SPA) style website built with Next.js (App Router). It features persistent sticky navigation with smooth anchor scrolling across all primary sections, supported by dedicated sub-pages (`/achievements`, `/projects`) for deeper content exploration. 

The architecture is **component-driven**, **content-config-driven** (enabling committee members to edit copy, milestones, projects, and bios in structured JSON without touching codebase logic), and **animation-layered** on top of a static-first render (SSG).

---

## 2. Tech Stack

| Layer | Technology | PRD Reference | Architectural Rationale |
|---|---|---|---|
| **Framework** | Next.js (React 18+, App Router) | PRD §6.1 | SSR/SSG for instant page loads and maximum SEO discoverability; aligns with reference site architecture |
| **Styling** | Tailwind CSS + CSS Modules | PRD §6.1 | Utility speed for responsive grids + CSS modules for custom watermark layer and timeline animations |
| **Animation** | Framer Motion (+ optional GSAP) | PRD §6.1 | Declarative scroll-triggered reveals, hero parallax, and progressive SVG line-drawing for the timeline rail |
| **Icons** | Lucide React + Custom SVGs | PRD §6.1 | High-performance UI icons + custom aerospace/drone vector glyphs for subsystems |
| **Content Management** | Structured JSON / Markdown | PRD §6.1, §7 | Separates content state from presentation layer; enables quick asset swaps without code changes |
| **Forms** | Formspree / EmailJS / Custom API | PRD §6.1 | Serverless handling of sponsorship inquiries and recruitment submissions |
| **Hosting & CI/CD** | Vercel / Netlify | PRD §6.1 | Git-integrated automated deployments, preview environments, and global edge CDN caching |

---

## 3. Directory & File Structure

```text
airnova-website/
├── app/
│   ├── layout.tsx                # Root layout, Google fonts, metadata, global providers
│   ├── page.tsx                  # Home page (assembles all anchor-linked sections)
│   ├── achievements/page.tsx     # Deep-dive achievements & competition records sub-page
│   ├── projects/page.tsx         # Detailed flagship projects catalog sub-page
│   ├── sitemap.ts                # Next.js dynamic XML sitemap
│   └── robots.ts                 # Next.js robots.txt handler
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky, transparent-to-solid on scroll, mobile hamburger
│   │   └── Footer.tsx            # Quick links, social icons, campus address, dynamic copyright
│   ├── sections/
│   │   ├── Hero.tsx              # Full-viewport hero, tagline, aircraft visual, backdrop watermark
│   │   ├── VisionMission.tsx     # Split-card vision & mission statements
│   │   ├── Subsystems.tsx        # 8-card responsive subsystem showcase
│   │   ├── Leadership.tsx        # Captain feature card (extensible to leadership grid)
│   │   ├── Timeline.tsx          # Connected milestone journey (2019 → 2025)
│   │   ├── Projects.tsx          # 7 flagship engineering projects with category tabs
│   │   ├── Achievements.tsx      # Awards list, photo masonry gallery, and lightbox
│   │   └── Sponsorship.tsx       # Partner tiers, sponsor logo grid, "Partner with us" CTA
│   └── ui/
│       ├── Watermark.tsx         # Reusable backdrop watermark text component
│       ├── Card.tsx              # Aerospace-style card container with orange hover-glow
│       ├── AnimatedCounter.tsx   # Viewport-triggered numerical stat counter
│       ├── Lightbox.tsx          # Accessible modal viewer for gallery imagery
│       └── ScrollReveal.tsx      # Framer Motion wrapper for unified entrance transitions
├── content/                      # Content Store (Single Source of Truth for text/data)
│   ├── site.json                 # General metadata, tagline, watermark string, nav items
│   ├── subsystems.json           # 8 subsystem entries (names, descriptions, icon mappings)
│   ├── timeline.json             # 2019 / 2021 / 2023 / 2025 milestones and descriptions
│   ├── projects.json             # 7 flagship projects (names, categories, descriptions, renders)
│   ├── captain.json              # Captain name, title, bio, photo placeholder, socials
│   ├── achievements.json         # Competition victories, year, award rank, photo links
│   └── sponsors.json             # Sponsor tiers, corporate logos, partnership benefits
├── public/
│   ├── images/                   # Optimized WebP/AVIF imagery (projects, leadership, gallery)
│   └── icons/                    # Custom SVGs for subsystems and aerospace badges
├── styles/
│   └── globals.css               # Tailwind base layers + CSS variable design tokens
└── lib/
    ├── utils.ts                  # Class merge helpers, date formatting, analytics hooks
    └── types.ts                  # TypeScript interfaces for all content configuration files
```

---

## 4. Component & Data Flow Architecture

```
[ content/*.json ]  (Single Source of Truth)
       │
       ├──> app/page.tsx (Static Site Generation)
       │       │
       │       ├──> <Navbar /> ─── (Reads scroll state for transparent ↔ solid transition)
       │       │
       │       ├──> <Hero /> ─────> <Watermark text="Where passion meets propulsion" />
       │       │
       │       ├──> <VisionMission />
       │       │
       │       ├──> <Subsystems /> ───> [ 8 Subsystem Cards with Glow Borders ]
       │       │
       │       ├──> <Leadership /> ───> [ Captain Profile (Extensible to Grid) ]
       │       │
       │       ├──> <Timeline /> ─────> [ Interactive Rail + Scroll-drawn Line ]
       │       │
       │       ├──> <Projects /> ─────> [ 7 Flagship Vehicle Cards + Category Filter ]
       │       │
       │       ├──> <Achievements /> ─> [ Stats Counters + Masonry Gallery + Lightbox ]
       │       │
       │       ├──> <Sponsorship /> ──> [ Sponsor Logo Grid + Formspree / EmailJS CTA ]
       │       │
       │       └──> <Footer /> ───────> [ Dynamic Year, Nav Links, Campus Map Link ]
```

1. **Content Isolation:** Components never hardcode copy. All text, milestone dates, vehicle specs, and links are imported from `/content/*.json`.
2. **Backdrop Watermark Layer (`Watermark.tsx`):** A shared, absolute/fixed backdrop component rendered behind Hero, Vision & Mission, and Timeline sections. Set to `pointer-events-none`, `user-select-none`, low opacity (4%–8%), and layered behind foreground DOM trees via negative z-indexing.
3. **Unified Motion Wrapper (`ScrollReveal.tsx`):** Unifies entrance animations across all sections through a shared Framer Motion variant (`opacity: 0, y: 30` → `opacity: 1, y: 0`), preventing disparate animation styles.
4. **Scroll Awareness:** A lightweight scroll listener in `Navbar.tsx` manages navbar background opacity and updates active anchor state based on `IntersectionObserver` thresholds.

---

## 5. Responsive Breakpoint Strategy (PRD §5.1)

The application adheres strictly to the responsive layout requirements outlined in PRD §5.1:

| Breakpoint | Viewport Width | Target Devices | Layout Behavior |
|---|---|---|---|
| **Mobile** | `< 640px` | Phones (portrait/landscape) | Single column layout, full-screen mobile slide-in navigation drawer, stacked cards, touch targets ≥ 44px, vertical timeline rail. |
| **Tablet** | `640px – 1024px` | iPads, tablets, small laptops | 2-column subsystem and project grids, condensed horizontal nav, vertical timeline. |
| **Desktop** | `1024px – 1440px` | Laptops, desktop monitors | 4-column subsystem grid, horizontal nav with CTA button, side-by-side Vision & Mission layout, alternating left-right timeline milestones. |
| **Large Desktop** | `> 1440px` | Ultra-wide / 4K displays | Max content width container (`1280px`–`1440px`) centered horizontally with generous negative space. |

---

## 6. Interaction, Motion & Accessibility Architecture

### Reactive Interaction Patterns (PRD §5.2)
- **Navbar Transformation:** Fully transparent on the hero section, transitions to frosted dark navy with backdrop blur (`backdrop-blur-md bg-[#0B1220]/90`) once scrolled past 50px.
- **Micro-interactions:** Interactive hover states across buttons, subsystem cards, and project cards with 200–300ms cubic-bezier transitions. Subsystem icons feature subtle drone-propeller spin animations on cursor hover.
- **Scroll-Driven Timeline:** Milestone progress line draws itself dynamically down the viewport using SVG `strokeDashoffset` coupled with Framer Motion / GSAP scroll trigger listeners.
- **Dynamic Counters:** `AnimatedCounter.tsx` executes ease-out integer count-ups when intersecting the viewport.

### Accessibility Architecture (WCAG 2.1 AA) (PRD §5.3)
- **Contrast Ratios:** All body text (`#8FA3C4`, `#F5F7FB`) on dark backgrounds (`#0B1220`, `#111A2E`) achieves a minimum contrast ratio of 4.5:1. Text overlaid on the watermark maintains AA rating due to the watermark's low opacity cap (4%–8%).
- **Motion Accommodations:** Respects `prefers-reduced-motion: reduce`. When active, all parallax transformations, scroll-draw effects, and particle animations degrade to clean, instantaneous state transitions.
- **Keyboard Navigation & ARIA:** Comprehensive keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-[#FF7A1A]`), descriptive `aria-expanded` and `aria-label` tags for the hamburger menu, and descriptive alt text for all vehicle renders and member imagery.

---

## 7. Content Config Schemas

### Subsystems Schema (`content/subsystems.json`)
Covers the 8 functional wings defined in PRD §4.3:
```json
[
  { "id": "aero", "name": "Aerodynamics & Structure", "icon": "wing", "description": "Airframe design, structural stress analysis, composite manufacturing, CFD simulation." },
  { "id": "propulsion", "name": "Propulsion", "icon": "rocket", "description": "Motor thrust profiling, ESC telemetry, battery management, hybrid drive systems." },
  { "id": "controls", "name": "Control Systems", "icon": "circuit-board", "description": "Autopilot integration, PID stabilization, autonomous waypoint navigation, obstacle avoidance." },
  { "id": "rd", "name": "Research & Development", "icon": "microscope", "description": "Biomimetic flight mechanics, flapping-wing aerodynamics, novel UAV configurations." },
  { "id": "sponsorship", "name": "Sponsorship", "icon": "handshake", "description": "Corporate relations, grant acquisition, industrial partnerships, committee pitch decks." },
  { "id": "documentation", "name": "Documentation", "icon": "clipboard-list", "description": "Engineering Design Reports (EDR), flight journals, competition rule compliance." },
  { "id": "finance", "name": "Finance & Inventory", "icon": "wallet", "description": "Budget forecasting, BOM tracking, hardware asset management, procurement." },
  { "id": "social", "name": "Social Media", "icon": "megaphone", "description": "Digital storytelling, flight demo reels, community engagement, recruitment PR." }
]
```

### Flagship Projects Schema (`content/projects.json`)
Covers the 7 engineering builds defined in PRD §4.6:
```json
[
  { "id": "gliders", "name": "Gliders", "category": "Fixed-wing / Aerodynamics", "description": "High-efficiency unpowered and micro-powered aerodynamic soaring platforms." },
  { "id": "vtol", "name": "VTOL", "category": "Vertical Take-Off & Landing", "description": "Hybrid transition aircraft merging hover flexibility with long-range fixed-wing cruising." },
  { "id": "rc-planes", "name": "RC Planes", "category": "Radio-controlled fixed-wing", "description": "High-agility aerobatic and payload delivery RC aircraft." },
  { "id": "rocketry", "name": "Rocketry", "category": "Propulsion / Aerospace research", "description": "Solid-motor sounding rockets with dual-deployment avionics and altitude telemetry." },
  { "id": "gesture-drone", "name": "Gesture-Controlled Drone", "category": "Control Systems / HCI", "description": "Wearable sensor-driven quadcopter controlled via hand gestures and computer vision." },
  { "id": "ornithopter", "name": "Ornithopter", "category": "Bio-inspired flapping-wing flight", "description": "Avian-mimicking flapping aircraft with dynamic leading-edge wing flex." },
  { "id": "bionic-butterfly", "name": "Bionic Butterfly", "category": "Bio-mimetic micro air vehicle", "description": "Ultra-lightweight micro air vehicle mimicking insect kinematic efficiency." }
]
```

---

## 8. Performance Architecture & Core Web Vitals (PRD §6.2)

- **Lighthouse Target:** Score ≥ 90 across Mobile and Desktop for Performance, Accessibility, Best Practices, and SEO.
- **First Contentful Paint (FCP):** `< 1.8s` over simulated 4G connections.
- **Largest Contentful Paint (LCP):** `< 2.5s` through priority loading (`priority={true}`) of the hero aircraft visual and zero font-render blocking via `next/font`.
- **Cumulative Layout Shift (CLS):** Near zero (`< 0.05`) by reserving explicit aspect-ratio containers for imagery, watermark typography, and card grids.
- **Asset Optimization:** Automatic next-gen format delivery (AVIF/WebP) with responsive `srcset` generation via `next/image`.

---

## 9. SEO & Metadata Implementation (PRD §6.3)

- **Heading Hierarchy:** Strictly one semantic `<h1>` tag in the Hero section (`AIRNOVA — Flying Beyond Limits`); `<h2>` tags for section titles; `<h3>` for cards.
- **Metadata Objects:** Standardized Open Graph (OG) and Twitter Card tags in `app/layout.tsx` for high-fidelity social previews.
- **Automated Sitemaps:** Next.js Route Handlers produce dynamic `sitemap.xml` and `robots.txt` honoring staging vs. production environments.

---

## 10. Browser & Device Support Matrix (PRD §6.4)

| Platform / Browser | Version Support | Validation Notes |
|---|---|---|
| **Google Chrome** | Latest 2 major versions | Desktop & Android |
| **Apple Safari** | Latest 2 major versions | Desktop macOS & iOS Safari |
| **Mozilla Firefox** | Latest 2 major versions | Desktop |
| **Microsoft Edge** | Latest 2 major versions | Desktop |
| **Low-Power / Older Devices** | CSS fallback | Degrades complex blur and canvas effects to solid colors and static layouts |

---

## 11. Future-Proofing & Extensibility (PRD §4.4, §4.3)

1. **Leadership Expansion:** The Leadership component is engineered with a modular grid structure that seamlessly scales from a single Captain spotlight to a multi-tiered leadership directory (Vice-Captain, Technical Leads, Operations Leads) without rewriting layout CSS.
2. **Subsystem Click-to-Expand:** Subsystem cards support an optional accordion or modal state to display subsystem leads and member lists once rosters are populated.
3. **Sub-Page Separation:** Dedicated routes for `/achievements` and `/projects` allow the committee to expand into full technical case studies, telemetry logs, and video galleries as content matures.