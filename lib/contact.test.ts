import { afterEach, describe, expect, it } from "vitest";

import { buildNotification, sendContactMessage } from "@/lib/contact";
import type { ContactData } from "@/lib/validation";

const data: ContactData = {
  name: "Amina Wanjiru",
  phone: "+254 712 345 678",
  email: "amina@example.com",
  propertyType: "home",
  service: "cockroach-control",
  serviceArea: "Kilimani",
  message: "Saw cockroaches in the kitchen cupboard overnight for about a week.",
  contactMethod: "whatsapp",
  consent: true,
  website: "",
};

const savedKey = process.env.RESEND_API_KEY;
const savedTo = process.env.CONTACT_TO_EMAIL;
const savedFrom = process.env.CONTACT_FROM_EMAIL;

const restore = (key: string, value: string | undefined) => {
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
};

afterEach(() => {
  restore("RESEND_API_KEY", savedKey);
  restore("CONTACT_TO_EMAIL", savedTo);
  restore("CONTACT_FROM_EMAIL", savedFrom);
});

describe("buildNotification", () => {
  it("includes every submitted field in the plain-text body", () => {
    const { text } = buildNotification(data);

    expect(text).toContain(data.name);
    expect(text).toContain(data.phone);
    expect(text).toContain(data.email);
    expect(text).toContain(data.serviceArea);
    expect(text).toContain(data.message);
  });

  it("escapes HTML in the delivered markup", () => {
    const { html } = buildNotification({
      ...data,
      name: "<script>alert('x')</script>",
      message: "Cats & dogs <b>only</b>",
    });

    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("Cats &amp; dogs");
  });

  it("labels a missing optional email rather than printing an empty value", () => {
    const { text } = buildNotification({ ...data, email: "" });
    expect(text).toContain("— not provided —");
  });

  it("names the requested service in the subject", () => {
    const { subject, text } = buildNotification(data);
    expect(subject).toContain(data.serviceArea);
    expect(text).not.toContain("undefined");
  });
});

describe("sendContactMessage", () => {
  it("reports not_configured when no provider credentials are set", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;

    const result = await sendContactMessage(data);
    expect(result).toEqual({ ok: false, reason: "not_configured" });
  });

  it("still reports not_configured when only the key is set", async () => {
    process.env.RESEND_API_KEY = "test-key";
    delete process.env.CONTACT_TO_EMAIL;

    const result = await sendContactMessage(data);
    expect(result).toEqual({ ok: false, reason: "not_configured" });
  });
});
