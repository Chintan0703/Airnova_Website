# AIRNOVA — Official Website

> **Tagline:** *"Flying Beyond Limits"*  
> **Motto / Backdrop Watermark:** *"Where passion meets propulsion"*

Welcome to the official repository for the **Airnova Drone & Aerospace Committee** website. This project serves as the committee's premier digital gateway — communicating its vision, mission, engineering subsystems, flagship projects, competitive achievements, and timeline to prospective members, sponsors, competition judges, faculty, and the aerospace community.

The website is designed as a modern, reactive single-page-application (SPA) with smooth anchor navigation, immersive aerospace-themed visual aesthetics, and structured data configuration for zero-code content management. The structural benchmark for layout and navigation conventions is based on [djsnova.space](https://djsnova.space), tailored to Airnova's aerospace and drone engineering identity.

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Goals & Target Audience](#-goals--target-audience)
- [Information Architecture & Page Flow](#-information-architecture--page-flow)
- [Section Specifications](#-section-specifications)
  - [1. Hero / Intro](#1-hero--intro)
  - [2. Vision & Mission](#2-vision--mission)
  - [3. Subsystems (8)](#3-subsystems-8)
  - [4. Leadership / Captain](#4-leadership--captain)
  - [5. Journey & Timeline](#5-journey--timeline)
  - [6. Flagship Projects](#6-flagship-projects)
  - [7. Achievements & Gallery](#7-achievements--gallery)
  - [8. Sponsorship](#8-sponsorship)
  - [9. Footer & Contact](#9-footer--contact)
- [Brand & Design System](#-brand--design-system)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Directory Structure](#-directory-structure)
- [Getting Started](#-getting-started)
- [Content Management & Placeholder Tracker](#-content-management--placeholder-tracker)
- [Success Metrics & Roadmap](#-success-metrics--roadmap)
- [Project Documentation Links](#-project-documentation-links)

---

## 🚀 Project Overview

- **Organization:** Airnova — Drone & Aerospace Committee
- **Document Benchmark:** [Airnova_Website_PRD.pdf](file:///Users/seondsilva/Desktop/Airnova_Website/Airnova_Website_PRD.pdf) (v1.0)
- **Status:** Planning & Active Development
- **Deployment Target:** Vercel / Netlify

The digital experience combines high-impact visual storytelling (aircraft/drone blueprints, propeller micro-interactions, low-opacity watermark parallax) with robust engineering standards (SSG/SSR, WCAG 2.1 AA accessibility, near-zero CLS, Lighthouse scores ≥ 90).

---

## 🎯 Goals & Target Audience

### Core Goals & Objectives

| Goal | Description | Priority |
|---|---|---|
| **Brand Presence** | Establish Airnova as a credible, technically serious drone & aerospace committee through strong visual identity. | **High** |
| **Recruitment** | Attract prospective student members by showcasing subsystems, projects, and achievements. | **High** |
| **Sponsor Confidence** | Present achievements, timeline, and technical depth to reassure and attract sponsors. | **High** |
| **Showcase Projects** | Highlight flagship builds: gliders, VTOL, RC planes, rocketry, gesture-controlled drone, ornithopter, bionic butterfly. | **High** |
| **Team Storytelling** | Introduce leadership (Captain) and subsystem teams to humanize the committee. | **Medium** |
| **Responsiveness** | Ensure flawless experience across mobile, tablet, and desktop viewports. | **High** |

### Target Audience
- **Prospective Members:** Engineering students seeking to contribute to autonomous drones, aeronautics, and aerospace systems.
- **Current Members:** Reference point for subsystem documentation, milestones, and internal updates.
- **Sponsors & Institutions:** Corporate partners evaluating technical credibility for sponsorship, funding, and equipment grants.
- **Competition Organizers & Judges:** Technical review of competition history, flight results, and vehicle specifications.
- **College Administration & Faculty:** Tracking official collegiate representation, workshops, and milestones.

---

## 🗺️ Information Architecture & Page Flow

### Navigation Mapping

| Nav Item | Maps To Section | Navigation Type |
|---|---|---|
| **Home** | Intro / Hero | Anchor (`#home`) |
| **About** | Vision & Mission | Anchor (`#about`) |
| **Subsystems** | Our Subsystems | Anchor (`#subsystems`) |
| **Team** | Leadership / Captain | Anchor (`#team`) / Sub-page |
| **Journey** | Timeline | Anchor (`#journey`) |
| **Projects** | Flagship Projects & Gallery | Anchor (`#projects`) / Sub-page |
| **Achievements** | Awards & Competitions | Sub-page (`/achievements`) |
| **Sponsors** | Sponsorship & Partners | Anchor (`#sponsors`) |
| **Contact** | Footer / Contact Section | Anchor (`#contact`) |

### Full Page Flow (Top to Bottom)
1. **Sticky Navigation Bar:** Logo, desktop links, mobile hamburger drawer, and primary CTA (*"Join Airnova"* / *"Recruitment"*).
2. **Hero / Intro:** Full-viewport immersive section with aerospace backdrop, tagline, animated aircraft visual, and watermark layer.
3. **Vision & Mission:** Two-card split layout articulating foundational goals.
4. **Our Subsystems:** 4-column responsive grid detailing the 8 technical and operational wings.
5. **Leadership / Captain:** Featured profile card for the Captain with bio, photo, and social links.
6. **Journey Timeline:** Connected interactive rail (2019 → 2021 → 2023 → 2025).
7. **Flagship Projects:** Interactive showcase of the 7 major 2025 aircraft and aerial vehicle builds.
8. **Achievements & Gallery:** Competition records, workshop gallery, and animated KPI counters.
9. **Sponsorship:** Partner tiers, brand logos, value propositions, and contact inquiry CTA.
10. **Team Expansion:** Subsystem leads and member roster (expandable block).
11. **Footer:** Quick navigation, college affiliation info, social channels, and dynamic copyright year.

---

## 🔍 Section Specifications

### 1. Hero / Intro
- **Heading:** `AIRNOVA`
- **Sub-heading / Tagline:** *"Flying Beyond Limits"*
- **Watermark:** Large, faint typographic layer: *"Where passion meets propulsion"* (~4–8% opacity).
- **Visual Elements:** Animated aircraft/drone vector, subtle particle or blueprint-grid backdrop.
- **Calls to Action:** Primary CTA (*"Explore Our Work"* / *"Join the Squadron"*), secondary CTA with animated scroll chevron.

### 2. Vision & Mission
- **Mission:** *Advance Drone & Aerospace Tech* (Rocket/thruster/circuit iconography).
- **Vision:** *Pioneer. Build. Innovate.* (Compass/aerodynamic wing iconography).
- **Layout:** Two adjacent cards on desktop/tablet; vertically stacked on mobile; scroll-triggered slide-up entrance.

### 3. Subsystems (8)
Eight functional units structuring the committee:
1. **Aerodynamics & Structure** *(Wing / Airfoil icon)* — Airframe design, CFD simulation, stress analysis, composite fabrication.
2. **Propulsion** *(Rocket / Thruster icon)* — Motor testing, ESC optimization, thrust-to-weight tuning, battery analytics.
3. **Control Systems** *(Circuit Board / Joystick icon)* — Flight controller tuning, PID loops, autonomous navigation, telemetry.
4. **Research & Development** *(Microscope / Flask icon)* — Novel UAV architectures, biomimetic flight, sensor fusion.
5. **Sponsorship** *(Handshake icon)* — Industry liaisons, sponsor pitch decks, corporate relations, grant applications.
6. **Documentation** *(Document / Clipboard icon)* — Engineering design reports (EDR), flight logs, technical manuals.
7. **Finance & Inventory** *(Ledger / Wallet icon)* — Procurement, component inventory, budget allocations.
8. **Social Media** *(Megaphone / At-Symbol icon)* — Outreach, event coverage, project showcases, recruitment drives.

### 4. Leadership / Captain
- Highlights the committee Captain (expandable to Vice-Captain and Subsystem Heads).
- Photo with an aerospace-style circular/hexagonal frame and Propulsion Orange accent ring.
- Config-driven fields: Full Name, Title (*"Captain, Airnova"*), Bio (2–4 sentences), social media handles (LinkedIn, Instagram, Email).

### 5. Journey & Timeline
Chronological milestone narrative with scroll-driven node activation:
- **2019:** *Airnova founded* — The committee's inception.
- **2021:** *Expanded portfolio* — Growth in subsystems, membership base, and technical scope.
- **2023:** *Major achievements* — Podiums and wins at national and international competitions.
- **2025:** *Flagship projects delivered* — Delivery of the 2025 cohort of advanced aerial systems.

### 6. Flagship Projects
The 2025 engineering cohort:
- **Gliders:** Fixed-wing / Aerodynamics
- **VTOL:** Vertical Take-Off & Landing aircraft
- **RC Planes:** Radio-controlled fixed-wing aerobatic aircraft
- **Rocketry:** Propulsion / Aerospace research & sounding models
- **Gesture-Controlled Drone:** Control Systems / Human-Computer Interaction (HCI) innovation
- **Ornithopter:** Bio-inspired flapping-wing flight
- **Bionic Butterfly:** Bio-mimetic micro air vehicle (MAV)

### 7. Achievements & Gallery
- Verification of competition victories and awards.
- Photo masonry grid with lightbox preview modal for workshops, flight tests, and symposiums.
- Animated numerical counters: Competitions Attended, Projects Built, Active Members.

### 8. Sponsorship
- Multi-tier sponsor structure with logo carousel/grid.
- Value proposition statement: *"Why Partner with Airnova"*.
- Inquiry CTA connecting to email / interactive contact form.

### 9. Footer & Contact
- Committee description: *"Airnova — the Drone & Aerospace committee of [College Name]."*
- Direct contact details: college campus address, Google Map coordinates, direct email, phone number.
- Social media links: Instagram, LinkedIn, X/Twitter, YouTube.
- Auto-updating copyright notice.

---

## 🎨 Brand & Design System

### Color Palette

| Role | Name | Hex Code | Preview | Usage |
|---|---|---|---|---|
| **Primary Background** | Deep Navy | `#0B1220` | `■` | Primary section backgrounds across the site |
| **Secondary Background** | Charcoal Slate | `#111A2E` | `■` | Alternating section panels, cards, modals |
| **Primary Accent** | Propulsion Orange | `#FF7A1A` | `■` | CTAs, hover rings, active states, key icons |
| **Text (Muted)** | Steel Blue-Grey | `#8FA3C4` | `■` | Secondary body text, captions, watermark |
| **Text (Primary)** | Off-white | `#F5F7FB` | `■` | Primary headings and high-contrast text |

*(Optional secondary accent: **Ion Blue** for telemetry / electronic system callouts).*

### Typography
- **Headings & Display:** Bold, futuristic sans-serif (*Orbitron* / *Space Grotesk* / *Poppins*).
- **Body & Captions:** Clean, high-legibility geometric sans-serif (*Inter* / *Roboto*).
- **Fluid Sizing:** Viewport-responsive typography using CSS `clamp()` and `rem` units.

### Watermark Implementation Requirement
- Phrase: `"Where passion meets propulsion"`
- Rendered as a large, ultra-low opacity (4%–8%) background element behind the Hero, Vision & Mission, and Timeline sections.
- Non-blocking (`pointer-events-none`) layer implemented via SVG, CSS text, or HTML5 Canvas.
- Fully compliant with WCAG 2.1 AA contrast standards; honors `prefers-reduced-motion`.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js (React 18+, App Router) | SSR/SSG for lightning-fast loads and optimal SEO |
| **Styling** | Tailwind CSS + CSS Modules | Utility-first styling with scoped modules for specialized animations |
| **Animations** | Framer Motion & GSAP | Scroll-driven reveals, parallax backdrops, timeline drawing |
| **Icons** | Lucide React + Custom SVGs | Crisp aeronautical and technical iconography |
| **Content Config** | Structured JSON / Markdown | Enables non-developer committee leads to edit bios, projects, and milestones without code edits |
| **Forms** | Formspree / EmailJS | Direct sponsorship and recruitment inquiry pipelines |
| **Deployment** | Vercel / Netlify | Seamless GitHub CI/CD, global CDN edge caching |

---

## 📁 Directory Structure

```text
airnova-website/
├── app/
│   ├── layout.tsx                # Global layout, fonts, SEO metadata, providers
│   ├── page.tsx                  # Single-page layout containing all anchor sections
│   ├── achievements/page.tsx      # Dedicated achievements sub-page
│   ├── projects/page.tsx          # Deep-dive projects sub-page
│   ├── sitemap.ts                # Dynamic sitemap generator
│   └── robots.ts                 # Search engine crawler policies
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky navigation with scroll-state transitions
│   │   └── Footer.tsx            # Committee links, contact info, copyright
│   ├── sections/
│   │   ├── Hero.tsx              # Viewport hero, tagline, watermark backdrop
│   │   ├── VisionMission.tsx     # Split-card mission/vision statements
│   │   ├── Subsystems.tsx        # 8-card responsive subsystem grid
│   │   ├── Leadership.tsx        # Captain feature card (extensible to team grid)
│   │   ├── Timeline.tsx          # Interactive milestone journey (2019-2025)
│   │   ├── Projects.tsx          # 7 flagship projects with category filters
│   │   ├── Achievements.tsx      # Competition records & photo gallery
│   │   └── Sponsorship.tsx       # Sponsor tiers, logo grid, inquiry CTA
│   └── ui/
│       ├── Watermark.tsx         # Reusable backdrop watermark component
│       ├── Card.tsx              # Glow-bordered container component
│       ├── AnimatedCounter.tsx   # Numerical stat counter
│       └── ScrollReveal.tsx      # Framer Motion entrance wrapper
├── content/                      # Editable JSON content store (Single Source of Truth)
│   ├── site.json                 # General metadata, tagline, watermark text
│   ├── subsystems.json           # 8 subsystem definitions, descriptions, icons
│   ├── timeline.json             # Milestone years and accomplishment summaries
│   ├── projects.json             # 7 flagship projects, specifications, categories
│   ├── captain.json              # Captain profile, bio, credentials, socials
│   ├── achievements.json         # Competition results, accolades, gallery photos
│   └── sponsors.json             # Current/past sponsors and sponsorship tiers
├── public/
│   ├── images/                   # Project renders, leadership photos, event snaps
│   └── icons/                    # Custom drone and aeronautical SVGs
├── styles/
│   └── globals.css               # Tailwind CSS variables and design tokens
└── lib/
    └── utils.ts                  # Shared utility functions (class merging, dates)
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation
```bash
# Clone the repository
git clone https://github.com/NiharikaRaut-02/Airnova_Website.git
cd Airnova_Website

# Install project dependencies
npm install
```

### Local Development
```bash
# Run the Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Production Build & Validation
```bash
# Build the production application
npm run build

# Preview production build locally
npm run start

# Run linting and type checks
npm run lint
```

---

## 📝 Content Management & Placeholder Tracker

The website architecture separates content from presentation logic. Committee members can edit files in `/content/*.json` without modifying React components.

| Section | Content Status | Action Required | Source File |
|---|---|---|---|
| **Tagline & Watermark** | ✅ Final | *"Flying Beyond Limits"* / *"Where passion meets propulsion"* | `content/site.json` |
| **Vision & Mission** | ✅ Final | Vision & Mission copy defined | `content/site.json` |
| **Subsystems (8)** | ✅ Names Final | 8 Subsystem names finalized; descriptions/icons in review | `content/subsystems.json` |
| **Captain Photo & Bio** | ⏳ Pending | Placeholder in place; committee to provide bio and photo | `content/captain.json` |
| **Timeline Milestones** | ✅ Years Final | 2019, 2021, 2023, 2025 confirmed; expanded text pending | `content/timeline.json` |
| **Flagship Projects (7)**| ✅ Names Final | 7 projects confirmed; CAD renders & specs pending | `content/projects.json` |
| **Achievements List** | ⏳ Pending | Event names, competition years, and award rankings pending | `content/achievements.json` |
| **Sponsor Logos** | ⏳ Pending | Placeholder sponsor grid; waiting on vector logo files | `content/sponsors.json` |
| **Contact Details** | ⏳ Pending | College address, official email, phone to be finalized | `content/site.json` |

---

## 📈 Success Metrics & Roadmap

### Key Performance Indicators (KPIs)
- **Lighthouse Performance Score:** ≥ 90 across Mobile and Desktop.
- **Core Web Vitals:** First Contentful Paint (FCP) < 1.8s, Largest Contentful Paint (LCP) < 2.5s, Cumulative Layout Shift (CLS) ~ 0.
- **Usability:** 100% responsive compliance across mobile (<640px), tablet (640–1024px), and desktop (>1024px).
- **Engagement:** Average session duration target > 1.5 minutes; landing bounce rate < 55%.
- **Conversions:** Measurable uptick in recruitment registrations and sponsorship inquiries.

### Development Roadmap
- **Phase 1 — Design & Tokens (1–2 weeks):** Figma wireframing, color tokens, typography clamp curves, watermark treatments.
- **Phase 2 — Core Build (2–3 weeks):** Sticky navbar, Hero, Vision/Mission, Subsystems grid, Timeline, Footer.
- **Phase 3 — Rich Content & Sub-pages (1–2 weeks):** Flagship Projects showcase, Achievements gallery with lightbox, Captain/Team section, Sponsorship tiers.
- **Phase 4 — Animation & Polish (1 week):** Framer Motion scroll reveals, GSAP timeline rail draw, propeller hover interactions, performance audits.
- **Phase 5 — QA, Accessibility & Launch (3–5 days):** Cross-browser testing, screen reader audit, SEO tag verification, Vercel production deployment.

*(For the accelerated 1-week team sprint distribution, refer to [Workflow.md](file:///Users/seondsilva/Desktop/Airnova_Website/Workflow.md)).*

---

## 📚 Project Documentation Links

- 🏛️ **[Architecture.md](file:///Users/seondsilva/Desktop/Airnova_Website/Architecture.md)** — Detailed technical architecture, component breakdown, rendering patterns, and data flow.
- 🎨 **[Theme.md](file:///Users/seondsilva/Desktop/Airnova_Website/Theme.md)** — Comprehensive brand guidelines, color tokens, typography scales, watermark specifications, and motion guidelines.
- ⏱️ **[Workflow.md](file:///Users/seondsilva/Desktop/Airnova_Website/Workflow.md)** — 1-Week accelerated 3-person sprint schedule, task matrix, and milestone deliverables.
- 📄 **[Airnova_Website_PRD.pdf](file:///Users/seondsilva/Desktop/Airnova_Website/Airnova_Website_PRD.pdf)** — Official source Product Requirements Document (v1.0).

---

© 2026 Airnova — Drone & Aerospace Committee. All rights reserved.