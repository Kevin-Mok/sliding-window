Absolutely — here’s the full **polished, classroom-ready lesson package**.

# Sliding Window Technique

## Complete 2-Hour Google Classroom Lesson Package

### Grade/Course Level: High School

### Language: Python

**Teacher source note:** This lesson is designed for Google Classroom-style posting using Classwork topics, Materials, Assignments, Questions, and rubrics, all of which are supported in Google Classroom’s teacher workflow. Google’s help pages also note that Materials can be posted as class resources, Assignments can be graded and returned, Questions can be posted, topics can organize classwork, and rubrics can be created or reused for assignments. ([Google Help][1]) The lesson’s focus on algorithmic problem solving fits the CSTA K–12 Computer Science Standards’ goal of providing core CS learning objectives for K–12 curriculum. ([Computer Science Teachers Association][2]) Python examples use standard list, string, and dictionary patterns consistent with Python’s official documentation on built-in data structures. ([Python documentation][3])

---

# TEACHER ONLY

---

# 1) LESSON OVERVIEW

## Lesson Title

**Sliding Window: Solving Array and String Problems by Reusing Work**

## Grade/Course Level

**High School**

## Estimated Duration

**2 hours**

## Prerequisites

Students should already know:

* Arrays/lists and strings
* `for` loops and `while` loops
* Variables and conditionals
* Basic time complexity ideas, especially the difference between roughly “checking everything again” and “checking each item once”

## Learning Objectives

By the end of the lesson, students will be able to:

1. Explain the sliding window technique in beginner-friendly language.
2. Identify when a problem might be solved with a fixed-size or variable-size window.
3. Use left and right pointers to represent a window inside an array or string.
4. Maintain a running state, such as a sum or character count, instead of recomputing from scratch.
5. Compare a brute force solution with a sliding window solution using time complexity.

## Success Criteria

Students can say:

* “I can describe a window as a group of neighboring items in a list or string.”
* “I can move a window across data by adding the new item and removing the old item.”
* “I can tell the difference between a fixed-size window and a variable-size window.”
* “I can write Python code that uses `left` and `right` pointers.”
* “I can explain why sliding window is usually faster than checking every possible group from scratch.”

---

# 2) GOOGLE CLASSROOM SETUP

## Topic Name

```text
Algorithms: Sliding Window
```

---

## Material Post

### Title

```text
Intro to Sliding Window
```

### Body

```text
Today we are learning the Sliding Window technique.

Sliding window is a problem-solving pattern used with arrays/lists and strings. Instead of checking every possible group from scratch, we keep track of a “window” of neighboring items and update only what changes as the window moves.

By the end of class, you should be able to:
1. Explain what a window is.
2. Tell the difference between fixed-size and variable-size windows.
3. Use left and right pointers in Python.
4. Solve several array and string problems more efficiently than brute force.

Bring:
- Your notes
- A coding environment
- A willingness to trace code carefully
```

---

## In-Class Assignment

### Title

```text
Sliding Window Practice: 4 Problems
```

### Instructions

```text
Complete the four sliding-window practice problems from today’s handout.

For each problem, submit:
1. A short explanation of your approach in plain English.
2. Your Python solution.
3. At least one test case you created yourself.
4. A brief note explaining whether the problem used a fixed-size or variable-size window.

Work expectations:
- Problems 1 and 2 should be completed by everyone.
- Problem 3 should be attempted by everyone.
- Problem 4 is the challenge problem. Try it after completing the first three.

You may work with a partner during class, but each student must submit their own explanation and code.
```

### Suggested Points

```text
20 points
```

---

## Question Post: Exit Ticket

### Question

```text
In your own words, what does the sliding window technique help us avoid doing?

Then answer one more question:
Which part is still confusing: fixed-size windows, variable-size windows, left/right pointers, or maintaining the running state?
```

---

## Optional Homework Assignment

### Title

```text
Optional Homework: Sliding Window Reflection and Extra Practice
```

### Instructions

```text
Choose one of today’s four problems and improve your solution.

Your homework submission should include:
1. The original problem title.
2. Your improved or cleaned-up Python solution.
3. A paragraph explaining how the window moves.
4. A paragraph explaining the time complexity.
5. One new test case, including the expected output.

Optional challenge:
Modify one solution so that it returns not just the answer, but also the starting and ending index of the best window.
```

---

## Simple 4-Criteria Rubric

| Criteria                      | 4 - Advanced                                                       | 3 - Proficient                                    | 2 - Developing                                       | 1 - Beginning                                     |
| ----------------------------- | ------------------------------------------------------------------ | ------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| Sliding Window Understanding  | Clearly explains the window, movement, and why the approach works. | Correctly explains the main idea with minor gaps. | Shows partial understanding but confuses some parts. | Cannot yet explain the technique clearly.         |
| Correctness of Solution       | Code works for normal cases and edge cases.                        | Code works for most normal cases.                 | Code works for some cases but has logic errors.      | Code is incomplete or does not solve the problem. |
| Use of Running State          | Efficiently updates only what changes.                             | Mostly maintains state correctly.                 | Sometimes recomputes or updates incorrectly.         | Does not use a meaningful running state.          |
| Explanation and Communication | Explanation is clear, organized, and uses correct vocabulary.      | Explanation is understandable.                    | Explanation is vague or missing important steps.     | Explanation is missing or very unclear.           |

---

# 3) 2-HOUR LESSON PLAN

## 0–4 Minutes: Opener + Problem Rhythm Setup

### Teacher Activity

- Announce the fixed class rhythm:
  - **Problem 1:** precontext 4 min, student work 10 min, explanation 8 min
  - **Problem 2:** precontext 3 min, student work 10 min, explanation 9 min
  - **Problem 3:** precontext 3 min, student work 10 min, explanation 9 min
  - **Problem 4:** precontext 2 min, student work 10 min, explanation 10 min
- Keep students in prompt-first mode during work blocks.
- Clarify: hint checks are only in the work windows at ~3, ~6, and ~9 minutes.

### Student Activity

Students call out what changes between neighboring windows in one overlap example and note fixed vs variable language.

### Goal

Create one shared pacing contract before all problems.

## 4–26 Minutes: Problem 1 Block (22 min)

