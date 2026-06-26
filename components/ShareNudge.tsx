"use client";
import { useState } from "react";
import { AuditResult, HeadlineVariant } from "@/lib/types";

interface ShareNudgeProps {
  auditResult: AuditResult;
  bestVariant: HeadlineVariant;
  currentHeadline: string;
}

export default function ShareNudge({ auditResult, bestVariant }: ShareNudgeProps) {
  const [copied, setCopied] = useState(false);

  const oldScore = Math.round(
    (auditResult.clarity.score + auditResult.attraction.score + auditResult.differentiation.score) / 3
  );

  const newScore = Math.round(
    (bestVariant.scores.clarity + bestVariant.scores.attraction + bestVariant.scores.differentiation) / 3
  );

  const improvement = newScore - oldScore;

  const sharePost = `I just audited my LinkedIn headline and the results were... humbling.

My old headline scored ${oldScore}/10 on clarity, attraction, and differentiation.

My best new headline? ${newScore}/10.

The difference isn't just the words. It's the positioning. Most headlines tell people who you are. The best ones tell the right people exactly why they need to talk to you.

Ran it through @Hirenum's free LinkedIn Headline Positioning Engine. It audited my current headline across 3 dimensions, then generated 5 strategic variants, each optimized for a different goal.

If you're serious about your LinkedIn presence, your headline is the first thing to fix.

Try it free → hirenum.com/headline`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sharePost);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="glass-card glass-card-hover">
      {/* Top banner */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, rgba(47,233,239,0.14), rgba(255,61,166,0.14))",
          padding: "28px 30px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-light)",
              marginBottom: "8px",
            }}
          >
            Your Upgrade
          </p>
          <h3 style={{ fontSize: "22px", fontWeight: 900, color: "var(--ink)", lineHeight: 1.2 }}>
            Old: <span style={{ color: "var(--magenta-bright)" }}>{oldScore}/10</span>{" "}
            <span style={{ color: "var(--ink-light)" }}>→</span>{" "}
            <span className="gradient-text">New best: {newScore}/10</span>
          </h3>
          {improvement > 0 && (
            <p style={{ fontSize: "14px", color: "var(--ink-muted)", marginTop: "6px" }}>
              That&apos;s a {improvement}-point positioning upgrade.
            </p>
          )}
        </div>
        <div
          style={{
            padding: "9px 20px",
            borderRadius: "99px",
            background: "linear-gradient(120deg, var(--teal), var(--teal-bright))",
            color: "#04222a",
            fontSize: "14px",
            fontWeight: 800,
            boxShadow: "0 8px 24px -8px var(--teal-glow)",
          }}
        >
          +{improvement > 0 ? `${improvement}` : "?"} points
        </div>
      </div>

      {/* Share section */}
      <div style={{ padding: "28px 30px" }}>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>
          Share your upgrade on LinkedIn
        </p>
        <p style={{ fontSize: "13px", color: "var(--ink-muted)", marginBottom: "18px" }}>
          This post is ready to go. Copy it, paste it, own it.
        </p>

        <div
          style={{
            background: "var(--inset-panel)",
            borderRadius: "14px",
            padding: "18px",
            border: "1px solid var(--border)",
            marginBottom: "16px",
          }}
        >
          <pre
            style={{
              fontFamily: "inherit",
              fontSize: "13px",
              color: "var(--ink-muted)",
              lineHeight: 1.75,
              whiteSpace: "pre-wrap",
              margin: 0,
            }}
          >
            {sharePost}
          </pre>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={handleCopy}
            className="btn-shine"
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: copied
                ? "linear-gradient(120deg, var(--teal), var(--teal-bright))"
                : "var(--ink)",
              color: copied ? "#04222a" : "var(--bg)",
              border: "none",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {copied ? "✓ Copied!" : "Copy LinkedIn Post"}
          </button>
          <a
            href="https://www.linkedin.com/company/hirenum"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: "var(--teal-light)",
              color: "var(--teal-bright)",
              border: "1.5px solid rgba(47,233,239,0.3)",
              fontSize: "14px",
              fontWeight: 700,
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
