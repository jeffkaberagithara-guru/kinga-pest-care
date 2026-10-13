import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { contactDeliveryConfigured } from "@/lib/contact";
import { mailLink, siteConfig, telLink, waLink } from "@/config/site";

export function RequestSection() {
  const configured = contactDeliveryConfigured;

  return (
    <section id="request" className="scroll-mt-24 border-y border-border bg-surface-2">
      <div className="shell grid gap-12 py-section lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Request an inspection"
            title="Tell us what you're seeing."
            intro="A few details are enough to start. We'll assess the property before recommending any treatment, so there is nothing to commit to yet."
          />

          <div className="mt-8 rounded-[var(--radius-panel)] border border-clay/30 bg-surface p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-clay/15">
                <Phone className="size-[1.05rem] text-clay-deep" aria-hidden="true" />
              </span>
              <h3 className="text-[0.975rem] font-semibold text-text">{siteConfig.urgent.label}</h3>
            </div>
            <p className="mt-3 text-small text-text-secondary">{siteConfig.urgent.note}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={telLink()}
                className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-pill)] bg-primary px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={waLink("Hello KINGA Pest Care, I have an urgent pest problem to report.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-pill)] border border-primary px-5 text-[0.9375rem] font-semibold text-primary transition-colors hover:bg-primary-soft"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp us
              </a>
            </div>
          </div>

          <ul className="mt-8 flex flex-col gap-4">
            <li>
              <a
                href={telLink()}
                className="flex items-center gap-3 text-body text-text transition-colors hover:text-primary"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-surface">
                  <Phone className="size-[1.05rem] text-primary" aria-hidden="true" />
                </span>
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink("Hello KINGA Pest Care, I would like to request an inspection.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-body text-text transition-colors hover:text-primary"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-surface">
                  <MessageCircle className="size-[1.05rem] text-primary" aria-hidden="true" />
                </span>
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={mailLink()}
                className="flex items-center gap-3 text-body text-text transition-colors hover:text-primary"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-surface">
                  <Mail className="size-[1.05rem] text-primary" aria-hidden="true" />
                </span>
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-body text-text-secondary">
              <span className="flex size-10 items-center justify-center rounded-full bg-surface">
                <MapPin className="size-[1.05rem] text-primary" aria-hidden="true" />
              </span>
              {siteConfig.serviceArea.summary}
            </li>
            <li className="flex items-center gap-3 text-body text-text-secondary">
              <span className="flex size-10 items-center justify-center rounded-full bg-surface">
                <Clock className="size-[1.05rem] text-primary" aria-hidden="true" />
              </span>
              {siteConfig.hours}
            </li>
          </ul>

          <p className="mt-8 rounded-[var(--radius-card)] border border-border bg-surface p-4 text-small text-muted">
            Requesting an inspection is not a confirmed booking. We&rsquo;ll contact you to confirm
            the details, timing and any cost before anything is agreed.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ContactForm deliveryConfigured={configured} />
        </div>
      </div>
    </section>
  );
}
