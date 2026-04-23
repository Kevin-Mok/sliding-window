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
  javaSolution: string;
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
    # Fixed-size sliding window: it must have at least 1 day
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
    # Build the first full window once.
    # After that, sliding window means we reuse this total
    # instead of summing every k-day block from scratch.
    best_total_steps = cur_total_steps
    # Stop once \`right\` is at the last index;
    # sliding again would step past the array.
    while right < len(steps) - 1:
        # Slide order: remove old left, move both ends,
        # then add the new right value.
        # That order keeps the window size at k
        # and avoids off-by-one mistakes.
        # Only one value leaves and one value enters,
        # which is the main sliding-window idea.
        cur_total_steps -= steps[left]
        left += 1
        right += 1
        cur_total_steps += steps[right]
        # Compare this reused window total against the best answer so far.
        best_total_steps = max(best_total_steps, cur_total_steps)

    return best_total_steps`,
    javaSolution: `public static Integer bestKDaySteps(int[] steps, int k) {
    // Fixed-size window: it must have at least one day,
    // and cannot be longer than the input length.
    if (k <= 0 || k > steps.length) {
        return null;
    }

    int left = 0;
    // Right is inclusive, so the first window ends at index k - 1.
    int right = k - 1;
    // Build the first full window once, then reuse it on each slide.
    int curTotalSteps = 0;
    for (int index = left; index <= right; index++) {
        curTotalSteps += steps[index];
    }
    // The initial full window is your starting best.
    int bestTotalSteps = curTotalSteps;
    // Stop before right would move past the array end.
    while (right < steps.length - 1) {
        // Slide order: remove old left, move both pointers,
        // then add the new right value.
        // This keeps window size fixed at k.
        curTotalSteps -= steps[left];
        left += 1;
        right += 1;
        curTotalSteps += steps[right];
        // Compare this reused window total against best so far.
        bestTotalSteps = Math.max(bestTotalSteps, curTotalSteps);
    }

    return bestTotalSteps;
}`,
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
    # This is the running total for the current window
    # from \`left\` through \`right\`.
    current_sum = 0
    # Sentinel: if this never changes, no valid window exists.
    best_length = len(blocks) + 1

    for right in range(len(blocks)):
        # Expand the window by taking in the new right value.
        current_sum += blocks[right]

        # Variable-size sliding window:
        # while this window already meets the target,
        # keep shrinking from the left to search for a shorter valid answer.
        while current_sum >= target:
            # Measure the current valid window before we shrink it.
            current_length = right - left + 1
            best_length = min(best_length, current_length)

            # Remove the old left value, then move left forward.
            # This reuses the previous window total instead of rescanning.
            current_sum -= blocks[left]
            left += 1

    # If the sentinel never changed, no consecutive block reached the target.
    if best_length == len(blocks) + 1:
        return 0

    return best_length`,
    javaSolution: `public static int shortestStudySprint(int[] blocks, int target) {
    int left = 0;
    // Running sum for the current window from left through right.
    int currentSum = 0;
    // Sentinel: if this never changes, no valid window exists.
    int bestLength = blocks.length + 1;

    for (int right = 0; right < blocks.length; right++) {
        // Expand the window by adding the new right value.
        currentSum += blocks[right];

        // Variable-size sliding window:
        // while this window already meets the target,
        // shrink from the left to find a shorter valid answer.
        while (currentSum >= target) {
            // Measure this valid window before we shrink it.
            int currentLength = right - left + 1;
            bestLength = Math.min(bestLength, currentLength);

            // Remove the old left value, then move left forward.
            // This reuses the previous window sum instead of rescanning.
            currentSum -= blocks[left];
            left += 1;
        }
    }

    // If the sentinel never changed, no consecutive block reached the target.
    if (bestLength == blocks.length + 1) {
        return 0;
    }

    return bestLength;
}`,
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
    # Variable-size sliding window for at most k distinct symbols.
    if k <= 0:
        # Empty or zero-capacity constraints cannot contain any valid window.
        return 0

    # Left boundary of the current window.
    left = 0
    # Frequency map for active characters in the current window.
    counts = {}
    # Track best valid window length found so far.
    best_length = 0

    for right, char in enumerate(code):
        # Expand window: include the new right character.
        counts[char] = counts.get(char, 0) + 1

        # Keep shrinking while the number of distinct active symbols is too high.
        while len(counts) > k:
            # Character leaving from the left boundary.
            left_char = code[left]
            # Decrement the leaving character count.
            counts[left_char] -= 1

            # Drop zero-count keys so len(counts) stays meaningful.
            if counts[left_char] == 0:
                del counts[left_char]

            # Move left forward one step to restore the at-most-k invariant.
            left += 1

        # Current window [left, right] is now valid (<= k distinct).
        current_length = right - left + 1
        # Record best length if this one is longer.
        best_length = max(best_length, current_length)

    # Return the maximum window length satisfying the constraint.
    return best_length`,
    javaSolution: `public static int longestCodeWithLimitedSymbols(String code, int k) {
    // Constraint is at most k distinct symbols.
    if (k <= 0) {
        return 0;
    }

    int left = 0;
    // Frequency map for active characters in the current window.
    Map<Character, Integer> counts = new HashMap<>();
    // Track max valid window length found so far.
    int bestLength = 0;

    for (int right = 0; right < code.length(); right++) {
        char currentChar = code.charAt(right);
        // Expand window: include the new right character.
        counts.put(currentChar, counts.getOrDefault(currentChar, 0) + 1);

        // Keep shrinking while we have too many active symbols.
        while (counts.size() > k) {
            // Character leaving from the left boundary.
            char leftChar = code.charAt(left);
            // Decrement its count after it leaves.
            counts.put(leftChar, counts.get(leftChar) - 1);

            // Remove zero-count keys so size reflects active distinct symbols.
            if (counts.get(leftChar) == 0) {
                counts.remove(leftChar);
            }

            // Move left forward one step to restore the at-most-k invariant.
            left += 1;
        }

        // Current window [left, right] is now valid (<= k distinct).
        int currentLength = right - left + 1;
        // Record best length if this one is longer.
        bestLength = Math.max(bestLength, currentLength);
    }

    // Return the maximum window length satisfying the constraint.
    return bestLength;
}`,
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
    javaSolution: `public static String smallestAnnouncementClip(String announcement, String[] required) {
    Set<Character> needed = new HashSet<>();
    // Store required characters for O(1) membership checks.
    for (String charValue : required) {
        if (!charValue.isEmpty()) {
            needed.add(charValue.charAt(0));
        }
    }

    if (needed.isEmpty()) {
        return "";
    }

    int left = 0;
    // Frequency map for required characters in the current window.
    Map<Character, Integer> counts = new HashMap<>();
    // Number of required characters currently present at least once.
    int have = 0;

    int bestLength = Integer.MAX_VALUE;
    int bestStart = 0;

    for (int right = 0; right < announcement.length(); right++) {
        char currentChar = announcement.charAt(right);
        if (needed.contains(currentChar)) {
            counts.put(currentChar, counts.getOrDefault(currentChar, 0) + 1);
            if (counts.get(currentChar) == 1) {
                have += 1;
            }
        }

        while (have == needed.size()) {
            int currentLength = right - left + 1;

            if (currentLength < bestLength) {
                bestLength = currentLength;
                bestStart = left;
            }

            char leftChar = announcement.charAt(left);
            if (needed.contains(leftChar)) {
                counts.put(leftChar, counts.get(leftChar) - 1);
                if (counts.get(leftChar) == 0) {
                    have -= 1;
                }
            }

            left += 1;
        }
    }

    if (bestLength == Integer.MAX_VALUE) {
        return "";
    }

    return announcement.substring(bestStart, bestStart + bestLength);
}`,
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
