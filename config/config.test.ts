import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { faqs } from "@/config/faqs";
import { navLinks } from "@/config/nav";
import { ambientVideo, photos, servicePhotos } from "@/config/media";
import { services } from "@/config/services";
import { testimonials } from "@/data/testimonials";

const publicFile = (src: string) => path.join(process.cwd(), "public", src.replace(/^\//, ""));

/** Routes that actually exist on disk (static pages + service detail). */
const knownRoutes = new Set([
  "/",
  "/about",
  "/contact",
  "/faq",
  "/privacy",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
]);

describe("services", () => {
  it("has at least one service", () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it("uses unique slugs", () => {
    const slugs = services.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a registered photograph for every service", () => {
    for (const service of services) {
      expect(servicePhotos[service.slug], `missing photo for ${service.slug}`).toBeDefined();
    }
  });

  it("does not register photographs for unknown services", () => {
    const slugs = new Set(services.map((service) => service.slug));
    for (const key of Object.keys(servicePhotos)) {
      expect(slugs.has(key), `photo registered for unknown slug ${key}`).toBe(true);
    }
  });
});

describe("media assets", () => {
  const assets = [
    ...Object.values(photos).map((photo) => photo.src),
    ...Object.values(servicePhotos).map((photo) => photo.src),
    ambientVideo.src,
    ambientVideo.poster,
  ];

  it.each(assets)("has the referenced file on disk: %s", (src) => {
    expect(existsSync(publicFile(src)), `missing file for ${src}`).toBe(true);
  });

  it("gives every photograph meaningful alt text", () => {
    for (const photo of [...Object.values(photos), ...Object.values(servicePhotos)]) {
      expect(photo.alt.length).toBeGreaterThan(10);
    }
  });
});

describe("navigation", () => {
  it("points every primary nav link at a real route", () => {
    for (const link of navLinks) {
      const route = link.href.split("#")[0] ?? "";
      expect(knownRoutes.has(route), `nav link points at unknown route: ${link.href}`).toBe(true);
    }
  });
});

describe("content configuration", () => {
  it("ships at least one FAQ", () => {
    expect(faqs.length).toBeGreaterThan(0);
  });

  it("leaves testimonials empty until real reviews are supplied", () => {
    expect(Array.isArray(testimonials)).toBe(true);
    expect(testimonials).toHaveLength(0);
  });
});
