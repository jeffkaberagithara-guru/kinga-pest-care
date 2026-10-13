import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { ServiceIcon } from "@/components/ui/service-icon";
import { SafetyNote } from "@/components/ui/safety-note";
import { StepList } from "@/components/ui/step-list";
import { RequestSection } from "@/components/home/request-section";
import { servicePhotos } from "@/config/media";
import { services, serviceBySlug, serviceSlugs } from "@/config/services";
import { siteConfig } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.name,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${siteConfig.name}`,
      description: service.short,
      url: `/services/${service.slug}`,
      images: [
        {
          url: "/og-cover.png",
          width: 1200,
          height: 630,
          alt: `${service.name} — ${siteConfig.name}`,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const photo = servicePhotos[service.slug];
  const approachSteps = service.approach.map((step, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: step.title,
    body: step.body,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.name}
        intro={service.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
        actions={
          <>
            <ButtonLink href="/contact#request" size="lg" withArrow>
              Request an inspection
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary">
              Talk to our team
            </ButtonLink>
          </>
        }
      />

      <section className="py-section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-14 lg:col-span-7">
            {photo && (
              <figure className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface-2">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </figure>
            )}

            <div>
              <h2 className="text-h2 text-text">Signs to look for</h2>
              <p className="mt-2 text-body text-text-secondary">
                These are observations, not a diagnosis. A short inspection confirms what is
                actually present.
              </p>
              <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {service.signs.map((sign) => (
                  <li key={sign} className="flex gap-3 text-body text-text-secondary">
                    <Check className="mt-1 size-4 shrink-0 text-clay" aria-hidden="true" />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-h2 text-text">How we approach it</h2>
              <StepList steps={approachSteps} className="mt-7" />
            </div>

            <SafetyNote />
          </div>

          <aside className="lg:col-span-5">
            <div className="flex flex-col gap-5 lg:sticky lg:top-28">
              <div className="rounded-[var(--radius-panel)] bg-primary p-7 text-white">
                <span className="flex size-12 items-center justify-center rounded-[var(--radius-sm)] bg-white/10">
                  <ServiceIcon icon={service.icon} className="text-accent-on-dark" />
                </span>
                <h2 className="mt-5 font-display text-[1.15rem] font-bold">What this protects</h2>
                <p className="mt-2 text-small text-white/75">{service.protects}</p>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-white/15 pt-5">
                  {service.focus.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-small text-white/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[var(--radius-panel)] border border-border bg-surface p-6">
                <h2 className="text-h3 text-text">Ready to arrange an inspection?</h2>
                <p className="mt-1.5 text-small text-text-secondary">
                  Tell us what you&rsquo;ve seen and where. No commitment until the details are
                  agreed.
                </p>
                <ButtonLink href="/contact#request" className="mt-4" withArrow>
                  Request an inspection
                </ButtonLink>
              </div>

              <Link
                href="/services"
                className="link-underline inline-flex items-center gap-1.5 self-start text-small font-semibold text-primary"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                All services
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <RequestSection />
    </>
  );
}
