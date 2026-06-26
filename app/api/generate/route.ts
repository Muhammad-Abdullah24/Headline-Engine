import { NextRequest, NextResponse } from "next/server";
import { generateHeadlines } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, industry, icp, value, goal } = body;

    if (!role || !industry || !icp || !value || !goal) {
      return NextResponse.json(
        { error: "All five fields are required." },
        { status: 400 }
      );
    }

    const results = await generateHeadlines({ role, industry, icp, value, goal });
    return NextResponse.json(results);
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: "Failed to generate headlines. Please try again." },
      { status: 500 }
    );
  }
}
