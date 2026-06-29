import { NextRequest, NextResponse } from "next/server";
import { auditHeadline, ModelOutputError } from "@/lib/openai";
import { auditInputSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp, rateLimitHeaders } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  // 1. Rate limit per IP before doing any expensive work.
  const rate = await checkRateLimit("audit", getClientIp(req));
  if (!rate.ok) {
    return NextResponse.json(
      { error: "You've hit the limit for now. Try again in a little while." },
      { status: 429, headers: rateLimitHeaders(rate) }
    );
  }

  // 2. Parse + validate untrusted input (length-capped in the schema).
  let parsed;
  try {
    parsed = auditInputSchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "Please paste a headline (up to 300 characters)." },
      { status: 400 }
    );
  }

  // 3. Call the model.
  try {
    const result = await auditHeadline(parsed.headline);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Audit error:", err);
    const status = err instanceof ModelOutputError ? 502 : 500;
    return NextResponse.json(
      { error: "Failed to audit headline. Please try again." },
      { status }
    );
  }
}
