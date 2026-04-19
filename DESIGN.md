# Design System — DR4FT

## Product Context
- **What this is:** AI-powered resume optimization tool — ATS analysis, keyword matching, job search, resume builder.
- **Who it's for:** Job seekers fighting ATS filters.
- **Project type:** Next.js 16 + React 19 frontend, FastAPI backend, Python NLP + Google Gemini.

## Aesthetic Direction — Blue Book Exam Booklet
The entire product is dressed as a graded exam. The cover is a dark-blue stitched-border booklet. Interior pages are cream ruled paper with a red margin line, a binding shadow on the spine, and typewriter running heads. The user's resume **is** the exam. DR4FT is the grader — red pen annotations, PASS/FAIL stamps, percentage grades in Baskerville display.

- **Direction:** Academic brutalist dressed as a college Blue Book. Editorial serif meets typewriter rigor.
- **Decoration level:** Zero ornament. Structure IS the decoration. Paper grain and ruled lines for texture.
- **Mood:** Studious. Slightly anxious. The pressure of an exam you might fail — and a teacher who'll tell you why.
- **References:** A real Roaring Spring Blue Book exam booklet. Editorial magazines (The Drift, n+1). Fold Magazine's paper textures.
- **Departures from category:**
  1. Warm cream `#FDFBF5` paper instead of flat white — most resume tools are clinical white or dark mode.
  2. Deep-blue cover `#0F2847` with stitched border — the product has a physical cover before it has a UI.
  3. Libre Baskerville display — academic serif, not tech sans.
  4. Special Elite typewriter for body text on booklet pages — reads as printed, not rendered.
  5. Red margin line + faint ruled lines on every page — the resume is literally being graded.
  6. Scroll-driven cover flip with GSAP ScrollTrigger — the booklet opens as you scroll.
  7. No rounded corners anywhere. No drop shadows as decoration — only depth via box-shadow on the paper itself.

## Typography
- **Display / Hero:** Libre Baskerville, weight 700. Italic for emphasis (e.g. "test?" on cover).
  - Cover H1: 58px, line-height 1.05, letter-spacing -0.015em
  - Tool-page H1: clamp(36px, 4.4vw, 56px)
  - Section H2: clamp(28px, 3.2vw, 48px)
