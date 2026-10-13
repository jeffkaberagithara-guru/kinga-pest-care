import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/validation";

const valid = {
  name: "Amina Wanjiru",
  phone: "+254 712 345 678",
  email: "",
  propertyType: "home" as const,
  service: "cockroach-control" as const,
  serviceArea: "Kilimani",
  message: "Saw cockroaches in the kitchen cupboard overnight for about a week.",
  contactMethod: "whatsapp" as const,
  consent: true as const,
  website: "",
};

describe("contactSchema", () => {
  it("accepts a complete, valid request", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("accepts an optional, empty email", () => {
    const result = contactSchema.safeParse({ ...valid, email: "" });
    expect(result.success).toBe(true);
  });

  it("rejects a malformed email", () => {
    const result = contactSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a phone number with too few digits", () => {
    const result = contactSchema.safeParse({ ...valid, phone: "12345" });
    expect(result.success).toBe(false);
  });

  it("requires consent", () => {
    const result = contactSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactSchema.safeParse({ ...valid, message: "help" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown service value", () => {
    const result = contactSchema.safeParse({ ...valid, service: "not-a-service" });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    const result = contactSchema.safeParse({ ...valid, website: "http://spam.example" });
    expect(result.success).toBe(false);
  });
});
