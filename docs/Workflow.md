# Workflow.md — Airnova Website Delivery & Sprint Plan

> **Reference Document:** [Airnova_Website_PRD.pdf](file:///Users/seondsilva/Desktop/Airnova_Website/Airnova_Website_PRD.pdf) (§7, §8, §9, §10)  
> **Status:** Active Execution Plan

---

## 1. Overview & Delivery Strategies

This document establishes the execution roadmap for building and deploying the Airnova Drone & Aerospace Committee website. Two delivery frameworks are provided:
1. **The Official Multi-Week Phased Roadmap (PRD §9):** The standard milestone model spanning design, development, content population, polish, and QA.
2. **The Accelerated 1-Week Sprint Plan:** A compressed, highly coordinated 3-person sprint schedule designed to deliver a feature-complete v1 release in 7 days by parallelizing workstreams.

---

## 2. Official Development Roadmap (PRD §9)

| Phase | Milestone Scope | Core Deliverables | Estimated Duration |
|---|---|---|---|
| **Phase 1 — Design** | Brand asset finalization, wireframes, UI mockups | Figma layouts, color/type tokens, watermark design, custom subsystem SVG drafting | 1–2 weeks |
| **Phase 2 — Core Build** | Structural responsive skeleton | Sticky Navbar, Hero, Vision & Mission, Subsystems grid, Journey Timeline, Footer | 2–3 weeks |
| **Phase 3 — Rich Content** | Complex feature sections & sub-pages | Flagship Projects showcase, Achievements gallery with lightbox, Leadership section, Sponsorship tiers | 1–2 weeks |
| **Phase 4 — Animation & Polish** | Motion choreography & performance tuning | Framer Motion scroll reveals, GSAP timeline rail draw, watermark parallax, Lighthouse optimization | 1 week |
| **Phase 5 — QA & Launch** | Cross-device testing, accessibility, deployment | WCAG 2.1 AA audit, cross-browser validation, SEO metadata, Vercel production release | 3–5 days |

---

## 3. Accelerated 1-Week Sprint Plan (3-Person Team)

**Total Duration:** 7 Days (Day 1 – Day 7)  
**Team Allocation:** 3 Developers  
**Release Target:** Fully functional v1 site with placeholder-ready content architecture (PRD §7).

### Team Roles & Ownership Matrix

| Contributor | Focus Area | Direct Ownership |
|---|---|---|
| **Developer A** | Frontend Lead (Layout & Navigation) | Navbar, Hero Section, Vision & Mission, Subsystems Grid, Journey Timeline, Watermark component, responsive breakpoint behavior. |
| **Developer B** | Frontend Dev (Content & Interactive Modules) | Leadership/Captain section, Flagship Projects showcase, Achievements gallery & lightbox, Sponsorship tiers, Footer, structured JSON content stores (`/content/*.json`). |
| **Developer C** | Motion, Accessibility, DevOps & QA | Framer Motion & GSAP animations, WCAG 2.1 AA contrast audits, keyboard navigation, Lighthouse optimization (≥90), Open Graph / SEO metadata, Vercel CI/CD pipeline. |

---

### Day-by-Day Execution Schedule

```
Day 1: Project Scaffolding, Design Tokens, JSON Content Stores, CI/CD Pipeline
Day 2: Hero Section, Backdrop Watermark, Vision & Mission, Shared Motion Wrapper
Day 3: 8 Subsystem Cards, Hover Propeller Interactions, Leadership Spotlight Block
Day 4: Interactive Milestone Timeline (2019-2025), 7 Flagship Projects Showcase
Day 5: Achievements Gallery & Lightbox, Sponsorship Tiers, Contact Form Integration
Day 6: Full Page Assembly, Navigation Scroll Sync, Performance & Core Web Vitals
Day 7: Cross-Browser QA, A11y Audit, Committee Sign-off, Production Deployment
```

#### Day 1 — Scaffolding, Content Store & Design Tokens
- **All:** Kickoff meeting — review PRD v1.0, verify color palette (`#0B1220`, `#111A2E`, `#FF7A1A`), type scale, and breakpoint conventions (`sm`, `md`, `lg`, `xl`).
- **Developer A:** Scaffold Next.js (App Router) + Tailwind CSS workspace; implement `Navbar.tsx` (sticky positioning, scroll state listeners, mobile hamburger menu).
- **Developer B:** Set up the `/content/` directory with structured JSON files (`site.json`, `subsystems.json`, `timeline.json`, `projects.json`, `captain.json`, `achievements.json`, `sponsors.json`).
- **Developer C:** Initialize GitHub repository, configure Vercel production and preview deployment pipelines, configure ESLint, Prettier, and base `globals.css` theme variables.

#### Day 2 — Hero, Watermark & Core Brand Sections
- **Developer A:** Build full-viewport `Hero.tsx` with bold typography, tagline *"Flying Beyond Limits"*, CTA buttons (*"Explore Our Work"*, *"Join the Squadron"*), and animated scroll chevron.
- **Developer B:** Implement `VisionMission.tsx` (two-card layout with aerospace icons) and `Footer.tsx` (social links, quick anchors, campus address, auto-updating copyright).
- **Developer C:** Develop reusable `Watermark.tsx` component (low-opacity 4%–8% backdrop layer) and `ScrollReveal.tsx` wrapper with `prefers-reduced-motion` detection.

#### Day 3 — Subsystems Grid & Leadership Spotlight
- **Developer A:** Build `Subsystems.tsx` grid displaying all 8 functional wings; implement responsive 4 → 2 → 1 column collapse and card hover-lift with orange border glow.
- **Developer B:** Build `Leadership.tsx` featuring the Captain spotlight card with circular/hexagonal photo frame, orange accent ring, bio text, and social handle icons.
- **Developer C:** Integrate drone-propeller spin micro-animations on subsystem icon hover; execute initial Lighthouse performance baseline audit.

#### Day 4 — Journey Timeline & Flagship Projects
- **Developer A:** Build `Timeline.tsx` featuring the central rail with milestone nodes (2019, 2021, 2023, 2025); configure desktop alternating card layout and single-column mobile view.
- **Developer B:** Build `Projects.tsx` displaying the 7 flagship vehicles (Gliders, VTOL, RC Planes, Rocketry, Gesture Drone, Ornithopter, Bionic Butterfly) with category badges and filter tabs.
- **Developer C:** Implement scroll-driven SVG line-drawing on the timeline rail; add staggered card entrance motion to the project gallery.

#### Day 5 — Achievements, Sponsorship & Forms
- **Developer A:** Responsive layout audit across tablet (`640px–1024px`) and ultra-wide (`>1440px`) breakpoints.
- **Developer B:** Build `Achievements.tsx` (competition wins, photo masonry grid, `Lightbox.tsx` modal viewer) and `Sponsorship.tsx` (logo grid, tier breakdown, inquiry CTA).
- **Developer C:** Integrate Formspree / EmailJS for sponsorship inquiries; perform WCAG 2.1 AA color contrast audit on all text overlaid on dark backgrounds and watermarks.

#### Day 6 — Integration, Performance & SEO Polish
- **All:** Assemble all sections in `app/page.tsx`; verify smooth-scroll anchor navigation and active navbar state synchronization.
- **Developer A & B:** Visual consistency review — audit container paddings, font hierarchy, card corner radii, and hover states.
- **Developer C:** Asset optimization (convert raster images to WebP/AVIF, implement `next/image` with responsive `sizes`), tune bundle size, configure Open Graph meta tags, `sitemap.ts`, and `robots.ts`.

#### Day 7 — Comprehensive QA, Testing & Launch
- **All:** Cross-browser validation across Chrome, Safari, Firefox, and Edge (macOS/Windows) and real mobile device testing (iOS Safari, Android Chrome).
- **Developer C:** Audit against Lighthouse target (Score ≥ 90 across Mobile and Desktop); trigger final production deployment on Vercel.
- **Developer A & B:** Verify placeholder content against PRD §7 tracker; document handoff for committee asset population.
- **All:** Final stakeholder sign-off against PRD success metrics.

---

## 4. Content Inventory & Placeholder Tracking (PRD §7)

The site is built with a content-config architecture so that placeholder data can be swapped seamlessly as the committee supplies final assets:

| Section | Content State | Action Item | File Location |
|---|---|---|---|
| **Tagline & Watermark** | ✅ Finalized | *"Flying Beyond Limits"* / *"Where passion meets propulsion"* | `content/site.json` |
| **Vision & Mission** | ✅ Finalized | Two statements: *"Advance Drone & Aerospace Tech"* / *"Pioneer. Build. Innovate."* | `content/site.json` |
| **Subsystems (8)** | ✅ Names Confirmed | Descriptions & icon bindings defined for 8 wings | `content/subsystems.json` |
| **Captain Photo & Bio** | ⏳ Pending Assets | Placeholder avatar and text block ready for Captain's input | `content/captain.json` |
| **Timeline Milestones** | ✅ Years Confirmed | 2019, 2021, 2023, 2025 confirmed; detailed writeups pending | `content/timeline.json` |
| **Flagship Projects (7)**| ✅ Names Confirmed | 7 vehicle types confirmed; CAD renders and specs pending | `content/projects.json` |
| **Achievements List** | ⏳ Pending Assets | Competition names, flight dates, and award ranks to be supplied | `content/achievements.json` |
| **Sponsor Logos** | ⏳ Pending Assets | Sponsor tier structure ready; vector SVG logos to be inserted | `content/sponsors.json` |
| **Contact Details** | ⏳ Pending Assets | Campus address, official email, and phone number to be confirmed | `content/site.json` |

---

## 5. Success Metrics & Quality Gates (PRD §8)

| Metric | Target / Quality Gate | Verification Method |
|---|---|---|
| **Mobile Responsiveness** | Zero layout-breaking bugs across breakpoints | Manual testing on Chrome DevTools & physical iOS/Android devices |
| **Lighthouse Score** | ≥ 90 in Performance, Accessibility, Best Practices, SEO | Google Lighthouse audit on mobile and desktop profiles |
| **Core Web Vitals** | FCP < 1.8s, LCP < 2.5s, CLS ~ 0 | WebPageTest / Chrome UX Report standards |
| **Accessibility (A11y)** | 100% WCAG 2.1 AA compliance | Axe DevTools audit and screen reader navigation test |
| **User Engagement** | Average session duration > 1.5 min; bounce rate < 55% | Post-launch web analytics integration |
| **Recruitment Conversion** | Measurable increase in applicant submissions | Post-launch form submission analytics |

---

## 6. Open Questions & Decision Log (PRD §10)

The following items are actively tracked with committee stakeholders:

- [ ] **Captain Profile Data:** Obtain official name, high-resolution portrait photograph, and 2–4 sentence biography.
- [ ] **Achievements Verification:** Receive official competition records (event title, year, classification, result/trophy).
- [ ] **Sponsor Partnerships:** Receive approved corporate sponsor logos (SVG/PNG) and tier allocation rules.
- [ ] **Campus Contact Credentials:** Confirm college postal address, official committee email domain, and faculty advisor phone.
- [ ] **v1 Scope for Sub-Pages:** Confirm whether `/achievements` and `/projects` will launch as dedicated sub-routes alongside the single-page anchors in v1, or be released in a fast-follow update.