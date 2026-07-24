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

const avgScore = (s: { clarity: number; attraction: number; differentiation: number }) =>
  (s.clarity + s.attraction + s.differentiation) / 3;

// Pick the strongest variant by its own self-reported scores. (Relative ranking
// among the model's own outputs is fine; the honest *absolute* number for the
// share card comes from re-auditing this headline below.)
const pickBest = (vs: HeadlineVariant[]): HeadlineVariant | null =>
  vs.length ? vs.reduce((best, v) => (avgScore(v.scores) > avgScore(best.scores) ? v : best)) : null;

export default function HomePage() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditedHeadline, setAuditedHeadline] = useState("");
  const [variants, setVariants] = useState<HeadlineVariant[] | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");
  // Honest before/after: the best generated headline scored through the SAME
  // audit rubric as the user's original, so the share card compares like with like.
  const [bestAudit, setBestAudit] = useState<AuditResult | null>(null);
  const [bestAuditLoading, setBestAuditLoading] = useState(false);

  const handleAuditComplete = (result: AuditResult, headline: string) => {
    setAuditResult(result);
    setAuditedHeadline(headline);
  };

  const handleFormSubmit = async (data: FormData) => {
    setGenerating(true);
    setGenerateError("");
    setVariants(null);
    setBestAudit(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Generation failed");
      const variantsData = json as HeadlineVariant[];
      setVariants(variantsData);
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      // Re-audit the best variant for an apples-to-apples before/after score.
      // Non-blocking: results render immediately; the share card fills in when ready.
      const best = pickBest(variantsData);
      if (best) {
        setBestAuditLoading(true);
        fetch("/api/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ headline: best.headline }),
        })
          .then(async (r) => (r.ok ? ((await r.json()) as AuditResult) : null))
          .then((a) => setBestAudit(a))
          .catch(() => setBestAudit(null))
          .finally(() => setBestAuditLoading(false));
      }
    } catch (e: unknown) {
      setGenerateError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setGenerating(false);
    }
  };

  const bestVariant = variants ? pickBest(variants) : null;

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
            <img src="/hirenum-logo.png" alt="Hirenum" style={{ height: "26px", width: "auto", display: "block" }} />
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
            <span className="hidden sm:inline-flex">
              <a
                href="https://hirenum.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-magenta btn-sm"
              >
                Work With Us
              </a>
            </span>
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
                <button onClick={scrollToTool} className="btn btn-primary btn-lg">
                  Audit My Headline · Free
                </button>
                <a href="#why" className="btn btn-ghost btn-lg">
                  Why It Matters
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
                  <ShareNudge
                    auditResult={auditResult}
                    bestVariant={bestVariant}
                    newAudit={bestAudit}
                    loading={bestAuditLoading}
                  />
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
              <img src="/hirenum-logo.png" alt="Hirenum" style={{ height: "26px", width: "auto", display: "block", marginBottom: "16px" }} />
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

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <a
                href="https://hirenum.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-heading"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-light)",
                  marginBottom: "18px",
                  textDecoration: "none",
                }}
              >
                Hirenum ↗
              </a>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/hirenum/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hirenum on LinkedIn"
                  className="social-chip"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/hirenum.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hirenum on Instagram"
                  className="social-chip"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <defs>
                      <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#feda75" />
                        <stop offset="35%" stopColor="#fa7e1e" />
                        <stop offset="60%" stopColor="#d62976" />
                        <stop offset="85%" stopColor="#962fbf" />
                        <stop offset="100%" stopColor="#4f5bd5" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#ig-gradient)"
                      d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88"
                    />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@hirenum.com"
                  aria-label="Email Hirenum at hello@hirenum.com"
                  className="social-chip"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--magenta-bright)" aria-hidden="true">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5-8-5V6l8 5 8-5z" />
                  </svg>
                </a>
              </div>
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
