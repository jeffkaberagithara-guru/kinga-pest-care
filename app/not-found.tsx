import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-section">
      <div className="shell flex max-w-2xl flex-col items-start gap-6">
        <p className="eyebrow text-clay-deep">404 — not found</p>
        <h1 className="text-h1 text-primary">That page isn&rsquo;t here.</h1>
        <p className="text-body-lg text-text-secondary">
          The page you were looking for may have moved or never existed. Here are some useful places
          to go instead.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            View services
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