- **4–8 min Precontext:** classify Problem 1, edge-check (`k = 0`, `k > n`) and state template.
- **8–18 min Student Work:** dry run sample rows with Hint 1 (`state/template`), Hint 2 (`transition logic`), Hint 3 (`edge/failure correction`).
- **18–26 min Explanation:** best-window timing, proof of correctness, and common fixed-window mistakes.

## 26–48 Minutes: Problem 2 Block (22 min)

- **26–30 min Precontext:** classify variable trigger and impossibility checks.
- **30–40 min Student Work:** right/left transitions with Hint 1 (`state/template`), Hint 2 (`transition logic`), Hint 3 (`edge/failure correction`).
- **40–48 min Explanation:** while-loop shrink logic, multi-shrink ordering, and common student failure correction.

## 48–70 Minutes: Problem 3 Block (22 min)

- **48–52 min Precontext:** map template and duplicate-heavy sanity checks.
- **52–62 min Student Work:** trace map transitions with Hint 1 (`state/template`), Hint 2 (`transition logic`), Hint 3 (`edge/failure correction`).
- **62–70 min Explanation:** counts vs set language, duplicate rescue, and off-by-one checks.

## 70–92 Minutes: Problem 4 Block (22 min)

- **70–74 min Precontext:** classify minimum-window structure and missing-required checks.
- **74–84 min Student Work:** best-window timing trace with Hint 1 (`state/template`), Hint 2 (`transition logic`), Hint 3 (`edge/failure correction`).
- **84–92 min Explanation:** answer-timing proof, required-character guardrails, and correction language.

## 92–120 Minutes: Transitions, Recap, Closure

- 20–24 minutes (plus flexible buffer) are used only for edge-case quiz, recap, and transfer checks.
- Instructor-only explanation follows the pre-specified cadence and avoids extending work windows.

## 4) 2-HOUR LESSON PLAN (Legacy Reference)

The active deck order now uses this sequence:
- 0-4 minute opener.
- Problem 1 precontext/work/explanation.
- Problem 2 precontext/work/explanation.
- Problem 3 precontext/work/explanation.
- Problem 4 precontext/work/explanation.
- Transition, recap, and edge-case quiz.

## 0–10 Minutes: Warm-Up / Hook

### Teacher Activity

Display this question:

```text
Given daily points:
[4, 2, 7, 1, 8, 3]

What is the highest total for any 3 days in a row?
```

Ask students to solve it however they want.

### Student Activity

Students calculate possible 3-day totals:

```text
4 + 2 + 7 = 13
2 + 7 + 1 = 10
7 + 1 + 8 = 16
1 + 8 + 3 = 12
```

### Goal

Help students notice that many groups overlap.

### Check for Understanding

Ask:

```text
When you moved from 4 + 2 + 7 to 2 + 7 + 1, what actually changed?
```

Expected answer:

```text
We removed 4 and added 1. The middle numbers stayed.
```

---

## 10–25 Minutes: Intuition Building

### Teacher Activity

Use a physical or visual analogy:

```text
Imagine holding a picture frame over part of a long row of numbers. The frame shows only a few numbers at a time. When the frame slides one step to the right, most of what you see is the same. Only one item leaves and one new item enters.
```

Draw this:

```text
numbers:  4   2   7   1   8   3
window:  [4   2   7]
slide:       [2   7   1]
slide:           [7   1   8]
slide:               [1   8   3]
```

### Student Activity

Students describe what leaves and enters each time.

### Goal

Build the idea that we can reuse previous work.

### Check for Understanding

Ask:

```text
Why would it be wasteful to add all three numbers again every time?
```

---

## 25–40 Minutes: Direct Teaching — Fixed-Size Sliding Window

### Teacher Activity

Explain:

```text
A fixed-size window always keeps the same length.
Example: every group of exactly 3 numbers.
```

Show the update rule:

```text
new_window_sum = old_window_sum - item_that_left + item_that_entered
```

### Student Activity

Students trace one example by hand.

### Goal

Students understand the basic fixed-size pattern.

### Check for Understanding

Ask students to fill in:

```text
Old sum = 13
Item leaving = 4
Item entering = 1
New sum = ?
```

Expected answer:

```text
10
```

---

## 40–55 Minutes: Guided Example — Problem 1 Style

### Teacher Activity

Code the fixed-size solution live.

Use this example:

```python
steps = [4, 2, 7, 1, 8, 3]
k = 3
```

Emphasize:

* Build the first window.
* Store the best answer so far.
* Slide the window.
* Update the running sum.
* Update the best answer.

### Student Activity

Students copy the code, trace it, and annotate what each line does.

### Goal

Students see a complete sliding-window solution.

### Check for Understanding

Ask:

```text
Why does the loop start at index k instead of index 0?
```

Expected answer:

```text
Because the first k items are already in the first window.
```

---

## 55–65 Minutes: Pattern Recognition

### Teacher Activity

Introduce two types of sliding window:

```text
Fixed-size window:
- Window length is given.
- Example: best total of exactly 3 days.

Variable-size window:
- Window grows and shrinks.
- Example: shortest group with total at least 10.
```

### Student Activity

Students classify examples:

```text
Find the best 5-day total. → Fixed-size
Find the shortest streak with at least 20 points. → Variable-size
Find the longest substring with at most 2 different letters. → Variable-size
```

### Goal

Students learn when to choose each version.

### Check for Understanding

Ask:

```text
What clue tells you a problem might use a fixed-size window?
```

Expected answer:

```text
The problem gives an exact window length, like exactly k items.
```

---

## 65–80 Minutes: Variable-Size Window Demo

### Teacher Activity

Use this example:

```text
blocks = [2, 3, 1, 2, 4, 3]
target = 7

Find the shortest consecutive stretch with total at least 7.
```

Explain:

* `right` expands the window.
* `left` shrinks the window.
* Expand until the window is valid.
* Shrink while it stays valid.
* Track the best length.

### Student Activity

Students trace the changing window:

```text
[2, 3, 1, 2] total = 8 → valid
Try shrinking
[3, 1, 2] total = 6 → no longer valid
Continue expanding
```

### Goal

Students understand expand/shrink logic.

### Check for Understanding

Ask:

```text
Why do we use a while loop to shrink instead of shrinking only once?
```

Expected answer:

```text
Because the window might still be valid after one shrink, so we should keep trying to make it smaller.
```

---

