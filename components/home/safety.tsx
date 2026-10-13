import { AlertTriangle } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

const points = [
  {
    title: "Preparation is specific",
    body: "What you clear, wash, contain or cover depends on the treatment. You receive written steps for your property before the visit.",
  },
  {
    title: "Re-entry varies",
    body: "How long to stay away and how long to ventilate is set by the product and the method — not a single number we can quote in advance.",
  },
  {
    title: "Children, pets and food",
    body: "Your plan states the precautions that apply to your household, so you can arrange the day with confidence.",
  },
];

export function Safety() {
  return (
    <section id="safety" className="border-y border-border bg-surface-2">
      <div className="texture-rings">
        <div className="shell grid gap-14 py-section lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Safety & preparation"
              title="Careful treatment is about instructions, not imagery."
              intro="Pest-control products are applied for a reason. How safely a treatment goes depends on how it is prepared, applied, ventilated and re-entered — and that is specific to the product, the method and your property."
            />
            <p className="mt-6 max-w-xl text-body text-text-secondary">
              We give you the instructions for your treatment in writing. Please follow the product
              label and your technician&rsquo;s guidance; they take priority over anything on this
              website.
            </p>
          </div>

          <div className="lg:col-span-6">
            <RevealGroup className="flex flex-col gap-4">
              {points.map((point) => (
                <RevealItem
                  key={point.title}
                  className="flex gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5"
                >
                  <AlertTriangle
                    className="mt-0.5 size-5 shrink-0 text-clay-deep"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-[0.975rem] font-semibold text-text">{point.title}</h3>
                    <p className="mt-1 text-small text-text-secondary">{point.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="mt-6 rounded-[var(--radius-card)] bg-primary-soft p-5 text-small text-text-secondary">
              <span className="font-semibold text-primary">{siteConfig.regulator.name}.</span>{" "}
              {siteConfig.regulator.note}
              {siteConfig.regulator.licenceDisplay ? (
                <> Registration: {siteConfig.regulator.licenceDisplay}.</>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
