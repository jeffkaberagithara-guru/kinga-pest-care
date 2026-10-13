import type { ContactData } from "@/lib/validation";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";

/**
 * Server-only contact delivery.
 *
 * Uses the Resend HTTP API through `fetch` so no SDK dependency is added.
 * Credentials are read from server-only environment variables and never reach
 * the browser. If the provider is not configured, delivery fails honestly with
 * `not_configured` so the UI can show a real fallback (call / WhatsApp) instead
 * of a false success. See README.md § Configuration and .env.example.
 */

export type SendResult =
  | { ok: true; provider: string }
  | { ok: false; reason: "not_configured" | "provider_error"; detail?: string };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const propertyLabel = (v: ContactData["propertyType"]) => {
  const map: Record<ContactData["propertyType"], string> = {
    home: "House / home",
    apartment: "Apartment",
    rental: "Rental / managed property",
    office: "Office / workspace",
    hospitality: "Hotel / hospitality",
    retail: "Retail / food service",
    school: "School / institution",
    warehouse: "Warehouse / light industry",
    other: "Other",
  };
  return map[v];
};

const methodLabel = (v: ContactData["contactMethod"]) => {
  const map: Record<ContactData["contactMethod"], string> = {
    phone: "Phone call",
    whatsapp: "WhatsApp",
    email: "Email",
  };
  return map[v];
};

const serviceLabel = (v: ContactData["service"]) => {
  if (v === "not-sure") return "Not sure — needs assessment";
  if (v === "other") return "Other / not listed";
  return services.find((s) => s.slug === v)?.name ?? v;
};

export function buildNotification(data: ContactData): {
  subject: string;
  text: string;
  html: string;
} {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email && data.email.length > 0 ? data.email : "— not provided —"],
    ["Preferred reply", methodLabel(data.contactMethod)],
    ["Property type", propertyLabel(data.propertyType)],
    ["Service", serviceLabel(data.service)],
    ["Service area", data.serviceArea],
  ];

  const subject = `Inspection request — ${serviceLabel(data.service)} — ${data.serviceArea}`;

  const text = [
    `New inspection request via ${siteConfig.name}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Problem description:",
    data.message,
    "",
    `Received: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#18241f">
  <h1 style="font-size:18px;margin:0 0 12px">New inspection request</h1>
  <table style="border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#5c685f;vertical-align:top">${escapeHtml(
            k,
          )}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
      )
      .join("")}
  </table>
  <h2 style="font-size:14px;margin:16px 0 4px">Problem description</h2>
  <p style="font-size:14px;white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
  <p style="font-size:12px;color:#5c685f;margin-top:16px">Received ${new Date().toISOString()}</p>
  </body></html>`;

  return { subject, text, html };
}

export async function sendContactMessage(data: ContactData): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "KINGA Pest Care <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return { ok: false, reason: "not_configured" };
  }

  const { subject, text, html } = buildNotification(data);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email && data.email.length > 0 ? data.email : undefined,
        subject,
        text,
        html,
      }),
      // Never let a slow provider hang the request.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return { ok: false, reason: "provider_error", detail: detail.slice(0, 300) };
    }

    return { ok: true, provider: "resend" };
  } catch (error) {
    return {
      ok: false,
      reason: "provider_error",
      detail: error instanceof Error ? error.message.slice(0, 300) : "unknown error",
    };
  }
}

/** Exposed so the API route can decide whether honest success is even possible. */
export const contactDeliveryConfigured = Boolean(
  process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_TO_EMAIL?.trim(),
);
