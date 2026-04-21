"use client";

import { useEffect, useMemo, useState } from "react";
import { CodeBlock } from "./CodeBlock";
import {
  getProblemBySlug,
  lessonFlow,
  type LessonStep,
  type ProblemWorkshop,
} from "../data/lessonFlow";

type AudienceMode = "presenter" | "student";
type ProblemPart = "understand" | "plan" | "trace" | "build" | "check";

type LessonSlide =
  | {
      kind: "lesson";
      id: string;
      title: string;
      step: LessonStep;
      problem?: never;
      tag: string;
    }
  | {
      kind: "problem";
      id: string;
      title: string;
      step?: never;
      problem: ProblemWorkshop;
      tag: string;
    };

const problemParts: ProblemPart[] = [
  "understand",
  "plan",
  "trace",
  "build",
  "check",
];

const partLabels: Record<ProblemPart, string> = {
  understand: "Understand",
  plan: "Plan",
  trace: "Trace",
  build: "Build",
  check: "Check",
};

const partDescriptions: Record<ProblemPart, string> = {
  understand: "Read statement, identify inputs, and choose fixed/variable.",
  plan: "Map pointers and running state before coding.",
  trace: "Walk through live traces and predict window updates.",
  build: "Review solution lines and what each line changes.",
  check: "Audit common mistakes and set challenge follow-up.",
};

type PresenterPoint = {
  bullet: string;
  expansion?: string[];
};

type PresenterPointGroup = {
  heading: string;
  points: PresenterPoint[];
};

