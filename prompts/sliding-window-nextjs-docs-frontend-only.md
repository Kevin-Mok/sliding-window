# Prompt: Build a Frontend-Only Next.js Sliding Window Documentation Site

Build a production-minded, static, zero-config deployable documentation site on **Next.js (App Router)** with **TypeScript** and **Tailwind CSS**.

## Context
Use the lesson content from `/home/kevin/coding/sliding-window/lesson-plan-gpt.md`.

You are building a dark, minimalistic, high-contrast site for the Sliding Window lesson with four practice problems.

## Core requirements
1. Frontend-only architecture: no API routes, server-side databases, or external DB-like services.
2. Must deploy on Vercel with zero runtime config.
3. Must include:
   - `app/layout.tsx`
   - `app/page.tsx`
   - `data/problems.ts`
   - Problem-driven components (at least one component file for cards and one for code/trace rendering).
4. Use only static data and local state.
5. Ensure the site is fully responsive and readable on desktop/mobile.

## Visual and engineering direction
1. Set a dark, minimal, high-contrast design:
   - Deep slate/charcoal background, muted borders, bright accent for code/active states.
   - Strong spacing rhythm and typographic hierarchy.
2. Typography tuned for learning/coding content:
   - Headings: `IBM Plex Sans` or `Inter`-style alternative from Google Fonts.
   - Body: high legibility sans-serif.
   - Code: monospaced stack for code and traces.
3. Produce a “technical documentation” feel with concise section headers, numbered steps, and clear callouts.
4. Keep bundle size and complexity small; prefer simple reusable components.
5. Add subtle, purposeful motion (enter animations and hover/press states only).

## Data modeling requirement
Create `data/problems.ts` with explicit TypeScript interfaces and an exported typed array for the four practice problems:

- `Problem 1: Best K-Day Step Streak`
- `Problem 2: Shortest Study Sprint`
- `Problem 3: Longest Club Code With Limited Symbols`
- `Problem 4: Smallest Announcement Clip`

Data model should support:

- `id`, `title`, `difficulty`, `conceptFocus`, `slug`
- `description`
- `inputSpec`, `outputSpec`
- `sampleInput`, `sampleOutput`
- `pythonSolution`
- `explanation`
- `traceAscii` (array of strings, representing inline ASCII terminal steps)
- `timeComplexity`, `spaceComplexity`
- optional `commonMistakes`

Use the lesson text as source-of-truth for statements and examples.

Render the array with a `.map(...)` into responsive problem cards. Each card should include:

- difficulty chip
- one-line concept focus
- short statement
- sample input/output
- quick complexity line
- button/link to open section details

## Component requirements
Create reusable components (TSX), at minimum:

1. `ProblemCard`
- receives a single problem object
- renders title, difficulty, statement, sample pair, and complexity
- has accessible semantics (`article`, headings, contrast-friendly tokens)

2. `CodeBlock`
- syntax highlighted Python block for every `pythonSolution`
- can be custom (manual token spans/CSS classes) **or** using a standard syntax-highlighting package
- preserve line spacing and indentation

3. `Visualizer` section in the page
- layout as a split panel: left = `CodeBlock`, right = scrollable ASCII trace log
- style as terminal-like panel (monospaced text, prefix markers, muted metadata line)
- for each problem render associated traces from `traceAscii`

## app/page.tsx behavior
1. Import `problems` from `data/problems.ts`.
2. Render page with:
   - header hero
   - mini sliding-window concept introduction
   - responsive grid/list of `ProblemCard` items
   - detail section per problem with `CodeBlock` + `Visualizer`
   - closing checklist/summary
3. Keep all content in static JSX driven by the typed data.

## Layout requirements (`app/layout.tsx`)
1. Use shared token-driven theme variables in `className` or CSS variables.
2. Set default font variables for heading/body/code.
3. Ensure `<html>` default is dark theme.
4. Keep metadata minimal and useful (`title`, `description`).

## Non-functional requirements
- No external API calls.
- Keep state local and deterministic.
- Keep accessibility: clear contrast ratio, focus-visible styles, semantic structure.
- Keep TypeScript strict-friendly (typed props, no `any`).

## Deliverables from this prompt
Generate all of the following in one pass:

- `app/layout.tsx`
- `app/page.tsx`
- `data/problems.ts`
- `components/ProblemCard.tsx`
- `components/CodeBlock.tsx`
- `components/Visualizer.tsx`
- `app/globals.css` updates (or equivalent theme CSS) for dark minimal style and terminal-style panels

## Acceptance criteria
- The page builds with `npm run dev` and deploys to Vercel with no extra runtime env variables.
- All four problem solutions are displayed from the typed array in `data/problems.ts`.
- Every problem card and detail section is derived from mapped data, not hardcoded duplicates.
- Python solutions are syntax highlighted and legible against dark background.
- Visualizer panel displays inline ASCII algorithmic traces while browsing each problem.
