## Sliding Window Lesson Site Smoke Tests

### Home deck loads and navigates
- **Action**: run `npm run dev`, open `/`, then use `Next slide` and `Previous slide`.
- **Expected**: each slide loads, lesson progress updates, and slide index in URL stays in sync.

### Problem sequencing in deck order
- **Action**: open the deck from slide 1 and move forward through the deck timeline.
- **Expected**: slides are ordered as:
  - Teaching: `recognize-constraint`
  - Teaching: `derive-state`
  - Problem 1 (`best-k-day-step-streak`) precontext → student-work → explanation
  - Teaching: `fixed-proof`
  - Teaching: `pattern-decision`
  - Problem 2 (`shortest-study-sprint`) precontext → student-work → explanation
  - Teaching: `variable-demo`
  - Teaching: `invariant`
  - Problem 3 (`longest-club-code-with-limited-symbols`) precontext → student-work → explanation
- **Expected**: no in-class Problem 4 slide appears in the main deck.

### Presenter vs student parity
- **Action**: on a lesson slide and a problem section, switch Presenter view and Student view.
- **Expected**:
  - In both modes, learner content stays visible at problem level (goal, context, I/O).
  - On the `variable-demo` lesson slide, the student reference trace table is visible in both modes and keeps the generic columns for `left`, `right`, `window`, `current_sum`, validity, and `best_length`.
  - In Student view, explanation-only material is hidden: trace walkthrough, reference implementation, checkpoint list, and common mistakes.
  - Presenter-only controls are hidden in Student mode.
  - In Presenter mode, checking `Presenter talking points` reveals private notes, and unchecking hides them.
  - On Lesson and Problem sections, learner points are revealed one-by-one using `Reveal next`/`Reset`.

### Problem phase order and returns
- **Action**: open one workshop and inspect timeline tiles for that workshop.
- **Expected**:
  - For each problem, the timeline shows exactly three consecutive phases: `precontext`, `student-work`, `explanation`.
  - Timeline can move between phases and returns cleanly to the next problem or next section.
  - Problem stage nav matches the phase order and disables at section ends.

### Student work hint timing checks
- **Action**: open a problem student-work phase and reveal prompts, then open precontext and explanation phases.
- **Expected**:
  - Student-work prompts include exactly three explicit hint checkpoints for ~3/6/9 minutes.
  - Hint labels are not present in precontext or explanation phases.
  - Hint prompts cover template setup, transition logic, then edge/failure correction.

### Edge coverage checks
- **Action**: in presenter notes, scan explanation prompts for each problem and run one trace in each phase.
- **Expected**:
  - Explanation prompts call out `k = 0`, `k > n`, impossible target/missing required, duplicate-heavy, and multi-shrink context.
  - Common-bug checkpoints are still present and visible in checkpoints and instructor notes.

### Deck metadata and docs alignment
- **Action**: review `data/lessonFlow.ts` and `docs/lesson-plan-gpt.md` after implementation.
- **Expected**:
  - A class agenda is defined with an explicit interleaved order.
  - In-class lesson step durations and problem phase durations match a 120-minute total.
  - Problem 4 (`smallest-announcement-clip`) is marked as homework-only for class.

### Direct slide sharing
- **Action**: click `Copy slide link` on a lesson and problem slide, then open the copied URL in a new tab.
- **Expected**: shared URL opens at the same slide number.
