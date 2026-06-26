"use client";
import { HeadlineVariant } from "@/lib/types";
import ScoreCard from "./ScoreCard";
import AlgorithmBadge from "./AlgorithmBadge";
import CopyButton from "./CopyButton";

const GOAL_ICONS: Record<string, string> = {
  "Inbound Leads": "⚡",
  "Speaking Opportunities": "🎤",
  "Media & Press": "📰",
  "Recruiting & Talent": "🌟",
  Partnerships: "🤝",
};

type GoalColor = { from: string; to: string; glow: string; tint: string };

const GOAL_COLORS: Record<string, GoalColor> = {
  "Inbound Leads": { from: "#1bb8bd", to: "#2fe9ef", glow: "rgba(47,233,239,0.4)", tint: "rgba(47,233,239,0.08)" },
  "Speaking Opportunities": { from: "#7c3aed", to: "#a78bfa", glow: "rgba(139,92,246,0.4)", tint: "rgba(139,92,246,0.1)" },
  "Media & Press": { from: "#dc2626", to: "#f87171", glow: "rgba(248,113,113,0.4)", tint: "rgba(248,113,113,0.08)" },
  "Recruiting & Talent": { from: "#d97706", to: "#fbbf24", glow: "rgba(251,191,36,0.4)", tint: "rgba(251,191,36,0.08)" },
  Partnerships: { from: "#dc0078", to: "#ff3da6", glow: "rgba(255,61,166,0.4)", tint: "rgba(255,61,166,0.08)" },
};

function getColor(goal: string): GoalColor {
  return (
    GOAL_COLORS[goal] || {
      from: "#1bb8bd",
      to: "#2fe9ef",
      glow: "rgba(47,233,239,0.4)",
      tint: "rgba(47,233,239,0.08)",
    }
  );
}

export default function HeadlineResults({ variants }: { variants: HeadlineVariant[] }) {
  return (
    <div>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          className="step-badge"
          style={{
            background: "var(--teal-light)",
            color: "var(--teal-bright)",
            border: "1px solid rgba(47,233,239,0.25)",
            marginBottom: "16px",
          }}
        >
          Step 3 • Your Positioning Suite
        </div>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 900,
            color: "var(--ink)",
            lineHeight: 1.12,
            marginBottom: "10px",
            letterSpacing: "-0.02em",
          }}
        >
          5 headlines. Each one a{" "}
          <span className="gradient-text">different weapon.</span>
        </h2>
        <p style={{ fontSize: "16px", color: "var(--ink-muted)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 }}>
          Each headline positions you for a specific goal. Pick the one that matches where you are right now.
        </p>
      </div>

      {/* Variants */}
      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        {variants.map((v, i) => {
          const c = getColor(v.goal);
          const icon = GOAL_ICONS[v.goal] || "✦";
          const avgScore = Math.round(
            (v.scores.clarity + v.scores.attraction + v.scores.differentiation) / 3
          );

          return (
            <div
              key={i}
              className={`glass-card glass-card-hover fade-up fade-up-delay-${Math.min(i + 1, 5)}`}
            >
              {/* Goal header bar */}
              <div
                style={{
                  background: `linear-gradient(120deg, ${c.from}, ${c.to})`,
                  padding: "16px 26px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: `0 8px 30px -10px ${c.glow}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>{icon}</span>
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.75)",
                        marginBottom: "2px",
                      }}
                    >
                      Optimized for
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: "white" }}>{v.goal}</p>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "white", lineHeight: 1 }}>
                    {avgScore}
                    <span style={{ fontSize: "12px", opacity: 0.7 }}>/10</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)", fontWeight: 600, letterSpacing: "0.06em" }}>
                    OVERALL
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "26px" }}>
                {/* Headline text */}
                <div
                  style={{
                    padding: "18px 22px",
                    borderRadius: "14px",
                    background: c.tint,
                    border: "1px solid var(--border)",
                    marginBottom: "18px",
                  }}
                >
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--ink)", lineHeight: 1.45, marginBottom: "8px" }}>
                    &ldquo;{v.headline}&rdquo;
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--ink-muted)", lineHeight: 1.55 }}>{v.explanation}</p>
                </div>

                {/* Score card */}
                <div style={{ marginBottom: "18px" }}>
                  <ScoreCard
                    clarity={v.scores.clarity}
                    attraction={v.scores.attraction}
                    differentiation={v.scores.differentiation}
                    size="sm"
                  />
                </div>

                {/* ICP Mirror */}
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: "13px",
                    background: "var(--inset-panel)",
                    border: "1px solid var(--border)",
                    marginBottom: "16px",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>🧠</span>
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--ink-light)",
                        marginBottom: "5px",
                      }}
                    >
                      What your ICP thinks when they read this
                    </p>
                    <p style={{ fontSize: "14px", color: "var(--ink)", fontStyle: "italic", lineHeight: 1.55 }}>
                      &ldquo;{v.icp_mirror}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Algorithm badge + Copy */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <AlgorithmBadge status={v.algorithm.status} note={v.algorithm.note} />
                  <CopyButton text={v.headline} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