## 80–105 Minutes: Individual or Pair Practice

### Teacher Activity

Assign the four problems.

Recommended pacing:

```text
Problem 1: 8 minutes
Problem 2: 10 minutes
Problem 3: 12 minutes
Problem 4: challenge / remaining time
```

Circulate and ask guiding questions.

### Student Activity

Students solve independently or in pairs.

### Goal

Students apply the technique.

### Check for Understanding

Use these questions while circulating:

```text
What is your window?
What does your running state store?
When does right move?
When does left move?
When do you update the answer?
```

---

## 105–115 Minutes: Debrief

### Teacher Activity

Review the main patterns:

```text
Fixed-size:
1. Build first window.
2. Slide one step at a time.
3. Remove left item, add right item.
4. Track best answer.

Variable-size:
1. Expand with right.
2. Update state.
3. While the window breaks or satisfies a condition, shrink with left.
4. Track best answer at the correct time.
```

### Student Activity

Students correct one mistake in their code or notes.

### Goal

Students consolidate the pattern.

### Check for Understanding

Ask:

```text
What is one bug you had or almost had today?
```

---

## 115–120 Minutes: Exit Ticket

### Teacher Activity

Post or display the exit ticket.

### Student Activity

Students answer individually.

### Goal

Assess understanding and confusion points.

### Check for Understanding

Review responses for:

* Students who confuse fixed and variable windows
* Students who do not understand why the method is efficient
* Students who struggle with `left` and `right`

---

# 4) CONTENT TEACHING NOTES

## Beginner-Friendly Definition

**Sliding window** is a technique where we look at a small consecutive section of an array or string, then move that section step by step.

Instead of recalculating everything from scratch, we update only the part that changed.

Say this out loud:

```text
A sliding window is like a moving frame. It shows one section of the data at a time. As the frame moves, one item may leave, one item may enter, and we update our answer.
```

---

## When to Recognize a Sliding Window Problem

A problem might use sliding window when it asks about:

* Consecutive items
* A subarray
* A substring
* A streak
* A range
* “Longest”
* “Shortest”
* “Maximum total”
* “Minimum length”
* “At most k”
* “At least target”
* “Exactly k”

Important clue:

```text
Sliding window usually works when the answer depends on neighboring items, not items scattered randomly across the list.
```

Examples:

```text
Highest sum of 4 numbers in a row → sliding window
Longest substring with at most 2 different letters → sliding window
Find two numbers anywhere that add to 10 → probably not sliding window
Sort the whole list → not sliding window
```

---

## Fixed-Size vs. Variable-Size Windows

## Fixed-Size Window

The window length stays the same.

Example:

```text
Find the greatest sum of exactly 3 numbers in a row.
```

The window always has 3 numbers:

```text
[4, 2, 7]
   [2, 7, 1]
      [7, 1, 8]
```

Use fixed-size when the problem says:

```text
exactly k items
k days in a row
length k
window size k
```

---

## Variable-Size Window

The window can grow and shrink.

Example:

```text
Find the shortest group of numbers with a sum of at least 10.
```

The window might be length 4, then length 3, then length 2.

Use variable-size when the problem says:

```text
shortest
longest
at least
at most
no more than
until condition is true
while condition is broken
```

---

## How Left and Right Pointers Work

Use two variables:

```python
left = 0
right = 0
```

The window is usually:

```python
data[left : right + 1]
```

Meaning:

```text
left points to the start of the window.
right points to the end of the window.
```

Simple explanation:

```text
The right pointer usually grows the window.
The left pointer usually shrinks the window.
```

---

## Maintaining a Running State Efficiently

A **running state** is information we keep updated as the window moves.

Examples:

```text
Running sum
Character counts
Number of different characters
Number of zeros
Current window length
```

Instead of doing this every time:

```python
sum(data[left:right+1])
```

We do this:

```python
current_sum += item_entering
current_sum -= item_leaving
```

Teacher phrase:

```text
Do not rebuild the whole answer. Repair the answer you already have.
```

---

## Why Sliding Window Improves Over Brute Force

A brute force solution often checks every possible window and recomputes each one.

For example, with a list of length `n` and window size `k`:

```text
Brute force: for each window, add k numbers again.
Time: about O(n * k)
```

Sliding window:

```text
Build the first sum once.
Each slide removes one item and adds one item.
Time: O(n)
```

Beginner-friendly explanation:

```text
Sliding window is faster because each item gets handled only a small number of times instead of being re-counted again and again.
```

---

## Common Student Misconceptions

### Misconception 1: “Sliding window means always moving both pointers together.”

Correction:

```text
In fixed-size windows, left and right often move together.
In variable-size windows, right may move many times before left moves, or left may move many times before right moves again.
```

### Misconception 2: “The window can contain any items.”

Correction:

```text
The window contains consecutive items only.
```

### Misconception 3: “If I use two loops, it cannot be O(n).”

Correction:

```text
A while loop inside a for loop can still be O(n) if each pointer only moves forward across the list once.
```

### Misconception 4: “I should update the answer at the end only.”

Correction:

```text
You usually update the answer while the window is valid, because the best window may happen before the end.
```

---

## Common Bugs Students Make

* Off-by-one errors in window length:

```python
right - left
```

instead of:

```python
right - left + 1
```

* Forgetting to subtract the item that leaves the window.
* Starting the fixed-size loop at the wrong index.
* Using `if` when they need `while` to shrink repeatedly.
* Forgetting to delete a character from a dictionary when its count becomes zero.
* Updating the best answer before the window is valid.
* Moving `left` before removing its value from the running state.
* Confusing the value at an index with the index itself.

---

## How to Explain the Pattern Verbally

Use this script-like explanation:

```text
First, decide what counts as the window.

Then decide what information we need to remember about the window.

As the right side moves, we add the new item.

If the window is too big or breaks a rule, we move the left side and remove old items.

Whenever the window is valid, we check whether it gives us a better answer.
```

---

## What to Write on the Board or Projector

```text
Sliding Window = Moving consecutive section of data

Window:
data[left : right + 1]

Fixed-size:
- Window length stays k
- Add new right item
- Remove old left item

Variable-size:
- right expands
- left shrinks
- maintain a running state

Running state examples:
- sum
- counts
- number of distinct characters

Main idea:
Only update what changes.
```

---

