import { siteConfig } from "@/config/site";
import { services } from "@/config/services";

/**
 * Structured data.
 *
 * Only details the business can actually substantiate are emitted. An
 * Organization node (name, URL, logo) is always safe. A `LocalBusiness` node
 * (telephone, address, service offers) is emitted ONLY when the operator has
 * supplied a real postal address through the environment, and its `email` only
 * when a real email has been supplied too — the shipped default is a
 * placeholder. No aggregate rating and no opening hours are emitted, because no
 * verified reviews and no confirmed hours exist. See README.md § SEO.
 */
export function StructuredData({ siteUrl }: { siteUrl: string }) {
  // The phone line is the business's real number (env-overridable); the postal
  // address and email are confirmed by the operator. A LocalBusiness node is
  // emitted only when a real address has been supplied — never invented.
  const phone = siteConfig.contact.phoneHref;
  const address1 = process.env.NEXT_PUBLIC_ADDRESS_1?.trim();
  const email = process.env.NEXT_PUBLIC_EMAIL?.trim();
  const verified = Boolean(address1);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteConfig.name,
      url: siteUrl,
      logo: `${siteUrl}/logo-mark.svg`,
      description: siteConfig.description,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-KE",
    },
  ];

  if (verified) {
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: siteConfig.name,
      url: siteUrl,
      image: `${siteUrl}/og-cover.png`,
      telephone: phone,
      ...(email ? { email } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: address1,
        addressLocality: siteConfig.location.area,
        addressCountry: "KE",
      },
      areaServed: siteConfig.location.area,
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.short,
        },
      })),
    });
  }

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // Content is a JSON.stringify of static, developer-controlled data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}
