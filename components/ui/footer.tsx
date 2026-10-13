import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Logo } from "@/components/logo";
import { services } from "@/config/services";
import { mailLink, siteConfig, telLink, waLink } from "@/config/site";

const companyLinks = [
  { label: "Our approach", href: "/about" },
  { label: "All services", href: "/services" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="on-dark bg-primary-strong text-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-8">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 font-display text-[1.05rem] italic text-white/80">
            {siteConfig.taglineSw}
          </p>
          <p className="mt-2 text-small text-white/65">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Services">
          <h2 className="eyebrow text-accent-on-dark">Services</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-small text-white/75 transition-colors hover:text-white"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="eyebrow text-accent-on-dark">Company</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-small text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-accent-on-dark">Contact</h2>
          <ul className="mt-4 flex flex-col gap-3 text-small text-white/75">
            <li>
              <a
                href={telLink()}
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink("Hello KINGA Pest Care, I would like to request an inspection.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <MessageCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={mailLink()}
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{siteConfig.serviceArea.summary}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{siteConfig.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="shell flex flex-col gap-4 pb-28 pt-7 text-[0.8125rem] text-white/60 md:flex-row md:items-center md:justify-between md:pb-7">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-right">{siteConfig.regulator.note}</p>
        </div>
      </div>
    </footer>
  );
}
