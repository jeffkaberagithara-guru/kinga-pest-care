/**
 * Business configuration.
 *
 * Every business-specific value is environment-overridable. The phone and
 * WhatsApp number below are the real business line supplied by the company;
 * the remaining defaults are clearly-marked placeholders (email, address,
 * hours) and MUST be replaced before launch — see README.md § Configuration
 * and .env.example.
 *
 * Nothing here is a claim about the business. Credentials, licences, years of
 * experience, staff names and testimonials are intentionally absent: they are
 * supplied by the company, not invented by the website.
 */

const env = (key: string, fallback: string) => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
};

export const siteConfig = {
  name: env("NEXT_PUBLIC_BUSINESS_NAME", "KINGA Pest Care"),
  wordmark: env("NEXT_PUBLIC_BUSINESS_WORDMARK", "KINGA"),
  descriptor: env("NEXT_PUBLIC_BUSINESS_DESCRIPTOR", "Pest Care"),
  legalName: env("NEXT_PUBLIC_LEGAL_NAME", "KINGA Pest Care"),

  /** Swahili tagline is the brand voice; the English line is the promise. */
  taglineSw: "Ulinzi wa makazi. Utulivu wa moyo.",
  tagline: "Protection for your home. Peace of mind.",

  description:
    "Professional pest management for homes and workplaces. Inspection, a clear treatment plan and aftercare guidance for cockroaches, termites, bedbugs, rodents and mosquitoes.",

  /** Short announcement strip. `short` is used on small screens. */
  announcement: {
    main: "Now taking inspection requests for homes and workplaces.",
    short: "Now taking inspection requests.",
    action: "Request an inspection",
    href: "/contact#request",
  },

  contact: {
    phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "+254 707 764 281"),
    phoneHref: env("NEXT_PUBLIC_PHONE_HREF", "+254707764281"),
    whatsapp: env("NEXT_PUBLIC_WHATSAPP", "254707764281"),
    email: env("NEXT_PUBLIC_EMAIL", "hello@example.co.ke"),
  },

  /**
   * Urgent / emergency contact. The business supplies one line, used for
   * normal enquiries, urgent or emergency call-outs and inspection requests.
   * No response-time or 24/7 availability is claimed.
   */
  urgent: {
    label: "Urgent or emergency",
    note: "For a serious or fast-moving problem, call this line and describe what is happening. The same number handles routine enquiries and inspection requests.",
  },

  location: {
    line1: env("NEXT_PUBLIC_ADDRESS_1", "Office location to be confirmed"),
    line2: env("NEXT_PUBLIC_ADDRESS_2", "Nairobi, Kenya"),
    area: env("NEXT_PUBLIC_AREA", "Nairobi and surrounding areas"),
  },

  /** Service coverage. Confirm real coverage with the company before publishing. */
  serviceArea: {
    summary: env(
      "NEXT_PUBLIC_SERVICE_AREA",
      "Coverage areas are confirmed when you request an inspection.",
    ),
    contexts: [
      "Family homes and apartments",
      "Rental and managed properties",
      "Offices and workspaces",
      "Restaurants, hotels and hospitality",
      "Schools and institutions",
      "Warehouses and light industry",
    ],
  },

  hours: env("NEXT_PUBLIC_HOURS", "Business hours to be confirmed"),

  /** Regulatory body name only. No licence number is claimed unless supplied. */
  regulator: {
    name: "Pest Control Products Board (PCPB)",
    note: "Products used are selected and applied by qualified technical staff in line with the product label and current PCPB requirements.",
    licenceDisplay: env("NEXT_PUBLIC_PCPB_LICENCE", ""), // empty = not claimed
  },

  /** Social links. Empty by default — the footer renders nothing for empty. */
  social: [] as { label: string; href: string }[],
} as const;

export type SiteConfig = typeof siteConfig;

/** Canonical production URL (no trailing slash), shared by metadata, sitemap and robots. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || "https://kingapestcare.co.ke";

/**
 * True only when the operator has not supplied a real phone and email through
 * the environment. The phone number default is the business's real line; the
 * email default is a placeholder. Used to render an honest dev-only banner so
 * a demo build can never be mistaken for a fully configured live business.
 * See README.md.
 */
export const usingPlaceholders =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY === undefined &&
  process.env.NEXT_PUBLIC_EMAIL === undefined;

/** Builds a WhatsApp deep link from the configured number. */
export const waLink = (message: string) =>
  `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;

/** Builds a tel: link. */
export const telLink = () => `tel:${siteConfig.contact.phoneHref}`;

export const mailLink = () => `mailto:${siteConfig.contact.email}`;