- **Body / booklet pages:** Special Elite (typewriter), 14-17px, line-height 1.7. Warm ink `#1a120b` at 0.78-0.82 alpha.
- **Labels / running heads:** IBM Plex Mono, 9-12px, letter-spacing 0.22-0.32em, uppercase.
- **Nav / chips:** Barlow Condensed, weight 700-800, 11-16px, letter-spacing 0.14em, uppercase.
- **Handwriting (teacher's red pen, stamps):** Caveat, italic. For grade marks, margin notes, signatures.
- **Loading:** Google Fonts — Libre Baskerville (400/400i/700), Special Elite (400), IBM Plex Mono (400/500), Barlow Condensed (400/700/800), Caveat (400/700).

## Color
- `--color-cover` `#1B3A6B` — booklet mid blue
- `--color-cover-deep` `#0F2847` — booklet outside / wrapper bg
- `--color-cover-light` `#2A4F8A` — cover highlight
- `--color-paper` `#FDFBF5` — interior cream paper
- `--color-paper-dim` `#F2EFE7` — paper shadow
- `--color-ink` `#1A1A18` — near-black body
- `--color-ink-red` `#B4242A` — teacher's red pen
- `--color-ink-red-faded` `#983036`
- `--color-ink-blue` `#1A3C8F` — student's ballpoint
- `--color-yellow` `#FCD34D` — highlighter / CTA
- `--color-yellow-bg` `rgba(252, 211, 77, 0.18)`
- `--color-red-grade` `#B91C1C` — FAIL grade
- `--color-green-grade` `#166534` — PASS grade
- `--color-pencil` `#7A756D` — secondary text
- `--color-pencil-dim` `#A8A39B` — tertiary / placeholder
- **Text hierarchy on paper:** `#1a120b` (primary), `rgba(26,18,11,0.78)` (secondary), `rgba(26,18,11,0.55)` (labels).
- **Light mode only.** Dark mode breaks the booklet metaphor.

## Spacing
- **Base:** 4px. Most clamps resolve to 4px-aligned values at common breakpoints.
- **Nav height:** 52px.
- **Tool-page padding:** `clamp(56px, 6.5%, 88px)` top, `clamp(100px, 11%, 132px)` left (leaves room for red margin line), tighter on right.
- **Booklet page padding:** matches tool-page but constrained to the book-page-frame aspect ratio.
- **Ruled line spacing:** 35px + 1px rule (faint blue `rgba(82,120,170,0.07)`).
- **Red margin line:** `left: clamp(76px, 9%, 108px)`.

## Layout
- **Navigation:** Fixed top bar, 52px, deep-blue `#0F2847`. Brand `DR4FT` left. Page links right. Yellow CTA far right.
- **Tool pages (`.tool-paper`):** Cream paper floating on the deep-blue wrapper. Binding gradient on the left spine. Typewriter running head at top. Kicker + display title. Content sits above the red margin line.
- **Booklet pages (`.book-page-inner`):** Same language, but inside the scroll-driven flipbook on the landing page.
- **Border radius:** 0 everywhere.
- **Max content width:** 980-1000px for tool pages. Landing booklet frame: `height: min(1100px, 96vh); aspect-ratio: 0.82;`.

## Motion
- **Smooth scroll:** Lenis (duration 1.2, exponential easing).
- **Scroll engine:** GSAP ScrollTrigger + scrub 0.35 for the pinned booklet cover flip.
- **Cover / page flip:** `rotationY` -180° with perspective 1800px, `power3.inOut` for the swing, brief `power2.out` lift. Reveal shadow sweeps across the revealed page and clears before the flip lands.
- **Page loads:** staggered `from()` tweens on cover elements (tag, words, sub, lines, CTA, meta).
- **Reduced motion:** `prefers-reduced-motion: reduce` short-circuits all GSAP setup.

## UI Patterns
- **Tool paper:** Cream `.tool-paper` with `.tool-binding` child + `.tool-running-head` + `.tool-header` (kicker + `.tool-header-title`). Ruled lines via `::before`, red margin via `::after`.
- **Running head:** Typewriter, uppercase, 9-11px, 0.22em letter-spacing, dashed underline. Left: `DR4FT · <section>`. Right: `Section X · <phase>`.
- **Kicker (`.product-eyebrow` / `.tool-header-kicker`):** Typewriter, all-caps, 0.32em letter-spacing, 1.5px solid underline, align-self flex-start.
- **Product headline:** Libre Baskerville 700, -0.015em letter-spacing, subtle 0.35px ink-bleed text-shadow.
- **Bullet list (`.product-bullets`):** Typewriter body, em-dash in red serif as bullet.
- **Rubric table (`.product-rubric-table`):** Ink-colored 2px top border, thin row dividers, serif title + typewriter body + big red Baskerville weight on the right.
- **Stamp (`.stamp-block`):** Red border box rotated -4°, typewriter text. Used for PASS/FAIL and final grade.
- **Score mark (`.exam-score-mark`):** Caveat red pen, rotated -3°, with an underline of red ink.
- **Grade display (`.exam-final-grade`):** Caveat, weight 700, 96-180px, rotated -3°.
- **Market insights (`.market-insights`):** Booklet panel under the job listings. Typewriter section labels, serif names, red ink weights/ranges.

## Anti-patterns (AI slop blacklist)
Do not introduce:
- Purple / indigo gradient backgrounds.
- Icon-in-colored-circle + title + description grids (the signature AI SaaS layout).
- Decorative blobs, wavy dividers, floating shapes.
- Centered everything.
- Uniform bubbly border-radius.
- Emoji as design elements.
- Generic hero copy ("Welcome to…", "Unlock the power of…", "Your all-in-one…").
- `border-left: 3px solid <accent>` cards.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-01 | Terminal Mode | First direction, rejected. |
| 2026-04-02 | Monogram Minimal | V3RSUS-inspired; then renamed to DR4FT. |
| 2026-04-09 | Warm Brutalist | Instrument Serif + cream #F5F0EB. |
| 2026-04-18 | **Blue Book Exam Booklet** | Current direction. Entire product dressed as a graded exam — cover, ruled pages, red pen, typewriter body, grade stamps. |
| 2026-04-18 | Libre Baskerville + Special Elite + Caveat | Typography swap away from Instrument Serif to a more booklet-native stack. |
| 2026-04-18 | Scroll-driven booklet flip on landing | GSAP ScrollTrigger + perspective transform; cover physically opens. |
| 2026-04-19 | Tool pages adopt booklet treatment | `/analyzer`, `/builder`, `/jobs`, `/about` all get cream paper + binding + running head + red margin. |
