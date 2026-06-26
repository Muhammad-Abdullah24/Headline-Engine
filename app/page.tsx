"use client";
import { useState } from "react";
import HeadlineAudit from "@/components/HeadlineAudit";
import HeadlineForm from "@/components/HeadlineForm";
import HeadlineResults from "@/components/HeadlineResults";
import ShareNudge from "@/components/ShareNudge";
import { AuditResult, HeadlineVariant, FormData } from "@/lib/types";

export default function HomePage() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditedHeadline, setAuditedHeadline] = useState("");
  const [variants, setVariants] = useState<HeadlineVariant[] | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  const handleAuditComplete = (result: AuditResult, headline: string) => {
    setAuditResult(result);
    setAuditedHeadline(headline);
  };

  const handleFormSubmit = async (data: FormData) => {
    setGenerating(true);
    setGenerateError("");
    setVariants(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Generation failed");
      setVariants(json);
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (e: unknown) {
      setGenerateError(
        e instanceof Error ? e.message : "Something went wrong. Try again."
      );
    } finally {
      setGenerating(false);
    }
  };

  const bestVariant = variants
    ? variants.reduce((best, v) => {
        const bAvg =
          (best.scores.clarity + best.scores.attraction + best.scores.differentiation) / 3;
        const vAvg =
          (v.scores.clarity + v.scores.attraction + v.scores.differentiation) / 3;
        return vAvg > bAvg ? v : best;
      })
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
          background: "rgba(245,240,235,0.9)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <a
          href="https://hirenum.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--teal)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            H
          </div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "var(--teal)",
            }}
          >
            Hirenum
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontSize: "12px",
              color: "var(--ink-muted)",
            }}
            className="hidden sm:block"
          >
            We Brand People
          </span>
          <a
            href="https://hirenum.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: "var(--magenta)",
              color: "white",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            Work with us →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "64px 24px 48px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "99px",
            border: "1.5px solid var(--teal)",
            background: "var(--teal-light)",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--teal)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--teal-dark)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Free Tool by Hirenum
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 900,
            color: "var(--ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          LinkedIn Headline
          <br />
          <span className="text-shimmer">Positioning Engine</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "var(--ink-muted)",
            lineHeight: 1.6,
            maxWidth: "560px",
            margin: "0 auto 32px",
          }}
        >
          Most tools ask{" "}
          <em style={{ color: "var(--ink)", fontStyle: "normal", fontWeight: 600 }}>
            who you are.
          </em>{" "}
          This one asks{" "}
          <em style={{ color: "var(--magenta)", fontStyle: "normal", fontWeight: 600 }}>
            who you're trying to attract.
          </em>
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "5", label: "Strategic variants" },
            { num: "3", label: "Scoring dimensions" },
            { num: "100%", label: "Free forever" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  color: "var(--teal)",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--ink-muted)",
                  fontWeight: 500,
                  marginTop: "2px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flow */}
      <main
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 24px 80px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Step 1 - Audit */}
        <HeadlineAudit onAuditComplete={handleAuditComplete} />

        {/* Connector */}
        {auditResult && (
          <div
            className="fade-up"
            style={{
              textAlign: "center",
              padding: "8px 0",
              color: "var(--ink-muted)",
              fontSize: "14px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ color: "var(--teal)", whiteSpace: "nowrap" }}>
              Now let's fix it ↓
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>
        )}

        {/* Step 2 - Form (shown after audit) */}
        {auditResult && (
          <div className="fade-up">
            <HeadlineForm onSubmit={handleFormSubmit} loading={generating} />
          </div>
        )}

        {generateError && (
          <div
            style={{
              padding: "14px 18px",
              borderRadius: "12px",
              background: "#fee2e2",
              color: "#b91c1c",
              fontSize: "14px",
              border: "1px solid #fca5a5",
            }}
          >
            {generateError}
          </div>
        )}

        {/* Step 3 - Results */}
        {variants && (
          <div id="results-section" className="fade-up">
            <HeadlineResults variants={variants} />
          </div>
        )}

        {/* Share nudge */}
        {variants && auditResult && bestVariant && (
          <div className="fade-up">
            <ShareNudge
              auditResult={auditResult}
              bestVariant={bestVariant}
              currentHeadline={auditedHeadline}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "14px", color: "var(--ink-muted)", marginBottom: "8px" }}>
          Built by{" "}
          <a
            href="https://hirenum.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--teal)", fontWeight: 700, textDecoration: "none" }}
          >
            Hirenum
          </a>{" "}
          — We Brand People
        </p>
        <p style={{ fontSize: "12px", color: "var(--ink-light)" }}>
          Powered by OpenAI · Free, forever · No account needed
        </p>
      </footer>
    </div>
  );
}
