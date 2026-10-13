"use client";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

export type Step = { number: string; title: string; body: string };

/**
 * Numbered editorial step list (the brand's "specimen number + hairline" look).
 *
 * Used by the home process, the about page and service pages so every numbered
 * sequence shares one alignment rhythm and reveal animation. Items are `<li>`
 * in a semantic `<ol>`; the heading column sits in a 5-col grid beside it.
 */
export function StepList({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <RevealGroup as="ol" className={className}>
      {steps.map((step) => (
        <RevealItem
          key={step.number}
          as="li"
          className={cn(
            "grid grid-cols-[auto_1fr] gap-5 border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0 sm:gap-6 sm:py-7",
          )}
        >
          <span className="font-display text-h2 leading-none text-clay" aria-hidden="true">
            {step.number}
          </span>
          <div>
            <h3 className="text-h3 text-text">{step.title}</h3>
            <p className="mt-1.5 text-body text-text-secondary sm:mt-2">{step.body}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
