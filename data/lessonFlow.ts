import { type SlidingWindowProblem, problems } from "./problems";

export interface LessonStep {
  id: string;
  title: string;
  titleTag?: string;
  durationMinutes: number;
  objective: string;
  studentContext: string[];
  teacherNotes: string[];
  presenterTalkingPointGroups?: PresenterTalkingPointGroup[];
  studentMoves: string[];
  checks: string[];
  invariant?: string;
  successCriteria?: string;
  failurePatterns?: string[];
  commonFailurePatterns?: string[];
  edgeCasePrompts?: string[];
  sanityChecks?: string[];
}

export interface ProblemWorkshop {
  problemSlug: string;
  coachScript: string;
  presenterTalkingPointGroups?: PresenterTalkingPointGroup[];
  studentGoal: string;
  prompts: string[];
  checkpoints: string[];
  commonBugs: string[];
  stretchQuestion: string;
  commonFailurePatterns?: string[];
  sanityChecks?: string[];
  edgeCasePrompts?: string[];
  successCriteria?: string;
}

export interface LessonFlowSummary {
  classTitle: string;
  totalMinutes: number;
  precheck: string[];
  closings: string[];
  lessonSteps: LessonStep[];
  problemWorkshops: ProblemWorkshop[];
}

type PresenterExpansion = {
  bullet: string;
  expansion: string[];
};

type PresenterTalkingPointGroup = {
  heading: string;
  points: PresenterExpansion[];
};

