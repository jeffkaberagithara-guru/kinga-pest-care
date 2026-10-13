import type { Metadata } from "next";
import Image from "next/image";
import { X } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { StepList } from "@/components/ui/step-list";
import { Contexts } from "@/components/home/contexts";
import { RequestSection } from "@/components/home/request-section";
import { processSteps } from "@/config/process";
import { photos } from "@/config/media";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Our approach",
  description:
    "How KINGA Pest Care works: inspection first, a treatment plan matched to the property, clear preparation steps and aftercare guidance. No guarantees we cannot keep.",
  alternates: { canonical: "/about" },
};

const notClaimed = [
  "We do not promise to eliminate every pest for good.",
  "We do not describe treatment as chemical-free or risk-free.",
  "We do not claim any treatment is universally safe for children and pets.",
  "We do not invent credentials, awards or years of experience.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our approach"
        title="Pest management you can actually understand."
        intro="Our work rests on four habits: assess before treating, treat what is actually there, tell you what to prepare, and tell you what happens next. Everything else follows from those."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our approach" }]}
      />

      <section className="py-section">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface-2">
              <Image
                src={photos.aboutApproach.src}
                alt={photos.aboutApproach.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-h2 text-text">A calmer way to deal with a pest problem</h2>
            <p className="mt-5 text-body-lg text-text-secondary">
              Pest problems are stressful, and they are usually made worse by guesswork. Our job is
              to remove the guesswork: find out what is really happening, explain the options in
              plain language, and give you clear instructions so you are never unsure about what to
              do.
            </p>
            <p className="mt-4 text-body text-text-secondary">
              We work with homes and with businesses, and we adapt the plan to the space — a family
              kitchen is not the same as a commercial store room.
            </p>
          </div>

          <StepList steps={processSteps} className="lg:col-span-7" />
        </div>
      </section>

      <section className="border-y border-border bg-surface-2">
        <div className="shell grid gap-10 py-section lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-clay-deep">Honesty</p>
            <h2 className="mt-4 text-h2 text-text">What we will not tell you.</h2>
            <p className="mt-4 text-body text-text-secondary">
              Responsible pest management means being straight about what treatment can and cannot
              do. If a promise sounds too easy, it usually is.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {notClaimed.map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5 text-body text-text-secondary"
              >
                <X className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contexts />

      <section className="pb-section">
        <div className="shell max-w-3xl">
          <h2 className="text-h2 text-text">About the business</h2>
          <p className="mt-5 rounded-[var(--radius-card)] border border-dashed border-border-strong bg-surface p-6 text-body text-text-secondary">
            {siteConfig.legalName} &mdash; company story, team, qualifications and regulatory
            registration details are supplied by the business and will appear here once confirmed.
            This website does not invent biographies, credentials or certifications.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" withArrow>
              Talk to our team
            </ButtonLink>
          </div>
        </div>
      </section>

      <RequestSection />
    </>
  );
}