## Mini Live-Demo Example 1: Fixed-Size Window

### Problem

```text
Find the largest sum of 3 numbers in a row.

nums = [2, 1, 5, 1, 3, 2]
```

### Board Trace

```text
First window:
[2, 1, 5] sum = 8
best = 8

Slide:
Remove 2, add 1
[1, 5, 1] sum = 7
best = 8

Slide:
Remove 1, add 3
[5, 1, 3] sum = 9
best = 9

Slide:
Remove 5, add 2
[1, 3, 2] sum = 6
best = 9
```

### Teaching Point

```text
We never add all 3 numbers again. We only remove one and add one.
```

---

## Mini Live-Demo Example 2: Variable-Size Window

### Problem

```text
Find the shortest consecutive group with sum at least 7.

nums = [2, 3, 1, 2, 4, 3]
```

### Board Trace

```text
Expand:
[2] sum = 2
[2, 3] sum = 5
[2, 3, 1] sum = 6
[2, 3, 1, 2] sum = 8 → valid

Shrink:
[3, 1, 2] sum = 6 → not valid

Expand:
[3, 1, 2, 4] sum = 10 → valid

Shrink:
[1, 2, 4] sum = 7 → valid
[2, 4] sum = 6 → not valid

Expand:
[2, 4, 3] sum = 9 → valid

Shrink:
[4, 3] sum = 7 → valid
[3] sum = 3 → not valid
```

### Final Answer

```text
Shortest length = 2
```

### Teaching Point

```text
Right expands until we have enough. Left shrinks to see if we can do better.
```

---

# 5) TEACHING SCRIPT / TALKING POINTS

## Main Explanation Script

```text
Today we are learning a technique called sliding window.

Imagine you have a long row of numbers, and you place a picture frame over part of the row. The frame lets you focus on one section at a time. That section is the window.

Now imagine sliding the frame one step to the right. Most of what was inside the frame is still there. Only one item left the frame, and one new item entered.

That is the key idea: instead of recalculating everything from scratch, we update only what changed.

For example, if I know the sum of [4, 2, 7], and the window slides to [2, 7, 1], I do not need to add 2 + 7 + 1 from the beginning. I can take my old sum, subtract 4, and add 1.

This is how sliding window helps us move from brute force to optimized thinking. Brute force says, “Check every group from scratch.” Sliding window says, “Reuse the work we already did.”

There are two main types. A fixed-size window always stays the same size, like exactly 3 days or exactly k numbers. A variable-size window can grow and shrink depending on a rule, like “at least 10 points” or “at most 2 different letters.”

In code, we usually use two pointers: left and right. The left pointer marks the start of the window. The right pointer marks the end of the window.

When right moves, the window expands. When left moves, the window shrinks.

The most important question is: what information do we need to maintain about the current window? It might be a sum, a count of letters, or how many different characters are inside.

Our goal is to update that information carefully as the window changes.
```

---

# 6) FOUR ORIGINAL PRACTICE PROBLEMS

---

## Problem 1: Best K-Day Step Streak

### Difficulty

Easy

### Concept Focus

Fixed-size window on an array/list

### Original Problem Statement

A fitness app stores the number of thousands of steps a student walked each day.

Given a list `steps` and an integer `k`, return the highest total number of steps, in thousands, for any `k` consecutive days.

If there are fewer than `k` days, return `None`.

### Sample Input

```python
steps = [4, 2, 7, 1, 8, 3]
k = 3
```

### Sample Output

```python
16
```

### Explanation of the Sample

The consecutive 3-day totals are:

```text
4 + 2 + 7 = 13
2 + 7 + 1 = 10
7 + 1 + 8 = 16
1 + 8 + 3 = 12
```

The highest total is:

```text
16
```

---

## Hint 1

Start by finding the sum of the first `k` days.

## Hint 2

When the window moves right, subtract the day that left and add the new day that entered.

---

## Full Step-by-Step Reasoning

We need the best total for exactly `k` consecutive days.

A brute force solution would calculate every group of `k` days from scratch. That works, but it repeats a lot of addition.

Instead:

1. Add the first `k` numbers.
2. Store that as the current window sum.
3. Store that as the best sum so far.
4. Move the window one day to the right.
5. Subtract the old left value.
6. Add the new right value.
7. Update the best answer if the new sum is larger.

For the sample:

```text
First window: [4, 2, 7]
sum = 13
best = 13

Slide right:
Remove 4, add 1
sum = 13 - 4 + 1 = 10
best = 13

Slide right:
Remove 2, add 8
sum = 10 - 2 + 8 = 16
best = 16

Slide right:
Remove 7, add 3
sum = 16 - 7 + 3 = 12
best = 16
```

Final answer:

```text
16
```

---

## Clean Solution in Python

```python
def best_k_day_steps(steps, k):
    if k <= 0 or len(steps) < k:
        return None

    window_sum = sum(steps[:k])
    best = window_sum

    for right in range(k, len(steps)):
        left = right - k
        window_sum += steps[right]
        window_sum -= steps[left]
        best = max(best, window_sum)

    return best
```

---

## Line-by-Line Explanation

```python
def best_k_day_steps(steps, k):
```

Defines a function that takes a list of step counts and a window size `k`.

```python
    if k <= 0 or len(steps) < k:
        return None
```

Handles invalid or impossible cases. A window size must be positive, and we need at least `k` days.

```python
    window_sum = sum(steps[:k])
```

Creates the first window by adding the first `k` values.

```python
    best = window_sum
```

The best answer so far is the first window’s sum.

```python
    for right in range(k, len(steps)):
```

Starts sliding the window. The first new item is at index `k`.

```python
        left = right - k
```

Finds the index of the item that is leaving the window.

```python
        window_sum += steps[right]
```

Adds the new item entering from the right.

```python
        window_sum -= steps[left]
```

Removes the old item leaving from the left.

```python
        best = max(best, window_sum)
```

Updates the best answer if the current window is better.

```python
    return best
```

Returns the highest total found.

---

## Time Complexity

```text
O(n)
```

Each list item is processed at most a small number of times.

## Space Complexity

```text
O(1)
```

Only a few variables are used.

## Common Mistake Students May Make

Students may subtract the wrong index when the window slides.

For example, they might write:

```python
left = right - k + 1
```

That would subtract an item that is still supposed to be inside the window.

