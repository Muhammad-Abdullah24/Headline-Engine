# Hirenum — LinkedIn Headline Positioning Engine
## CLAUDE.md — Context for future sessions

---

## What this tool is and why it exists

This is the **LinkedIn Headline Positioning Engine** — a free, standalone web tool built for Hirenum. It is the second tool in Hirenum's "free tools" suite, designed as a top-of-funnel SEO asset and brand recognition play.

**The core reframe:** Every other headline generator asks "who are you?" — this tool asks "who are you trying to attract, and what do they need to feel?" It's not a generator. It's a positioning engine.

The tool is designed to be shareable — the audit section in particular is meant to be screenshot-worthy. People should want to post their scores on LinkedIn, which drives organic reach back to Hirenum.

---

## Hirenum Brand Context

- **Tagline:** We Brand People
- **What they do:** LinkedIn personal branding agency for founders, C-suites, and professionals
- **Background color:** `#F5F0EB` (cream/off-white)
- **Primary:** `#1BB8BD` (teal)
- **Accent:** `#DC0078` (magenta)
- **Dark text:** `#1A1A2E`
- **Muted text:** `#4A4A6A`
- **Website:** hirenum.com
- **LinkedIn:** @hirenum

Design voice: honest, premium, bold. The audit should feel like a trusted advisor telling you hard truths. The results should feel like unlocking something powerful.

---

## Two API Call Flows

### Call 1 — Headline Audit (`/api/audit`)
**Triggered by:** User pasting their current headline and clicking "Audit My Headline"
**Model:** `gpt-4o` (OpenAI, configurable via `MODEL` in `lib/openai.ts`)
**Purpose:** Score the current headline on 3 dimensions before showing the solution. This creates the "feel the problem" moment.
**Output:** JSON with clarity, attraction, differentiation scores (each 0–10) + overall verdict

### Call 2 — Headline Generation (`/api/generate`)
**Triggered by:** User submitting the 5-field form
**Model:** `gpt-4o` (OpenAI, configurable via `MODEL` in `lib/openai.ts`)
**Purpose:** Generate 5 meaningfully different headlines, each engineered for a specific strategic goal
**Output:** JSON array of 5 variants, each with headline, scores, ICP mirror, algorithm status

Both API calls are in `lib/openai.ts`. Both routes are in `app/api/audit/route.ts` and `app/api/generate/route.ts`.

---

## The Five Input Fields

1. **Role / what you do** — Not job title. What you actually do functionally.
2. **Industry** — Dropdown of major industries. Sets context for keyword relevance.
3. **ICP** — Who they want to attract. The most important field. Forces specificity.
4. **Value / outcome** — What result do they create for their ICP? Result-first framing.
5. **Primary goal** — Inbound Leads / Speaking / Media / Recruiting / Partnerships. Tells the AI which variant to weight as "primary" — though all 5 are always generated.

---

## The Eight Output Features

1. **Before/After Audit** — Scores current headline across 3 dimensions. The hook. Shame trigger. Share trigger. Runs before generation so user feels the problem.

2. **Smart Input Form** — Five fields that reframe identity around ICP and outcome rather than job title. Forces strategic thinking.

3. **Goal-Based Headline Variants** — 5 headlines, each labeled by strategic intent. Must feel meaningfully different, not just reworded.

4. **Positioning Score Per Headline** — Clarity / Attraction / Differentiation scored 0–10 each. Displayed with animated progress bars + circular avg ring.

5. **ICP Mirror Test** — Below each headline: "What your ICP thinks when they read this." Translates the headline into the reader's emotional response. Displayed on dark background for contrast.

6. **LinkedIn Algorithm Friendliness Flag** — Green / Yellow / Red badge per headline. One-line explanation of keyword optimization for LinkedIn search.

7. **One-Click Copy** — Every headline has a copy button with satisfying UI feedback.

8. **Share Nudge** — Shows old score vs new best score. Provides a pre-written LinkedIn post the user can copy that references @hirenum and links to the tool.

---

## Tech Stack

- **Framework:** Next.js 15 with TypeScript (App Router)
- **Styling:** Tailwind CSS + inline CSS variables
- **AI:** OpenAI API (`gpt-4o`)
- **State:** Client-side only — no database, no auth, stateless
- **Deploy:** Vercel
- **Font:** Inter (Google Fonts)
- **Mobile:** Fully responsive — built mobile-first

---

## File Structure

```
app/
  page.tsx              — Main orchestrator page, manages all state
  layout.tsx            — Root layout with metadata
  globals.css           — CSS variables, animations, base styles
  api/
    audit/route.ts      — POST /api/audit
    generate/route.ts   — POST /api/generate

components/
  HeadlineAudit.tsx     — Step 1: paste + audit current headline
  HeadlineForm.tsx      — Step 2: 5-field positioning form
  HeadlineResults.tsx   — Step 3: 5 headline variants with all data
  ScoreCard.tsx         — Reusable: animated bars + circular score ring
  AlgorithmBadge.tsx    — Reusable: green/yellow/red algorithm badge
  CopyButton.tsx        — Reusable: one-click copy with feedback
  ShareNudge.tsx        — Step 4: share prompt with pre-written LinkedIn post

lib/
  openai.ts             — OpenAI SDK calls: auditHeadline, generateHeadlines
  types.ts              — TypeScript interfaces: AuditResult, HeadlineVariant, FormData
```

---

## Environment Variables

```
OPENAI_API_KEY=your_key_here
```

Set in `.env.local` for development, in Vercel project settings for production.

---

## What the Next Tool in the Suite Is

**Tool 3 — LinkedIn About Section Writer**
The About section is the second most important positioning asset after the headline. Most About sections read like resumes. This tool will help users write a first-person narrative that converts — using the same ICP-first framing philosophy as this headline tool.

Planned features:
- About section audit (current vs optimized)
- 3 style variants: Authority, Story-Driven, Challenger
- Hook generator (first 2 lines = the "See more" click)
- CTA builder for the closing paragraph
- Character count with LinkedIn limit enforced (2,600 chars)

---

*The first tool in the suite is the LinkedIn Post Formatter — already live.*
