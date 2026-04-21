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
    conceptFocus: "Fixed-size window on an array/list",
    slug: "best-k-day-step-streak",
    description:
      "A fitness app stores the number of thousands of steps a student walked each day. Given a list `steps` and an integer `k`, return the highest total steps for any `k` consecutive days. If there are fewer than `k` days, return `None`.",
    inputSpec: "steps: List[int], k: int",
    outputSpec: "int | None",
    sampleInput: `steps = [4, 2, 7, 1, 8, 3]
k = 3`,
    sampleOutput: "16",
    pythonSolution: `def best_k_day_steps(steps, k):
    if k <= 0 or len(steps) < k:
        return None

    window_sum = sum(steps[:k])
    best = window_sum

    for right in range(k, len(steps)):
        left = right - k
        window_sum += steps[right]
        window_sum -= steps[left]
        best = max(best, window_sum)

    return best`,
    explanation: [
      "Compute the first k-day total.",
      "Slide the window one day at a time by removing the day that leaves and adding the day that enters.",
      "Track the maximum sum seen so far.",
      "If `k <= 0` or not enough data exists, return `None`.",
    ],
    traceAscii: [
      "$ steps = [4, 2, 7, 1, 8, 3], k = 3",
      "> Initial window sum=13, best=13",
      "> Slide right=3: remove steps[0]=4, add steps[3]=1",
      "  window_sum = 13 - 4 + 1 = 10",
      "  best stays 13",
      "> Slide right=4: remove steps[1]=2, add steps[4]=8",
      "  window_sum = 10 - 2 + 8 = 16",
      "  best updated to 16",
      "> Slide right=5: remove steps[2]=7, add steps[5]=3",
      "  window_sum = 16 - 7 + 3 = 12",
      "  best stays 16",
      "=> Answer: 16",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    commonMistakes: [
      "Starting the loop at index 0 instead of k.",
      "Subtracting the wrong left index while sliding.",
      "Forgetting to return `None` when len(steps) < k.",
    ],
  },
  {
    id: 2,
    title: "Shortest Study Sprint",
    difficulty: "Easy-to-Medium",
    conceptFocus: "Variable-size window with positive integers",
    slug: "shortest-study-sprint",
    description:
      "A student records how many focused minutes they completed during each study block. Given a list of positive integers `blocks` and a target number `target`, return the length of the shortest consecutive group whose total is at least `target`. If none reaches the target, return `0`.",
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
      "Expand the window with `right`, adding each block to `current_sum`.",
      "While `current_sum >= target`, shrink from the left and record shorter valid lengths.",
      "Use `while`, not `if`, because many shrink steps may be needed.",
      "If no valid window is found, return `0`.",
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
      "=> Shortest valid length = 2",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    commonMistakes: [
      "Using `if current_sum >= target` instead of a `while` loop.",
      "Returning `len(blocks)` when no valid window exists.",
      "Initializing best_length to 0 so real shortest values cannot be compared.",
    ],
  },
  {
    id: 3,
    title: "Longest Club Code With Limited Symbols",
    difficulty: "Medium",
    conceptFocus: "Variable-size string window with character counts",
    slug: "longest-club-code-with-limited-symbols",
    description:
      "A school club uses a string to record activity codes. Given a string `code` and an integer `k`, return the length of the longest consecutive section with at most `k` different characters. If `k` is `0`, return `0`.",
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
      "Expand with `right` and count character frequencies in the current window.",
      "When number of distinct symbols exceeds `k`, move `left` until valid again.",
      "When a character count drops to zero, remove it from the dictionary.",
      "After each valid window, update the maximum window length.",
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
      '=> max length = 5 ("BBCCB")',
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    commonMistakes: [
      "Decrementing a count to zero but forgetting to delete the key.",
      "Tracking character frequency as a set (can't handle shrinking correctly).",
      "Checking `left` with `if` instead of `while` when too many symbols.",
    ],
  },
  {
    id: 4,
    title: "Smallest Announcement Clip",
    difficulty: "Medium-to-Medium-Hard",
    conceptFocus: "Variable-size window that must contain a required set",
    slug: "smallest-announcement-clip",
    description:
      "Given an announcement string and a list of required characters, return the shortest consecutive substring containing every required character at least once. Return an empty string if no such substring exists. Required characters are case-sensitive.",
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
      "Build a required set for O(1) membership checks.",
      "Expand `right` while counting required characters currently in the window.",
      "Track how many required symbols are present at least once (`have`).",
      "When all required symbols are present, shrink from left to find minimal window.",
    ],
    traceAscii: [
      '$ announcement = "xbacbabca", required = ["a","b","c"]',
      '> right=0 x -> not required',
      '> right=1 b -> have {b}',
      '> right=2 a -> have {b, a}',
      '> right=3 c -> have {b, a, c} (window valid)',
      '> best="xbac", len=4',
      '> shrink: remove x (not required), still valid',
      '> best="bac", len=3',
      '> shrink: remove b -> missing b, no longer valid',
      '=> Answer is "bac"',
    ],
    timeComplexity: "O(n + r)",
    spaceComplexity: "O(r)",
    commonMistakes: [
      "Increasing `have` for every required-character occurrence.",
      "Returning empty when shrinking too far before checking whether valid window exists.",
      "Using lists for required lookup without `set` or equivalent O(1) membership.",
    ],
  },
];
