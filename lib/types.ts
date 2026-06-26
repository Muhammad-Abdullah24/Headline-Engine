export interface AuditResult {
  clarity: { score: number; explanation: string };
  attraction: { score: number; explanation: string };
  differentiation: { score: number; explanation: string };
  overall_verdict: string;
}

export interface HeadlineVariant {
  goal: string;
  headline: string;
  explanation: string;
  scores: {
    clarity: number;
    attraction: number;
    differentiation: number;
  };
  icp_mirror: string;
  algorithm: {
    status: "optimized" | "partial" | "not_optimized";
    note: string;
  };
}

export interface FormData {
  role: string;
  industry: string;
  icp: string;
  value: string;
  goal: string;
}

export type HeadlineGoal =
  | "Inbound Leads"
  | "Speaking Opportunities"
  | "Media & Press"
  | "Recruiting Talent"
  | "Partnership Conversations";
