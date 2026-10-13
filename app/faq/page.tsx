import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ButtonLink } from "@/components/ui/button";
import { faqs } from "@/config/faqs";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about pest treatment safety, preparation, re-entry, cost and what to expect — written honestly, without promises we cannot keep.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Frequently asked questions."
        intro="Clear answers to the questions we are asked most, including the ones about safety and cost that other sites avoid."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />

      <section className="py-section">
        <div className="shell max-w-4xl">
          <FaqAccordion items={faqs} />

          <div className="mt-10 flex flex-col items-start gap-4 rounded-[var(--radius-panel)] border border-border bg-surface p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-h3 text-text">Still unsure about something?</h2>
              <p className="mt-1 text-small text-text-secondary">
                Ask us directly — we would rather explain than have you guess.
              </p>
            </div>
            <ButtonLink href="/contact" withArrow>
              Contact us
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
