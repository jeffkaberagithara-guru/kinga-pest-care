import type { Metadata } from "next";
import { MapPin } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { RequestSection } from "@/components/home/request-section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a pest inspection for your home or workplace. Call, WhatsApp or send an inspection request — we'll confirm the details with you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's get your space protected."
        intro="Use the form below, call, or message us on WhatsApp. A request is not a confirmed booking — we'll confirm the details and any cost before anything is agreed."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <RequestSection />

      <section className="py-section">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-clay-deep">Coverage</p>
            <h2 className="mt-4 text-h2 text-text">Where we work</h2>
            <p className="mt-4 flex items-start gap-2.5 text-body text-text-secondary">
              <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              {siteConfig.serviceArea.summary}
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:col-span-8">
            {siteConfig.serviceArea.contexts.map((context) => (
              <li
                key={context}
                className="flex items-center gap-3 border-b border-border pb-3 text-body text-text-secondary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
                {context}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
