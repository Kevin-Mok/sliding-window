# Prompt: Align Problem 1 Terminology With the LeetCode Reference

Update Problem 1 terminology, variable names, and teaching copy so they match the reference implementation at:

`/home/kevin/coding/leetcode/sliding-window/1-best-k-day-step-streak.py`

## Context
- This repo teaches the sliding window pattern through a live app plus supporting teaching content.
- Problem 1 is `best-k-day-step-streak`.
- Use the reference file above as the source of truth for Problem 1 naming, code shape, and explanation framing.

## In Scope
- `data/problems.ts`
- `data/lessonFlow.ts`
- `docs/assignment.md`

## Out of Scope
- `docs/lesson-plan-gpt.md`
- `docs/lesson-plan-gpt-input.md`
- `docs/lesson-plan-gpt-suggestions.md`
- `docs/lesson-plan-gpt-optimizer-prompt.md`
- unrelated problems, prompts, or repo-wide terminology cleanup

## First Step
1. Read `/home/kevin/coding/leetcode/sliding-window/1-best-k-day-step-streak.py` before making any edits.
2. Search only the in-scope files for stale Problem 1 terminology such as `window_sum`, `best`, or `right - k` teaching language.
3. Keep the diff limited to the in-scope files unless a direct dependency makes one extra file unavoidable.

## Required Changes
1. Make Problem 1 code and explanation content match this function signature:

```python
def best_k_day_steps(steps: list[int], k: int) -> int | None:
```

2. Use the same invalid-input guard as the reference:

```python
if k <= 0 or k > len(steps):
    return None
```

3. For Problem 1, align terminology and state names with the reference:
- `left`
- `right`
- `cur_total_steps`
- `best_total_steps`

4. Match the reference setup shape for the first full window:
- initialize `left = 0`
- initialize `right = k - 1`
- compute the first window with `sum(steps[left:right + 1])`
- start `best_total_steps` from that first full window

5. Match the reference slide order exactly in Problem 1 explanations and code examples:
- remove the old left value
- increment `left`
- increment `right`
- add the new right value
- update the best total

6. Match the reference explanation framing:
- `right` is inclusive
- the first full `k`-day window spans indices `0` through `k - 1`
- `right + 1` is used because Python slices stop before the end index

7. Update teaching copy so Problem 1 no longer teaches the older framing below inside the in-scope files:
- `window_sum`
- `best`
- “loop starts at `right = k`”
- “subtract `right - k`”

8. Preserve these Problem 1 facts:
- title: `Best K-Day Step Streak`
- slug: `best-k-day-step-streak`
- sample input and output
- fixed-size window lesson objective
- overall problem difficulty and ordering

## Constraints
- Do not rewrite unrelated content just to normalize wording.
- Do not perform a repo-wide documentation sweep.
- Do not change Problem 2, 3, or 4 terminology unless a shared sentence becomes incorrect because of the Problem 1 update.
- Prefer small, surgical edits that clearly map back to the reference file.

## Verification
1. Confirm the reference file was inspected first.
2. Confirm each in-scope file was checked for stale Problem 1 terminology.
3. Confirm Problem 1 now uses the reference terminology/code shape in all edited locations.
4. Confirm the diff stays limited to the scoped files unless a direct dependency forced one extra file.
5. Summarize any remaining out-of-scope inconsistencies without editing them.
