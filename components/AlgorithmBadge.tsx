"use client";

interface AlgorithmBadgeProps {
  status: "optimized" | "partial" | "not_optimized";
  note: string;
}

export default function AlgorithmBadge({ status, note }: AlgorithmBadgeProps) {
  const config = {
    optimized: {
      label: "Search Optimized",
      bg: "rgba(34,197,94,0.12)",
      border: "rgba(34,197,94,0.3)",
      color: "#4ade80",
      dot: "#22c55e",
    },
    partial: {
      label: "Partially Optimized",
      bg: "rgba(234,179,8,0.12)",
      border: "rgba(234,179,8,0.3)",
      color: "#facc15",
      dot: "#eab308",
    },
    not_optimized: {
      label: "Not Optimized",
      bg: "rgba(239,68,68,0.12)",
      border: "rgba(239,68,68,0.3)",
      color: "#f87171",
      dot: "#ef4444",
    },
  };

  const c = config[status];

  return (
    <div style={{ maxWidth: "62%" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 11px",
          borderRadius: "99px",
          background: c.bg,
          border: `1px solid ${c.border}`,
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: c.dot,
            boxShadow: `0 0 8px ${c.dot}`,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "11px", fontWeight: 700, color: c.color, letterSpacing: "0.04em" }}>
          {c.label}
        </span>
      </div>
      <p style={{ marginTop: "5px", fontSize: "12px", color: "var(--ink-muted)", lineHeight: 1.5 }}>{note}</p>
    </div>
  );
}