## Extension Question

How would you change the function so it returns the starting index of the best `k`-day streak?

---

## Problem 2: Shortest Study Sprint

### Difficulty

Easy-to-Medium

### Concept Focus

Variable-size window with positive integers

### Original Problem Statement

A student records how many focused minutes they completed during each study block.

Given a list of positive integers `blocks` and a target number `target`, return the length of the shortest consecutive group of study blocks with a total of at least `target`.

If no group reaches the target, return `0`.

### Sample Input

```python
blocks = [2, 1, 5, 2, 3, 2]
target = 7
```

### Sample Output

```python
2
```

### Explanation of the Sample

The shortest consecutive group with total at least `7` is:

```text
[5, 2]
```

Its total is:

```text
7
```

Its length is:

```text
2
```

---

## Hint 1

Use `right` to expand the window until the total is large enough.

## Hint 2

Once the total is at least the target, move `left` forward while the window is still valid.

---

## Full Step-by-Step Reasoning

We are looking for the shortest window whose sum is at least the target.

Because all numbers are positive, expanding the window makes the sum larger or keeps it moving upward. Shrinking the window makes the sum smaller.

The plan:

1. Start with an empty window.
2. Move `right` across the list.
3. Add each new block to the running total.
4. When the total is at least the target, the window is valid.
5. Record its length.
6. Try to shrink it from the left to make it shorter.
7. Keep the shortest valid length.

Sample trace:

```text
blocks = [2, 1, 5, 2, 3, 2]
target = 7

Add 2 → total = 2
Add 1 → total = 3
Add 5 → total = 8 → valid
Window [2, 1, 5], length 3
Shrink: remove 2 → total = 6 → not valid

Add 2 → total = 8 → valid
Window [1, 5, 2], length 3
Shrink: remove 1 → total = 7 → valid
Window [5, 2], length 2
Shrink: remove 5 → total = 2 → not valid

Add 3 → total = 5
Add 2 → total = 7 → valid
Window [2, 3, 2], length 3
Shrink: remove 2 → total = 5 → not valid
```

Best length:

```text
2
```

---

## Clean Solution in Python

```python
def shortest_study_sprint(blocks, target):
    left = 0
    current_sum = 0
    best_length = len(blocks) + 1

    for right in range(len(blocks)):
        current_sum += blocks[right]

        while current_sum >= target:
            current_length = right - left + 1
            best_length = min(best_length, current_length)

            current_sum -= blocks[left]
            left += 1

    if best_length == len(blocks) + 1:
        return 0

    return best_length
```

---

## Line-by-Line Explanation

```python
def shortest_study_sprint(blocks, target):
```

Defines a function that takes study block lengths and a target total.

```python
    left = 0
```

The left side of the window starts at index `0`.

```python
    current_sum = 0
```

Stores the total of the current window.

```python
    best_length = len(blocks) + 1
```

Stores the shortest valid length found. We start with an impossible large value.

```python
    for right in range(len(blocks)):
```

Moves the right side of the window across the list.

```python
        current_sum += blocks[right]
```

Adds the new value entering the window.

```python
        while current_sum >= target:
```

As long as the current window reaches the target, it is valid.

```python
            current_length = right - left + 1
```

Calculates the current window length.

```python
            best_length = min(best_length, current_length)
```

Updates the best answer if this window is shorter.

```python
            current_sum -= blocks[left]
```

Removes the leftmost value from the window.

```python
            left += 1
```

Moves the left side of the window right by one.

```python
    if best_length == len(blocks) + 1:
        return 0
```

If the best length never changed, no valid window was found.

```python
    return best_length
```

Returns the shortest valid length.

---

## Time Complexity

```text
O(n)
```

Even though there is a `while` loop inside the `for` loop, each pointer only moves forward.

## Space Complexity

```text
O(1)
```

Only a few variables are used.

## Common Mistake Students May Make

Students may use `if current_sum >= target` instead of `while current_sum >= target`.

That only shrinks once, but sometimes the window can be shrunk multiple times.

## Extension Question

How would the strategy change if the list could contain negative numbers?

---

## Problem 3: Longest Club Code With Limited Symbols

### Difficulty

Medium

### Concept Focus

Variable-size string window with character counts

### Original Problem Statement

A school club uses a string to record activity codes. Each character represents a type of activity.

Given a string `code` and an integer `k`, return the length of the longest consecutive section that contains at most `k` different characters.

If `k` is `0`, return `0`.

### Sample Input

```python
code = "AAHBBCCB"
k = 2
```

### Sample Output

```python
5
```

### Explanation of the Sample

The longest consecutive section with at most `2` different characters is:

```text
"BBCCB"
```

It contains only:

```text
B and C
```

Its length is:

```text
5
```

---

## Hint 1

Use a dictionary to count how many times each character appears in the current window.

## Hint 2

If the dictionary has more than `k` keys, the window has too many different characters.

---

## Full Step-by-Step Reasoning

We want the longest substring with at most `k` different characters.

The window is valid when:

```python
len(counts) <= k
```

where `counts` is a dictionary storing character frequencies.

The plan:

1. Start with `left = 0`.
2. Move `right` through the string.
3. Add the new character to the dictionary.
4. If there are too many different characters, shrink from the left.
5. When removing a character, decrease its count.
6. If its count becomes zero, delete it from the dictionary.
7. After the window is valid, update the best length.

Sample idea:

```text
code = "AAHBBCCB"
k = 2
```

Start expanding:

```text
"A" → valid
"AA" → valid
"AAH" → valid because A and H are 2 symbols
"AAHB" → invalid because A, H, B are 3 symbols
```

Shrink until valid:

```text
Remove A
Remove A
Now "HB" is valid
```

Continue expanding and shrinking until the best section is found:

```text
"BBCCB" has length 5
```

---

## Clean Solution in Python

```python
def longest_code_with_limited_symbols(code, k):
    if k <= 0:
        return 0

    left = 0
    counts = {}
    best_length = 0

    for right, char in enumerate(code):
        counts[char] = counts.get(char, 0) + 1

        while len(counts) > k:
            left_char = code[left]
            counts[left_char] -= 1

            if counts[left_char] == 0:
                del counts[left_char]

            left += 1

        current_length = right - left + 1
        best_length = max(best_length, current_length)

    return best_length
```

