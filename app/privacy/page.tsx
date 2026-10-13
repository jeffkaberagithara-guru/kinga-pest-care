import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";
import { mailLink, siteConfig, telLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "What personal information this website collects through its contact form, why it is needed, who processes it and how to contact us about your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/** Update this whenever the data practices below change. */
const LAST_UPDATED = "2026-01-01";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-h3 text-text">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy notice"
        intro="This notice explains, in plain language, what happens to the information you send us through this website."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <div className="shell max-w-3xl space-y-10 py-section">
        <p className="text-small text-muted">Last updated: {LAST_UPDATED}</p>

        <Section title="Who we are">
          <p className="text-body text-text-secondary">
            {siteConfig.legalName} is responsible for the personal information described here. You
            can reach us using the contact details at the end of this notice.
          </p>
        </Section>

        <Section title="What we collect">
          <p className="text-body text-text-secondary">
            We only collect what the inspection-request form asks for:
          </p>
          <ul className="ml-5 list-disc space-y-1.5 text-body text-text-secondary">
            <li>Your name and phone number;</li>
            <li>Your email address, if you choose to provide it;</li>
            <li>The property type, the service or pest category and the location you enter;</li>
            <li>The description of the problem you write;</li>
            <li>Your preferred way to be contacted.</li>
          </ul>
          <p className="text-body text-text-secondary">
            We do not collect payment details, and we do not ask for information we do not need to
            respond to your request.
          </p>
        </Section>

        <Section title="Why we need it">
          <p className="text-body text-text-secondary">
            We use your information solely to respond to your request, to arrange and carry out an
            inspection or treatment, and to keep a record of the work. We rely on your consent,
            which you give by submitting the form and by the acknowledgement on it. We do not use
            your information for marketing, and we do not sell it.
          </p>
        </Section>

        <Section title="Who processes it">
          <p className="text-body text-text-secondary">
            When you submit the form, its contents are sent over an encrypted connection to our
            website server and then delivered to our business email inbox through a third-party
            email delivery provider. That provider processes the message content on our behalf in
            order to deliver it. Our website is hosted by a third-party hosting provider that also
            processes data on our behalf. We share your information with no one else, unless we are
            required to by law.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p className="text-body text-text-secondary">
            We keep inspection requests only for as long as they are needed to respond and, where
            the work goes ahead, to keep a reasonable record of it. After that they are deleted. You
            can ask us to delete your information sooner.
          </p>
        </Section>

        <Section title="Cookies and analytics">
          <p className="text-body text-text-secondary">
            This website does not set advertising or tracking cookies and does not run third-party
            analytics. It works without cookies for normal browsing.
          </p>
        </Section>

        <Section title="Your choices">
          <p className="text-body text-text-secondary">
            You can ask us what information we hold about you and request a correction or deletion.
            Contact us and we will action reasonable requests. If you would prefer not to use the
            form, you can reach us by phone or email instead.
          </p>
        </Section>

        <Section title="Keeping it secure">
          <p className="text-body text-text-secondary">
            The site is served over HTTPS. Form submissions are validated on the server,
            rate-limited to deter automated abuse, and protected against common web risks. Access to
            requests is limited to the people who need it to do the work.
          </p>
        </Section>

        <Section title="Contact us about your information">
          <p className="text-body text-text-secondary">
            For any privacy question or request, contact {siteConfig.legalName} using the details
            below. These are the same channels you use to reach us about your pest problem.
          </p>
          <ul className="space-y-2 text-body">
            <li>
              Phone:{" "}
              <a href={telLink()} className="link-underline font-semibold text-primary">
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li>
              Email:{" "}
              <a href={mailLink()} className="link-underline font-semibold text-primary">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </Section>

        <p className="rounded-[var(--radius-card)] border border-border bg-surface p-5 text-small text-muted">
          This notice describes how the website handles information. It is written to match the
          actual implementation and should be reviewed by the business before launch. It is not
          legal advice.
        </p>
      </div>
    </>
  );
}
