# DR4FT | AI Resume Optimizer

Beat the ATS. Land the interview. DR4FT analyzes resumes against real applicant tracking systems using NLP and Google Gemini, surfaces skill gaps, scores formatting, and generates optimized resumes from scratch.

## Quick Start

### Prerequisites
- Node.js 18+ and Python 3.10+
- Google Gemini API key

### Backend
```bash
pip install -r requirements.txt
```

Create a `.env` in the project root:
```
GOOGLE_API_KEY=your_key_here
```

```bash
cd backend && uvicorn main:app --reload --port 3200
```

### Frontend
```bash
cd frontend && npm install && npm run dev
```

Open `http://localhost:2200`

## What It Does

**Analyzer** -- Upload a PDF or DOCX resume, select a target job category and role. Two analysis modes:
- **Standard**: NLP-based scoring across ATS compatibility, keyword matching, formatting, and section structure. Extracts personal info, education, experience, projects, and skills. Returns per-section scores and actionable suggestions.
- **AI**: Sends resume text to Google Gemini for deep evaluation -- overall quality, strengths, weaknesses, ATS score, skill gaps, course recommendations, and role alignment.

**Builder** -- Guided form to construct a resume from scratch. Personal info, summary, work experience, education, projects, skills. Five templates: Modern, Classic, Minimal, Technical, Executive.

**Job Search** -- Multi-portal aggregation across LinkedIn, Indeed, Naukri, Foundit, FreshersWorld, TimesJobs, and Instahyre. Returns direct search links with market insights on trending skills, top locations, and salary ranges.

**Feedback** -- Rating system with usability and satisfaction sliders. Aggregated stats view.

**Dashboard** -- Analytics on resume submissions, average ATS/keyword scores, high-scoring counts, skill distribution, and weekly trends.

## Tech Stack

| Layer | Tools |
|-------|-------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Backend | Python, FastAPI, Pydantic |
| AI/NLP | Google Gemini (gemini-1.5-flash), NLTK, scikit-learn, spaCy |
| PDF/Doc | pdfplumber, pypdf, PyPDF2, python-docx, reportlab |
| Database | SQLite via SQLAlchemy |
| Design | Glassmorphism, Oswald + Barlow typography, dark-only |

## Project Structure

```
DR4FT/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── layout.tsx            # Root layout, fonts, nav, title template
│   │   │   ├── analyzer/
│   │   │   │   ├── page.tsx          # Resume analysis (standard + AI)
│   │   │   │   └── layout.tsx        # DR4FT | Analyzer
│   │   │   ├── builder/
│   │   │   │   ├── page.tsx          # Resume builder form
│   │   │   │   └── layout.tsx        # DR4FT | Builder
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx          # Multi-portal job search
│   │   │   │   └── layout.tsx        # DR4FT | Job Search
│   │   │   ├── feedback/
│   │   │   │   ├── page.tsx          # User feedback
│   │   │   │   └── layout.tsx        # DR4FT | Feedback
│   │   │   └── about/
│   │   │       ├── page.tsx          # About + tech stack
│   │   │       └── layout.tsx        # DR4FT | About
│   │   ├── components/
│   │   │   ├── GlassCard.tsx         # Glassmorphism card primitive
│   │   │   ├── PillButton.tsx        # Ghost/filled pill buttons
│   │   │   ├── ScoreRing.tsx         # Animated SVG score visualization
│   │   │   ├── FileUpload.tsx        # Drag-and-drop file upload
│   │   │   ├── MinimalInput.tsx      # Underline-style inputs
│   │   │   ├── Nav.tsx               # Fixed top nav bar
│   │   │   └── Logo.tsx              # D4 monogram
│   │   └── lib/
│   │       └── api.ts                # Typed API client
│   └── package.json
├── backend/
│   ├── main.py                       # FastAPI app + CORS + router registration
│   ├── routers/
│   │   ├── analyze.py                # /api/analyze, /api/analyze/ai, /api/roles
│   │   ├── jobs.py                   # /api/jobs/search, /companies, /insights
│   │   ├── feedback.py               # /api/feedback
│   │   ├── dashboard.py              # /api/dashboard/metrics, /skills, /trends
│   │   └── auth.py                   # /api/auth/login, /logout
│   ├── services/
│   │   ├── analyzer.py               # NLP resume analyzer (keyword, format, section)
│   │   ├── ai_analyzer.py            # Gemini-powered analysis
│   │   └── resume_builder.py         # Template-based resume generation
│   ├── models/
│   │   └── schemas.py                # Pydantic request/response models
│   └── config/
│       ├── database.py               # SQLite init + query helpers
│       └── job_roles.py              # 50+ role definitions with required skills
├── requirements.txt
├── Dockerfile
└── DESIGN.md                         # Full design system specification
```

## Design

Ultra-dark glassmorphism with monochrome palette. No accent colors. Glass cards with `backdrop-blur`, pill-shaped buttons, animated SVG score rings. Oswald for display type, Barlow for body. Dark mode only. Full spec in `DESIGN.md`.

## API

All endpoints prefixed with `/api`. Backend runs on port 3200, frontend on 2200.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Standard NLP resume analysis |
| POST | `/api/analyze/ai` | Gemini-powered AI analysis |
| GET | `/api/roles` | All job categories and roles |
| POST | `/api/jobs/search` | Multi-portal job search |
| GET | `/api/jobs/insights` | Market trends and salary data |
| POST | `/api/feedback` | Submit user feedback |
| GET | `/api/dashboard/metrics` | Resume submission analytics |

## Pre-Ship Checklist

Run these audits in Claude Code before final deploy. Each one is a slash command.

```
/cso                    # Security audit -- secrets, deps, injection, auth
/performance            # Load time, bundle size, rendering bottlenecks
/core-web-vitals        # LCP, INP, CLS scoring and fixes
/design-consultation    # Verify design system coherence against DESIGN.md
/web-quality-audit      # Full sweep -- perf, a11y, SEO, best practices
```

Run order: `/cso` first (fix vulnerabilities before anything else), then `/performance` + `/core-web-vitals` (can run together), then `/design-consultation`, then `/web-quality-audit` as the final pass.

---

Built by Thomas Ou