import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { ServiceTile } from "@/components/ui/service-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { RequestSection } from "@/components/home/request-section";
import { services } from "@/config/services";

export const metadata: Metadata = {
  title: "Pest management services",
  description:
    "Cockroach control, termite management, bedbug treatment, rodent control, mosquito control and more for homes and workplaces. Inspection first, treatment planned around your property.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Pest management, planned around your property."
        intro="Each service begins with an inspection, because the right treatment depends on the pest, the extent of activity and the building itself. These are the areas we work in."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        actions={
          <ButtonLink href="/contact#request" withArrow>
            Request an inspection
          </ButtonLink>
        }
      />

      <section className="py-section">
        <div className="shell">
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.slug} className="h-full">
                <ServiceTile service={service} />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-[var(--radius-panel)] border border-border bg-surface p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-h3 text-text">Not sure which one you need?</h2>
              <p className="mt-1 text-small text-text-secondary">
                That is normal. Describe what you have seen and we will work out the rest.
              </p>
            </div>
            <Link
              href="/contact"
              className="link-underline inline-flex items-center gap-1.5 text-small font-semibold text-primary"
            >
              Talk to our team
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <RequestSection />
    </>
  );
}
