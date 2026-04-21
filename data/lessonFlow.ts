import { type SlidingWindowProblem, problems } from "./problems";

export interface LessonStep {
  id: string;
  title: string;
  titleTag?: string;
  durationMinutes: number;
  objective: string;
  studentContext: string[];
  teacherNotes: string[];
  studentMoves: string[];
  checks: string[];
}

export interface ProblemWorkshop {
  problemSlug: string;
  coachScript: string;
  studentGoal: string;
  prompts: string[];
  checkpoints: string[];
  commonBugs: string[];
  stretchQuestion: string;
}

export interface LessonFlowSummary {
  classTitle: string;
  totalMinutes: number;
  precheck: string[];
  closings: string[];
  lessonSteps: LessonStep[];
  problemWorkshops: ProblemWorkshop[];
}

export const lessonFlow: LessonFlowSummary = {
  classTitle: "Sliding Window: Solving with one moving window",
  totalMinutes: 120,
  precheck: [
    "Arrays/strings, loops, dictionaries, and if/while statements are already known.",
    "Students can trace simple hand-executed loops.",
    "The class is ready for pattern-first problem solving.",
  ],
  closings: [
    "Students can choose fixed-size vs variable-size window strategy by reading the prompt.",
    "Students can explain what the `left` and `right` pointers represent.",
    "Students can maintain running state while windows move.",
    "Students can compare O(n²) and O(n) styles of thinking.",
  ],
  lessonSteps: [
    {
      id: "intro-hook",
      title: "Hook: Find the best 3-day streak",
      titleTag: "0-10 min",
      durationMinutes: 10,
      objective:
        "Let students experience overlap in consecutive-group problems before coding.",
      studentContext: [
        "Display: [4, 2, 7, 1, 8, 3] and ask for best sum of 3 consecutive days.",
        "Invite one student volunteer for each window sum.",
        "Ask what changed when moving from [4,2,7] to [2,7,1].",
      ],
      teacherNotes: [
        "Display: [4, 2, 7, 1, 8, 3] and ask for best sum of 3 consecutive days.",
        "Invite one student volunteer for each window sum.",
        "Ask what changed when moving from [4,2,7] to [2,7,1].",
      ],
      studentMoves: [
        "Compute every 3-day total by hand.",
        "Identify which number left and which entered on each move.",
        "Predict the next total before adding all three numbers.",
      ],
      checks: [
        "I can explain why 3-day windows are mostly overlapping in these examples.",
      ],
    },
    {
      id: "intuition-frame",
      title: "Intuition: moving frame analogy",
      titleTag: "10-25 min",
      durationMinutes: 15,
      objective:
        "Create the mental model of a moving frame over consecutive data.",
      studentContext: [
        "Draw a long row of numbers and a 3-cell frame over them.",
        "Slide the frame one step right and highlight only the entering/leaving items.",
        "State: 'Do not rebuild; update the old answer.'",
      ],
      teacherNotes: [
        "Draw a long row of numbers and a 3-cell frame over them.",
        "Slide the frame one step right and highlight only the entering/leaving items.",
        "State: 'Do not rebuild; update the old answer.'",
      ],
      studentMoves: [
        "Explain in one sentence what the frame represents.",
        "Explain why re-computing all values is wasteful.",
      ],
      checks: ["Old + new + one change = fast updates."],
    },
    {
      id: "fixed-pattern",
      title: "Fixed-size pattern",
      titleTag: "25-40 min",
      durationMinutes: 15,
      objective: "Teach fixed-size formula and pointer movement.",
      studentContext: [
        "Show the update rule: `new = old - left + right`.",
        "Use one warm example where k=3.",
        "Connect every movement to a story: one value leaves, one enters.",
      ],
      teacherNotes: [
        "Show the update rule: `new = old - left + right`.",
        "Use one warm example where k=3.",
        "Connect every movement to a story: one value leaves, one enters.",
      ],
      studentMoves: [
        "Fill in the rule for old sum = 13, leaving 4, entering 1.",
        "Predict when loops should start and why they don't begin at index 0.",
      ],
      checks: ["I can trace one slide without recomputing from scratch."],
    },
    {
      id: "fixed-walkthrough",
      title: "Guided walkthrough: Problem 1",
      titleTag: "40-55 min",
      durationMinutes: 15,
      objective: "Apply fixed-size window with a complete coding pass.",
      studentContext: [
        "Code Problem 1 live from starter to final.",
        "Pause at three checkpoints: window initialization, slide, best update.",
        "Ask why the for-loop starts at `k`.",
      ],
      teacherNotes: [
        "Code Problem 1 live from starter to final.",
        "Pause at three checkpoints: window initialization, slide, best update.",
        "Ask why the for-loop starts at `k`.",
      ],
      studentMoves: [
        "Copy the code and annotate each line in the same order.",
        "Mark what changes at each slide.",
      ],
      checks: [
        "First window build and first slide are both correct.",
      ],
    },
    {
      id: "pattern-decision",
      title: "Fixed vs variable recognition",
      titleTag: "55-65 min",
      durationMinutes: 10,
      objective:
        "Classify prompts and decide window type before choosing data structures.",
      studentContext: [
        "Show three examples: fixed sum, shortest-at-least target, at-most/k chars.",
        "Students classify first, code later.",
        "Correct them when clues point to variable-size windows.",
      ],
      teacherNotes: [
        "Show three examples: fixed sum, shortest-at-least target, at-most/k chars.",
        "Students classify first, code later.",
        "Correct them when clues point to variable-size windows.",
      ],
      studentMoves: [
        "Classify each example in a live poll.",
        "Say the exact clue ('exactly k', 'at least', 'at most').",
      ],
      checks: ["I know when a window should grow and shrink."],
    },
    {
      id: "variable-demo",
      title: "Variable-size growth and shrink",
      titleTag: "65-80 min",
      durationMinutes: 15,
      objective: "Explain why one pointer can move many times while the other waits.",
      studentContext: [
        "Trace [2, 3, 1, 2, 4, 3], target=7 with a board.",
        "Use the language: 'right expands, left contracts only while valid.'",
        "Demonstrate why `while` is required during contraction.",
      ],
      teacherNotes: [
        "Trace [2, 3, 1, 2, 4, 3], target=7 with a board.",
        "Use the language: 'right expands, left contracts only while valid.'",
        "Demonstrate why `while` is required during contraction.",
      ],
      studentMoves: [
        "Trace one valid window and then shrink it repeatedly.",
        "Explain when shrinking stops.",
      ],
      checks: [
        "I can point to a case where left must move more than once.",
      ],
    },
    {
      id: "independent-practice",
      title: "Switch to problem workshops",
      titleTag: "80-105 min",
      durationMinutes: 25,
      objective:
        "Give students space to solve while the teacher monitors misconceptions.",
      studentContext: [
        "Tell students: Problem 1 and 2 are required, Problem 3 is expected, 4 is optional challenge.",
        "Circulate and keep asking: window definition, what state is maintained, when pointers move.",
        "Mark common pitfalls on the side as students present them.",
      ],
      teacherNotes: [
        "Tell students: Problem 1 and 2 are required, Problem 3 is expected, 4 is optional challenge.",
        "Circulate and keep asking: window definition, what state is maintained, when pointers move.",
        "Mark common pitfalls on the side as students present them.",
      ],
      studentMoves: [
        "Attempt each problem independently or in pairs.",
        "Write one test case of their own and check it.",
      ],
      checks: ["Every student is using pointer movement language."],
    },
    {
      id: "debrief",
      title: "Debrief and misconception clean-up",
      titleTag: "105-120 min",
      durationMinutes: 15,
      objective:
        "Consolidate templates for fixed and variable window problems.",
      studentContext: [
        "Recap both templates: fixed-size and variable-size.",
        "Have students share one bug and one fix.",
        "Preview exit ticket and confusion points.",
      ],
      teacherNotes: [
        "Recap both templates: fixed-size and variable-size.",
        "Have students share one bug and one fix.",
        "Preview exit ticket and confusion points.",
      ],
      studentMoves: [
        "Share their biggest correction in one sentence.",
        "Identify one line they will watch for in future problems.",
      ],
      checks: [
        "I can explain sliding window speed using 'each element is processed a few times.'",
      ],
    },
  ],
  problemWorkshops: [
    {
      problemSlug: "best-k-day-step-streak",
      coachScript:
        "Start by saying: \"This is fixed-size. Ask students for the first k sum and then the slide rule.\"",
      studentGoal: "Write a function that returns the max sum of exactly k consecutive days.",
      prompts: [
        "What are the window indices when right points to 4?",
        "When do you stop the loop?",
        "How does `window_sum` change in one move?",
      ],
      checkpoints: [
        "Built initial k sum and handled `k > len(steps)`.",
        "Used a for-loop starting at k.",
        "Tracked the best sum on every slide.",
      ],
      commonBugs: [
        "Starting slide index at 0.",
        "Removing the wrong left element.",
        "Not returning None when no full window exists.",
      ],
      stretchQuestion:
        "Can you return both max sum and where that k-day window starts?",
    },
    {
      problemSlug: "shortest-study-sprint",
      coachScript:
        "Frame this as a shrinking-only-when-valid problem. `while` is the important part.",
      studentGoal:
        "Find shortest consecutive window with sum >= target, return 0 if impossible.",
      prompts: [
        "How do positive numbers help this strategy?",
        "What must happen inside the shrinking loop each time?",
        "When is the current window length worth saving?",
      ],
      checkpoints: [
        "Built cumulative running sum with right.",
        "Used while-loop to shrink multiple times.",
        "Returned 0 when no valid window exists.",
      ],
      commonBugs: [
        "Using if instead of while for shrink.",
        "Updating best_length after window breaks.",
        "Losing best answer by reinitializing too aggressively.",
      ],
      stretchQuestion:
        "How would behavior change if blocks could be negative?",
    },
    {
      problemSlug: "longest-club-code-with-limited-symbols",
      coachScript:
        "Introduce dictionary counts as the running state. Emphasize 'distinct keys in window'.",
      studentGoal:
        "Find longest substring with at most k distinct characters.",
      prompts: [
        "What is the meaning of `len(counts)` inside this loop?",
        "Why do we delete a key when its count hits 0?",
        "How do we decide when to shrink?",
      ],
      checkpoints: [
        "Expanded with right and incremented char count.",
        "Shrank with left while distinct count exceeds k.",
        "Updated best_length only when window is valid.",
      ],
      commonBugs: [
        "Forgetting to decrement before deleting when shrinking.",
        "Storing only a set and losing multiplicity.",
        "Updating best while still invalid.",
      ],
      stretchQuestion:
        "Can your solution return the actual longest substring, not just length?",
    },
    {
      problemSlug: "smallest-announcement-clip",
      coachScript:
        "Challenge mode now. This is variable-size, requirement-checking sliding window.",
      studentGoal:
        "Find shortest substring containing all required characters at least once.",
      prompts: [
        "What data do we use for required lookup?",
        "How do we know when the window is valid?",
        "What changes when left points to a required character with count 1?",
      ],
      checkpoints: [
        "Built needed set and have counter.",
        "Expanded right and recorded best only while valid.",
        "Shrank left and adjusted have only when required count drops to zero.",
      ],
      commonBugs: [
        "Increasing have for every occurrence instead of first-seen states.",
        "Forgetting to handle empty required set.",
        "Returning length instead of substring.",
      ],
      stretchQuestion:
        "How does this change if required has duplicates like [\"a\", \"a\", \"b\"]?",
    },
  ],
};

export const getProblemBySlug = (
  slug: string,
): SlidingWindowProblem | undefined => {
  return problems.find((problem) => problem.slug === slug);
};

export const workshopOrder = lessonFlow.problemWorkshops.map(
  (workshop) => workshop.problemSlug
);
