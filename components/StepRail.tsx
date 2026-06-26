"use client";

const STEPS = [
  { n: 1, title: "Audit", desc: "Score your current headline" },
  { n: 2, title: "Position", desc: "Define who you attract" },
  { n: 3, title: "Generate", desc: "5 strategic variants" },
  { n: 4, title: "Share", desc: "Post your upgrade" },
];

/** current: 1-based index of the step the user is actively on */
export default function StepRail({ current }: { current: number }) {
  return (
    <aside className="step-rail">
      <span className="eyebrow" style={{ fontSize: "11px" }}>
        The workflow
      </span>
      <div style={{ marginTop: "18px" }}>
        {STEPS.map((s) => {
          const state = current > s.n ? "done" : current === s.n ? "active" : "";
          return (
            <div key={s.n} className={`step-node ${state}`}>
              <div className="step-num">{current > s.n ? "✓" : s.n}</div>
              <div style={{ paddingTop: "5px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: state ? "var(--ink)" : "var(--ink-muted)",
                    transition: "color 0.3s",
                  }}
                >
                  {s.title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--ink-light)", marginTop: "2px" }}>
                  {s.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
