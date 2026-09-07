# workflow.md — Airnova Website Build Plan

**Total duration:** 1 week (Day 1–7)
**Team size:** 3 people
**Scope:** Full v1 site — Hero, Vision/Mission, Subsystems, Leadership, Timeline, Projects, Achievements, Sponsorship, Footer — fully responsive, animated, placeholder-ready per PRD §7.

This compresses the PRD's 5-phase, multi-week roadmap (§9) into a single sprint by running design, build, and content/QA in parallel instead of sequentially.

## Roles

| User | Role | Owns |
|---|---|---|
| **User A** | Frontend Lead (Layout & Interaction) | Navbar, Hero, Vision & Mission, Subsystems, Timeline, watermark component, responsive breakpoints |
| **User B** | Frontend Dev (Content Sections & Data) | Leadership/Captain, Projects, Achievements, Sponsorship, Footer, content config files (JSON) |
| **User C** | Motion, QA & Deployment | Framer Motion/GSAP animations across all sections, accessibility pass, performance tuning, SEO metadata, hosting/CI setup, cross-device QA |

## Day-by-Day Plan

### Day 1 — Setup & Design Tokens
- **All:** Kickoff — align on PRD, confirm color palette, typography, breakpoints (see `Theme.md`).
- **User A:** Scaffold Next.js + Tailwind project, set up folder structure, build `Navbar.tsx` (transparent→solid on scroll, hamburger for mobile).
- **User B:** Set up `/content/*.json` structure (site, subsystems, timeline, projects, captain, achievements) with placeholder data from PRD §7.
- **User C:** Set up repo, CI/CD (Vercel), ESLint/Prettier, base `globals.css` theme tokens.

### Day 2 — Hero & Core Layout
- **User A:** Build Hero section — full-viewport, tagline, watermark backdrop, primary/secondary CTA, scroll indicator.
- **User B:** Build Vision & Mission section (two-card/split layout) and Footer (links, socials, contact, auto-year copyright).
- **User C:** Build shared `Watermark.tsx` and `ScrollReveal.tsx` components for reuse across sections; wire `prefers-reduced-motion` check.

### Day 3 — Subsystems & Leadership
- **User A:** Build Subsystems grid (8 cards, responsive 4→2→1 columns, hover-lift + orange glow).
- **User B:** Build Leadership/Captain section as an editable content block (photo placeholder + bio placeholder), structured to extend to a grid later.
- **User C:** Add entrance animations to Hero, Vision & Mission, Subsystems; start Lighthouse baseline audit.

### Day 4 — Timeline & Projects
- **User A:** Build Timeline section — vertical rail, alternating cards on desktop, single column on mobile, scroll-driven line-draw.
- **User B:** Build Flagship Projects grid/carousel (7 projects: gliders, VTOL, RC planes, rocketry, gesture-controlled drone, ornithopter, bionic butterfly) with category tags.
- **User C:** Animate Timeline reveal and Projects card entrances; verify keyboard navigation across built sections so far.

### Day 5 — Achievements & Sponsorship
- **User A:** Support integration — polish responsive edge cases across all sections built so far (tablet/large-desktop breakpoints).
- **User B:** Build Achievements/Gallery section (masonry grid + lightbox, optional animated counters) and Sponsorship section (logo grid, tiers, CTA + form via Formspree/EmailJS).
- **User C:** Accessibility pass — alt text, aria-labels, focus states, color contrast check on watermark/dark backgrounds (WCAG 2.1 AA).

### Day 6 — Integration, Animation Polish & Performance
- **All:** Full integration pass — combine all sections into `app/page.tsx`, verify anchor-scroll nav across the whole page.
- **User A + User B:** Cross-section visual consistency pass (spacing, type scale, card styles).
- **User C:** Performance tuning — image optimization/lazy-load, code-splitting, Lighthouse ≥ 90 target, meta tags/Open Graph/sitemap.xml/robots.txt.

### Day 7 — QA & Launch
- **All:** Cross-browser/device testing (Chrome, Safari, Firefox, Edge; iOS Safari, Android Chrome).
- **User C:** Final deploy to Vercel, verify CI/CD, confirm analytics hook for KPI tracking (session duration, bounce rate).
- **User A + User B:** Bug triage from QA pass, final content check against placeholder tracker (PRD §7).
- **All:** Sign-off review against PRD success metrics (§8).

## Dependencies & Notes
- Content configs (User B, Day 1) must land early since every section pulls from them — this unblocks User A and User C from Day 2 onward.
- Real assets (Captain photo/bio, achievement list, sponsor logos, contact details) remain **pending** per PRD §7/§10 — placeholders ship in v1 and are swapped in without structural rework.
- If a 4th day is needed, Achievements/Sponsorship (Day 5) is the safest section to trim to "static, no animation" and finish in a fast-follow.