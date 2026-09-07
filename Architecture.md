# Architecture.md — Airnova Website

## 1. Overview
Airnova's site is a single-page-application-style website (Next.js) with anchor-scrolled sections and two optional sub-pages (Achievements, Projects). It is component-driven, content-config-driven (so non-devs can update text/images without touching code), and animation-layered on top of a static-first render.

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js (React, App Router) | SSR/SSG for SEO + fast loads; matches reference site |
| Styling | Tailwind CSS + CSS Modules | Utility speed + custom control for watermark/timeline effects |
| Animation | Framer Motion (+ optional GSAP for timeline line-draw) | Scroll-triggered reveals, hero parallax |
| Icons | lucide-react + custom SVGs | Subsystem/drone-specific icons |
| Content | Structured JSON/Markdown config files | Captain, timeline, projects, achievements editable without code changes |
| Forms | Formspree or EmailJS | Sponsorship & contact form submissions |
| Hosting | Vercel | CI/CD from GitHub, SSG-friendly |

## 3. Folder Structure

```
airnova-website/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata, providers
│   ├── page.tsx                 # Home (all anchor sections)
│   ├── achievements/page.tsx    # Sub-page (optional v1)
│   └── projects/page.tsx        # Sub-page (optional v1)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky, transparent→solid on scroll, hamburger on mobile
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── VisionMission.tsx
│   │   ├── Subsystems.tsx
│   │   ├── Leadership.tsx
│   │   ├── Timeline.tsx
│   │   ├── Projects.tsx
│   │   ├── Achievements.tsx
│   │   └── Sponsorship.tsx
│   ├── ui/
│   │   ├── Watermark.tsx         # Reusable backdrop-text component
│   │   ├── Card.tsx
│   │   ├── AnimatedCounter.tsx
│   │   └── ScrollReveal.tsx      # Wraps children in Framer Motion fade/slide
├── content/                      # Structured config — the "editable without code" layer
│   ├── site.json                 # Tagline, watermark string, nav labels
│   ├── subsystems.json           # 8 subsystem entries
│   ├── timeline.json             # 2019 / 2021 / 2023 / 2025 milestones
│   ├── projects.json             # 7 flagship projects
│   ├── captain.json              # Name/title/photo/bio — placeholder-ready
│   └── achievements.json         # Pending: event/year/result list
├── public/
│   ├── images/                   # Photos, logos, project renders
│   └── icons/                    # Custom subsystem SVGs
├── styles/
│   └── globals.css               # Tailwind base + CSS var theme tokens
└── lib/
    └── utils.ts                  # Helpers (e.g., copyright-year auto-update)
```

## 4. Component & Data Flow

1. **Content configs** (`/content/*.json`) are the single source of truth for anything the committee will edit later (Captain bio, timeline, projects, achievements, sponsors).
2. **Section components** import their config and render it — no hardcoded copy inside components.
3. **`Watermark.tsx`** is a shared component (fixed/absolute positioned, `pointer-events-none`, low-opacity) reused behind Hero, Vision & Mission, and Timeline per PRD §2.3.
4. **`ScrollReveal.tsx`** wraps section children with one shared Framer Motion variant, so animation style stays consistent instead of ad-hoc per section.
5. **Navbar** reads scroll position (`useScroll`/`useEffect`) to toggle transparent↔solid state and active-link highlighting.

## 5. State & Interactivity

- No global state library needed for v1 — content is static/config-driven, so local component state (`useState`) covers nav open/close, filter tabs on Projects, and lightbox open/close on Achievements gallery.
- Form state (Sponsorship/Contact) handled locally, submitted via Formspree/EmailJS — no custom backend required for v1.
- `prefers-reduced-motion` checked once in `ScrollReveal` / `Watermark` to disable non-essential motion (PRD §5.3).

## 6. Rendering Strategy

- Static Site Generation (SSG) for all content — no per-request data fetching needed since content is JSON, not a live CMS in v1.
- Images served via `next/image` for automatic WebP/AVIF + lazy-loading (PRD §5.2, §6.2).

## 7. Performance & SEO Hooks

- Single `<h1>` in Hero; semantic `header/nav/main/section/footer` tags throughout.
- `metadata` export in `app/layout.tsx` for Open Graph/Twitter Card tags.
- `sitemap.xml` / `robots.txt` generated via Next.js metadata routes.
- Reserve fixed dimensions for watermark and hero media to keep CLS near zero.

## 8. Future-Proofing

- Leadership section built to extend from single Captain card → grid (Vice-Captain, subsystem leads) without layout rework (PRD §4.4).
- Subsystem cards structured so a click-to-expand (members list) can be added later without changing the grid.
- Achievements/Projects sub-pages are separate routes from day one so they can be split out or backed by a headless CMS later without restructuring nav.