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
        (result.clarity.score +
          result.attraction.score +
          result.differentiation.score) /
          3
      )
    : 0;

  const scoreLabel =
    overallScore >= 8
      ? "Strong"
      : overallScore >= 6
      ? "Decent"
      : overallScore >= 4
      ? "Weak"
      : "Critical";

  const scoreLabelColor =
    overallScore >= 8
      ? "var(--teal)"
      : overallScore >= 6
      ? "#d97706"
      : "var(--magenta)";

  return (
    <div
      style={{
        background: "var(--white)",
        borderRadius: "20px",
        padding: "32px",
        border: "1.5px solid var(--border)",
        boxShadow: "0 2px 24px rgba(26,26,46,0.06)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#fce8f3",
            color: "var(--magenta)",
            padding: "4px 12px",
            borderRadius: "99px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          <span>Step 1</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>Headline Audit</span>
        </div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "var(--ink)",
            lineHeight: 1.2,
            marginBottom: "8px",
          }}
        >
          How bad is your current headline?
        </h2>
        <p style={{ fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.6 }}>
          Paste it below. We'll score it on Clarity, Attraction, and
          Differentiation — no sugar-coating.
        </p>
      </div>

      {/* Input */}
      <div style={{ marginBottom: "16px" }}>
        <textarea
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g. CEO at Acme Corp | Helping businesses grow | Speaker | Mentor"
          rows={2}
          maxLength={300}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1.5px solid var(--border)",
            background: "#fafaf9",
            fontSize: "15px",
            color: "var(--ink)",
            resize: "vertical",
            outline: "none",
            fontFamily: "inherit",
            lineHeight: 1.5,
            transition: "border-color 0.2s",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "var(--teal)")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "var(--border)")
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--ink-light)" }}>
            {headline.length}/300
          </span>
          <button
            onClick={handleAudit}
            disabled={loading || !headline.trim()}
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              background:
                loading || !headline.trim()
                  ? "rgba(26,26,46,0.1)"
                  : "var(--magenta)",
              color:
                loading || !headline.trim() ? "var(--ink-light)" : "var(--white)",
              border: "none",
              fontSize: "14px",
              fontWeight: 700,
              cursor:
                loading || !headline.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {loading ? (
              <>
                <span className="pulse-teal">Auditing</span>
                <span className="pulse-teal" style={{ animationDelay: "0.3s" }}>
                  ...
                </span>
              </>
            ) : (
              "Audit My Headline →"
            )}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            background: "#fee2e2",
            color: "#b91c1c",
            fontSize: "14px",
            marginBottom: "16px",
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
              padding: "16px 20px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "4px",
                }}
              >
                Verdict
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "white",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {result.overall_verdict}
              </p>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 900,
                  color: scoreLabelColor,
                  lineHeight: 1,
                }}
              >
                {overallScore}
                <span
                  style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}
                >
                  /10
                </span>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: scoreLabelColor,
                  marginTop: "2px",
                }}
              >
                {scoreLabel}
              </div>
            </div>
          </div>

          {/* Score details */}
          <div style={{ marginBottom: "20px" }}>
            <ScoreCard
              clarity={result.clarity.score}
              attraction={result.attraction.score}
              differentiation={result.differentiation.score}
            />
          </div>

          {/* Dimension breakdowns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
            }}
          >
            {[
              {
                label: "Clarity",
                score: result.clarity.score,
                explanation: result.clarity.explanation,
                color: "var(--teal)",
                bg: "var(--teal-light)",
              },
              {
                label: "Attraction",
                score: result.attraction.score,
                explanation: result.attraction.explanation,
                color: "var(--magenta)",
                bg: "var(--magenta-light)",
              },
              {
                label: "Differentiation",
                score: result.differentiation.score,
                explanation: result.differentiation.explanation,
                color: "#7c3aed",
                bg: "#f3e8ff",
              },
            ].map((dim) => (
              <div
                key={dim.label}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  background: dim.bg,
                  border: `1px solid ${dim.color}22`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: dim.color,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {dim.label}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 900,
                      color: dim.color,
                    }}
                  >
                    {dim.score}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--ink-muted)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
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
