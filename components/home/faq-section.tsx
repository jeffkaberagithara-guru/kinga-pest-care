import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { faqs } from "@/config/faqs";

export function FaqSection() {
  return (
    <section id="faqs" className="py-section">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Questions"
            title="Straight answers before you book."
            intro="If your question is not here, ask us directly — we would rather explain than have you guess."
          />
          <Link
            href="/faq"
            className="link-underline mt-6 inline-flex text-small font-semibold text-primary"
          >
            Read all frequently asked questions
          </Link>
        </div>

        <div className="lg:col-span-7">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
