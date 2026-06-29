import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Per-IP rate limiting backed by Upstash Redis.
 *
 * Why Redis and not in-memory counters: on Vercel each request may hit a
 * different (and ephemeral) serverless instance, so an in-process Map gives no
 * real protection. Upstash is a serverless-friendly Redis over HTTP.
 *
 * Behaviour:
 *  - If the Upstash env vars are absent (e.g. local dev) limiting is DISABLED
 *    and a one-time warning is logged. Set them in production — they are what
 *    stops a stranger from running up the OpenAI bill.
 *  - If Redis errors at request time we FAIL OPEN, so a Redis outage degrades
 *    protection but never takes the tool down.
 */

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

let warned = false;
function warnOnce() {
  if (!warned) {
    warned = true;
    console.warn(
      "[ratelimit] UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set — " +
        "rate limiting is DISABLED. Set them in production to protect the OpenAI key from abuse."
    );
  }
}

const redis = hasUpstash ? Redis.fromEnv() : null;

type Window = Parameters<typeof Ratelimit.slidingWindow>[1];

function makeLimiter(tokens: number, window: Window): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window),
    analytics: true,
    prefix: "hirenum-headline",
  });
}

// Generation is the expensive call (5 variants, larger model) — keep it tighter
// than the cheap single-shot audit.
const limiters: Record<RateKind, Ratelimit | null> = {
  generate: makeLimiter(15, "1 h"),
  audit: makeLimiter(40, "1 h"),
};

export type RateKind = "audit" | "generate";

export interface RateResult {
  ok: boolean;
  remaining?: number;
  reset?: number;
}

/** Best-effort client IP. On Vercel x-forwarded-for is set by the platform. */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "anonymous";
}

export async function checkRateLimit(kind: RateKind, ip: string): Promise<RateResult> {
  const limiter = limiters[kind];
  if (!limiter) {
    warnOnce();
    return { ok: true };
  }
  try {
    const { success, remaining, reset } = await limiter.limit(`${kind}:${ip}`);
    return { ok: success, remaining, reset };
  } catch (err) {
    // Fail open: never let a Redis hiccup break the product.
    console.error("[ratelimit] limiter error, failing open:", err);
    return { ok: true };
  }
}

/** Standard rate-limit response headers (Retry-After in seconds). */
export function rateLimitHeaders(r: RateResult): Record<string, string> {
  const headers: Record<string, string> = {};
  if (r.reset) {
    headers["Retry-After"] = Math.max(0, Math.ceil((r.reset - Date.now()) / 1000)).toString();
  }
  if (typeof r.remaining === "number") {
    headers["X-RateLimit-Remaining"] = r.remaining.toString();
  }
  return headers;
}
