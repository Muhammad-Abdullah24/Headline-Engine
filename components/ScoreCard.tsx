"use client";

interface ScoreCardProps {
  clarity: number;
  attraction: number;
  differentiation: number;
  size?: "sm" | "md";
}

function ScoreBar({
  label,
  score,
  color,
  delay,
}: {
  label: string;
  score: number;
  color: string;
  delay: number;
}) {
  const pct = (score / 10) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span
          style={{ color: "var(--ink-muted)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          {label}
        </span>
        <span style={{ color: "var(--ink)", fontSize: "13px", fontWeight: 700 }}>
          {score}
          <span style={{ color: "var(--ink-light)", fontWeight: 400 }}>/10</span>
        </span>
      </div>
      <div
        style={{
          height: "6px",
          background: "rgba(26,26,46,0.08)",
          borderRadius: "99px",
          overflow: "hidden",
        }}
      >
        <div
          className="score-bar-fill"
          style={{
            height: "100%",
            width: "0%",
            background: color,
            borderRadius: "99px",
            "--target-width": `${pct}%`,
            animationDelay: `${delay}ms`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

export default function ScoreCard({
  clarity,
  attraction,
  differentiation,
  size = "md",
}: ScoreCardProps) {
  const avg = Math.round((clarity + attraction + differentiation) / 3);

  const ringSize = size === "sm" ? 52 : 64;
  const strokeW = size === "sm" ? 4 : 5;
  const r = (ringSize - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const filled = circ - (avg / 10) * circ;

  const ringColor =
    avg >= 7
      ? "var(--teal)"
      : avg >= 5
      ? "#f59e0b"
      : "var(--magenta)";

  return (
    <div
      style={{
        display: "flex",
        gap: size === "sm" ? "12px" : "16px",
        alignItems: "center",
      }}
    >
      {/* Circular avg score */}
      <div style={{ flexShrink: 0 }}>
        <svg width={ringSize} height={ringSize}>
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={r}
            fill="none"
            stroke="rgba(26,26,46,0.08)"
            strokeWidth={strokeW}
          />
          <circle
            className="score-ring ring-fill"
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={r}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={filled}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            style={{
              fontSize: size === "sm" ? "13px" : "15px",
              fontWeight: 700,
              fill: "var(--ink)",
            }}
          >
            {avg}
          </text>
        </svg>
      </div>

      {/* Bars */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <ScoreBar label="Clarity" score={clarity} color="var(--teal)" delay={0} />
        <ScoreBar
          label="Attraction"
          score={attraction}
          color="var(--magenta)"
          delay={100}
        />
        <ScoreBar
          label="Differentiation"
          score={differentiation}
          color="#7c3aed"
          delay={200}
        />
      </div>
    </div>
  );
}
