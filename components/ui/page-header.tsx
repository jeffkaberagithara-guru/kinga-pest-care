import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";

/** Shared page masthead: breadcrumb, eyebrow, title and intro. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  actions,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
}) {
  return (
    <section className="border-b border-border">
      <div className="shell py-section-sm">
        {breadcrumbs && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow text-clay-deep">{eyebrow}</p>}
          <h1 className="mt-4 text-h1 text-primary">{title}</h1>
          {intro && <p className="mt-5 text-body-lg text-text-secondary">{intro}</p>}
        </div>
        {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </section>
  );
}
