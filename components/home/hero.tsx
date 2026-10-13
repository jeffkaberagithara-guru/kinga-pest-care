"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { photos } from "@/config/media";
import { siteConfig } from "@/config/site";

const easings = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.6, ease: easings } },
  };

  return (
    <section className="relative overflow-hidden">
      <div className="shell grid items-center gap-14 py-section lg:grid-cols-12 lg:gap-10">
        <motion.div className="lg:col-span-7" variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow text-clay-deep">
            Pest management for homes &amp; workplaces
          </motion.p>

          <motion.h1 variants={item} className="mt-5 text-display text-primary">
            Your space, protected with precision.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-body-lg text-text-secondary">
            Professional pest management for homes and workplaces, with clear guidance on treatment
            and aftercare.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
          >
            <ButtonLink href="/contact#request" size="lg" withArrow className="w-full sm:w-auto">
              Request an inspection
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary" className="w-full sm:w-auto">
              Talk to our team
            </ButtonLink>
          </motion.div>

          <motion.p variants={item} className="mt-7 flex items-center gap-2 text-small text-muted">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            {siteConfig.serviceArea.summary}
          </motion.p>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduce ? 0.2 : 0.85, delay: reduce ? 0 : 0.15, ease: easings }}
        >
          <HeroPanel />
        </motion.div>
      </div>
    </section>
  );
}

/** Editorial photo panel: a calm, well-kept interior. */
function HeroPanel() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-panel)] bg-primary shadow-[var(--shadow-panel)]">
      <Image
        src={photos.hero.src}
        alt={photos.hero.alt}
        fill
        priority
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
