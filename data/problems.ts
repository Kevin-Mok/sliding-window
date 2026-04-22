export type Difficulty =
  | "Easy"
  | "Easy-to-Medium"
  | "Medium"
  | "Medium-to-Medium-Hard";

export interface SlidingWindowProblem {
  id: number;
  title: string;
  difficulty: Difficulty;
  conceptFocus: string;
  slug: string;
  description: string;
  inputSpec: string;
  outputSpec: string;
  sampleInput: string;
  sampleOutput: string;
  pythonSolution: string;
  explanation: string[];
  traceAscii: string[];
  timeComplexity: string;
  spaceComplexity: string;
  commonMistakes?: string[];
}

export const problems: SlidingWindowProblem[] = [
  {
    id: 1,
    title: "Best K-Day Step Streak",
    difficulty: "Easy",
    conceptFocus: "Fixed-size window on an array",
    slug: "best-k-day-step-streak",
    description:
      "You get daily step counts and an integer `k`. Return the maximum total steps over any window of exactly `k` consecutive days. If `k <= 0` or `k` is bigger than the input size, return `None`.",
    inputSpec: "steps: List[int], k: int",
    outputSpec: "int | None",
    sampleInput: `steps = [4, 2, 7, 1, 8, 3]
k = 3`,
    sampleOutput: "16",
    pythonSolution: `def best_k_day_steps(steps: list[int], k: int) -> int | None:
    # Fixed-size window: it must have at least 1 day
    # and cannot be longer than the list.
    if k <= 0 or k > len(steps):
        return None

    left = 0
    # \`right\` is inclusive, so the first k-day window
    # spans indices 0 through k - 1.
    right = k - 1
    # Slices stop before the end index, so \`right + 1\`
    # includes the full first window.
    cur_total_steps = sum(steps[left:right + 1])
    # Start with the first full fixed-size window,
    # then compare later windows against it.
    best_total_steps = cur_total_steps
    # Stop once \`right\` is at the last index;
    # sliding again would step past the array.
    while right < len(steps) - 1:
        # Slide order: remove old left, move both ends,
        # then add the new right value.
        # That order keeps the window size at k
        # and avoids off-by-one mistakes.
        cur_total_steps -= steps[left]
        left += 1
        right += 1
        cur_total_steps += steps[right]
        best_total_steps = max(best_total_steps, cur_total_steps)

    return best_total_steps`,
    explanation: [
      "Read the prompt and confirm this is a fixed-size window.",
      "Set `left = 0` and `right = k - 1` so the first full `k`-day window is indices `0` through `k - 1`.",
      "Use `sum(steps[left:right + 1])` because `right` is inclusive and Python slices stop before the end index.",
      "For each slide, remove the old left value, increment `left`, increment `right`, add the new right value, then update `best_total_steps`.",
      "Return `None` when a full fixed-size window is impossible.",
    ],
    traceAscii: [
      "$ steps = [4, 2, 7, 1, 8, 3], k = 3",
      "> Setup: left=0, right=2, cur_total_steps=13, best_total_steps=13",
      "> Slide to right=3: remove steps[0]=4, left=1, right=3, add steps[3]=1",
      "  cur_total_steps = 13 - 4 + 1 = 10",
      "  best_total_steps stays 13",
      "> Slide to right=4: remove steps[1]=2, left=2, right=4, add steps[4]=8",
      "  cur_total_steps = 10 - 2 + 8 = 16",
      "  best_total_steps updates to 16",
      "> Slide to right=5: remove steps[2]=7, left=3, right=5, add steps[5]=3",
      "  cur_total_steps = 16 - 7 + 3 = 12",
      "  best_total_steps stays 16",
      ">= Answer: 16",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    commonMistakes: [
      "Treating `right` as exclusive instead of inclusive when building the first full window.",
      "Changing the slide order instead of removing old left, then moving both pointers, then adding the new right value.",
      "Forgetting to return `None` when `k <= 0` or `k > len(steps)`.",
      "Recomputing each window from scratch in O(n).",
    ],
  },
  {
    id: 2,
    title: "Shortest Study Sprint",
    difficulty: "Easy-to-Medium",
    conceptFocus: "Variable-size window with positive integers",
    slug: "shortest-study-sprint",
    description:
      "You get focused minutes per study block and a target. Find the shortest consecutive block total that is at least the target, or `0` if no such block exists. This needs a variable-size window.",
    inputSpec: "blocks: List[int], target: int",
    outputSpec: "int",
    sampleInput: `blocks = [2, 1, 5, 2, 3, 2]
target = 7`,
    sampleOutput: "2",
    pythonSolution: `def shortest_study_sprint(blocks, target):
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

    return best_length`,
    explanation: [
      "Expand with `right`, adding each value to `current_sum`.",
      "While the window is valid (`current_sum >= target`), shrink from `left`.",
      "Record the best length before moving `left` again.",
      "Use `while`, not `if`, because one right move can force multiple shrinks.",
      "Return 0 if the best length never updates.",
    ],
    traceAscii: [
      "$ blocks = [2, 1, 5, 2, 3, 2], target = 7",
      "> right=0, current_sum=2",
      "> right=1, current_sum=3",
      "> right=2, current_sum=8 (valid)",
      "  shrink: remove 2 -> sum=6 (invalid), best=3",
      "> right=3, current_sum=8 (valid)",
      "  shrink: remove 1 -> sum=7 (valid), best=3",
      "  shrink: remove 5 -> sum=2 (invalid), best=2",
      "> right=4, current_sum=5",
      "> right=5, current_sum=7 (valid)",
      "  shrink: remove 2 -> sum=5 (invalid)",
      "  record candidate lengths after each shrink",
      ">= Shortest valid length = 2",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    commonMistakes: [
      "Using `if current_sum >= target` instead of `while`.",
      "Updating answer only after the window becomes invalid.",
      "Returning `len(blocks)` instead of `0` when impossible.",
      "Failing to test `target=0` or impossible target.",
    ],
  },
  {
    id: 3,
    title: "Longest Club Code With Limited Symbols",
    difficulty: "Medium",
    conceptFocus: "Variable-size window with character counts",
    slug: "longest-club-code-with-limited-symbols",
    description:
      "Given a string and `k`, find the longest contiguous section with at most `k` distinct symbols. Multiplicity matters, so you must track counts, not only membership.",
    inputSpec: "code: str, k: int",
    outputSpec: "int",
    sampleInput: `code = "AAHBBCCB"
k = 2`,
    sampleOutput: "5",
    pythonSolution: `def longest_code_with_limited_symbols(code, k):
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

    return best_length`,
    explanation: [
      "Use a fixed-size map of characters for frequency in the current window.",
      "When too many distinct characters exist, shrink from left.",
      "Delete dictionary keys when count reaches zero.",
      "Only update answer after the window is valid again.",
      "Counts handle duplicates that sets cannot.",
    ],
    traceAscii: [
      '$ code = "AAHBBCCB", k = 2',
      '> Expand: A | counts={A:1} valid',
      '> Expand: AA | counts={A:2} valid',
      '> Expand: AAH | counts={A:2,H:1} valid',
      '> Expand: AAHB | counts={A:2,H:1,B:1} invalid',
      '  shrink: remove A -> counts={A:1,H:1,B:1}',
      '  shrink: remove A -> counts={H:1,B:1} valid',
      '  window now HB (len 2)',
      '> Expand: BB | counts={H:1,B:2} valid',
      '> Expand: BBC | counts={H:1,B:2,C:1} invalid',
      '  shrink: remove H -> counts={B:2,C:1} valid',
      '> Expand: BBCC | counts={B:2,C:2} valid',
      '> Expand: BBCCB | counts={B:3,C:2} valid',
      '>= max length = 5 ("BBCCB")',
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    commonMistakes: [
      "Dropping frequency count to a set and losing duplicates.",
      "Shrinking only once when many left moves are needed.",
      "Updating answer while window is still invalid.",
      "Forgetting to delete keys that fall to zero.",
    ],
  },
  {
    id: 4,
    title: "Smallest Announcement Clip",
    difficulty: "Medium-to-Medium-Hard",
    conceptFocus: "Variable-size window requiring required character coverage",
    slug: "smallest-announcement-clip",
    description:
      "Given a string and a required list, find the shortest consecutive substring containing all required chars at least once. Return empty string if it is impossible.",
    inputSpec:
      "announcement: str, required: List[str] (unique characters)",
    outputSpec: "str",
    sampleInput: `announcement = "xbacbabca"
required = ["a", "b", "c"]`,
    sampleOutput: `"bac"`,
    pythonSolution: `def smallest_announcement_clip(announcement, required):
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

    return announcement[best_start:best_start + best_length]`,
    explanation: [
      "Track a set for O(1) required membership.",
      "Track frequencies for required chars currently in window.",
      "Keep `have` as count of required chars present at least once.",
      "When all required are present, try shrinking left for the minimum window.",
      "Update answer before moving left out of a valid candidate.",
    ],
    traceAscii: [
      '$ announcement = "xbacbabca", required = ["a","b","c"]',
      '> right=0 x -> not required',
      '> right=1 b -> have {b}',
      '> right=2 a -> have {b, a}',
      '> right=3 c -> have {b, a, c} (valid)',
      '> best = "xbac", len=4',
      '> shrink: remove x (not required), still valid',
      '> best = "bac", len=3',
      '> shrink: remove b -> missing b, no longer valid',
      '>= Answer is "bac"',
    ],
    timeComplexity: "O(n + r)",
    spaceComplexity: "O(r)",
    commonMistakes: [
      "Increasing `have` on every required char occurrence.",
      "Updating best after shrinking once too far.",
      "Returning empty before checking if a window was found.",
      "Using linear lookups instead of O(1) required membership.",
    ],
  },
];
