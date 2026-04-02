# Design System - DR4FT

## Product Context
- **What this is:** AI-powered resume optimization tool with ATS analysis, keyword targeting, job search, and resume building
- **Who it's for:** Job seekers optimizing resumes to beat ATS systems and land interviews
- **Space/industry:** Career tech, resume builders
- **Project type:** Next.js web app with FastAPI backend

## Aesthetic Direction
- **Direction:** Monogram Minimal, inspired by V3RSUS design language
- **Decoration level:** Minimal with intentional glassmorphism
- **Mood:** Ultra-dark, muted, premium. Like a private members' club for your career. Content floats on glass over void.
- **Deliberate departures from category:**
  1. Giant monogram typography as background texture (not decorative, atmospheric)
  2. Pill-shaped ghost buttons instead of standard filled rectangles
  3. Glass cards with backdrop blur instead of solid surfaces
  4. No sidebar, top nav only, content breathes

## Typography
- **Display/Hero:** Oswald (sans-serif condensed), weights 300-700
  - Hero: clamp(3rem, 7vw, 4.5rem), weight 600, tracking wider, uppercase
  - H1: 1.875rem (30px), weight 600, tracking wider, uppercase
  - H2: 1.5rem (24px), weight 600, tracking wider, uppercase
- **Body:** Barlow (sans-serif), weights 300-600
  - Body: 0.875rem (14px), weight 400, line-height relaxed
  - Small: 0.75rem (12px), weight 400
- **Labels:** Oswald, 0.625rem (10px), weight 400, uppercase, letter-spacing 0.25em, text-muted color
- **Data/Tables:** Barlow with tabular-nums
- **Code:** JetBrains Mono (fallback only, not primary)
- **Loading:** `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Barlow:wght@300;400;500;600&display=swap')`
- **Scale:** Labels(10px) Small(12px) Body(14px) H2(24px) H1(30px) Hero(clamp 48-72px) Monogram(clamp 200-500px)

## Color
- **Approach:** Restrained. Monochrome with opacity-based hierarchy. No accent color. Light text on void.
- **Backgrounds:**
  - `--bg-dark: #080a10` -- page background (near-black with blue undertone)
  - `--bg-card: rgba(12, 16, 26, 0.65)` -- glass card surfaces
  - `--bg-hover: rgba(255, 255, 255, 0.03)` -- subtle hover states
  - `--accent: rgba(240, 240, 248, 0.08)` -- active/selected states
- **Text:**
  - `--text-primary: rgba(240, 240, 248, 0.85)` -- headings, primary content
  - `--text-secondary: rgba(240, 240, 248, 0.5)` -- body text, descriptions
  - `--text-muted: rgba(240, 240, 248, 0.25)` -- labels, captions, placeholders
- **Borders:**
  - `--border-subtle: rgba(255, 255, 255, 0.06)` -- card borders, dividers
  - `--border-focus: rgba(255, 255, 255, 0.2)` -- focus states, hover borders
- **Semantic:**
  - `--score-high: #4ade80` -- scores >= 75%
  - `--score-mid: #fbbf24` -- scores 50-74%
  - `--score-low: rgba(240, 240, 248, 0.3)` -- scores < 50%
- **Dark mode only.** No light mode variant.

## Spacing
- **Base unit:** 4px
- **Density:** Spacious, generous whitespace
- **Card padding:** 24px (p-6)
- **Section gaps:** 32px (space-y-8)
- **Content max-width:** 72rem (max-w-6xl) with 24px horizontal padding
- **Page top padding:** 112px (pt-28, accounts for fixed nav)
- **Page bottom padding:** 80px (pb-20)

## Layout
- **Approach:** Grid-disciplined, centered content
- **Navigation:** Fixed top bar, 64px height, glass background with blur
  - Brand left (Oswald, semibold, tracking-wider, uppercase)
  - Links right (Oswald, 0.75rem, tracking 0.2em, uppercase)
  - No sidebar
- **Grid:** 1-4 columns responsive (grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4)
- **Max content width:** 72rem (1152px) for most pages, 64rem (1024px) for forms
- **Border radius:** 16px on glass cards, 100px (pill) on buttons, 50% on circular elements, 0 on inputs

## Motion
- **Approach:** Intentional, minimal
- **fadeUp:** opacity 0->1, translateY 16px->0, 0.4s ease-out (page transitions, results appearing)
- **scoreIn:** SVG stroke-dashoffset animation, 1s ease-out (score ring fill)
- **Transitions:** all 0.2s ease on borders, colors, backgrounds (hover states)
- **Forbidden:** No bounce, no spring, no pulse, no shake, no scroll-driven animations

## UI Patterns
- **Glass cards:** bg-card + 1px border-subtle + 16px radius + backdrop-blur(20px). Hover brightens border to rgba(255,255,255,0.1).
- **Pill buttons (ghost):** Transparent bg, 1px border rgba(255,255,255,0.15), radius 100px, Oswald uppercase. Hover adds rgba(255,255,255,0.05) bg.
- **Pill buttons (filled):** text-primary bg, #080a10 text, radius 100px, Oswald uppercase. Hover inverts to ghost.
- **Inputs:** Transparent bg, bottom-border only 1px rgba(255,255,255,0.1), Barlow 14px. Focus brightens border to rgba(255,255,255,0.35).
- **Labels:** Oswald 10px, uppercase, letter-spacing 0.25em, text-muted. Used as section headers inside glass cards.
- **Tabs:** Oswald 12px, tracking 0.2em, uppercase, bottom border-2. Active = text-primary + border-text-primary. Inactive = text-muted + border-transparent.
- **Score rings:** SVG circle, 4px stroke, animated dashoffset. Color mapped to score tier (high/mid/low).
- **Monogram:** Oswald, weight 900 (black), clamp(200px, 30vw, 500px), rgba(240,240,248,0.025). Centered, pointer-events none, aria-hidden.
- **File upload:** Glass card with upload icon in circular border, click or drag-drop.
- **Skill tags:** Pill button style used as read-only tags for skills/keywords.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-01 | Terminal Mode selected | User chose after reviewing 3 options. |
| 2026-04-02 | Terminal Mode rejected | User said "I don't like the terminal design." |
| 2026-04-02 | Monogram Minimal selected | User chose Option A (V3RSUS-inspired) from 3 new design options. |
| 2026-04-02 | Full frontend rebuild | All pages, components, and CSS rebuilt with Monogram Minimal design system. |
| 2026-04-02 | Renamed to DR4FT | Product renamed from SmartCV to DR4FT across frontend, backend, and config. |
| 2026-04-02 | DESIGN.md updated | Formalized Monogram Minimal system to match implemented code. |
