import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServiceIcon } from "@/components/ui/service-icon";
import type { Service } from "@/config/services";

/**
 * Service summary tile. The whole tile is a single link to the service page —
 * there is no second interactive element inside, so no nested-interactive
 * problem. Hover lift is CSS-only and removed under reduced motion.
 */
export function ServiceTile({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-lift)] motion-reduce:transform-none motion-reduce:hover:shadow-none"
    >
      <span className="texture-rings flex size-12 items-center justify-center rounded-[var(--radius-sm)] bg-primary-soft transition-colors duration-200 group-hover:bg-accent">
        <ServiceIcon
          icon={service.icon}
          className="text-primary transition-colors duration-200 group-hover:text-accent-ink"
        />
      </span>
      <h3 className="mt-5 text-h3 text-text">{service.name}</h3>
      <p className="mt-2 flex-1 text-small text-text-secondary">{service.short}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-small font-semibold text-primary">
        Learn more
        <ArrowRight
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
