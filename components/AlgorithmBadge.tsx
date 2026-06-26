"use client";

interface AlgorithmBadgeProps {
  status: "optimized" | "partial" | "not_optimized";
  note: string;
}

export default function AlgorithmBadge({ status, note }: AlgorithmBadgeProps) {
  const config = {
    optimized: {
      label: "Search Optimized",
      bg: "#dcfce7",
      color: "#15803d",
      dot: "#22c55e",
      icon: "✓",
    },
    partial: {
      label: "Partially Optimized",
      bg: "#fef9c3",
      color: "#a16207",
      dot: "#eab308",
      icon: "~",
    },
    not_optimized: {
      label: "Not Optimized",
      bg: "#fee2e2",
      color: "#b91c1c",
      dot: "#ef4444",
      icon: "✕",
    },
  };

  const c = config[status];

  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 10px",
          borderRadius: "99px",
          background: c.bg,
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: c.dot,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: c.color,
            letterSpacing: "0.04em",
          }}
        >
          {c.label}
        </span>
      </div>
      <p
        style={{
          marginTop: "4px",
          fontSize: "12px",
          color: "var(--ink-muted)",
          lineHeight: 1.5,
        }}
      >
        {note}
      </p>
    </div>
  );
}
