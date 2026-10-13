import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { sendContactMessage } from "@/lib/contact";

/**
 * Contact / inspection-request endpoint.
 *
 * Defence in depth, in order:
 *  1. Method + content-type + body-size sanity.
 *  2. Per-IP rate limit (in-memory; see lib/rate-limit.ts for the caveat).
 *  3. Honeypot field — if filled, report success to the bot but do nothing.
 *  4. Server-side Zod validation (the client result is never trusted).
 *  5. Delivery through a configured provider; if unconfigured, an honest
 *     503 with a call/WhatsApp fallback instead of a fake success.
 *
 * Error responses never leak stack traces or secrets.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16_000;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, code: "bad_request", message: "Expected a JSON request." },
      { status: 415 },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, code: "too_large", message: "That request was too large." },
      { status: 413 },
    );
  }

  const limit = rateLimit(`contact:${clientKey(request.headers)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        code: "rate_limited",
        message: "You've sent several requests already. Please try again shortly, or call us.",
        retryAfterSeconds: limit.retryAfterSeconds,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_json", message: "We couldn't read that request." },
      { status: 400 },
    );
  }

  // Honeypot: a hidden field a real user cannot see or fill. Checked before
  // validation so a bot gets an apparent success and is then dropped. (The
  // schema also forbids a value, so this stays a defence in depth.)
  const record = json && typeof json === "object" ? (json as Record<string, unknown>) : {};
  const honeypot = typeof record.website === "string" ? record.website : "";
  if (honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true, message: "Thank you." }, { status: 200 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: "invalid", errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;

  const result = await sendContactMessage(data);

  if (!result.ok) {
    if (result.reason === "not_configured") {
      return NextResponse.json(
        {
          ok: false,
          code: "not_configured",
          message:
            "Online requests aren't connected yet. Please call or send a WhatsApp message and we'll help you straight away.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        ok: false,
        code: "delivery_failed",
        message:
          "Something went wrong sending your request. Please try again, or call or WhatsApp us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you — your request has been received. We'll be in touch to arrange the inspection.",
  });
}