export function LessonFlowDeck() {
  const [audience, setAudience] = useState<AudienceMode>("presenter");
  const [showPresenterHelpers, setShowPresenterHelpers] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [problemPartIndex, setProblemPartIndex] = useState(0);
  const [traceLineIndex, setTraceLineIndex] = useState(0);
  const [revealIndex, setRevealIndex] = useState(-1);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [checkStates, setCheckStates] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const slides = useMemo(() => {
    const lessonSlides: LessonSlide[] = lessonFlow.lessonSteps.map((step, index) => ({
      kind: "lesson",
      id: `lesson-${step.id}`,
      title: step.title,
      tag: step.titleTag ?? `Section ${index + 1}`,
      step,
    }));

    const problemSlides: LessonSlide[] = lessonFlow.problemWorkshops.map(
      (workshop, index) => ({
        kind: "problem",
        id: `problem-${workshop.problemSlug}`,
        title: `Problem ${index + 1}: ${workshop.studentGoal}`,
        tag: `Problem ${index + 1}`,
        problem: workshop,
      }),
    );

    return [...lessonSlides, ...problemSlides];
  }, []);

  useEffect(() => {
    const rawSlide = new URL(window.location.href).searchParams.get("slide");
    if (!rawSlide) return;
    const parsed = Number.parseInt(rawSlide, 10);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > slides.length) {
      return;
    }
    setActiveIndex(parsed - 1);
    setProblemPartIndex(0);
    setTraceLineIndex(0);
    setRevealIndex(-1);
  }, [slides.length]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(activeIndex + 1));
    window.history.replaceState({}, "", url.toString());
  }, [activeIndex]);

  const activeSlide = slides[activeIndex];
  const progress = ((activeIndex + 1) / slides.length) * 100;

  useEffect(() => {
    setRevealIndex(-1);
  }, [activeSlide.id]);

  const setAudienceMode = (mode: AudienceMode) => {
    setAudience(mode);
  };

  const copyCurrentSlideUrl = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(activeIndex + 1));
    try {
      await navigator.clipboard.writeText(url.toString());
      return;
    } catch {
      return;
    }
  };

  const goPrevious = () => {
    setActiveIndex((value) => Math.max(0, value - 1));
    setProblemPartIndex(0);
    setTraceLineIndex(0);
    setRevealIndex(-1);
  };

  const goNext = () => {
    setActiveIndex((value) => Math.min(slides.length - 1, value + 1));
    setProblemPartIndex(0);
    setTraceLineIndex(0);
    setRevealIndex(-1);
  };

  const activeProblemSlug = activeSlide.kind === "problem" ? activeSlide.problem.problemSlug : "";
  const activeProblem = activeProblemSlug
    ? getProblemBySlug(activeProblemSlug)
    : undefined;
  const activeWorkshop = activeSlide.kind === "problem" ? activeSlide.problem : undefined;
  const problemPart = problemParts[problemPartIndex];

  const currentProblemState = activeProblemSlug
    ? checkStates[activeProblemSlug] ?? {}
    : {};

  const toggleProblemCheck = (id: string) => {
    if (!activeProblemSlug) return;
    setCheckStates((prev) => {
      const current = prev[activeProblemSlug] ?? {};
      return {
        ...prev,
        [activeProblemSlug]: {
          ...current,
          [id]: !current[id],
        },
      };
    });
  };

  const setTraceLine = (index: number) => {
    if (!activeProblem?.traceAscii) return;
    setTraceLineIndex((_) => {
      if (index < 0) return 0;
      if (index >= activeProblem.traceAscii.length) {
        return activeProblem.traceAscii.length - 1;
      }
      return index;
    });
  };

  const activeKey = `${activeSlide.id}-${audience}`;
  const noteText = notes[activeKey] ?? "";

  const legacyLessonPointGroups = (step: LessonStep): PresenterPointGroup[] => [
    {
      heading: "Coach script",
      points: step.teacherNotes.map((note) => ({ bullet: note, expansion: [] })),
    },
    {
      heading: "Student movement checks",
      points: [
        ...step.studentMoves.map((move) => ({ bullet: move, expansion: [] })),
        ...step.checks.map((check) => ({ bullet: check, expansion: [] })),
      ],
    },
    {
      heading: "Correctness",
      points: [
        ...(step.invariant
          ? [{ bullet: `Invariant: ${step.invariant}`, expansion: [] }]
          : []),
        ...(step.successCriteria
          ? [{ bullet: `Success criteria: ${step.successCriteria}`, expansion: [] }]
          : []),
      ],
    },
    {
      heading: "Common bugs to watch",
      points: (
        step.failurePatterns ??
        step.commonFailurePatterns ??
        []
      ).map((failure) => ({ bullet: failure, expansion: [] })),
    },
    {
      heading: "Checks and edge cases",
      points: [
        ...(step.sanityChecks ?? []).map((check) => ({ bullet: check, expansion: [] })),
        ...(step.edgeCasePrompts ?? []).map((prompt) => ({
          bullet: `Edge case: ${prompt}`,
          expansion: [],
        })),
      ],
    },
  ].filter((group) => group.points.length > 0);

  const legacyProblemPointGroups = (workshop: ProblemWorkshop): PresenterPointGroup[] => [
    {
      heading: "Coach script",
      points: [{ bullet: workshop.coachScript, expansion: [] }],
    },
    {
      heading: "Instructor focus",
      points: [
        ...(workshop.commonFailurePatterns
          ? workshop.commonFailurePatterns.map((item) => ({ bullet: item, expansion: [] }))
          : []),
        ...(workshop.sanityChecks ?? []).map((check) => ({
          bullet: check,
          expansion: [],
        })),
      ],
    },
    {
      heading: "Extra checks",
      points: [
        ...(workshop.edgeCasePrompts ?? []).map((prompt) => ({
          bullet: `Edge case prompt: ${prompt}`,
          expansion: [],
        })),
        ...(workshop.successCriteria
          ? [{ bullet: `Success criteria: ${workshop.successCriteria}`, expansion: [] }]
          : []),
      ],
    },
  ].filter((group) => group.points.length > 0);

  const presenterTalkingPointGroups: PresenterPointGroup[] =
    activeSlide.kind === "lesson"
      ? (activeSlide.step.presenterTalkingPointGroups ??
        legacyLessonPointGroups(activeSlide.step))
      : activeSlide.kind === "problem" && activeWorkshop
        ? (activeWorkshop.presenterTalkingPointGroups ??
          legacyProblemPointGroups(activeWorkshop))
        : [];

  const lessonContext =
    activeSlide.kind === "lesson"
      ? activeSlide.step.studentContext.length
        ? activeSlide.step.studentContext
        : activeSlide.step.teacherNotes
      : activeSlide.kind === "problem" && activeWorkshop
        ? activeWorkshop.prompts
        : [];

  const visibleRevealItemCount = Math.max(
    0,
    Math.min(revealIndex + 1, lessonContext.length),
  );
  const revealItems = lessonContext.slice(0, visibleRevealItemCount);
  const canRevealMore = lessonContext.length > visibleRevealItemCount;

  const revealNext = () => {
    if (!lessonContext.length) return;
    setRevealIndex((value) => Math.min(value + 1, lessonContext.length - 1));
  };

  const revealReset = () => {
    setRevealIndex(-1);
  };

  const revealTitle = activeSlide.kind === "lesson" ? "Teaching points" : "Prompts";

  return (
    <main className="page">
      <section className="hero panel">
        <p className="eyebrow">Sliding Window Live Lesson Flow</p>
        <h1>{lessonFlow.classTitle}</h1>
        <p className="lead">
          Share the slides with students, then walk sections in sync with your
          live narration. Students can follow the same sequence from their own
          devices.
        </p>
      </section>

      <section className="panel lesson-toolbar">
        <div className="deck-controls">
          <button
            type="button"
            className={`chip ${audience === "presenter" ? "chip--active" : ""}`}
            onClick={() => setAudienceMode("presenter")}
          >
            Presenter view
          </button>
          <button
            type="button"
            className={`chip ${audience === "student" ? "chip--active" : ""}`}
            onClick={() => setAudienceMode("student")}
          >
            Student view
          </button>
          {audience === "presenter" ? (
            <button
              type="button"
              className={`chip ${showPresenterHelpers ? "chip--active" : ""}`}
              onClick={() => setShowPresenterHelpers((value) => !value)}
            >
              Presenter talking points
            </button>
          ) : null}
          <button type="button" className="chip" onClick={copyCurrentSlideUrl}>
            Copy slide link
          </button>
        </div>
        <div className="lesson-progress">
          <span>Slide {activeIndex + 1} / {slides.length}</span>
          <div className="lesson-progress__track">
            <div className="lesson-progress__bar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="timeline-grid">
          <ol className="timeline-list">
            {slides.map((slide, index) => (
              <li key={slide.id}>
                  <button
                  type="button"
                  className={`timeline-item ${index === activeIndex ? "timeline-item--active" : ""}`}
                  onClick={() => {
                    setActiveIndex(index);
                    setProblemPartIndex(0);
                    setTraceLineIndex(0);
                    setRevealIndex(-1);
                  }}
                >
                  <span>{slide.tag}</span>
                  <strong>{slide.title}</strong>
                </button>
              </li>
            ))}
          </ol>

          <article className="timeline-content">
            <header className="detail-card__header">
              <div>
                <p className="problem-card__index">
                  {activeSlide.tag}
                </p>
                <h2>{activeSlide.title}</h2>
              </div>
              <span className={`difficulty-chip difficulty-easy`}>
                {activeSlide.kind === "lesson" ? "Teaching step" : "Problem section"}
              </span>
            </header>

            {activeSlide.kind === "lesson" ? (
              <>
                <p className="detail-card__description">
                  {activeSlide.step.objective}
                </p>
                <section className="content-section workshop-checks">
                  <div className="reveal-controls">
                    <p className="section-subtitle">
                      {revealTitle}: {visibleRevealItemCount} of {lessonContext.length}
                    </p>
                    <div className="reveal-controls__actions">
                      <button
                        type="button"
                        className="problem-card__action"
                        onClick={revealNext}
                        disabled={!canRevealMore}
                      >
                        Reveal next
                      </button>
                      <button
                        type="button"
                        className="problem-card__action"
                        onClick={revealReset}
                        disabled={visibleRevealItemCount <= 0}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <div className="workshop-reveal-list">
                    {revealItems.map((point, index) => (
                      <p key={`${activeSlide.id}-context-${index}`}>{point}</p>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            {activeSlide.kind === "problem" && activeWorkshop && activeProblem ? (
              <>
                <p className="detail-card__description">
                  {activeProblem.description}
                </p>
                <section className="content-section workshop-checks">
                  <h4>Student goal</h4>
                  <p>{activeWorkshop.studentGoal}</p>
                </section>
                <section className="content-section samples-row">
                  <div>
                    <h4>Input</h4>
                    <pre>{activeProblem.sampleInput}</pre>
                  </div>
                  <div>
                    <h4>Expected output</h4>
                    <pre>{activeProblem.sampleOutput}</pre>
                  </div>
                </section>
                <section className="problem-part-nav">
                  {problemParts.map((part, index) => (
                    <button
                      key={`${activeProblemSlug}-${part}`}
                      type="button"
                      className={`chip ${
                        problemPartIndex === index ? "chip--active" : ""
                      }`}
                      onClick={() => {
                        setProblemPartIndex(index);
                        setTraceLineIndex(0);
                      }}
                    >
                      {partLabels[part]}
                    </button>
                  ))}
                </section>
                <p className="section-subtitle">{partDescriptions[problemPart]}</p>
                <section className="content-section workshop-checks">
                  <div className="reveal-controls">
                    <p className="section-subtitle">
                      {revealTitle}: {visibleRevealItemCount} of {lessonContext.length}
                    </p>
                    <div className="reveal-controls__actions">
                      <button
                        type="button"
                        className="problem-card__action"
                        onClick={revealNext}
                        disabled={!canRevealMore}
                      >
                        Reveal next
                      </button>
                      <button
                        type="button"
                        className="problem-card__action"
                        onClick={revealReset}
                        disabled={visibleRevealItemCount <= 0}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <h4>Planning prompts</h4>
                  <div className="workshop-reveal-list">
                    {revealItems.map((prompt, index) => (
                      <label
                        key={`${activeWorkshop.problemSlug}-${index}`}
                        className="check-item"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(currentProblemState[prompt])}
                          onChange={() => toggleProblemCheck(prompt)}
                        />
                        {prompt}
                      </label>
                    ))}
                  </div>
                </section>
                <section className="content-section workshop-trace">
                  <h4>Trace walkthrough</h4>
                  <div className="workshop-trace__controls">
                    <button
                      type="button"
                      className="problem-card__action"
                      onClick={() => setTraceLine(traceLineIndex - 1)}
                      disabled={traceLineIndex === 0}
                    >
                      Previous line
                    </button>
                    <button
                      type="button"
                      className="problem-card__action"
                      onClick={() => setTraceLine(traceLineIndex + 1)}
                      disabled={
                        !activeProblem.traceAscii ||
                        traceLineIndex >= activeProblem.traceAscii.length - 1
                      }
                    >
                      Next line
                    </button>
                  </div>
                  <div className="visualizer__stream">
                    {activeProblem.traceAscii
                      .slice(0, traceLineIndex + 1)
                      .map((line, index) => (
                        <div key={`${activeProblem.slug}-trace-${index}`} className="visualizer__line">
                          {line}
                        </div>
                      ))}
                  </div>
                  <p className="section-subtitle">
                    Line {traceLineIndex + 1} of {activeProblem.traceAscii.length}
                  </p>
                </section>
                <section className="content-section workshop-code">
                  <h4>Reference implementation</h4>
                  <CodeBlock code={activeProblem.pythonSolution} />
                </section>
                <section className="content-section workshop-checks">
                  <h4>Checkpoint checklist</h4>
                  {activeWorkshop.checkpoints.map((checkpoint) => (
                    <label key={`${activeProblem.slug}-${checkpoint}`} className="check-item">
                      <input
                        type="checkbox"
                        checked={Boolean(currentProblemState[checkpoint])}
                        onChange={() => toggleProblemCheck(checkpoint)}
                      />
                      {checkpoint}
                    </label>
                  ))}
                  <h4>Common mistakes to watch</h4>
                  <ul>
                    {activeWorkshop.commonBugs.map((bug) => (
                      <li key={`${activeWorkshop.problemSlug}-${bug}`}>{bug}</li>
                    ))}
                  </ul>
                  <p className="muted">
                    Stretch: {activeWorkshop.stretchQuestion}
                  </p>
                </section>
                {audience === "presenter" ? (
                  <section className="content-section notes-workspace">
                    <h4>Live notes</h4>
                    <textarea
                      className="notes-workspace__box"
                      value={noteText}
                      onChange={(event) =>
                        setNotes((all) => ({
                          ...all,
                          [activeKey]: event.target.value,
                        }))
                      }
                      placeholder="Capture student responses and observations here."
                      aria-label="Slide notes"
                    />
                  </section>
                ) : null}
              </>
            ) : null}

            {audience === "presenter" && showPresenterHelpers && presenterTalkingPointGroups.length ? (
              <section className="content-section detail-pane detail-pane--presenter">
                <h4>Presenter talking points</h4>
                <div className="talking-point-groups">
                  {presenterTalkingPointGroups.map((group, groupIndex) => (
                    <details key={`${activeSlide.id}-group-${groupIndex}`} className="talking-point-group">
                      <summary className="talking-point-group__summary">
                        {group.heading}
                      </summary>
                      <ul className="talking-point-group__items">
                        {group.points.map((point, pointIndex) => (
                          <li
                            key={`${activeSlide.id}-point-${groupIndex}-${pointIndex}`}
                            className="talking-point"
                          >
                            {point.expansion?.length ? (
                              <details>
                                <summary>{point.bullet}</summary>
                                <ul>
                                  {point.expansion.map((expansion, expansionIndex) => (
                                    <li
                                      key={`${activeSlide.id}-expansion-${groupIndex}-${pointIndex}-${expansionIndex}`}
                                    >
                                      {expansion}
                                    </li>
                                  ))}
                                </ul>
                              </details>
                            ) : (
                              point.bullet
                            )}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {activeSlide.kind === "problem" ? (
              <div className="problem-stage-nav">
                <button
                  type="button"
                  className="problem-card__action"
                  onClick={() => setProblemPartIndex(Math.max(0, problemPartIndex - 1))}
                  disabled={problemPartIndex === 0}
                >
                  Previous part
                </button>
                <button
                  type="button"
                  className="problem-card__action"
                  onClick={() =>
                    setProblemPartIndex(
                      Math.min(problemParts.length - 1, problemPartIndex + 1)
                    )
                  }
                  disabled={problemPartIndex === problemParts.length - 1}
                >
                  Next part
                </button>
              </div>
            ) : null}

            <div className="timeline-nav">
              <button
                type="button"
                className="problem-card__action"
                onClick={goPrevious}
                disabled={activeIndex === 0}
              >
                Previous slide
              </button>
              <button
                type="button"
                className="problem-card__action"
                onClick={goNext}
                disabled={activeIndex === slides.length - 1}
              >
                Next slide
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
