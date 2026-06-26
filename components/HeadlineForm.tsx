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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "10px",
    border: "1.5px solid var(--border)",
    background: "#fafaf9",
    fontSize: "14px",
    color: "var(--ink)",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--ink)",
    marginBottom: "6px",
    letterSpacing: "0.01em",
  };

  const hintStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "var(--ink-light)",
    marginTop: "4px",
  };

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
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--teal-light)",
            color: "var(--teal-dark)",
            padding: "4px 12px",
            borderRadius: "99px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          <span>Step 2</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>Position Yourself</span>
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
          Who are you trying to attract?
        </h2>
        <p style={{ fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.6 }}>
          This isn't about you — it's about who needs to find you. Five questions. Thirty seconds.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Role */}
        <div>
          <label style={labelStyle}>
            What do you do? <span style={{ color: "var(--magenta)" }}>*</span>
          </label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="e.g. B2B Sales Consultant, SaaS Founder, Executive Coach"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <p style={hintStyle}>Your role or function — not your job title.</p>
        </div>

        {/* Industry */}
        <div>
          <label style={labelStyle}>
            Your industry <span style={{ color: "var(--magenta)" }}>*</span>
          </label>
          <select
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          >
            <option value="">Select your industry...</option>
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
            Who are you trying to attract? <span style={{ color: "var(--magenta)" }}>*</span>
          </label>
          <input
            type="text"
            value={form.icp}
            onChange={(e) => update("icp", e.target.value)}
            placeholder='e.g. "B2B SaaS founders scaling from $1M to $10M ARR"'
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <p style={hintStyle}>
            Be specific. The more precise, the more powerful your headline.
          </p>
        </div>

        {/* Value */}
        <div>
          <label style={labelStyle}>
            What outcome do you create for them? <span style={{ color: "var(--magenta)" }}>*</span>
          </label>
          <input
            type="text"
            value={form.value}
            onChange={(e) => update("value", e.target.value)}
            placeholder='e.g. "I help them build sales pipelines that close without cold calling"'
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <p style={hintStyle}>
            Result-first. What changes for them after working with you?
          </p>
        </div>

        {/* Goal */}
        <div>
          <label style={labelStyle}>
            Your primary headline goal <span style={{ color: "var(--magenta)" }}>*</span>
          </label>
          <p style={{ ...hintStyle, marginBottom: "10px", marginTop: 0 }}>
            We'll generate 5 variants — one for each goal — but which matters most to you right now?
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "8px",
            }}
          >
            {GOALS.map((g) => {
              const isSelected = form.goal === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => update("goal", g)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: isSelected
                      ? "2px solid var(--teal)"
                      : "1.5px solid var(--border)",
                    background: isSelected ? "var(--teal-light)" : "var(--white)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: isSelected ? "var(--teal-dark)" : "var(--ink)",
                      marginBottom: "2px",
                    }}
                  >
                    {g}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: isSelected ? "var(--teal)" : "var(--ink-light)",
                    }}
                  >
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
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            background:
              loading || !isValid
                ? "rgba(26,26,46,0.08)"
                : "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)",
            color:
              loading || !isValid ? "var(--ink-light)" : "white",
            border: "none",
            fontSize: "16px",
            fontWeight: 800,
            cursor: loading || !isValid ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            letterSpacing: "0.02em",
            marginTop: "8px",
          }}
        >
          {loading ? (
            <span className="pulse-teal">Generating your headlines...</span>
          ) : (
            "Generate 5 Strategic Headlines →"
          )}
        </button>
      </div>
    </div>
  );
}
