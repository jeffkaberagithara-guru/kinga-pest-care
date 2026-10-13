import { siteConfig } from "@/config/site";
import { services } from "@/config/services";

/**
 * Structured data.
 *
 * Only details the business can actually substantiate are emitted. An
 * Organization node (name, URL, logo) is always safe. A full `LocalBusiness`
 * node with `telephone` and `address`, plus aggregate ratings and opening
 * hours, is emitted ONLY when the operator has supplied real values through
 * environment variables — never invented. There is no review schema, because
 * there are no verified reviews. See README.md § SEO.
 */
export function StructuredData({ siteUrl }: { siteUrl: string }) {
  // The phone line is the business's real number (env-overridable); the
  // address is confirmed by the operator. A full LocalBusiness node is emitted
  // only when a real address has been supplied — never invented.
  const phone = siteConfig.contact.phoneHref;
  const address1 = process.env.NEXT_PUBLIC_ADDRESS_1?.trim();
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
      email: siteConfig.contact.email,
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