---

## Line-by-Line Explanation

```python
def longest_code_with_limited_symbols(code, k):
```

Defines a function that takes a string and a maximum number of different symbols.

```python
    if k <= 0:
        return 0
```

If no symbols are allowed, the longest valid section has length `0`.

```python
    left = 0
```

The left side of the window starts at index `0`.

```python
    counts = {}
```

Creates a dictionary to count characters in the current window.

```python
    best_length = 0
```

Stores the longest valid window found so far.

```python
    for right, char in enumerate(code):
```

Moves the right side of the window across the string.

```python
        counts[char] = counts.get(char, 0) + 1
```

Adds the new character to the dictionary.

```python
        while len(counts) > k:
```

If there are too many different characters, shrink the window.

```python
            left_char = code[left]
```

Finds the character leaving from the left.

```python
            counts[left_char] -= 1
```

Decreases that character’s count.

```python
            if counts[left_char] == 0:
                del counts[left_char]
```

Removes the character from the dictionary if it no longer appears in the window.

```python
            left += 1
```

Moves the left side of the window right.

```python
        current_length = right - left + 1
```

Calculates the valid window’s length.

```python
        best_length = max(best_length, current_length)
```

Updates the best answer.

```python
    return best_length
```

Returns the longest valid length found.

---

## Time Complexity

```text
O(n)
```

Each character is added once and removed at most once.

## Space Complexity

```text
O(k)
```

The dictionary stores at most about `k` different characters once the window is valid.

## Common Mistake Students May Make

Students may decrease a character’s count to `0` but forget to delete it from the dictionary.

Then:

```python
len(counts)
```

will be too large, even though that character is no longer in the window.

## Extension Question

Change the function so it returns the actual longest section, not just its length.

---

## Problem 4: Smallest Announcement Clip

### Difficulty

Medium to Medium-Hard

### Concept Focus

Variable-size string window that must contain a required set

### Original Problem Statement

A school announcement is written as a string. Certain characters represent important topics that must be included in a short clip.

Given a string `announcement` and a list of unique required characters `required`, return the shortest consecutive substring that contains every required character at least once.

If no such substring exists, return an empty string `""`.

Characters are case-sensitive.

### Sample Input

```python
announcement = "xbacbabca"
required = ["a", "b", "c"]
```

### Sample Output

```python
"bac"
```

### Explanation of the Sample

The substring:

```text
"bac"
```

contains:

```text
a, b, and c
```

It has length `3`.

No shorter substring can contain all three required characters.

---

## Hint 1

Use a set for the required characters so you can quickly check whether a character matters.

## Hint 2

Track how many required characters are currently present in the window.

---

## Full Step-by-Step Reasoning

We need the shortest substring that contains every required character.

This is a variable-size window problem because:

* We expand until the window contains everything required.
* Then we shrink to make the window as short as possible.

The plan:

1. Convert `required` into a set called `needed`.
2. Use a dictionary called `counts` to count required characters inside the window.
3. Use a variable `have` to track how many required characters are currently present.
4. Move `right` through the announcement.
5. If `announcement[right]` is required, add it to `counts`.
6. If this is the first copy of that required character in the window, increase `have`.
7. When `have == len(needed)`, the window contains all required characters.
8. Record the window if it is the shortest so far.
9. Move `left` to shrink the window.
10. If removing the left character causes a required character count to become zero, decrease `have`.

Sample:

```text
announcement = "xbacbabca"
required = ["a", "b", "c"]
```

Trace:

```text
x → not required
b → have b
a → have b, a
c → have b, a, c → valid window: "xbac"

Shrink:
Remove x → still valid: "bac"
Record "bac"

Remove b → missing b, no longer valid
```

The best answer is:

```text
"bac"
```

---

## Clean Solution in Python

```python
def smallest_announcement_clip(announcement, required):
    needed = set(required)

    if len(needed) == 0:
        return ""

    left = 0
    counts = {}
    have = 0

    best_length = float("inf")
    best_start = 0

    for right, char in enumerate(announcement):
        if char in needed:
            counts[char] = counts.get(char, 0) + 1

            if counts[char] == 1:
                have += 1

        while have == len(needed):
            current_length = right - left + 1

            if current_length < best_length:
                best_length = current_length
                best_start = left

            left_char = announcement[left]

            if left_char in needed:
                counts[left_char] -= 1

                if counts[left_char] == 0:
                    have -= 1

            left += 1

    if best_length == float("inf"):
        return ""

    return announcement[best_start:best_start + best_length]
```

---

## Line-by-Line Explanation

```python
def smallest_announcement_clip(announcement, required):
```

Defines a function that takes the full announcement and the required characters.

```python
    needed = set(required)
```

Converts the required list into a set for quick membership checks.

```python
    if len(needed) == 0:
        return ""
```

If nothing is required, the shortest valid clip is an empty string.

```python
    left = 0
```

The left side of the window starts at index `0`.

```python
    counts = {}
```

Counts required characters in the current window.

```python
    have = 0
```

Tracks how many different required characters are currently present.

```python
    best_length = float("inf")
```

Stores the length of the best clip found so far. Infinity means none found yet.

```python
    best_start = 0
```

Stores where the best clip starts.

```python
    for right, char in enumerate(announcement):
```

Moves the right side of the window through the announcement.

```python
        if char in needed:
```

Only required characters affect `counts` and `have`.

```python
            counts[char] = counts.get(char, 0) + 1
```

Adds the required character to the current window count.

```python
            if counts[char] == 1:
                have += 1
```

If this is the first copy of that required character in the window, we now “have” one more needed character.

```python
        while have == len(needed):
```

When we have all required characters, the window is valid, so try shrinking it.

```python
            current_length = right - left + 1
```

Calculates the current window length.

```python
            if current_length < best_length:
                best_length = current_length
                best_start = left
```

Saves this window if it is the shortest valid one so far.

```python
            left_char = announcement[left]
```

Finds the character leaving from the left.

```python
            if left_char in needed:
```

Only required characters affect whether the window remains valid.

```python
                counts[left_char] -= 1
```

Removes one copy of that required character from the window.

```python
                if counts[left_char] == 0:
                    have -= 1
```

If the count becomes zero, the window no longer contains that required character.

```python
            left += 1
```

Moves the left side of the window right.

