# Sliding Window Lesson Deck

This repository turns a competitive-programming lesson on the sliding window pattern into a single classroom-ready product. Instead of juggling separate slide decks, handwritten examples, coding prompts, and teacher notes, the instructor can run one interactive site while students follow the exact same sequence from their own screens.

That matters because algorithm teaching often breaks when context disappears between explanation and practice. Here, the lesson objective, example data, workshop prompts, trace walkthroughs, and solution references stay connected inside one deployable Next.js app. The result is a stronger recruiter-facing project too: it demonstrates product thinking, pedagogy, typed frontend architecture, and the ability to turn raw lesson material into a polished interactive learning experience.

## Tech Stack And Why Chosen

- `Next.js 14` for a simple app-router frontend with zero backend requirements and clean deployment on Vercel
- `React 18` for stateful presenter/student interactions and slide-level UI controls
- `TypeScript` for typed lesson/problem content models and safer UI iteration
- `Tailwind CSS` tooling in the build pipeline, while the deck styling itself stays explicit in `app/globals.css` for total presentation control

This stack works well here because the product is content-heavy, interactive, and deployment-light. Everything important lives in versioned frontend code and typed data, which makes the lesson easy to refine without introducing backend complexity.

## Why This Repo Is Impressive

- it reframes algorithm teaching as a productized live-learning experience instead of a static notes page
- it supports two audiences at once: instructor delivery and student follow-along
- it combines pedagogy, interaction design, and implementation detail in one coherent frontend
- it shows how educational content can be encoded as reusable data rather than hard-coded page copy

## What This Repo Does

- turns a static algorithm lesson into a presenter/student synchronized slide deck
- keeps lesson context visible to both audiences on every slide
- isolates presenter-only talking points behind a presenter toggle
- includes guided problem workshop sections with prompts, trace walkthroughs, checkpoints, and reference implementations
- supports direct slide sharing through the `?slide=` URL parameter

## Install And Bootstrap

Requirements:

- `node`
- `npm`

Setup:

```bash
npm install
```

## Day-To-Day Usage

- run the local lesson site during development
- review the lesson flow and smoke checks before class
- create a production build when you want deployment confidence

## Core Command Reference

- `npm run dev`: start the local lesson deck at `http://localhost:3000`
- `npm run build`: create a production build and run type-aware Next.js compilation checks
- `npm run start`: serve the built application
- `npm run lint`: run the Next.js lint command

```bash
npm run dev
```

Open `http://localhost:3000`.

Production build:

```bash
npm run build
npm run start
```

Linting:

```bash
npm run lint
```

## How The Lesson Flow Works

- the homepage renders the full lesson deck from typed data in `data/lessonFlow.ts`
- lesson slides show shared context, student activity, and teaching checks
- problem slides keep the statement, sample I/O, trace, code, checkpoints, and common mistakes visible throughout the workshop
- presenter mode can optionally reveal private delivery notes without changing what students see
- the current slide is encoded in the URL so a teacher can copy a link and keep the class in sync

## Project Structure

- `app/`: Next.js app router entrypoints and global styling
- `components/`: deck UI, code rendering, and supporting lesson presentation components
- `data/`: lesson flow content and sliding-window problem data
- `docs/`: lesson plan materials and smoke-test notes
- `plans/`: execution notes for significant product changes

## Smoke Test Flow

The core manual checks live in [`docs/smoke-tests.md`](docs/smoke-tests.md). The current smoke path is:

- run `npm run dev`
- verify slide navigation and progress updates
- toggle Presenter view and Student view and confirm shared content remains visible
- open a problem section and step through the pacing tabs
- copy a slide link and confirm the new tab opens on the same slide

## Source Material

- lesson outline: `docs/lesson-plan-gpt.md`
- classroom assignment context: `docs/assignment.md`
- supporting teaching material: `docs/material.md`
