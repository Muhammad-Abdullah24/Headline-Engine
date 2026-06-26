"use client";
import { useState } from "react";
import HeadlineAudit from "@/components/HeadlineAudit";
import HeadlineForm from "@/components/HeadlineForm";
import HeadlineResults from "@/components/HeadlineResults";
import ShareNudge from "@/components/ShareNudge";
import Background from "@/components/Background";
import ThemeToggle from "@/components/ThemeToggle";
import HeroPreview from "@/components/HeroPreview";
import WhyBand from "@/components/WhyBand";
import BentoFeatures from "@/components/BentoFeatures";
import StepRail from "@/components/StepRail";
import { AuditResult, HeadlineVariant, FormData } from "@/lib/types";

const FEATURES = [
  "ICP-First Positioning",
  "Brutal Headline Audit",
  "5 Strategic Variants",
  "Clarity · Attraction · Differentiation",
  "LinkedIn Algorithm Flags",
  "ICP Mirror Test",
  "One-Click Copy",
  "Share-Ready Scorecard",
];

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
      setGenerateError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setGenerating(false);
    }
  };

  const bestVariant = variants
    ? variants.reduce((best, v) => {
        const bAvg = (best.scores.clarity + best.scores.attraction + best.scores.differentiation) / 3;
        const vAvg = (v.scores.clarity + v.scores.attraction + v.scores.differentiation) / 3;
        return vAvg > bAvg ? v : best;
      })
    : null;

  // Drive the sticky stepper rail
  const currentStep = variants ? 4 : generating ? 3 : auditResult ? 2 : 1;

  const scrollToTool = () =>
    document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Background />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ───────────────────────── NAV ───────────────────────── */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 28px",
            borderBottom: "1px solid var(--border)",
            background: "var(--nav-bg)",
            backdropFilter: "blur(18px) saturate(150%)",
            WebkitBackdropFilter: "blur(18px) saturate(150%)",
          }}
        >
          <a
            href="https://hirenum.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Hirenum" style={{ height: "26px", width: "auto", display: "block" }} />
            <span
              className="hidden sm:block"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--ink-light)",
                letterSpacing: "0.06em",
                paddingLeft: "12px",
                borderLeft: "1px solid var(--border)",
              }}
            >
              Headline Engine
            </span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div className="hidden md:flex" style={{ gap: "22px" }}>
              {[
                { label: "Why", href: "#why" },
                { label: "Features", href: "#features" },
                { label: "The Tool", href: "#workspace" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink-muted)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="https://hirenum.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine hidden sm:inline-block"
              style={{
                padding: "9px 18px",
                borderRadius: "10px",
                background: "linear-gradient(120deg, var(--magenta), var(--magenta-bright))",
                color: "white",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 8px 24px -8px var(--magenta-glow)",
              }}
            >
              Work with us →
            </a>
            <ThemeToggle />
          </div>
        </nav>

        {/* ─────────────────────── MARQUEE ─────────────────────── */}
        <div style={{ borderBottom: "1px solid var(--border)", padding: "12px 0", background: "var(--surface-faint)" }}>
          <div className="marquee">
            {[0, 1].map((dup) => (
              <div className="marquee__track" key={dup} aria-hidden={dup === 1}>
                {FEATURES.map((f) => (
                  <span
                    key={f}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "40px",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f}
                    <span style={{ color: "var(--teal-bright)" }}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────────── HERO (asymmetric split) ─────────── */}
        <header style={{ maxWidth: "1140px", margin: "0 auto", padding: "76px 24px 40px" }}>
          <div className="hero-split">
            {/* LEFT: copy */}
            <div>
              <div className="fade-up" style={{ marginBottom: "22px" }}>
                <span className="pill float-soft">
                  <span className="dot-pulse" />
                  <span style={{ color: "var(--ink-muted)" }}>
                    Built by{" "}
                    <span style={{ color: "var(--teal-bright)", fontWeight: 800 }}>HIRENUM</span> · We Brand People
                  </span>
                </span>
              </div>

              <h1
                className="fade-up fade-up-delay-1"
                style={{
                  fontSize: "clamp(38px, 6vw, 68px)",
                  fontWeight: 900,
                  lineHeight: 1.03,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                <span style={{ color: "var(--ink)" }}>Stop describing</span>
                <br />
                <span style={{ color: "var(--ink)" }}>yourself. Start </span>
                <span className="text-shimmer">attracting</span>
                <span style={{ color: "var(--ink)" }}> them.</span>
              </h1>

              <p
                className="fade-up fade-up-delay-2"
                style={{
                  fontSize: "clamp(16px, 2vw, 19px)",
                  color: "var(--ink-muted)",
                  lineHeight: 1.65,
                  maxWidth: "520px",
                  margin: "24px 0 32px",
                }}
              >
                The LinkedIn Headline Positioning Engine audits the line that decides whether
                the right people lean in, then engineers five variants built around{" "}
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>who you want to attract</span>,
                not your job title.
              </p>

              {/* Inline value props */}
              <ul
                className="fade-up fade-up-delay-3"
                style={{ listStyle: "none", padding: 0, margin: "0 0 34px", display: "grid", gap: "10px" }}
              >
                {[
                  "Audited across Clarity, Attraction & Differentiation",
                  "5 variants, one per goal, never reworded fluff",
                  "See your headline through your ICP's eyes",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14.5px", color: "var(--ink-muted)" }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: "20px",
                        height: "20px",
                        borderRadius: "6px",
                        background: "var(--teal-light)",
                        border: "1px solid rgba(47,233,239,0.3)",
                        color: "var(--teal-bright)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 900,
                      }}
                    >
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="fade-up fade-up-delay-4" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={scrollToTool}
                  className="btn-shine"
                  style={{
                    padding: "15px 28px",
                    borderRadius: "13px",
                    background: "linear-gradient(120deg, var(--teal), var(--teal-bright))",
                    color: "#04222a",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 12px 32px -10px var(--teal-glow)",
                  }}
                >
                  Audit my headline · free →
                </button>
                <a
                  href="#why"
                  style={{
                    padding: "15px 24px",
                    borderRadius: "13px",
                    background: "var(--glass-strong)",
                    border: "1px solid var(--border)",
                    color: "var(--ink)",
                    fontSize: "15px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  Why it matters
                </a>
              </div>
            </div>

            {/* RIGHT: floating product preview */}
            <div className="fade-up fade-up-delay-3">
              <HeroPreview />
            </div>
          </div>
        </header>

        {/* ───────────────────────── WHY ───────────────────────── */}
        <div id="why" />
        <WhyBand />

        {/* ─────────────────────── FEATURES ────────────────────── */}
        <div id="features" />
        <BentoFeatures />

        {/* ──────────────────── WORKSPACE (tool) ───────────────── */}
        <section id="workspace" style={{ maxWidth: "1140px", margin: "0 auto", padding: "70px 24px 110px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="eyebrow">Your turn</span>
            <h2
              style={{
                fontSize: "clamp(28px, 4.4vw, 44px)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                margin: "14px 0 0",
                color: "var(--ink)",
              }}
            >
              Run the engine.
            </h2>
          </div>

          <div className="workspace">
            <StepRail current={currentStep} />

            {/* Right working column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "26px", minWidth: 0 }}>
              <div className="fade-up">
                <HeadlineAudit onAuditComplete={handleAuditComplete} />
              </div>

              {auditResult && (
                <div className="fade-up">
                  <HeadlineForm onSubmit={handleFormSubmit} loading={generating} />
                </div>
              )}

              {generateError && (
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: "rgba(255,61,166,0.1)",
                    color: "#ff9dcb",
                    fontSize: "14px",
                    border: "1px solid rgba(255,61,166,0.3)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {generateError}
                </div>
              )}

              {variants && (
                <div id="results-section" className="fade-up">
                  <HeadlineResults variants={variants} />
                </div>
              )}

              {variants && auditResult && bestVariant && (
                <div className="fade-up">
                  <ShareNudge auditResult={auditResult} bestVariant={bestVariant} currentHeadline={auditedHeadline} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─────────────────────── FOOTER ──────────────────────── */}
        <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface-faint)", backdropFilter: "blur(12px)" }}>
          <div
            style={{
              maxWidth: "1140px",
              margin: "0 auto",
              padding: "56px 24px 40px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "40px",
            }}
          >
            <div style={{ maxWidth: "300px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Hirenum" style={{ height: "26px", width: "auto", display: "block", marginBottom: "16px" }} />
              <p style={{ fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.6 }}>
                We Brand People. A LinkedIn personal-branding agency for founders, C-suites, and
                professionals who refuse to blend in.
              </p>
            </div>

            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-light)", marginBottom: "14px" }}>
                The Free Tool Suite
              </p>
              {[
                { label: "LinkedIn Post Formatter", note: "Live" },
                { label: "Headline Positioning Engine", note: "You're here" },
                { label: "About Section Writer", note: "Coming soon" },
              ].map((t) => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "14px", color: "var(--ink-muted)", fontWeight: 600 }}>{t.label}</span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: "var(--teal-light)",
                      color: "var(--teal-bright)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.note}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-light)", marginBottom: "14px" }}>
                Hirenum
              </p>
              {[
                { label: "Visit hirenum.com", href: "https://hirenum.com" },
                { label: "Follow @Hirenum", href: "https://www.linkedin.com/company/hirenum" },
                { label: "Work with us", href: "https://hirenum.com" },
              ].map((t) => (
                <a
                  key={t.label}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", fontSize: "14px", color: "var(--ink-muted)", textDecoration: "none", marginBottom: "10px", fontWeight: 600 }}
                >
                  {t.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", padding: "20px 24px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "var(--ink-light)" }}>
              Powered by OpenAI · Free, forever · No account needed · © {new Date().getFullYear()} Hirenum
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