```python
    if best_length == float("inf"):
        return ""
```

If no valid window was ever found, return an empty string.

```python
    return announcement[best_start:best_start + best_length]
```

Returns the shortest valid substring.

---

## Time Complexity

```text
O(n + r)
```

`n` is the length of the announcement, and `r` is the number of required characters.

## Space Complexity

```text
O(r)
```

The set and dictionary store required characters.

## Common Mistake Students May Make

Students may increase `have` every time they see a required character.

That is wrong because `have` should count how many different required characters are present, not how many total required-character appearances are present.

## Extension Question

How would the problem change if `required` could contain duplicates, such as `["a", "a", "b"]`?

---

# 7) TEACHER ANSWER KEY

## Problem 1: Best K-Day Step Streak

### Final Answer for Sample

```python
16
```

### Concise Solution Summary

Use a fixed-size window of length `k`. Compute the first sum, then slide by subtracting the leaving value and adding the entering value.

### Likely Student Errors

* Recalculating every window from scratch.
* Starting the loop at index `0` instead of `k`.
* Subtracting the wrong left index.
* Forgetting the edge case where `len(steps) < k`.

### Coaching Without Giving Away the Answer

Ask:

```text
What is the first full window?
When the window moves one step, which number leaves?
Which number enters?
Can you update the sum without adding all k numbers again?
```

---

## Problem 2: Shortest Study Sprint

### Final Answer for Sample

```python
2
```

### Concise Solution Summary

Use a variable-size window. Expand with `right` until the sum is at least the target. Then shrink with `left` while the window stays valid.

### Likely Student Errors

* Using `if` instead of `while` when shrinking.
* Updating the answer after shrinking too far.
* Forgetting to subtract `blocks[left]`.
* Not understanding why positive integers matter.

### Coaching Without Giving Away the Answer

Ask:

```text
When does your window become valid?
Once it is valid, can you make it smaller?
What should happen to the sum when left moves?
Where should you update the shortest length?
```

---

## Problem 3: Longest Club Code With Limited Symbols

### Final Answer for Sample

```python
5
```

### Concise Solution Summary

Use a dictionary to count characters in the current window. Expand with `right`. If the number of different characters becomes greater than `k`, shrink from the left until the window is valid again.

### Likely Student Errors

* Forgetting to delete dictionary keys with count `0`.
* Updating the answer while the window is invalid.
* Confusing total character count with distinct character count.
* Using a set only, which loses frequency information.

### Coaching Without Giving Away the Answer

Ask:

```text
How do you know how many different symbols are in the window?
What happens when a symbol leaves but another copy is still inside?
Why might a dictionary be better than a set here?
```

---

## Problem 4: Smallest Announcement Clip

### Final Answer for Sample

```python
"bac"
```

### Concise Solution Summary

Use a variable-size window with a set of required characters, a dictionary of counts, and a `have` counter. Expand until all required characters are present, then shrink while the window remains valid.

### Likely Student Errors

* Counting total required characters instead of distinct required characters.
* Forgetting that irrelevant characters can be inside the window.
* Shrinking before recording a valid answer.
* Not handling the case where no valid substring exists.
* Returning the length instead of the substring.

### Coaching Without Giving Away the Answer

Ask:

```text
How do you know the window currently contains all required characters?
What changes when the left character is not required?
What changes when the left character is required and its count becomes zero?
When should you save the best substring?
```

---

# STUDENT-FACING

---

# 8) STUDENT-FACING HANDOUT

# Sliding Window Technique

## Student Handout

## Lesson Summary

Today we are learning the **sliding window** technique.

A sliding window is a way to solve problems involving consecutive items in a list or string. Instead of checking every possible group from scratch, we keep track of one window at a time and update only what changes when the window moves.

This is useful for problems about:

* Consecutive numbers
* Substrings
* Streaks
* Maximum or minimum totals
* Longest or shortest valid sections

---

## Key Vocabulary

### Window

A consecutive section of a list or string.

Example:

```python
nums = [4, 2, 7, 1, 8]
```

A window could be:

```python
[2, 7, 1]
```

### Fixed-Size Window

A window that always has the same length.

Example:

```text
Exactly 3 numbers in a row
```

### Variable-Size Window

A window that can grow or shrink.

Example:

```text
The shortest group with a sum of at least 10
```

### Left Pointer

The index where the window starts.

### Right Pointer

The index where the window ends.

### Running State

Information we keep updated about the current window.

Examples:

```text
current sum
character counts
number of different characters
```

---

## Problem 1: Best K-Day Step Streak

### Difficulty

Easy

### Concept Focus

Fixed-size window

### Problem Statement

A fitness app stores the number of thousands of steps a student walked each day.

Given a list `steps` and an integer `k`, return the highest total number of steps, in thousands, for any `k` consecutive days.

If there are fewer than `k` days, return `None`.

### Sample Input

```python
steps = [4, 2, 7, 1, 8, 3]
k = 3
```

### Sample Output

```python
16
```

### Your Approach

```text
What is the window?

What running state do you need?

When does the window move?

What should your function return?
```

### Your Code

```python
# Write your solution here
```

### Your Test Case

```python
# Create your own test case here
```

---

## Problem 2: Shortest Study Sprint

### Difficulty

Easy-to-Medium

### Concept Focus

Variable-size window with positive integers

### Problem Statement

A student records how many focused minutes they completed during each study block.

Given a list of positive integers `blocks` and a target number `target`, return the length of the shortest consecutive group of study blocks with a total of at least `target`.

If no group reaches the target, return `0`.

### Sample Input

```python
blocks = [2, 1, 5, 2, 3, 2]
target = 7
```

### Sample Output

```python
2
```

### Your Approach

```text
What makes a window valid?

When should right move?

When should left move?

When should you update the best answer?
```

### Your Code

```python
# Write your solution here
```

### Your Test Case

```python
# Create your own test case here
```

---

## Problem 3: Longest Club Code With Limited Symbols

### Difficulty

Medium

### Concept Focus

String window with character counts

### Problem Statement

A school club uses a string to record activity codes. Each character represents a type of activity.

Given a string `code` and an integer `k`, return the length of the longest consecutive section that contains at most `k` different characters.

If `k` is `0`, return `0`.

### Sample Input

```python
code = "AAHBBCCB"
k = 2
```

### Sample Output

