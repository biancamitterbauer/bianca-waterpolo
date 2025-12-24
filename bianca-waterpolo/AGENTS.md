---
# Project Agent Rules (Codex)

## Goal
Build a modern, premium, sponsor-ready Angular application for the German water polo national player Bianca Mitterbauer.
The app must communicate professionalism, athletic excellence, and credibility.

## Platforms
- Web (desktop & mobile)
- Static prerendered output (SSG) for STRATO Webspace
- Prepared for native apps via Capacitor (future)

## Tech Stack
- Angular (standalone components, router)
- SSR enabled for tooling, SSG (prerender) for production
- TypeScript strict mode
- SCSS with design tokens (CSS variables)
- Performance- and accessibility-oriented

## Architecture
- src/app/core: layout shell, SEO/meta service, global services
- src/app/shared: reusable UI components
- src/app/features: lazy-loaded feature pages
- src/assets/data: JSON mock content (athlete, achievements, posts, sponsors)

## Planned Pages
- Home
- Achievements
- News / Blog
- Training
- Tournaments
- Media
- Sponsors
- Press Kit
- Contact
- Legal

## UI / UX Rules
- Premium, modern, minimal, sporty
- Sponsor-friendly and serious (no playful styling)
- Mobile-first, desktop-polished
- Strong typography, generous whitespace
- Subtle animations only

## SEO
- Each route sets title, description, OpenGraph tags
- Important routes included in prerender config

## Coding Rules
- Prefer standalone components
- Reuse shared components
- Avoid over-engineering
- Clean structure and naming
- Explain changes after implementation

## STRATO Hosting
- Use prerendered static output only
- SPA fallback via .htaccess rewriting to index.html
---
