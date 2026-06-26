"use client";

export default function BentoFeatures() {
  return (
    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px 30px" }}>
      <div style={{ textAlign: "center", marginBottom: "44px" }}>
        <span className="eyebrow">How it actually helps you</span>
        <h2
          style={{
            fontSize: "clamp(28px, 4.4vw, 44px)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            margin: "14px 0 0",
            color: "var(--ink)",
          }}
        >
          Not a generator. A{" "}
          <span className="gradient-text">positioning system.</span>
        </h2>
      </div>

      <div className="bento">
        {/* BIG feature: spans 4 cols, 2 rows */}
        <div className="bento-cell col-4 row-2" style={{ "--cell-glow": "var(--teal-bright)" } as React.CSSProperties}>
          <span style={{ fontSize: "26px" }}>🩻</span>
          <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--ink)", margin: "16px 0 8px", letterSpacing: "-0.01em" }}>
            A brutally honest audit, first
          </h3>
          <p style={{ fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.65, maxWidth: "460px" }}>
            Before we write a single word, we score your current headline across{" "}
            <strong style={{ color: "var(--ink)" }}>Clarity</strong>,{" "}
            <strong style={{ color: "var(--ink)" }}>Attraction</strong>, and{" "}
            <strong style={{ color: "var(--ink)" }}>Differentiation</strong>, and tell you
            exactly where it leaks attention. No sugar-coating. You feel the problem before
            you see the fix.
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "22px", flexWrap: "wrap" }}>
            {["Clarity", "Attraction", "Differentiation"].map((t, i) => (
              <span
                key={t}
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: "99px",
                  background: "var(--glass-strong)",
                  border: "1px solid var(--border)",
                  color: ["var(--teal-bright)", "var(--magenta-bright)", "#a78bfa"][i],
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ICP-first */}
        <div className="bento-cell col-2" style={{ "--cell-glow": "var(--magenta-bright)" } as React.CSSProperties}>
          <span style={{ fontSize: "24px" }}>🎯</span>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--ink)", margin: "14px 0 6px" }}>
            ICP-first reframing
          </h3>
          <p style={{ fontSize: "13.5px", color: "var(--ink-muted)", lineHeight: 1.55 }}>
            Stop describing yourself. Start magnetizing the exact people you want to attract.
          </p>
        </div>

        {/* Algorithm */}
        <div className="bento-cell col-2" style={{ "--cell-glow": "#4ade80" } as React.CSSProperties}>
          <span style={{ fontSize: "24px" }}>🔍</span>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--ink)", margin: "14px 0 6px" }}>
            Algorithm-aware
          </h3>
          <p style={{ fontSize: "13.5px", color: "var(--ink-muted)", lineHeight: 1.55 }}>
            Every variant is flagged for LinkedIn search visibility: green, yellow, or red.
          </p>
        </div>

        {/* 5 variants: wide */}
        <div className="bento-cell col-3" style={{ "--cell-glow": "#a78bfa" } as React.CSSProperties}>
          <span style={{ fontSize: "24px" }}>⚔️</span>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--ink)", margin: "14px 0 6px" }}>
            5 strategic variants, one per goal
          </h3>
          <p style={{ fontSize: "13.5px", color: "var(--ink-muted)", lineHeight: 1.55 }}>
            Leads, speaking, press, recruiting, partnerships. Each headline is a different
            weapon, engineered for a different outcome, not the same line reworded.
          </p>
        </div>

        {/* ICP Mirror */}
        <div className="bento-cell col-3" style={{ "--cell-glow": "var(--teal-bright)" } as React.CSSProperties}>
          <span style={{ fontSize: "24px" }}>🪞</span>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--ink)", margin: "14px 0 6px" }}>
            The ICP Mirror test
          </h3>
          <p style={{ fontSize: "13.5px", color: "var(--ink-muted)", lineHeight: 1.55 }}>
            Read every headline through your audience&apos;s eyes: the exact thought it triggers
            in the person you&apos;re trying to reach.
          </p>
        </div>

        {/* Share: full width */}
        <div
          className="bento-cell col-6"
          style={{
            "--cell-glow": "var(--magenta-bright)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          } as React.CSSProperties}
        >
          <div style={{ maxWidth: "560px" }}>
            <span style={{ fontSize: "24px" }}>📈</span>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--ink)", margin: "12px 0 6px" }}>
              A scorecard worth screenshotting
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--ink-muted)", lineHeight: 1.55 }}>
              See your before-and-after jump, then copy a ready-made LinkedIn post. Your
              upgrade becomes content, and the result markets you.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "30px", fontWeight: 900, color: "var(--magenta-bright)" }}>4</span>
            <span style={{ fontSize: "24px", color: "var(--ink-light)" }}>→</span>
            <span className="gradient-text" style={{ fontSize: "30px", fontWeight: 900 }}>9</span>
          </div>
        </div>
      </div>
    </section>
  );
}
