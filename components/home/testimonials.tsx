import { Quote } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/testimonials";

/**
 * Customer testimonials.
 *
 * Renders nothing until the company supplies real, authorised reviews in
 * `data/testimonials.ts` — an empty list is the shipped, intended state. No
 * rating, logo, statistic or review is ever invented (DESIGN.md §13).
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="border-y border-border bg-surface-3">
      <div className="shell py-section">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="In their words"
          title="What customers say about the work."
          intro="Published only with the customer's permission, and only where the review describes work we actually carried out."
        />

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <RevealItem
              key={`${testimonial.name}-${index}`}
              className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6"
            >
              <figure className="flex h-full flex-col">
                <Quote className="size-5 shrink-0 text-clay" aria-hidden="true" />
                <blockquote className="mt-4 text-body text-text-secondary">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <span className="block text-small font-semibold text-text">
                    {testimonial.name}
                  </span>
                  <span className="mt-0.5 block text-small text-muted">{testimonial.context}</span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
