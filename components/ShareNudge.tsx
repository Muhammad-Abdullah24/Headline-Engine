"use client";
import { useState } from "react";
import { AuditResult, HeadlineVariant } from "@/lib/types";

interface ShareNudgeProps {
  auditResult: AuditResult;
  bestVariant: HeadlineVariant;
  currentHeadline: string;
}

export default function ShareNudge({
  auditResult,
  bestVariant,
  currentHeadline,
}: ShareNudgeProps) {
  const [copied, setCopied] = useState(false);

  const oldScore = Math.round(
    (auditResult.clarity.score +
      auditResult.attraction.score +
      auditResult.differentiation.score) /
      3
  );

  const newScore = Math.round(
    (bestVariant.scores.clarity +
      bestVariant.scores.attraction +
      bestVariant.scores.differentiation) /
      3
  );

  const improvement = newScore - oldScore;

  const sharePost = `I just audited my LinkedIn headline and the results were... humbling.

My old headline scored ${oldScore}/10 on clarity, attraction, and differentiation.

My best new headline? ${newScore}/10.

The difference isn't just the words — it's the positioning. Most headlines tell people who you are. The best ones tell the right people exactly why they need to talk to you.

Ran it through @Hirenum's free LinkedIn Headline Positioning Engine. It audited my current headline across 3 dimensions, then generated 5 strategic variants — each optimized for a different goal.

If you're serious about your LinkedIn presence, your headline is the first thing to fix.

Try it free → hirenum.com/headline`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sharePost);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        border: "1.5px solid var(--border)",
        boxShadow: "0 2px 24px rgba(26,26,46,0.06)",
      }}
    >
      {/* Top banner */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--ink) 0%, #2d2d4e 100%)",
          padding: "24px 28px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "6px",
            }}
          >
            Your Upgrade
          </p>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.2,
            }}
          >
            Old headline: {oldScore}/10 →{" "}
            <span style={{ color: "var(--teal)" }}>New best: {newScore}/10</span>
          </h3>
          {improvement > 0 && (
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                marginTop: "4px",
              }}
            >
              That's a {improvement}-point positioning upgrade.
            </p>
          )}
        </div>
        <div
          style={{
            padding: "8px 18px",
            borderRadius: "99px",
            background: "var(--magenta)",
            color: "white",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          +{improvement > 0 ? `${improvement}` : "?"} points
        </div>
      </div>

      {/* Share section */}
      <div
        style={{
          background: "var(--white)",
          padding: "24px 28px",
        }}
      >
        <p
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: "4px",
          }}
        >
          Share your upgrade on LinkedIn
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "var(--ink-muted)",
            marginBottom: "16px",
          }}
        >
          This post is ready to go. Copy it, paste it, own it.
        </p>

        <div
          style={{
            background: "#fafaf9",
            borderRadius: "12px",
            padding: "16px",
            border: "1.5px solid var(--border)",
            marginBottom: "14px",
          }}
        >
          <pre
            style={{
              fontFamily: "inherit",
              fontSize: "13px",
              color: "var(--ink-muted)",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              margin: 0,
            }}
          >
            {sharePost}
          </pre>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleCopy}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: copied ? "var(--teal)" : "var(--ink)",
              color: "white",
              border: "none",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {copied ? "✓ Copied!" : "Copy LinkedIn Post"}
          </button>
          <a
            href="https://www.linkedin.com/company/hirenum"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: "var(--teal-light)",
              color: "var(--teal-dark)",
              border: "1.5px solid var(--teal)",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Follow @Hirenum
          </a>
        </div>
      </div>
    </div>
  );
}
