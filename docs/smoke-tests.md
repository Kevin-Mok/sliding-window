## Sliding Window Lesson Site Smoke Tests

### Home deck loads and navigates
- **Action**: run `npm run dev`, open `/`, and move through all slides using `Next slide` and `Previous slide`.
- **Expected**: every slide renders and the progress percentage updates.

### Presenter vs student flow
- **Action**: toggle between Presenter view and Student view on a lesson slide and a problem section.
- **Expected**:
  - In base mode, both views show the same slide content needed to understand the problem or teaching point.
  - On Presenter view, **Presenter talking points** can be toggled on to show private delivery prompts only.
  - In Student view, talking points controls are not shown and only shared content remains.

### Problem section flow
- **Action**: open a problem section, step through Understand → Plan → Trace → Build → Check.
- **Expected**:
  - Part navigation changes the pacing subtitle (`Understand`, `Plan`, `Trace`, `Build`, `Check`).
  - Problem statement, goal, sample input/output, trace panel, reference implementation, checkpoints, mistakes, and stretch question stay visible throughout the section.
  - Trace line controls still advance or rewind the walkthrough.

### Direct slide sharing
- **Action**: click `Copy slide link`, open the copied URL in a new tab.
- **Expected**: the new tab opens at the same slide number.
