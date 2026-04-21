import { Visualizer } from "../components/Visualizer";
import { ProblemCard } from "../components/ProblemCard";
import { problems } from "../data/problems";

const conceptIntro = [
  "Use local state only. Every example is static and driven by the same data model.",
  "Each solution uses a sliding window with predictable pointer movement and invariant updates.",
  "Trace panels mirror classroom-style reasoning so the implementation behavior stays transparent.",
];

const closingChecklist = [
  "I can identify when to use fixed-size vs. variable-size windows.",
  "I can reason about pointer updates when the window changes.",
  "I can trace time/space complexity before coding.",
  "I can convert an informal algorithm into a tested Python implementation.",
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero panel">
        <p className="eyebrow">Sliding Window Playbook</p>
        <h1>Sliding Window Documentation Site</h1>
        <p className="lead">
          Four practice problems, one reusable interface. Learn by reading, tracing,
          and comparing implementations side-by-side.
        </p>
      </section>

      <section className="panel intro">
        <h2>Why this pattern works</h2>
        <ul>
          {conceptIntro.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Practice problems</h2>
        <p className="section-subtitle">
          Click any card to jump to full details and the visual trace.
        </p>
        <div className="problem-grid">
          {problems.map((problem) => (
            <ProblemCard key={problem.slug} problem={problem} />
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Problem details and implementation notes</h2>
        <div className="details-stack">
          {problems.map((problem) => (
            <article
              id={`problem-${problem.slug}`}
              key={`detail-${problem.slug}`}
              className="detail-card"
            >
              <header className="detail-card__header">
                <div>
                  <p className="problem-card__index">Problem {problem.id}</p>
                  <h3>{problem.title}</h3>
                  <p className="problem-card__focus">{problem.conceptFocus}</p>
                </div>
                <span className={`difficulty-chip difficulty-${problem.difficulty.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {problem.difficulty}
                </span>
              </header>

              <p className="detail-card__description">{problem.description}</p>

              <div className="detail-grid">
                <section className="detail-pane">
                  <h4>Input spec</h4>
                  <p>{problem.inputSpec}</p>
                </section>
                <section className="detail-pane">
                  <h4>Output spec</h4>
                  <p>{problem.outputSpec}</p>
                </section>
                <section className="detail-pane">
                  <h4>Complexity</h4>
                  <p>
                    Time: {problem.timeComplexity} · Space: {problem.spaceComplexity}
                  </p>
                </section>
              </div>

              <div className="samples-row">
                <section>
                  <h4>Sample input</h4>
                  <pre>{problem.sampleInput}</pre>
                </section>
                <section>
                  <h4>Sample output</h4>
                  <pre>{problem.sampleOutput}</pre>
                </section>
              </div>

              <section>
                <h4>Reasoning</h4>
                <ul>
                  {problem.explanation.map((item) => (
                    <li key={`${problem.slug}-${item}`}>{item}</li>
                  ))}
                </ul>
              </section>

              {problem.commonMistakes?.length ? (
                <section>
                  <h4>Common mistakes</h4>
                  <ul>
                    {problem.commonMistakes.map((mistake) => (
                      <li key={`${problem.slug}-${mistake}`}>{mistake}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <Visualizer solution={problem.pythonSolution} trace={problem.traceAscii} />
            </article>
          ))}
        </div>
      </section>

      <section className="panel checklist">
        <h2>Checklist</h2>
        <ul>
          {closingChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
