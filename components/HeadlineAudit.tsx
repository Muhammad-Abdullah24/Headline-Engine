"use client";
import { useState } from "react";
import ScoreCard from "./ScoreCard";
import { AuditResult } from "@/lib/types";

interface HeadlineAuditProps {
  onAuditComplete: (result: AuditResult, headline: string) => void;
}

export default function HeadlineAudit({ onAuditComplete }: HeadlineAuditProps) {
  const [headline, setHeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  const handleAudit = async () => {
    if (!headline.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit failed");
      setResult(data);
      onAuditComplete(data, headline);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const overallScore = result
    ? Math.round(
        (result.clarity.score + result.attraction.score + result.differentiation.score) / 3
      )
    : 0;

  const scoreLabel =
    overallScore >= 8 ? "Strong" : overallScore >= 6 ? "Decent" : overallScore >= 4 ? "Weak" : "Critical";

  const scoreLabelColor =
    overallScore >= 8 ? "var(--teal-bright)" : overallScore >= 6 ? "#fbbf24" : "var(--magenta-bright)";

  return (
    <div className="glass-card glass-card-hover" style={{ padding: "34px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          className="step-badge"
          style={{
            background: "var(--magenta-light)",
            color: "var(--magenta-bright)",
            border: "1px solid rgba(255,61,166,0.25)",
            marginBottom: "14px",
          }}
        >
          <span>Step 1</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>Headline Audit</span>
        </div>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "var(--ink)",
            lineHeight: 1.2,
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          How bad is your current headline?
        </h2>
        <p style={{ fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.6 }}>
          Paste it below. We&apos;ll score it on Clarity, Attraction, and Differentiation. No sugar-coating.
        </p>
      </div>

      {/* Input */}
      <div style={{ marginBottom: "16px" }}>
        <textarea
          className="field"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g. CEO at Acme Corp | Helping businesses grow | Speaker | Mentor"
          rows={2}
          maxLength={300}
          style={{ resize: "vertical", lineHeight: 1.5 }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--ink-light)" }}>{headline.length}/300</span>
          <button
            onClick={handleAudit}
            disabled={loading || !headline.trim()}
            className="btn btn-magenta btn-sm"
          >
            {loading ? <span className="pulse-teal">Auditing…</span> : "Audit My Headline"}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            background: "rgba(255,61,166,0.1)",
            color: "#ff9dcb",
            fontSize: "14px",
            marginBottom: "16px",
            border: "1px solid rgba(255,61,166,0.25)",
          }}
        >
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="fade-up">
          {/* Verdict banner */}
          <div
            style={{
              position: "relative",
              padding: "20px 22px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(255,61,166,0.12), rgba(47,233,239,0.08))",
              border: "1px solid var(--border)",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-light)",
                  marginBottom: "6px",
                }}
              >
                The Verdict
              </p>
              <p style={{ fontSize: "16px", color: "var(--ink)", fontWeight: 500, lineHeight: 1.45 }}>
                {result.overall_verdict}
              </p>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0, position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "34px", fontWeight: 900, color: scoreLabelColor, lineHeight: 1 }}>
                {overallScore}
                <span style={{ fontSize: "15px", color: "var(--ink-light)" }}>/10</span>
              </div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: scoreLabelColor, marginTop: "4px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {scoreLabel}
              </div>
            </div>
          </div>

          {/* Score card */}
          <div style={{ marginBottom: "20px" }}>
            <ScoreCard
              clarity={result.clarity.score}
              attraction={result.attraction.score}
              differentiation={result.differentiation.score}
            />
          </div>

          {/* Dimension breakdowns */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {[
              { label: "Clarity", score: result.clarity.score, explanation: result.clarity.explanation, color: "var(--teal-bright)", bg: "rgba(47,233,239,0.07)" },
              { label: "Attraction", score: result.attraction.score, explanation: result.attraction.explanation, color: "var(--magenta-bright)", bg: "rgba(255,61,166,0.07)" },
              { label: "Differentiation", score: result.differentiation.score, explanation: result.differentiation.explanation, color: "#a78bfa", bg: "rgba(139,92,246,0.08)" },
            ].map((dim) => (
              <div
                key={dim.label}
                style={{
                  padding: "15px",
                  borderRadius: "13px",
                  background: dim.bg,
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: dim.color, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {dim.label}
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: dim.color }}>{dim.score}</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--ink-muted)", lineHeight: 1.5, margin: 0 }}>
                  {dim.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
