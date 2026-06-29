import { NextRequest, NextResponse } from "next/server";
import { generateHeadlines, ModelOutputError } from "@/lib/openai";
import { generateInputSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp, rateLimitHeaders } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  // 1. Rate limit per IP before doing any expensive work.
  const rate = await checkRateLimit("generate", getClientIp(req));
  if (!rate.ok) {
    return NextResponse.json(
      { error: "You've hit the limit for now. Try again in a little while." },
      { status: 429, headers: rateLimitHeaders(rate) }
    );
  }

  // 2. Parse + validate untrusted input (length-capped fields, goal must be a
  //    known value).
  let parsed;
  try {
    parsed = generateInputSchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "All five fields are required and must be within the length limits." },
      { status: 400 }
    );
  }

  // 3. Call the model.
  try {
    const results = await generateHeadlines(parsed);
    return NextResponse.json(results);
  } catch (err) {
    console.error("Generate error:", err);
    const status = err instanceof ModelOutputError ? 502 : 500;
    return NextResponse.json(
      { error: "Failed to generate headlines. Please try again." },
      { status }
    );
  }
}
