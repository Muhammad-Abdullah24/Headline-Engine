"use client";

const CALLOUTS = [
  { big: "1st", label: "thing a decision-maker reads about you" },
  { big: "5×", label: "places it appears: search, feed, comments, invites, DMs" },
  { big: "220", label: "characters to earn the click, or lose it" },
  { big: "3s", label: "to decide if you're worth a follow" },
];

export default function WhyBand() {
  return (
    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 20px" }}>
      {/* Asymmetric editorial split */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
          gap: "48px",
          alignItems: "end",
        }}
        className="why-grid"
      >
        <div>
          <span className="eyebrow">The uncomfortable truth</span>
          <h2
            style={{
              fontSize: "clamp(28px, 4.4vw, 46px)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: "16px 0 0",
              color: "var(--ink)",
            }}
          >
            Your headline is the most-read,{" "}
            <span className="gradient-text">least-considered</span> line you own.
          </h2>
        </div>
        <div>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" }}>
            Most people treat it like a job title, a label that says what they{" "}
            <em style={{ color: "var(--ink)", fontStyle: "normal", fontWeight: 600 }}>are</em>.
            But your ideal client never searches for your title. They search for{" "}
            <span style={{ color: "var(--teal-bright)", fontWeight: 600 }}>their problem.</span>{" "}
            If your headline doesn&apos;t mirror their language, their goals, and their stakes, you&apos;re
            invisible to the exact people you want to reach.
          </p>
        </div>
      </div>

      {/* Truth callouts strip */}
      <div
        className="glass-card"
        style={{
          marginTop: "40px",
          padding: "8px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        }}
      >
        {CALLOUTS.map((c, i) => (
          <div
            key={c.big}
            style={{
              padding: "22px 24px",
              borderLeft: i === 0 ? "none" : "1px solid var(--border)",
            }}
            className="callout-cell"
          >
            <div className="gradient-text" style={{ fontSize: "38px", fontWeight: 900, lineHeight: 1 }}>
              {c.big}
            </div>
            <div style={{ fontSize: "13px", color: "var(--ink-muted)", marginTop: "8px", lineHeight: 1.45 }}>
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
