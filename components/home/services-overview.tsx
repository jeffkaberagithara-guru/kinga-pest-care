import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceTile } from "@/components/ui/service-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { services } from "@/config/services";

export function ServicesOverview() {
  return (
    <section id="services" className="py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="What we treat"
          title="Services, matched to the problem you actually have."
          intro="Pest problems are rarely solved by a generic treatment. These are the areas we work in — an inspection confirms which is right for your property."
          action={
            <Link
              href="/services"
              className="link-underline inline-flex items-center gap-1.5 text-small font-semibold text-primary"
            >
              View all services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <RevealItem key={service.slug} className="h-full">
              <ServiceTile service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
