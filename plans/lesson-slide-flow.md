# Lesson Slide Flow Plan

## Summary
- Convert the homepage into an interactive lesson-flow deck for a 2-hour sliding-window lesson.
- Keep content aligned with `docs/lesson-plan-gpt.md` and let teachers move through teaching steps and problem sections in one place.
- Add a presenter/student role switch so students can follow without seeing private teacher notes.

## Exec Plan
- [x] Add student-facing context field to lesson steps so classroom-visible context is explicit and shared across views.
- [x] Keep presenter-only talking points in `teacherNotes` and hide them unless Presenter helper toggle is enabled.
- [x] Render all problem supporting materials (goal, sample IO, tracing, implementation, checkpoints, mistakes) without part-based hiding.
- [x] Ensure deck navigation supports sync-friendly sharing and direct slide targeting via URL.
- [x] Verify build and add/update smoke tests for presenter/student parity and always-visible context behavior.

## Key Changes
- `app/page.tsx`: replace the static documentation layout with an interactive slide deck component.
- `components/LessonFlowDeck.tsx`: new client component that renders:
  - timeline-based teacher steps
  - per-problem problem stations
  - trace stepping and solution-reference toggles
  - note capture for each section
- `components/LessonFlowDeck.tsx`: presenter/student views now share the same visible slide context by default, with optional Presenter talking points for private delivery cues.
- `data/lessonFlow.ts`: new lesson flow content model driven by the 2-hour lesson outline.
- `app/globals.css`: new deck, timeline, and studio styles.
- `components/LessonFlowDeck.tsx`: reveal behavior now supports slide-by-slide reveal progression for student/context prompts on both lesson and problem sections.
- `data/lessonFlow.ts`: expanded Problem 1 state example and enriched grouped presenter talking points with concrete class-ready expansion detail.

## Acceptance Tests
- Load page in browser and verify:
  - slide list renders in order
  - presenter/student toggle changes visible sections
  - next/previous slide controls work
  - problem sections open with 5-part workflow
  - trace player controls reveal lines progressively
- Verify TypeScript compile for all new files.

## Completion Notes
- In this implementation, students and presenter share the same lesson and problem content by default.
- Presenter-only talking points are isolated to a toggle in Presenter mode.
- Problem slide information is not gated by part; part controls remain for pacing and guided walkthrough.
- Presenters can advance student prompts one bullet at a time and reset to no-prompt start on slide changes for classroom pacing.

## Assumptions
- No backend sync is required in this iteration (students load same slide deck and follow manually while the instructor screenshares).
- We keep problems as static content from existing `data/problems.ts` and do not add a code runner/editor in this version.
