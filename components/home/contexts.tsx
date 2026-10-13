import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { photos } from "@/config/media";

const contexts = [
  {
    title: "Homes & residential",
    body: "A whole-home assessment for households, shaped around the people and pets who live there.",
    items: ["Houses and apartments", "Rentals and managed properties", "Compounds and gardens"],
    href: "/services/residential-pest-management",
    photo: photos.contextResidential,
  },
  {
    title: "Business & commercial",
    body: "Discreet, scheduled work for premises — planned around your operating hours and requirements.",
    items: ["Offices and workspaces", "Hotels and food service", "Schools and institutions"],
    href: "/services/commercial-pest-management",
    photo: photos.contextCommercial,
  },
];

export function Contexts() {
  return (
    <section id="where-we-work" className="py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Where we work"
          title="Homes and workplaces, handled differently."
          intro="The pests may be the same, but the priorities are not. A family kitchen and a commercial store need different planning, scheduling and documentation."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {contexts.map((context, index) => (
            <Reveal key={context.title} delay={index * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface">
                <div className="relative aspect-[16/11] overflow-hidden bg-surface-2">
                  <Image
                    src={context.photo.src}
                    alt={context.photo.alt}
                    width={context.photo.width}
                    height={context.photo.height}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-h3 text-text">{context.title}</h3>
                  <p className="mt-2 text-body text-text-secondary">{context.body}</p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {context.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-small text-text-secondary"
                      >
                        <span className="h-px w-4 bg-clay" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={context.href}
                    className="link-underline mt-7 inline-flex items-center gap-1.5 self-start text-small font-semibold text-primary"
                  >
                    Explore this service
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
