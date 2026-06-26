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

const GOAL_COLORS: Record<string, { bg: string; accent: string; light: string }> = {
  "Inbound Leads": { bg: "var(--teal)", accent: "var(--teal-dark)", light: "var(--teal-light)" },
  "Speaking Opportunities": { bg: "#7c3aed", accent: "#6d28d9", light: "#f3e8ff" },
  "Media & Press": { bg: "#dc2626", accent: "#b91c1c", light: "#fee2e2" },
  "Recruiting & Talent": { bg: "#d97706", accent: "#b45309", light: "#fef3c7" },
  Partnerships: { bg: "var(--magenta)", accent: "var(--magenta-dark)", light: "var(--magenta-light)" },
};

function getColor(goal: string) {
  return (
    GOAL_COLORS[goal] || {
      bg: "var(--teal)",
      accent: "var(--teal-dark)",
      light: "var(--teal-light)",
    }
  );
}

export default function HeadlineResults({
  variants,
}: {
  variants: HeadlineVariant[];
}) {
  return (
    <div>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--teal-light)",
            color: "var(--teal-dark)",
            padding: "4px 16px",
            borderRadius: "99px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}
        >
          Step 3 • Your Positioning Suite
        </div>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 900,
            color: "var(--ink)",
            lineHeight: 1.15,
            marginBottom: "8px",
          }}
        >
          5 headlines. Each one a{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--teal), var(--magenta))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            different weapon.
          </span>
        </h2>
        <p style={{ fontSize: "16px", color: "var(--ink-muted)", maxWidth: "480px", margin: "0 auto" }}>
          Each headline positions you for a specific goal. Pick the one that matches where you are right now.
        </p>
      </div>

      {/* Variants */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {variants.map((v, i) => {
          const colors = getColor(v.goal);
          const icon = GOAL_ICONS[v.goal] || "✦";
          const avgScore = Math.round(
            (v.scores.clarity + v.scores.attraction + v.scores.differentiation) / 3
          );

          return (
            <div
              key={i}
              className={`fade-up fade-up-delay-${i + 1}`}
              style={{
                background: "var(--white)",
                borderRadius: "20px",
                border: "1.5px solid var(--border)",
                overflow: "hidden",
                boxShadow: "0 2px 24px rgba(26,26,46,0.06)",
              }}
            >
              {/* Goal header bar */}
              <div
                style={{
                  background: colors.bg,
                  padding: "14px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "18px" }}>{icon}</span>
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "2px",
                      }}
                    >
                      Optimized for
                    </p>
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        color: "white",
                      }}
                    >
                      {v.goal}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 900,
                      color: "white",
                      lineHeight: 1,
                    }}
                  >
                    {avgScore}
                    <span style={{ fontSize: "12px", opacity: 0.6 }}>/10</span>
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 600,
                    }}
                  >
                    Overall
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                {/* Headline text */}
                <div
                  style={{
                    padding: "16px 20px",
                    borderRadius: "12px",
                    background: colors.light,
                    border: `1px solid ${colors.bg}22`,
                    marginBottom: "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--ink)",
                      lineHeight: 1.4,
                      marginBottom: "8px",
                    }}
                  >
                    "{v.headline}"
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                    {v.explanation}
                  </p>
                </div>

                {/* Score card */}
                <div style={{ marginBottom: "16px" }}>
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
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "#1a1a2e",
                    marginBottom: "14px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>
                    🧠
                  </span>
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                        marginBottom: "4px",
                      }}
                    >
                      What your ICP thinks when they read this
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.9)",
                        fontStyle: "italic",
                        lineHeight: 1.5,
                      }}
                    >
                      "{v.icp_mirror}"
                    </p>
                  </div>
                </div>

                {/* Algorithm badge + Copy */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <AlgorithmBadge
                    status={v.algorithm.status}
                    note={v.algorithm.note}
                  />
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
