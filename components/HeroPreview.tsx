"use client";

/**
 * Floating, 3D-tilted product preview shown on the right side of the
 * asymmetric hero. Purely decorative: a teaser of what the tool outputs.
 */
export default function HeroPreview() {
  const bars = [
    { label: "Clarity", pct: 92, color: "var(--teal-bright)" },
    { label: "Attraction", pct: 88, color: "var(--magenta-bright)" },
    { label: "Differentiation", pct: 81, color: "#a78bfa" },
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* glow puddle behind */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-10% -6%",
          background:
            "radial-gradient(circle at 70% 30%, rgba(255,61,166,0.25), transparent 60%), radial-gradient(circle at 20% 80%, rgba(47,233,239,0.22), transparent 60%)",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />

      <div className="glass-card tilt-card" style={{ position: "relative", zIndex: 1, padding: "22px" }}>
        {/* header chip */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span
            className="step-badge"
            style={{ background: "var(--teal-light)", color: "var(--teal-bright)", border: "1px solid rgba(47,233,239,0.25)" }}
          >
            Optimized for Inbound Leads
          </span>
          <span style={{ fontSize: "11px", color: "var(--ink-light)", fontWeight: 600 }}>9.0/10</span>
        </div>

        {/* sample headline */}
        <div
          style={{
            padding: "16px 18px",
            borderRadius: "14px",
            background: "rgba(47,233,239,0.08)",
            border: "1px solid var(--border)",
            marginBottom: "18px",
          }}
        >
          <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", lineHeight: 1.45 }}>
            &ldquo;I help B2B SaaS founders turn LinkedIn into a predictable pipeline, without cold outreach.&rdquo;
          </p>
        </div>

        {/* score bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "18px" }}>
          {bars.map((b) => (
            <div key={b.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
                  {b.label}
                </span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink)" }}>{Math.round(b.pct / 10)}/10</span>
              </div>
              <div style={{ height: "6px", borderRadius: "99px", background: "var(--track)", overflow: "hidden" }}>
                <div
                  className="score-bar-fill"
                  style={
                    {
                      height: "100%",
                      width: "0%",
                      borderRadius: "99px",
                      background: b.color,
                      boxShadow: `0 0 10px ${b.color}`,
                      "--target-width": `${b.pct}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* ICP mirror */}
        <div
          style={{
            padding: "12px 14px",
            borderRadius: "12px",
            background: "var(--inset-panel)",
            border: "1px solid var(--border)",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "15px" }}>🧠</span>
          <div>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-light)", marginBottom: "3px" }}>
              Your ICP thinks
            </p>
            <p style={{ fontSize: "12.5px", color: "var(--ink)", fontStyle: "italic", lineHeight: 1.5 }}>
              &ldquo;This is exactly the person I&apos;ve been looking for.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
