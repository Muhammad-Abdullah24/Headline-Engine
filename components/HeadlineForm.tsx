"use client";
import { useState } from "react";
import { FormData, HeadlineGoal } from "@/lib/types";

const INDUSTRIES = [
  "B2B SaaS",
  "FinTech",
  "HealthTech",
  "EdTech",
  "E-commerce",
  "Consulting",
  "Marketing & Advertising",
  "Real Estate",
  "Legal",
  "HR & Talent",
  "Sales & Revenue",
  "Operations",
  "Product Management",
  "Engineering & Tech",
  "Venture Capital & Private Equity",
  "Startups & Entrepreneurship",
  "Non-profit",
  "Media & Publishing",
  "Other",
];

const GOALS: HeadlineGoal[] = [
  "Inbound Leads",
  "Speaking Opportunities",
  "Media & Press",
  "Recruiting Talent",
  "Partnership Conversations",
];

const GOAL_DESCRIPTIONS: Record<HeadlineGoal, string> = {
  "Inbound Leads": "Attract clients & customers",
  "Speaking Opportunities": "Get booked as a speaker",
  "Media & Press": "Be featured by journalists",
  "Recruiting Talent": "Hire top candidates",
  "Partnership Conversations": "Find strategic partners",
};

interface HeadlineFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

export default function HeadlineForm({ onSubmit, loading }: HeadlineFormProps) {
  const [form, setForm] = useState<FormData>({
    role: "",
    industry: "",
    icp: "",
    value: "",
    goal: "Inbound Leads",
  });

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid = form.role && form.industry && form.icp && form.value && form.goal;

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--ink)",
    marginBottom: "7px",
    letterSpacing: "0.01em",
  };

  const hintStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "var(--ink-light)",
    marginTop: "5px",
  };

  return (
    <div className="glass-card glass-card-hover" style={{ padding: "34px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div
          className="step-badge"
          style={{
            background: "var(--teal-light)",
            color: "var(--teal-bright)",
            border: "1px solid rgba(47,233,239,0.25)",
            marginBottom: "14px",
          }}
        >
          <span>Step 2</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>Position Yourself</span>
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
          Who are you trying to attract?
        </h2>
        <p style={{ fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.6 }}>
          This isn&apos;t about you. It&apos;s about who needs to find you. Five questions. Thirty seconds.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Role */}
        <div>
          <label style={labelStyle}>
            What do you do? <span style={{ color: "var(--magenta-bright)" }}>*</span>
          </label>
          <input
            className="field"
            type="text"
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="e.g. B2B Sales Consultant, SaaS Founder, Executive Coach"
          />
          <p style={hintStyle}>Your role or function, not your job title.</p>
        </div>

        {/* Industry */}
        <div>
          <label style={labelStyle}>
            Your industry <span style={{ color: "var(--magenta-bright)" }}>*</span>
          </label>
          <select
            className="field"
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            style={{ cursor: "pointer" }}
          >
            <option value="">Select your industry…</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* ICP */}
        <div>
          <label style={labelStyle}>
            Who are you trying to attract? <span style={{ color: "var(--magenta-bright)" }}>*</span>
          </label>
          <input
            className="field"
            type="text"
            value={form.icp}
            onChange={(e) => update("icp", e.target.value)}
            placeholder='e.g. "B2B SaaS founders scaling from $1M to $10M ARR"'
          />
          <p style={hintStyle}>Be specific. The more precise, the more powerful your headline.</p>
        </div>

        {/* Value */}
        <div>
          <label style={labelStyle}>
            What outcome do you create for them? <span style={{ color: "var(--magenta-bright)" }}>*</span>
          </label>
          <input
            className="field"
            type="text"
            value={form.value}
            onChange={(e) => update("value", e.target.value)}
            placeholder='e.g. "I help them build sales pipelines that close without cold calling"'
          />
          <p style={hintStyle}>Result-first. What changes for them after working with you?</p>
        </div>

        {/* Goal */}
        <div>
          <label style={labelStyle}>
            Your primary headline goal <span style={{ color: "var(--magenta-bright)" }}>*</span>
          </label>
          <p style={{ ...hintStyle, marginBottom: "12px", marginTop: 0 }}>
            We&apos;ll generate 5 variants, one for each goal, but which matters most right now?
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
            {GOALS.map((g) => {
              const isSelected = form.goal === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => update("goal", g)}
                  style={{
                    padding: "13px 15px",
                    borderRadius: "12px",
                    border: isSelected ? "1.5px solid var(--teal)" : "1.5px solid var(--border)",
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(47,233,239,0.14), rgba(47,233,239,0.04))"
                      : "var(--glass-input)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    boxShadow: isSelected ? "0 0 0 4px rgba(47,233,239,0.08)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: isSelected ? "var(--teal-bright)" : "var(--ink)",
                      marginBottom: "3px",
                    }}
                  >
                    {g}
                  </div>
                  <div style={{ fontSize: "11px", color: isSelected ? "var(--teal)" : "var(--ink-light)" }}>
                    {GOAL_DESCRIPTIONS[g]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={() => isValid && onSubmit(form)}
          disabled={loading || !isValid}
          className="btn-shine"
          style={{
            width: "100%",
            padding: "17px",
            borderRadius: "14px",
            background:
              loading || !isValid
                ? "rgba(255,255,255,0.06)"
                : "linear-gradient(120deg, var(--teal), var(--teal-bright))",
            color: loading || !isValid ? "var(--ink-light)" : "#04222a",
            border: "none",
            fontSize: "16px",
            fontWeight: 800,
            cursor: loading || !isValid ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            letterSpacing: "0.02em",
            marginTop: "8px",
            boxShadow: loading || !isValid ? "none" : "0 12px 32px -10px var(--teal-glow)",
          }}
        >
          {loading ? (
            <span className="pulse-teal">Generating your headlines…</span>
          ) : (
            "Generate 5 Strategic Headlines →"
          )}
        </button>
      </div>
    </div>
  );
}
