import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/config/services";
import { siteUrl } from "@/config/site";

/**
 * Every indexable route. `/api/*` is excluded (and disallowed in robots).
 * No `lastModified` is claimed — a guessed freshness signal is worse than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1 },
    { url: `${siteUrl}/services`, priority: 0.9 },
    { url: `${siteUrl}/about`, priority: 0.5 },
    { url: `${siteUrl}/faq`, priority: 0.6 },
    { url: `${siteUrl}/contact`, priority: 0.8 },
    { url: `${siteUrl}/privacy`, priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
