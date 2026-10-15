import { describe, expect, it } from "vitest";

import { clientKey, rateLimit } from "@/lib/rate-limit";

const WINDOW = 60_000;

describe("rateLimit", () => {
  it("allows requests up to the limit and reports what remains", () => {
    const key = `test:allow:${Math.random()}`;
    const first = rateLimit(key, 3, WINDOW);
    const second = rateLimit(key, 3, WINDOW);
    const third = rateLimit(key, 3, WINDOW);

    expect(first.ok).toBe(true);
    expect(first.remaining).toBe(2);
    expect(second.remaining).toBe(1);
    expect(third.ok).toBe(true);
    expect(third.remaining).toBe(0);
  });

  it("blocks the request after the limit is reached", () => {
    const key = `test:block:${Math.random()}`;
    rateLimit(key, 2, WINDOW);
    rateLimit(key, 2, WINDOW);
    const blocked = rateLimit(key, 2, WINDOW);

    expect(blocked.ok).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("tracks separate keys independently", () => {
    const a = rateLimit(`test:a:${Math.random()}`, 1, WINDOW);
    const b = rateLimit(`test:b:${Math.random()}`, 1, WINDOW);

    expect(a.ok).toBe(true);
    expect(b.ok).toBe(true);
  });

  it("starts a fresh window once the previous one has expired", async () => {
    const key = `test:expire:${Math.random()}`;
    rateLimit(key, 1, 10);
    expect(rateLimit(key, 1, 10).ok).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, 25));

    expect(rateLimit(key, 1, 10).ok).toBe(true);
  });
});

describe("clientKey", () => {
  it("uses the first address of a forwarded chain", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" });
    expect(clientKey(headers)).toBe("203.0.113.7");
  });

  it("falls back to x-real-ip", () => {
    const headers = new Headers({ "x-real-ip": "198.51.100.4" });
    expect(clientKey(headers)).toBe("198.51.100.4");
  });

  it("falls back to a constant when no client headers are present", () => {
    expect(clientKey(new Headers())).toBe("unknown");
  });
});