```python
5
```

### Your Approach

```text
What does the dictionary store?

How do you know if there are too many different characters?

When should you shrink the window?

When should you update the longest length?
```

### Your Code

```python
# Write your solution here
```

### Your Test Case

```python
# Create your own test case here
```

---

## Problem 4: Smallest Announcement Clip

### Difficulty

Medium to Medium-Hard

### Concept Focus

Variable-size string window containing required characters

### Problem Statement

A school announcement is written as a string. Certain characters represent important topics that must be included in a short clip.

Given a string `announcement` and a list of unique required characters `required`, return the shortest consecutive substring that contains every required character at least once.

If no such substring exists, return an empty string `""`.

Characters are case-sensitive.

### Sample Input

```python
announcement = "xbacbabca"
required = ["a", "b", "c"]
```

### Sample Output

```python
"bac"
```

### Your Approach

```text
What makes a window valid?

What information should you store in a set?

What information should you store in a dictionary?

When should you save the best substring?

When should you shrink the window?
```

### Your Code

```python
# Write your solution here
```

### Your Test Case

```python
# Create your own test case here
```

---

## Reflection Questions

Answer in complete sentences.

1. What does sliding window help us avoid doing?
2. What is the difference between a fixed-size window and a variable-size window?
3. What is one bug you need to watch out for when using `left` and `right` pointers?

---

# TEACHER ONLY

---

# 9) DIFFERENTIATION

## Support for Struggling Students

### Use Concrete Visuals

Give students index cards or sticky notes with numbers on them. Use a physical frame, ruler, or paper cutout to represent the window.

### Provide Sentence Starters

```text
The window starts at index ___ and ends at index ___.
When the window moves, ___ leaves and ___ enters.
The running state stores ___.
The window is valid when ___.
```

### Reduce the Code Load

For early practice, provide partially completed code:

```python
def best_k_day_steps(steps, k):
    window_sum = sum(steps[:k])
    best = window_sum

    for right in range(k, len(steps)):
        left = right - k

        # Add the new value
        # Remove the old value
        # Update best

    return best
```

### Focus on Tracing Before Coding

Some students may understand the idea but struggle with syntax. Let them trace the window manually first.

Ask:

```text
What is inside the window right now?
What is the current sum?
What changes next?
```

### Use Smaller Examples

Instead of starting with long inputs, use:

```python
[3, 1, 2, 5]
```

or:

```python
"ABBA"
```

---

## Challenge for Advanced Students

Advanced students can:

* Return the actual window instead of just the length or sum.
* Return the starting and ending indices.
* Write both brute force and sliding window versions, then compare time complexity.
* Modify Problem 4 so `required` can contain duplicates.
* Create their own sliding-window problem and solution.
* Explain why a nested `while` loop can still result in `O(n)` time.

Challenge prompt:

```text
Create a new problem where the window is valid only when it contains at most k “special” items. Define what special means, write the problem statement, and solve it.
```

---

## Running the Lesson in Pairs

Use pair roles:

### Driver

Types the code and asks questions.

### Navigator

Traces the window, checks logic, and watches for bugs.

Switch roles after each problem.

Pair discussion prompts:

```text
What is our window?
What are we storing about the window?
When does right move?
When does left move?
Where do we update the answer?
```

Suggested pair structure:

```text
Problem 1: Partner A drives, Partner B navigates.
Problem 2: Partner B drives, Partner A navigates.
Problem 3: Both plan first, then one types.
Problem 4: Both trace by hand before coding.
```

---

## 60-Minute Adaptation

For a shorter version, use this pacing:

## 0–8 Minutes: Hook

Use the 3-day step streak example.

## 8–18 Minutes: Fixed-Size Direct Teaching

Teach the first window, slide, add new, remove old.

## 18–30 Minutes: Guided Coding

Code Problem 1 together.

## 30–42 Minutes: Variable-Size Demo

Use the shortest study sprint example.

## 42–55 Minutes: Practice

Students complete Problem 2. Advanced students attempt Problem 3.

## 55–60 Minutes: Exit Ticket

Ask:

```text
What does sliding window reuse?
What is the difference between fixed-size and variable-size windows?
```

For the 60-minute version, save Problems 3 and 4 for homework or the next class.

---

# 10) FORMATTING REQUIREMENTS CHECK

This lesson package includes:

* Clear teacher-facing and student-facing sections
* Google Classroom-ready copy-paste text
* A complete 2-hour plan totaling 120 minutes
* Practical teaching notes and talking points
* Four original classroom-style practice problems
* Full solutions and teacher answer key
* Student handout without full solutions
* Differentiation and 60-minute adaptation
* Plain English explanations before code
* Beginner-friendly but technically accurate language

---

# A) 5-Sentence Class Announcement Blurb

```text
Today we learned the sliding window technique, a strategy for solving array and string problems more efficiently. We practiced moving a window across consecutive items instead of recalculating every group from scratch. Students learned the difference between fixed-size windows and variable-size windows. We used Python to track running sums, character counts, and left/right pointers. By the end of class, students practiced identifying the window, updating only what changes, and explaining why the optimized solution is faster.
```

---

# B) Parent/Guardian Summary

```text
Today students learned a computer science problem-solving strategy called the sliding window technique. This technique helps students solve certain list and string problems more efficiently by focusing on a moving section of data and updating only what changes. Students practiced using Python, left and right pointers, running sums, and character counts. They compared slower brute force approaches with more efficient solutions and learned how to recognize when a problem involves consecutive items. This lesson strengthened their algorithmic thinking, debugging skills, and ability to explain code clearly.
```

---

# C) Keywords Students Should Remember

```text
sliding window
window
fixed-size window
variable-size window
left pointer
right pointer
running sum
running state
character count
valid window
expand
shrink
subarray
substring
time complexity
O(n)
brute force
optimized solution
```

[1]: https://support.google.com/edu/classroom/answer/9093681?co=GENIE.Platform%3DDesktop&hl=en&utm_source=chatgpt.com "Add topics to the Classwork page - Computer - Classroom ..."
[2]: https://csteachers.org/k12standards/?utm_source=chatgpt.com "K–12 Standards"
[3]: https://docs.python.org/3/tutorial/datastructures.html?utm_source=chatgpt.com "5. Data Structures — Python 3.14.4 documentation"
