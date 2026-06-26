import { NextRequest, NextResponse } from "next/server";
import { auditHeadline } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { headline } = await req.json();

    if (!headline || typeof headline !== "string" || headline.trim() === "") {
      return NextResponse.json(
        { error: "Headline is required." },
        { status: 400 }
      );
    }

    const result = await auditHeadline(headline.trim());
    return NextResponse.json(result);
  } catch (err) {
    console.error("Audit error:", err);
    return NextResponse.json(
      { error: "Failed to audit headline. Please try again." },
      { status: 500 }
    );
  }
}
