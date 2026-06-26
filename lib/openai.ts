import OpenAI from "openai";
import { AuditResult, HeadlineVariant, FormData } from "./types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Change this to whichever model you prefer (e.g. "gpt-4.1", "gpt-4o-mini").
const MODEL = "gpt-4o";

export async function auditHeadline(headline: string): Promise<AuditResult> {
  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 1024,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a LinkedIn positioning expert. You audit LinkedIn headlines with brutal honesty and strategic precision. You score headlines across three dimensions and explain exactly what's weak. Be direct, specific, and useful. Never be generic. Return only valid JSON, no markdown.",
      },
      {
        role: "user",
        content: `Audit this LinkedIn headline: "${headline}"

Score it across these three dimensions, each out of 10:
1. Clarity — does it immediately communicate what this person does?
2. Attraction — does it speak to a specific ICP's pain or goal?
3. Differentiation — does it sound different from everyone else in this space?

For each dimension provide:
- Score (number out of 10)
- One sentence explaining exactly what is weak or strong

Return as JSON with this exact shape:
{
  "clarity": { "score": number, "explanation": string },
  "attraction": { "score": number, "explanation": string },
  "differentiation": { "score": number, "explanation": string },
  "overall_verdict": string
}

The overall_verdict should be one punchy sentence summarizing the headline's biggest problem.`,
      },
    ],
  });

  const text = response.choices[0].message.content ?? "";
  return JSON.parse(text) as AuditResult;
}

export async function generateHeadlines(
  data: FormData
): Promise<HeadlineVariant[]> {
  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 2048,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a LinkedIn positioning strategist who understands that a headline is not a job title — it is a positioning statement aimed at a specific ICP. You write headlines that make the right people stop scrolling and think 'I need to talk to this person.' You understand LinkedIn's search algorithm. You never write generic headlines. Return only valid JSON, no markdown.",
      },
      {
        role: "user",
        content: `Generate 5 LinkedIn headlines for this person:
Role: ${data.role}
Industry: ${data.industry}
ICP (who they want to attract): ${data.icp}
Value they create: ${data.value}
Primary goal: ${data.goal}

Generate exactly 5 headlines, each optimized for a different strategic goal:
1. Inbound Leads
2. Speaking Opportunities
3. Media & Press
4. Recruiting & Talent
5. Partnerships

For each headline provide:
- The headline text (max 220 characters, LinkedIn limit)
- Goal label
- One line explaining why this headline works for that goal
- Positioning scores: clarity (0-10), attraction (0-10), differentiation (0-10)
- ICP mirror: one sentence of what the ICP thinks/feels when they read this
- Algorithm flag: 'optimized' / 'partial' / 'not_optimized' with one line explanation

Return as a JSON object with a single key "headlines" whose value is an array of exactly 5 items with this exact shape:
{
  "headlines": [{
    "goal": string,
    "headline": string,
    "explanation": string,
    "scores": { "clarity": number, "attraction": number, "differentiation": number },
    "icp_mirror": string,
    "algorithm": { "status": "optimized" | "partial" | "not_optimized", "note": string }
  }]
}

Make each headline feel meaningfully different — not just reworded. Each should reflect a distinct strategic positioning for that goal.`,
      },
    ],
  });

  const text = response.choices[0].message.content ?? "";
  const parsed = JSON.parse(text) as { headlines: HeadlineVariant[] };
  return parsed.headlines;
}
