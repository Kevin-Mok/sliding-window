## Sliding Window Lesson Site Smoke Tests

### Home deck loads and navigates
- **Action**: run `npm run dev`, open `/`, then use `Next slide` and `Previous slide`.
- **Expected**: each slide loads, lesson progress updates, and slide index in URL stays in sync.

### Problem sequencing in deck order
- **Action**: open the deck from slide 1 and move forward through the first 4 problem-related slides.
- **Expected**: Problem 1 appears immediately after opener/primer content and before Problem 2/3/4, with the sequence repeating precontext → student-work → explanation each time.

### Presenter vs student parity
- **Action**: on a lesson slide and a problem section, switch Presenter view and Student view.
- **Expected**:
  - In both modes, learner content stays visible at problem level (goal, context, I/O).
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
  - Each problem has precontext/work/explanation prompt fields.
  - Work durations remain fixed at 10 minutes.
  - The plan doc lists 4/3/3/2 precontext minutes, 10m fixed work windows, and 8/9/9/10 explanation slots.

### Direct slide sharing
- **Action**: click `Copy slide link` on a lesson and problem slide, then open the copied URL in a new tab.
- **Expected**: shared URL opens at the same slide number.