export const lessonFlow: LessonFlowSummary = {
  classTitle: "Sliding Window: classify first, then move pointers",
  totalMinutes: 120,
  precheck: [
    "Students already know arrays/strings, loops, dictionaries, and if/while.",
    "Students can trace 3 to 5 pointer moves on a short list.",
    "Students can tell fixed-size from variable-size before writing code.",
  ],
  closings: [
    "Students can classify prompt type in one sentence.",
    "Students can name what left and right point to at each step.",
    "Students can keep only required state and update it in O(1).",
    "Students can explain why this pattern is linear using pointer movement.",
  ],
  lessonSteps: [
    {
      id: "recognize-constraint",
      title: "Pick window type first",
      titleTag: "0-10 min",
      durationMinutes: 10,
      objective:
        "Choose fixed-size or variable-size before any code, using wording only.",
      studentContext: [
        "Fixed example: steps=[4,2,7,1,8], k=3 -> exact 3-day window each slide.",
        "Variable example: blocks=[2,1,5,2,3], target=7 -> keep shrinking until sum < target.",
        "If target says exact `k`, use fixed-size; if target says `at least`/`at most`, use variable-size.",
      ],
      teacherNotes: [
        "Ask students to classify two prompts in one line before opening any trace or code.",
        "Do not discuss shrink/frequency details before the type is agreed.",
      ],
      studentMoves: [
        "Classify both examples in one sentence.",
        "Tell students where this class will have left/right movement pressure.",
      ],
      checks: [
        "Given a prompt, I can name fixed/variable in under 10 seconds.",
      ],
      invariant:
        "Window type is decided from the sentence, never from number shapes.",
      successCriteria:
        "Students classify all provided examples without checking code.",
      failurePatterns: [
        "Calling variable-size for an exact-k problem.",
        "Using examples to force fixed when prompt says at least/at most.",
      ],
      presenterTalkingPointGroups: [
        {
          heading: "Start of every slide",
          points: [
            {
              bullet: "Ask for the classification before anything else.",
              expansion: [
                "Read one line and decide: exact window length or threshold window?",
                "If exact `k`/`consecutive k`: fixed-size template.",
                "If `at least`, `at most`, `minimum`, `maximum`: variable-size template.",
                "Have students restate this choice out loud before you continue.",
              ],
            },
            {
              bullet: "Give two sample prompts now, not after you code.",
              expansion: [
                "Use one prompt to show fixed behavior.",
                "Use one prompt to show variable behavior.",
                "If both look similar, point to what is different in the wording.",
              ],
            },
          ],
        },
        {
          heading: "Words that force the template",
          points: [
            {
              bullet: "Model how to anchor the slide choice in language.",
              expansion: [
                "Fixed-size phrase set: `exactly k`, `k consecutive`, `window of size k`.",
                "Variable-size phrase set: `at most`, `at least`, `sum >= target`, `contains all targets`.",
                "Count the prompts with students: 1 fixed, 1 variable, then move on.",
              ],
            },
            {
              bullet: "What to say if a student argues both.",
              expansion: [
                "Ask them to find one phrase they missed.",
                "Do not move to trace until they can point to the phrase themselves.",
              ],
            },
          ],
        },
        {
          heading: "Quick checks",
          points: [
            {
              bullet: "Common classification mistakes to call out.",
              expansion: [
                "Using fixed when shrinking is required.",
                "Using while-logic in exact-k questions.",
                "Mixing up `best` objective with `window is valid` check.",
                "Starting trace before type is decided.",
              ],
            },
            {
              bullet: "One-line checks before opening a trace.",
              expansion: [
                "Prompt: `Exact or threshold?`",
                "Prompt: `One pointer grows each step in fixed, two directions can move in variable.`",
                "Prompt: `Will we ever need while?`",
              ],
            },
          ],
        },
      ],
      commonFailurePatterns: [
        "Saying both fixed and variable for the same prompt.",
        "Ignoring the key phrase `exactly k`.",
      ],
      sanityChecks: [
        "Fixed example has one left+one right step each window update.",
        "Variable example can shrink multiple times after one right move.",
      ],
      edgeCasePrompts: ["k=0", "k>n", "target impossible"],
    },
    {
      id: "derive-state",
      title: "Track minimum state only",
      titleTag: "10-25 min",
      durationMinutes: 15,
      objective:
        "Keep only the state fields that are updated in O(1) each pointer move.",
      studentContext: [
        "Problem 1 example state: steps=[4,2,7,1,8,3], k=3. What fields must exist to process one slide?",
        "After first slide (`right=3`), what are the new `left`, `right`, and `window_sum` values?",
        "Keep the state list short so each pointer move is O(1).",
        "How many states do we keep for each window type so we can update in O(1)?",
        "What does `left`, `right`, and `window_sum` represent conceptually before and after each transition?",
      ],
      presenterTalkingPointGroups: [
        {
          heading: "State design",
          points: [
            {
              bullet: "Ask students to list only fields that update on one pointer move.",
              expansion: [
                "If a value changes by looping through the current window, it is not part of this minimum list.",
                "Fixed-size should track four values and nothing more for slide transitions.",
                "Variable-size adds a best-tracking value because answer conditions depend on current window validity.",
                "Every state field should map to exactly one line in the pseudocode update.",
              ],
            },
            {
              bullet: "Use the minimum list as a contract before coding.",
              expansion: [
                "Fixed-size: `window_sum`, `best`, `left`, `k`.",
                "Variable-size: `left`, `right`, `current_sum`, plus `best_length`/`best_state`.",
                "If a field is not needed to update state in O(1), remove it from the board.",
                "If a field is needed to answer final question, keep it separate from pointer transition state.",
              ],
            },
            {
              bullet: "Force students to map each field to a single transition line.",
              expansion: [
                "Right move updates window sum (+incoming, -outgoing when sliding).",
                "Left move updates window sum (when shrinking).",
                "Answer state updates after validation step.",
                "If the line does not move a pointer, ask which checkpoint it belongs to instead.",
              ],
            },
          ],
        },
        {
          heading: "One-slide transition plan",
          points: [
            {
              bullet: "Walk right and left updates as a repeatable 3-line cycle.",
              expansion: [
                "Right moves first: include new number.",
                "If fixed-size, drop one leftmost number only when `right` has covered `k` elements.",
                "If variable-size, keep shrinking left until trigger condition is no longer true.",
                "Only after transition ends can we compare and store best.",
              ],
            },
            {
              bullet: "Use the Problem 1 sample to force concrete numbers.",
              expansion: [
                "Start with `left=0,right=0,window_sum=0`.",
                "At first full window (`right=3`), students should get `left=1,right=3,window_sum=13`.",
                "Using 1-based window labels for this example, next rows are `left=2,right=4,window_sum=10`, then `left=3,right=5,window_sum=16`, then `left=4,right=6,window_sum=12`.",
                "Ask students to say the exact pointer and state action in each of those three rows.",
                "If indexing confuses them, switch to 1-based naming for explanation and switch back.",
              ],
            },
            {
              bullet: "Use these checkpoints to catch common confusion quickly.",
              expansion: [
                "Window starts only once; it does not rebuild itself from scratch each row.",
                "If a student cannot state one line transition, pause before moving right again.",
                "If they update best too early, ask them to check the trigger condition once more.",
                "This is where most silent off-by-one and stale-window bugs happen.",
              ],
            },
          ],
        },
      ],
      teacherNotes: [
        "Write each state field on board and pair it with its transition rule.",
        "For every extra field, ask: \"where is this used in code update?\"",
      ],
      studentMoves: [
        "State what changes on one right move.",
        "State what changes on one left move.",
      ],
      checks: [
        "Students can update one state field at a time with no full-window scan.",
      ],
      invariant:
        "Each pointer move changes only local state and still represents exact window contents.",
      successCriteria:
        "Students can write transition rules from words before opening solution code.",
      failurePatterns: [
        "Keeping extra fields that never change in constant time.",
        "Dropping `best` or equivalent answer state too early.",
      ],
      commonFailurePatterns: [
        "Using a set where counts are required.",
        "Updating answer before state has been fixed.",
      ],
      sanityChecks: [
        "No student update loops over the whole window for one move.",
        "Every field appears in at least one check or transition line.",
      ],
      edgeCasePrompts: ["all duplicates", "all identical", "single-item input"],
    },
    {
      id: "invariant",
      title: "Add one sentence invariant",
      titleTag: "25-40 min",
      durationMinutes: 15,
      objective:
        "Use one short invariant sentence to prevent silent pointer mistakes.",
      studentContext: [
        "Fixed example: after each slide, window_sum equals sum of current 3 days.",
        "Variable example: with [2,1,5,2,3], target=7 at right=3, what does `left`/`right` cover before shrinking?",
        "After each left move, re-check whether that window is still valid before moving on.",
      ],
      presenterTalkingPointGroups: [
        {
          heading: "Invariant language the class repeats",
          points: [
            {
              bullet: "Set one invariant sentence on board before trace.",
              expansion: [
                "For fixed-size: window_sum tracks exactly the k elements inside left/right.",
                "For variable-size: `counts/current_sum` reflect every element currently inside the window.",
                "After every move, ask students to read this sentence before best update.",
              ],
            },
            {
              bullet: "When to test the invariant with students.",
              expansion: [
                "After each right expansion, then after every left shrink.",
                "If invariant is false, stop and trace the missing update.",
                "Only after invariant is true, move to answer update.",
              ],
            },
          ],
        },
        {
          heading: "Debugging with invariant checkpoints",
          points: [
            {
              bullet: "Use the slide example as a debug script.",
              expansion: [
                "Ask: `What values changed after right step?`",
                "Ask: `What changed after this left shrink?`",
                "If a number disappears without a matching pointer move, rewind immediately.",
                "This catches silent bugs in one student answer.",
              ],
            },
            {
              bullet: "Instructor correction language.",
              expansion: [
                "Say: `Window says 4 items, but right/left only show 3.`",
                "Say: `You updated best before fixing state, move that line after validation.`",
              ],
            },
          ],
        },
      ],
      teacherNotes: [
        "Ask students to read invariant before pressing next in trace.",
        "Require students to point to exact invariant line after each move.",
      ],
      studentMoves: [
        "Check invariants before updating best in each iteration.",
        "Call out when invariants fail and what line restores them.",
      ],
      checks: [
        "Students can check invariant state after one right and one left move.",
      ],
      invariant:
        "Window state always matches the values currently between `left` and `right` (inclusive).",
      successCriteria:
        "Students can catch one wrong move by reading invariant mismatch.",
      failurePatterns: [
        "Updating best before validating current state.",
        "Shrinking and still reading old answer candidate.",
      ],
      commonFailurePatterns: [
        "Testing validity before adding new right value.",
        "Moving left without checking whether validity changed.",
      ],
      sanityChecks: [
        "Invariant is explicitly stated once students open a slide.",
        "Invariant is re-checked before each checkpoint line.",
      ],
      edgeCasePrompts: ["empty input", "single-char input", "all chars identical"],
    },
    {
      id: "fixed-proof",
      title: "Simple linear-time proof",
      titleTag: "40-55 min",
      durationMinutes: 15,
      objective:
        "Explain runtime with index entry/exit count for fixed-size only.",
      studentContext: [
        "Example array length 6, k=3: [4,2,7,1,8,3].",
        "What one-time setup work is needed before sliding starts?",
        "How many times does each index enter and exit in this fixed-size slide pattern?",
      ],
      presenterTalkingPointGroups: [
        {
          heading: "Linear-time story",
          points: [
            {
              bullet: "Run a visible entry/exit count in front of the class.",
              expansion: [
                "One startup pass builds `window_sum` for the first k items.",
                "Then each index enters once and exits once in fixed-size flow.",
                "Each enter/exit is O(1), so total is linear.",
              ],
            },
            {
              bullet: "Show this with a simple table for the sample.",
              expansion: [
                "Rows to mark: setup, slide 1, slide 2, slide 3, slide 4.",
                "Count add/remove operations per row.",
                "Highlight that there is no full sum recompute on any slide row.",
              ],
            },
            {
              bullet: "How to answer student skepticism.",
              expansion: [
                "If they say 'why not O(n*k)', ask where that extra k came from.",
                "Point to the fixed number of adds/removes per index.",
                "Then say each index is visited by each pointer at most once.",
              ],
            },
            {
              bullet: "Coach line you can repeat while showing rows.",
              expansion: [
                "Setup is work that happens once; slide transitions are constant work.",
                "Count total add/remove operations in the whole run.",
                "If every index contributes at most two updates, this is linear.",
                "Close with this rule-of-thumb: no nested scan inside each slide.",
              ],
            },
          ],
        },
      ],
      teacherNotes: [
        "Count how many times each index is added and removed on the board.",
        "Separate one-time build from repeated O(1) slides.",
      ],
      studentMoves: [
        "Find two-pointer movement on one line and mark monotonic movement only.",
        "Show that no index is added and removed repeatedly.",
      ],
      checks: [
        "Students can explain O(n) as one setup plus one constant work per index.",
      ],
      invariant: "No index moves backward; each index enters and exits fixed-size window at most once.",
      successCriteria:
        "Students can justify complexity with concrete index counts.",
      failurePatterns: [
        "Saying O(n) without counting setup vs slide work.",
        "Recomputing window sum each step in explanation.",
      ],
      commonFailurePatterns: [
        "Using for-loop from 0 instead of k.",
        "Confusing total slide count with per-step full sum.",
      ],
      sanityChecks: [
        "Every slide step uses one add and one subtract.",
        "Students can identify start/end phases in trace.",
      ],
      edgeCasePrompts: ["k>n", "k==1", "k==n"],
    },
    {
      id: "pattern-decision",
      title: "If vs while and trigger rule",
      titleTag: "55-65 min",
      durationMinutes: 10,
      objective: "Choose if/while from whether shrink can happen many times at once.",
      studentContext: [
        "Fixed example: k fixed = no shrink loop needed in every right step.",
        "Variable example: [2,1,5,2,3,2], target=7, at right=3 sum=8 and still valid after one shrink.",
        "For this right=3 case, can one right move cause multiple left moves?",
        "If yes, what loop keyword should we use and why?",
      ],
      presenterTalkingPointGroups: [
        {
          heading: "If vs while decision",
          points: [
            {
              bullet: "Make this the first branching question on the slide.",
              expansion: [
                "Ask: can one right move force left to move twice or more?",
                "If yes, we use `while`, not `if`.",
                "If no, one-check `if` is enough.",
              ],
            },
            {
              bullet: "Concrete anchor using Problem 2 sample.",
              expansion: [
                "At right=3, first `current_sum` is 10.",
                "One shrink can keep condition true, a second shrink can break it.",
                "So fixed-size examples often use one-line shrink, this sample uses loop.",
              ],
            },
            {
              bullet: "Safe loop pattern to narrate.",
              expansion: [
                "Right expansion line runs once per loop iteration.",
                "While condition says loop: move left one step and update state.",
                "Re-check condition right after each left update.",
              ],
            },
            {
              bullet: "Classroom rule of thumb for the two keywords.",
              expansion: [
                "Start with `if` when one correction is possible.",
                "Use `while` when the condition can remain true after one move.",
                "For exact-k fixed windows, shrinking is fixed by size and never repeats same row.",
                "For constraints, shrinking may need many fixes in one row.",
              ],
            },
          ],
        },
      ],
      teacherNotes: [
        "Ask students: can left move 2+ times for same right? if yes, say while.",
        "Ask what condition moves left: `current_sum >= target` or `distinct > k`.",
      ],
      studentMoves: [
        "Practice the trigger line for one shrink pass and for repeated shrink passes.",
        "Map each trigger to one of fixed/variable templates.",
      ],
      checks: ["Students pick if or while from one concrete trace without reading code."],
      invariant:
        "Right expands state first, left shrinks only while template condition fails or can improve answer.",
      successCriteria:
        "Students can defend while-loops on multi-shrink examples.",
      failurePatterns: [
        "Using if when example needs repeated shrink.",
        "Using while when condition changes only once.",
      ],
      commonFailurePatterns: [
        "Left direction reversed.",
        "Best update done after shrinking away from best.",
      ],
      sanityChecks: [
        "Condition is tied to concrete state variable used in loop.",
        "After each left move, condition is re-tested.",
      ],
      edgeCasePrompts: ["multi-shrink case", "k=0", "no overlap constraints"],
    },
    {
      id: "variable-demo",
      title: "Multi-shrink demo",
      titleTag: "65-80 min",
      durationMinutes: 15,
      objective: "Walk one concrete multi-shrink trace and keep updates visible.",
      studentContext: [
        'Trace Problem 2 sample: blocks=[2,1,5,2,3,2], target=7.',
        "What is the current_sum after each right move, if students start at right=0?",
        "At right=2, what should left do before this row continues?",
        "At right=3, how many left moves happen before invalid?",
      ],
      presenterTalkingPointGroups: [
        {
          heading: "Trace coaching",
          points: [
            {
              bullet: "Use this sample as a live row-by-row trace.",
              expansion: [
                "Start with row 0: right=0, window includes only `2`.",
                "Row1 and row2: add each new value then check shrink trigger.",
                "At right=2, left moves once from 0->1 and then row continues.",
              ],
            },
            {
              bullet: "What students must call out at each row.",
              expansion: [
                "Old `left`, `right`, `current_sum` before update.",
                "New values after right add.",
                "All left moves performed while trigger is true.",
                "Final state before moving right again.",
              ],
            },
            {
              bullet: "Common pause points for explanation.",
              expansion: [
                "Pause after right expansion and after each shrink.",
                "Say when best is recorded: right after the valid minimal candidate exists.",
                "Do not move right while condition still asks for another shrink.",
              ],
            },
          ],
        },
      ],
      teacherNotes: [
        "Step through every shrink line with students saying old/new left-right each time.",
        "Make the key question: why did we move left twice before adding right=4?",
      ],
      studentMoves: [
        "Write one row table: left, right, current_sum, best_length.",
        "Mark which rows are still valid.",
      ],
      checks: [
        "Students can explain why right stays and left moves multiple times in one iteration.",
      ],
      invariant:
        "Right never moves backward; each left move removes exactly one element until condition is fixed.",
      successCriteria: "Students can produce a trace with repeated shrinks and valid best updates.",
      failurePatterns: [
        "Stopping shrink early.",
        "Moving right while loop still has room to shrink.",
      ],
      commonFailurePatterns: [
        "Forgetting to check best before one extra left move.",
        "Losing window validity tracking between shrinks.",
      ],
      sanityChecks: [
        "Each shrink decreases window length by exactly one.",
        "Best candidate is tested before each final invalid move.",
      ],
      edgeCasePrompts: ["multi-shrink trace", "duplicate runs", "long valid chain then drop"],
    },
    {
      id: "independent-practice",
      title: "Workshop planning before coding",
      titleTag: "80-105 min",
      durationMinutes: 25,
      objective:
        "Use the same plan on each workshop prompt, with one concrete pre-code trace.",
      studentContext: [
        "Use this order for all problems:",
        "1) classify fixed/variable, 2) choose state, 3) choose trigger, 4) dry-run 3-4 steps.",
        "Example start: Problem 1 with k=3, can you draft a 4-step dry run before coding?",
      ],
      presenterTalkingPointGroups: [
        {
          heading: "Workshop pacing",
          points: [
            {
              bullet: "Use one repeatable 4-step rhythm in all workshops.",
              expansion: [
                "Step 1: classify fixed/variable.",
                "Step 2: list minimal state fields.",
                "Step 3: write trigger and when it runs.",
                "Step 4: dry-run 3-4 moves before checking any code.",
              ],
            },
            {
              bullet: "What to collect from each team before coding.",
              expansion: [
                "Have them say best update timing out loud.",
                "Require an edge check answer first (`k=0`, impossible, duplicate-heavy).",
                "Only start code after one student can defend trigger + updates.",
              ],
            },
          ],
        },
        {
          heading: "Workshop support language",
          points: [
            {
              bullet: "Keep student output concrete and short.",
              expansion: [
                "Replace long explanations with one sentence before every code line.",
                "Ask quieter students to present one transition.",
                "If confusion appears, ask one student to restate the invariants in one line.",
              ],
            },
            {
              bullet: "How to rescue if a team is stuck.",
              expansion: [
                "Give them one known edge case from their own sample.",
                "Then ask for the next valid shrink or next valid expand.",
                "Do not rescue with code; rescue with state and pointer wording.",
              ],
            },
          ],
        },
      ],
      teacherNotes: [
        "Do not allow coding before the three fields are stated on notes.",
        "Require one visible edge case each for k>n and impossible target set.",
      ],
      studentMoves: [
        "Create one trace table row for each problem before coding.",
        "Say out loud which slide or shrink transition applies next.",
      ],
      checks: [
        "Every workshop has a concrete pre-check + mini trace before implementation.",
      ],
      invariant:
        "Every workshop uses the same classify-state-trigger-verify loop.",
      successCriteria:
        "Students can finish one fixed and three variable workshop dry-runs.",
      failurePatterns: [
        "Jumping to code before trace.",
        "Skipping edge conditions entirely.",
      ],
      commonFailurePatterns: [
        "Not writing best-update timing in notes.",
        "Missing k/target edge behavior.",
      ],
      sanityChecks: [
        "Each workshop has a pre-check list and one example transition.",
        "Each workshop defines at least one duplicate-heavy case.",
      ],
      edgeCasePrompts: ["hidden test list", "impossible target", "one case with duplicates"],
    },
    {
      id: "debrief",
      title: "Bug fixes from real traces",
      titleTag: "105-120 min",
      durationMinutes: 15,
      objective: "Close with explicit bug-fix language from concrete traces.",
      studentContext: [
        "Think of one fixed-window bug and one variable-window bug you saw today.",
        "For each, what line in the trace shows where it breaks?",
        "How should we describe the fix in student language?",
      ],
      presenterTalkingPointGroups: [
        {
          heading: "Bug diagnosis pattern",
          points: [
            {
              bullet: "Ask students to bring two concrete bug traces.",
              expansion: [
                "One fixed-window bug and one variable-window bug.",
                "Each bug should be linked to one exact trace row.",
                "Use the same line: `this line breaks pointer movement`.",
              ],
            },
            {
              bullet: "Common bug cues to narrate.",
              expansion: [
                "Fixed bug cue: wrong startup window and starting right from 0.",
                "Variable bug cue: shrinking stops too early or one shrink too many.",
                "Fix cue: keep shrinking until condition and best timing are true.",
              ],
            },
            {
              bullet: "Close the class with concrete corrected lines.",
              expansion: [
                "Ask each team to read one corrected line as plain English.",
                "Then map it back to left/right and state updates.",
                "Collect a final summary: classify, state, trigger, timing.",
              ],
            },
          ],
        },
      ],
      teacherNotes: [
        "Collect one fixed bug and one variable bug from class logs.",
        "Map each fix directly to one invariant or trigger line.",
      ],
      studentMoves: [
        "Name one bug + one exact corrected line.",
        "State how each fix keeps invariants true.",
      ],
      checks: ["Students can restate fixed and variable complexity in one sentence."],
      invariant:
        "Each correction should restore either the classify choice, state rule, or best timing.",
      successCriteria:
        "Students can justify final answer choice from an explicit example trace.",
      failurePatterns: [
        "Dropping invariants when final answer is close.",
        "Updating best after candidate becomes invalid.",
      ],
      commonFailurePatterns: [
        "Moving pointers backward in one patch.",
        "Using `if` where `while` is required in repeat-shrink traces.",
      ],
      sanityChecks: [
        "All discussed bugs include a concrete before/after example.",
        "No unresolved edge-case check is left unchecked.",
      ],
      edgeCasePrompts: ["negative inputs", "multi-shrink trace review"],
    },
  ],
  problemWorkshops: [
    {
      problemSlug: "best-k-day-step-streak",
      coachScript:
        "Start with fixed template and a 20-second dry run: [4,2,7,1,8,3], k=3.",
      studentGoal:
        "Write a function that returns the max sum of exactly `k` consecutive days.",
      prompts: [
        "Classify this as fixed-size in one line.",
        "Run quick pre-checks: if k<=0 or k>n, what should the function return first?",
        "Dry-run with sample: what is the current window and sum at each right index?",
        "At `right=2`, what subtraction happens before the next slide starts?",
        "At first full window (`right=3`), what are the exact `left`, `right`, and `window_sum` values?",
        "Write the one transition line students can repeat for every slide.",
        "What is the final best window on this sample after last slide?",
      ],
      checkpoints: [
        "Build first k window once, then start right at index k.",
        "Each slide does one add and one remove.",
        "Update best only after each full valid 3-element slide.",
      ],
      commonBugs: [
        "Loop starts at index 0 instead of k.",
        "Removes wrong leaving element during slide.",
        "Skips `None` return when k>n or k==0.",
      ],
      commonFailurePatterns: [
        "Adding shrink logic to this fixed task.",
        "Updating answer before first full window exists.",
      ],
      edgeCasePrompts: ["k=0", "k=len(steps)", "k>len(steps)", "empty input"],
      sanityChecks: [
        "State is `[4,2,7,1,8,3], k=3`: initial 13, then 10, then 16, then 12.",
        "Every index in this sample enters and leaves once after setup.",
      ],
      stretchQuestion:
        "Can you return both best sum and start index of the max window?",
      successCriteria:
        "Students can explain fixed-window proof with this sample trace.",
      presenterTalkingPointGroups: [
        {
          heading: "Fixed-size coaching flow",
          points: [
            {
              bullet: "Use this exact student flow: classify, state, transition, check.",
              expansion: [
                "Start with the first k sum once, then slide with add/remove each step.",
                "First full window appears only when right reaches index k.",
                "Answer updates happen only when a full `k` window exists.",
                "If k is invalid, return `None` and stop before any window logic.",
                "Talk through state after every slide rather than only final numbers.",
              ],
            },
            {
              bullet: "What instructors should verify before moving to next step.",
              expansion: [
                "Students must show setup step for first window.",
                "Students must remove exactly one leaving item each slide.",
                "Students must update best after building or after subtracting leaving item.",
              ],
            },
            {
              bullet: "How to run the 30-second in-class trace.",
              expansion: [
                "Say out loud: `right enters`, `if full then left exits`, `best updates`.",
                "Have one student call out numeric tuple each step.",
                "Pause after every best update and ask why that step is a candidate.",
                "Then continue with the same phrase for each line.",
              ],
            },
          ],
        },
        {
          heading: "Pre-check and edge timing",
          points: [
            {
              bullet: "Edge behavior to say out loud.",
              expansion: [
                "Handle `k <= 0` and `k > n` as early returns.",
                "Ask who gets stuck when k equals array length.",
                "Use one line of trace to show what happens when there is no full window.",
              ],
            },
            {
              bullet: "Instructor check list before class closes.",
              expansion: [
                "Have one student verbalize when best changes.",
                "Have another student verbalize pointer motion only.",
                "Then compare to expected sample sequence together.",
              ],
            },
            {
              bullet: "Quick check language for difficult students.",
              expansion: [
                "If team is stuck, ask: `What is window_sum before we remove anything?`",
                "Then ask: `What is removed value when we slide right by one?`",
                "Then ask: `Did we update best before or after the full window existed?`",
                "Close loop by restating the full-slide formula in one sentence.",
              ],
            },
          ],
        },
        {
          heading: "Common mistakes to recover from",
          points: [
            {
              bullet: "If a team says answer is wrong, use these checkpoints.",
              expansion: [
                "Did they initialize first window before slide loop?",
                "Did they remove the right leaving element before adding right+1?",
                "Did they allow best update before full k window exists?",
              ],
            },
            {
              bullet: "Recovery script when team output is wrong.",
              expansion: [
                "Ask them to write initial tuple, first full tuple, and one slide tuple on board.",
                "Point to exact index where the tuple diverges from expected.",
                "If wrong, do not fix code first—fix state + transition order first.",
                "Remind them: full-window start and slide-shift order are the root causes.",
              ],
            },
          ],
        },
      ],
    },
    {
      problemSlug: "shortest-study-sprint",
      coachScript:
        "Use this sample first: blocks=[2,1,5,2,3,2], target=7, and trace two shrinks at right=3.",
      studentGoal:
        "Find shortest consecutive total with sum >= target, return 0 if impossible.",
      prompts: [
        "Classify variable-size and write the while trigger in words.",
        "With target=7, right=2 gives sum=8. Where should `left` end after legal shrinks?",
        "Why is right=3 a second multi-shrink case? Show both shrink rows.",
        "Pre-check edge cases before code: target=0 and impossible target.",
        "At each shrink, what is the exact `left`, `right`, and `current_sum` row state?",
      ],
      checkpoints: [
        "Expand right by one, then while window valid, shrink left repeatedly.",
        "At right=2 in this sample, shrink once then stop for that row.",
        "At right=3, shrink twice before moving right.",
        "Best updates are recorded before each left move that would move out of minimum.",
      ],
      commonBugs: [
        "Using if instead of while.",
        "Updating best after invalidating the window.",
        "Returning `len(blocks)` instead of 0 when impossible.",
      ],
      commonFailurePatterns: [
        "Skipping repeated shrink in one iteration.",
        "Ignoring target zero early return.",
      ],
      edgeCasePrompts: ["target=0", "target > sum(blocks)", "single-element valid"],
      sanityChecks: [
        "Shrink while condition is true before moving right.",
        "Trace row for right=3: (sum 8 -> 7 -> 2) and best updates 3 then 2.",
      ],
      stretchQuestion:
        "Can you return best start/end indices with minimal length?",
      successCriteria:
        "Students can explain with this sample why one right step can trigger multiple left moves.",
      presenterTalkingPointGroups: [
        {
          heading: "Variable trigger",
          points: [
            {
              bullet: "Walk the trigger in student language first.",
              expansion: [
                "Use `while current_sum >= target` because one right move can force multiple shrinks.",
                "Do not move right again until shrink loop ends.",
                "Record best when window is still valid, then shrink carefully.",
              ],
            },
            {
              bullet: "Use this question order to keep trace tight.",
              expansion: [
                "Show first time sum crosses target at right=2.",
                "Force one shrink and test condition again.",
                "At right=3, force repeated shrink and show first invalid result.",
              ],
            },
            {
              bullet: "What to call out when students skip loops.",
              expansion: [
                "Ask: `did left move only once or until target condition is fixed?`",
                "If one move remains while condition is true, ask them to continue shrink.",
                "If left crosses minimum window after shrinking, do not move right yet.",
              ],
            },
            {
              bullet: "Timing language you can reuse in every iteration.",
              expansion: [
                "Right expands first, then repeatable shrink loop.",
                "Best snapshot is inside-loop, before the shrink that invalidates minimality.",
                "Only after loop ends do you advance to the next right index.",
                "This order is fixed and should be spoken every time in class.",
              ],
            },
          ],
        },
        {
          heading: "Common trace checks",
          points: [
            {
              bullet: "Keep instructor checks close to rows students can validate.",
              expansion: [
                "At right=2, one valid shrink brings best to 3.",
                "At right=3, repeated shrink can happen in one iteration.",
                "Final best for sample is 2.",
                "Return 0 only when never valid, never partial.",
              ],
            },
            {
              bullet: "Edge-case rescue prompts.",
              expansion: [
                "If target=0, immediate answer is 0 after pre-check.",
                "If target too large, window never valid, answer stays impossible.",
                "If a single item reaches target, best should become 1.",
              ],
            },
            {
              bullet: "Small recovery script for multi-shrink confusion.",
              expansion: [
                "Ask the student to mark each right-3 shrink state on board before moving right.",
                "If they finish early, ask: `what condition is still true that forces another left move?`",
                "If they still think loop should stop, ask for the exact window contents after each left move.",
                "Only then move on to best update discussion.",
              ],
            },
          ],
        },
        {
          heading: "Bug language for grading",
          points: [
            {
              bullet: "Map each common bug to one concrete line.",
              expansion: [
                "Missing `while` -> show second shrink row that never runs.",
                "Updating best after invalid row -> show missing minimal window.",
                "Returning len(blocks) -> show impossible-target counterexample.",
              ],
            },
            {
              bullet: "When grading live work, ask for proof of loop condition.",
              expansion: [
                "Ask students to state the exact condition before the first shrink.",
                "Ask the same condition after each shrink step.",
                "If condition is misremembered, stop and re-run the right=3 row.",
                "Only then mark the row correct and return to flow.",
              ],
            },
          ],
        },
      ],
    },
    {
      problemSlug: "longest-club-code-with-limited-symbols",
      coachScript:
        "Trace problem with duplicates: code='AAHBBCCB', k=2. Show why set-only fails.",
      studentGoal:
        "Find longest substring containing at most `k` distinct characters.",
      prompts: [
        "State fixed/variable: this is variable-size with a distinct-count limit.",
        "Trace first four slides in sample: A, AA, AAH, AAHB and show when it becomes invalid.",
        "Which transition removes a character and which transition restores validity?",
        "What happens when k=1? run one short check on this sample.",
        "At each row, say whether answer updates when validity is true.",
      ],
      checkpoints: [
        "Track freq map on right moves: right char count +1.",
        "While distinct_count > k, move left and decrement, then delete zero counts.",
        "Update best only after loop ends and window is valid.",
      ],
      commonBugs: [
        "Using set without multiplicity and losing duplicate counts.",
        "One-step left move only when multiple are needed.",
        "Best update while still invalid.",
      ],
      commonFailurePatterns: [
        "Forgetting to delete keys at zero.",
        "Checking distinct count before count updates.",
      ],
      edgeCasePrompts: ["k=1", "all chars same", "all chars unique"],
      sanityChecks: [
        "Window AAHB becomes invalid, then shrinks to HB, showing duplicate counts preserved.",
        "At least one duplicate-heavy trace row is validated.",
      ],
      stretchQuestion:
        "Can you return the actual longest substring text as well as length?",
      successCriteria:
        "Students can defend why counts are required by reading the AAHBBCCB trace.",
      presenterTalkingPointGroups: [
        {
          heading: "Count-vs-set message",
          points: [
            {
              bullet: "Answer to duplicate-sensitive students.",
              expansion: [
                "Use a frequency map, not set membership only.",
                "Only decrement `counts` and delete when it reaches zero.",
                "Shrink can run multiple times while distinct > k.",
                "Count changes are what tell us which char removal should affect validity.",
              ],
            },
            {
              bullet: "Walk transitions students should name on each row.",
              expansion: [
                "Right transition: increment right-char count.",
                "Validity transition: when distinct becomes k+1, left shrinks.",
                "Restore transition: remove zero-count char entries.",
              ],
            },
            {
              bullet: "How to introduce counts before code appears.",
              expansion: [
                "Ask them to say `counts[x]` before/after each pointer move.",
                "Ask: `which char is leaving` before decrementing.",
                "Ask: `does this change validity immediately or only after another left move?`",
                "Keep the map on paper so they can point and update in real time.",
              ],
            },
          ],
        },
        {
          heading: "Worked trace teaching notes",
          points: [
            {
              bullet: "Use these trace beats to avoid set-only confusion.",
              expansion: [
                "Show first invalid at AAHB (4 chars).",
                "Shrink with duplicate-aware counts, not just unique-char count.",
                "After shrink to HB, best becomes valid again.",
              ],
            },
            {
              bullet: "Instructor checks to confirm sample quality.",
              expansion: [
                "Ask one team for when `counts['A']` hits zero and what happens.",
                "Ask which char removal changed validity condition.",
                "Require one duplicate-heavy row in their own trace.",
              ],
            },
            {
              bullet: "Classroom trace rhythm for this problem.",
              expansion: [
                "Move right first and call out the char.",
                "If invalid, run shrinking rows until valid again.",
                "Then ask who can read back the full row tuple: left, right, counts, length.",
                "Then compare to expected best update row.",
              ],
            },
          ],
        },
        {
          heading: "Duplicate-focused fixes",
          points: [
            {
              bullet: "If a student uses set, redirect gently but clearly.",
              expansion: [
                "Set cannot tell how many duplicates remain.",
                "They may think A still invalid/valid at wrong time.",
                "Show the AAHBB row as the counterexample.",
              ],
            },
            {
              bullet: "Recovery script when they already wrote set-based code.",
              expansion: [
                "Ask them to keep set but add counts side-by-side on board.",
                "Then point to failure row and trace exactly where it diverges.",
                "Replace set checks with count-based checks only after they identify divergence.",
                "This avoids replacing code too early and keeps learning in front.",
              ],
            },
          ],
        },
      ],
    },
    {
      problemSlug: "smallest-announcement-clip",
      coachScript:
        "Use sample 'xbacbabca' + required [a,b,c] and highlight when `have` changes 0/1.",
      studentGoal:
        "Find shortest substring containing all required characters at least once.",
      prompts: [
        "Classify template and note when the window becomes valid for this sample.",
        "At right=3 we first hit `b,a,c`. What candidate window is valid now?",
        "Show the moment left moves right over required chars and where `have` drops.",
        "What happens to best window timing if we move left one more before recording?",
        "At each valid row, mark best window candidate and then the shrink decision.",
      ],
      checkpoints: [
        "Track `needed` and `counts` for required chars only.",
        "Increment `have` only when required count transitions 0->1.",
        "When valid, check and save best first, then move left.",
      ],
      commonBugs: [
        "Updating best after leaving minimum candidate.",
        "Increasing have every required occurrence.",
        "Returning empty even when xbac is valid.",
      ],
      commonFailurePatterns: [
        "Dropping `have` one step late when count hits zero.",
        "Forgetting required input with duplicates in list.",
      ],
      edgeCasePrompts: [
        "required has duplicates",
        "required char missing from string",
        "multi-shrink best-window timing",
      ],
      sanityChecks: [
        "Trace sample gives best='bac' from [1,2,3].",
        "Answer stays empty only when no valid window ever appears.",
      ],
      stretchQuestion:
        "How would logic change if required were multiset counts (e.g. two a's)?",
      successCriteria:
        "Students can explain count transitions and best timing in the sample trace.",
      presenterTalkingPointGroups: [
        {
          heading: "Best-window timing",
          points: [
            {
              bullet: "Anchor answer timing with a strict order.",
              expansion: [
                "First, snapshot answer while window is valid.",
                "Then move left and only shrink as long as validity remains.",
                "If left crosses a required char, decrement `have` and stop.",
                "Record best indices and length each valid time point.",
              ],
            },
            {
              bullet: "What students usually miss first.",
              expansion: [
                "Recording best after moving left one extra.",
                "Reducing `have` too early and losing required count.",
                "Forgetting required duplicates in `counts` and only storing boolean.",
              ],
            },
            {
              bullet: "Classroom script for each valid row.",
              expansion: [
                "Ask student: `Is window valid right now?` before touching best.",
                "If yes, record candidate and then perform one shrink step.",
                "If no, skip best update and only move left while valid triggers.",
                "This keeps all teams aligned on order.",
              ],
            },
          ],
        },
        {
          heading: "Window validation in samples",
          points: [
            {
              bullet: "Use this student check at right=3 and right=4.",
              expansion: [
                "At right=3, valid window starts with `bac` as first answer.",
                "At right=4, compare whether best should change or stay.",
                "If no valid improvement exists, keep previous best.",
              ],
            },
            {
              bullet: "What to say when best timing goes wrong.",
              expansion: [
                "If best gets shorter too early, ask them to prove window was valid first.",
                "If best misses a row, ask where `have` dropped below all-required count.",
                "Replay the right=3 and right=4 transition as two separate snapshots.",
                "Record one sentence: `best captured before leaving minimal valid candidate`.",
              ],
            },
          ],
        },
        {
          heading: "Student-facing edge recovery",
          points: [
            {
              bullet: "If students stall, ask direct edge checks.",
              expansion: [
                "Window `bac` is a valid minimal candidate in the sample.",
                "Ask what happens if `a` count needed is 2.",
                "If no valid window exists, return empty string.",
                "Repeat required list with missing character case after sample.",
              ],
            },
            {
              bullet: "How to close with minimal-window mindset.",
              expansion: [
                "Capture one best window string and one best length pair.",
                "Say: `best window updates first, then left moves` each cycle.",
                "This sequence prevents moving left too early.",
              ],
            },
            {
              bullet: "Challenge follow-up language for fast teams.",
              expansion: [
                "Ask: `How would answer logic change if required included duplicates?`",
                "Ask: `Which counter and state field need to become per-character count?`",
                "Let them propose changes before we reveal reference solution.",
                "This extends same transition framework without adding a new pattern.",
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const getProblemBySlug = (
  slug: string,
): SlidingWindowProblem | undefined => {
  return problems.find((problem) => problem.slug === slug);
};

export const workshopOrder = lessonFlow.problemWorkshops.map(
  (workshop) => workshop.problemSlug,
);
