## Sliding Window Lesson Site Smoke Tests

### Home deck loads and navigates
- **Action**: run `npm run dev`, open `/`, then use `Next slide` and `Previous slide`.
- **Expected**: each slide loads, lesson progress updates, and slide index in URL stays in sync.

### Presenter vs student parity
- **Action**: on a lesson slide and a problem section, switch Presenter view and Student view.
- **Expected**:
  - In both modes, learner content (goal/context/inputs/checkpoints/traces) stays visible.
  - Presenter-only controls are hidden in Student mode.
  - In Presenter mode, checking `Presenter talking points` reveals private notes, and unchecking hides them.
  - On Lesson and Problem sections, learner points are revealed one-by-one using `Reveal next`/`Reset`.

### Problem section pacing
- **Action**: open one problem and click through `Understand`, `Plan`, `Trace`, `Build`, `Check`.
- **Expected**:
  - Subtitle updates for each part.
  - Problem statement, sample input/output, trace panel, reference code, checkpoints, mistakes, and stretch question stay visible across part changes.
  - Trace controls still step forward/backward through visible lines.

### Beginner-facing content checks
- **Action**: in presenter notes for each problem, open with notes on and quickly scan prompts/checklists.
- **Expected**:
  - Prompts include "first 2-3 edge checks" language.
  - Fixed-size vs variable-size distinction is clearly called out for Problems 1-4.
  - Checklists include multi-shrink example, duplicate/multiplicity checks, and best-window timing for the minimum window problem.
  - `k > n`, `k = 0`, impossible target/missing-required, and duplicate-heavy cases are present.

### Presenter talking point grouping checks
- **Action**: on a lesson slide and a problem slide, open Presenter view, toggle `Presenter talking points`, and expand a top-level group.
- **Expected**:
  - Talking points render in grouped sections rather than one flat list.
  - Some bullets reveal expansion lines when expanded.
  - No numeric answer text from instructor examples replaces student prompts on lesson-context lines.

### Direct slide sharing
- **Action**: click `Copy slide link` on a lesson and problem slide, then open the copied URL in a new tab.
- **Expected**: shared URL opens at the same slide number.
