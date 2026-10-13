import { Building2, ClipboardCheck, FileText, ShieldCheck, type LucideIcon } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * Trust strip — process commitments, not credentials.
 *
 * These describe how the business works, so nothing here needs to be
 * substantiated with a licence or a number. Real credentials, years of
 * experience and certifications should replace or extend this list only once
 * the company has supplied them.
 */
const commitments: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ClipboardCheck,
    title: "Inspection before treatment",
    body: "We assess the property before recommending anything.",
  },
  {
    icon: FileText,
    title: "Written preparation steps",
    body: "You know how to prepare before we arrive.",
  },
  {
    icon: ShieldCheck,
    title: "Clear aftercare guidance",
    body: "Re-entry and follow-up are explained after treatment.",
  },
  {
    icon: Building2,
    title: "Homes & businesses",
    body: "One team for homes, offices and premises.",
  },
];

export function TrustStrip() {
  return (
    <section aria-label="How we work" className="border-y border-border bg-surface">
      <h2 className="sr-only">How we work</h2>
      <RevealGroup className="shell grid grid-cols-1 gap-x-10 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {commitments.map((c) => (
          <RevealItem key={c.title} className="border-t border-border pt-5">
            <c.icon className="size-5 text-primary" aria-hidden="true" />
            <h3 className="mt-4 text-[0.975rem] font-semibold text-text">{c.title}</h3>
            <p className="mt-1.5 text-small text-muted">{c.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
