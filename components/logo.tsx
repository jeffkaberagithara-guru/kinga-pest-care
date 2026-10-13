import Link from "next/link";
import type { MouseEventHandler } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * KINGA mark — "Living Shield".
 *
 * A protection shield whose interior is a leaf: the two ideas of the brand
 * (protection + healthy living space) in one geometric form. Drawn with plain
 * shapes so it stays legible at 16px as a favicon and reads on light or dark
 * backgrounds. `reversed` inverts the shield for forest surfaces.
 */
export function LogoMark({
  className,
  reversed = false,
}: {
  className?: string;
  reversed?: boolean;
}) {
  const shield = reversed ? "#FFFFFF" : "var(--color-primary)";
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label={`${siteConfig.name} emblem`}
      fill="none"
    >
      <path
        d="M12 1.75 19.75 4.6v6.7c0 5-3.2 9.35-7.75 10.95C7.45 20.65 4.25 16.3 4.25 11.3V4.6L12 1.75Z"
        fill={shield}
      />
      <path d="M12 6.4v11.1" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 9.4 8.9 11.2M12 9.4l3.1 1.8M12 12.9l-2.9 1.8M12 12.9l2.9 1.8"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Full lockup: mark + wordmark + descriptor. The wordmark uses the display
 * face; the descriptor is a tracked caption. `tone="light"` is for forest
 * surfaces (white text), `tone="dark"` for ivory surfaces.
 */
export function Logo({
  tone = "dark",
  className,
  href = "/",
  onClick,
}: {
  tone?: "dark" | "light";
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const reversed = tone === "light";
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("group inline-flex items-center gap-2.5 rounded-[var(--radius-xs)]", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <LogoMark
        className="size-8 shrink-0 transition-transform duration-200 ease-out group-hover:scale-[1.04]"
        reversed={reversed}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.0625rem] font-extrabold tracking-[-0.02em]",
            reversed ? "text-white" : "text-primary",
          )}
        >
          {siteConfig.wordmark}
        </span>
        <span
          className={cn(
            "eyebrow mt-[3px] text-[0.5625rem]",
            reversed ? "text-white/65" : "text-muted",
          )}
        >
          {siteConfig.descriptor}
        </span>
      </span>
    </Link>
  );
}
