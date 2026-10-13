import { z } from "zod";
import { serviceSlugs } from "@/config/services";

/**
 * Single source of truth for contact-form shape and rules.
 *
 * The same schema validates on the client (for immediate feedback) and on the
 * server (for security). The server never trusts the client result — see
 * app/api/contact/route.ts. Messages are written for customers, not developers.
 */

export const propertyTypes = [
  "home",
  "apartment",
  "rental",
  "office",
  "hospitality",
  "retail",
  "school",
  "warehouse",
  "other",
] as const;
export type PropertyType = (typeof propertyTypes)[number];

export const contactMethods = ["phone", "whatsapp", "email"] as const;
export type ContactMethod = (typeof contactMethods)[number];

/** Service choices = "not sure" + every configured service + "other". */
export const serviceOptions = ["not-sure", ...serviceSlugs, "other"] as const;
export type ServiceOption = (typeof serviceOptions)[number];

const phonePattern = /^[+()\-.\s\d]{7,24}$/;
const hasEnoughDigits = (value: string) => value.replace(/\D/g, "").length >= 7;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please use 80 characters or fewer."),

  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number.")
    .max(24, "Please use 24 characters or fewer.")
    .regex(phonePattern, "Please enter a valid phone number.")
    .refine(hasEnoughDigits, "Please enter a valid phone number."),

  email: z
    .union([z.string().trim().email("Please enter a valid email address."), z.literal("")])
    .optional(),

  propertyType: z.enum(propertyTypes, {
    errorMap: () => ({ message: "Please choose a property type." }),
  }),

  service: z.enum(serviceOptions, {
    errorMap: () => ({ message: "Please choose a service, or select 'Not sure'." }),
  }),

  serviceArea: z
    .string()
    .trim()
    .min(2, "Please tell us where the property is.")
    .max(120, "Please use 120 characters or fewer."),

  message: z
    .string()
    .trim()
    .min(10, "Please describe the problem in a little more detail.")
    .max(1500, "Please use 1500 characters or fewer."),

  contactMethod: z.enum(contactMethods, {
    errorMap: () => ({ message: "Please choose how you'd like us to reply." }),
  }),

  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you agree to how we handle your details." }),
  }),

  /** Honeypot — must stay empty. Never shown to a real user. */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/** Flattens Zod issues into a field → first message map for the UI. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
