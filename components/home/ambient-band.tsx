"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ambientVideo } from "@/config/media";
import { siteConfig } from "@/config/site";

/**
 * Ambient brand band.
 *
 * A single muted, decorative clip behind a forest overlay. It is only mounted
 * on larger screens when the visitor has not asked for reduced motion — the
 * still poster is the default and the fallback, so the band never gates
 * content, never autoplays for reduced-motion users and costs nothing on small
 * screens or slow connections.
 */
export function AmbientBand() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setPlay(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section aria-label="Our promise" className="relative overflow-hidden bg-primary">
      <Image
        src={ambientVideo.poster}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {play ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={ambientVideo.poster}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={ambientVideo.src} type="video/mp4" />
        </video>
      ) : null}

      <div className="absolute inset-0 bg-primary/85" aria-hidden="true" />

      <div className="relative shell flex min-h-[24rem] flex-col justify-center py-section sm:min-h-[28rem]">
        <p className="eyebrow text-accent-on-dark">Our promise</p>
        <p className="mt-5 max-w-3xl font-display text-h1 font-bold text-white">
          {siteConfig.tagline}
        </p>
        <p className="mt-3 font-display text-[1.15rem] italic text-accent-on-dark">
          {siteConfig.taglineSw}
        </p>
      </div>
    </section>
  );
}
