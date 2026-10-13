/**
 * Minimal in-memory rate limiter.
 *
 * A sliding window keyed by client identifier. This is proportionate for a
 * public contact form on a single instance. It is NOT a distributed limiter:
 * on serverless or multi-instance hosting each instance holds its own window.
 * README.md documents swapping this for a shared store (e.g. Upstash) when the
 * deployment scales. Never a substitute for the honeypot and server validation.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();
const MAX_KEYS = 5000;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > MAX_KEYS) {
    for (const [k, v] of buckets) {
      if (v.resetAt <= now) buckets.delete(k);
    }
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: limit - existing.count,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/** Best-effort client identifier from proxy headers, falling back to a constant. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip")?.trim() || "unknown";
}
