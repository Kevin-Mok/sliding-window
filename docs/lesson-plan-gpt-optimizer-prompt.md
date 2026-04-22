# Prompt: Optimize Sliding-Window Lesson Flow

You are a senior computer science lesson architect and instructional designer.

## Task
Optimize the lesson in the file `docs/lesson-plan-gpt-input.md` for:
- lesson flow
- difficulty progression
- teaching explanations clarity
- teaching time balance
- slide talking points
- student comprehension checkpoints

Do not redesign the topic (still sliding window), and do not change the lesson objectives.

## Context
Use `docs/lesson-plan-gpt-input.md` as the current baseline plan.
Assume these fixed constraints:
- Total class time: 120 minutes.
- Current class topics are fixed in order unless a change is clearly justified.
- Keep concept-first instruction between problems.
- Hardest problem remains homework unless pacing allows otherwise.

## What to optimize
1. Produce a revised 120-minute timeline with exact start/end times.
2. For each segment, include:
   - segment type (slide/problem),
   - duration,
   - intended learning intent,
   - exact teacher talking points (3–7 bullets),
   - student checks before progressing,
   - likely confusion points,
   - one-line “exit criterion.”
3. Improve difficulty progression (why this order now works, or what to reorder).
4. Improve teaching-time distribution:
   - minimum/ideal/max hold times,
   - where to add/remove buffers,
   - what to compress under time pressure.
5. Add a rescue-first pacing strategy for each transition:
   - if students are slow, where to cut,
   - if students are fast, where to extend with deeper explanations/examples.
6. Add explicit “what to teach before/after trace” for each in-class problem.
7. Keep or improve class/problem-scope rules:
   - Problem 1: `best-k-day-step-streak` (Easy)
   - Problem 2: `shortest-study-sprint` (Easy-to-Medium)
   - Problem 3: `longest-club-code-with-limited-symbols` (Medium)
   - Homework: `smallest-announcement-clip` (if/when in-class pace is insufficient)

## Output format required
Return exactly:
- **Revised Timetable (120m)** as a Markdown table with columns:
  `Start`, `End`, `Segment`, `Intent`, `Talking Points`, `Checks`, `Duration`.
- **Difficulty Rationale**
- **Teaching-Time Plan** (default / slow class / fast class variants)
- **Risk & Recovery Matrix** (at least 8 risks, each with fix script)
- **Top 10 Slide Talking Points** (ready to say aloud)
- **Final Recommendation**: keep vs swap vs remove vs add
  - For each change, include tradeoff and time impact.

## Hard requirements
- Total time must sum to 120m in the main plan.
- Preserve concept-before-code sequencing.
- Use exact problem titles and slugs from baseline.
- Keep student-facing language clear and concise.
- Do not rely on vague generic phrases; make each checkpoint concrete and observable.

## Style constraints
- Be practical for real classroom use.
- Prefer short, repeatable phrases teachers can memorize.
- Make transitions explicit (“Now that they know X, we move to Y because…”).
- Prioritize high-confidence execution over perfect elegance.

## Example segment template (for your response)
For each row, output:
- `Goal`: what students must complete
- `Tell`: exact teacher line
- `Ask`: one check question
- `Stop condition`: when to move to next segment
