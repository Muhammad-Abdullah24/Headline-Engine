import { z } from "zod";

/**
 * Single source of truth for input validation and model-output shapes.
 *
 * User input is UNTRUSTED: it is interpolated into LLM prompts, so every field
 * is length-capped server-side to bound token cost and shrink the surface for
 * prompt-injection and abuse. The client also caps these, but the API is public
 * and must defend itself independently.
 */

// ─────────────────────────────── Input limits ───────────────────────────────
export const LIMITS = {
  headline: 300,
  role: 200,
  industry: 80,
  icp: 300,
  value: 300,
} as const;

// Must stay in sync with GOALS in components/HeadlineForm.tsx and HeadlineGoal
// in lib/types.ts.
export const HEADLINE_GOALS = [
  "Inbound Leads",
  "Speaking Opportunities",
  "Media & Press",
  "Recruiting Talent",
  "Partnership Conversations",
] as const;

/**
 * Collapses runs of whitespace/newlines to single spaces and trims. Content is
 * preserved, but the structural tricks commonly used to smuggle fake
 * "instructions" into a prompt (line breaks, ASCII art, indentation) are removed.
 * Headlines and form answers are single-line values, so this is lossless in
 * practice.
 */
export function sanitize(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

// ─────────────────────────────── Input schemas ──────────────────────────────
export const auditInputSchema = z.object({
  headline: z
    .string()
    .trim()
    .min(1, "Headline is required.")
    .max(LIMITS.headline, `Headline must be ${LIMITS.headline} characters or fewer.`),
});

export const generateInputSchema = z.object({
  role: z.string().trim().min(1).max(LIMITS.role),
  industry: z.string().trim().min(1).max(LIMITS.industry),
  icp: z.string().trim().min(1).max(LIMITS.icp),
  value: z.string().trim().min(1).max(LIMITS.value),
  goal: z.enum(HEADLINE_GOALS),
});

export type AuditInput = z.infer<typeof auditInputSchema>;
export type GenerateInput = z.infer<typeof generateInputSchema>;

// ───────────────────────────── Model-output schemas ─────────────────────────
// These are sent to OpenAI as a strict JSON schema (via zodResponseFormat), so
// the model is forced to return exactly this shape. Note: numeric range
// constraints (min/max) are NOT supported by OpenAI structured outputs, so
// scores are validated as plain numbers here and clamped to 0–10 in lib/openai.ts.
const scoreBlock = z.object({
  score: z.number(),
  explanation: z.string(),
});

export const auditResultSchema = z.object({
  clarity: scoreBlock,
  attraction: scoreBlock,
  differentiation: scoreBlock,
  overall_verdict: z.string(),
});

export const headlineVariantSchema = z.object({
  goal: z.string(),
  headline: z.string(),
  explanation: z.string(),
  scores: z.object({
    clarity: z.number(),
    attraction: z.number(),
    differentiation: z.number(),
  }),
  icp_mirror: z.string(),
  algorithm: z.object({
    status: z.enum(["optimized", "partial", "not_optimized"]),
    note: z.string(),
  }),
});

export const generateResultSchema = z.object({
  headlines: z.array(headlineVariantSchema),
});
