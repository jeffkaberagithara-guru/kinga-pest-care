import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Shared section header: tracked eyebrow, editorial heading, optional intro
 * and an optional right-aligned action. `onDark` switches the palette for use
 * on forest surfaces.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  onDark = false,
  align = "start",
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  onDark?: boolean;
  align?: "start" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        action ? "md:flex-row md:items-end md:justify-between md:gap-10" : undefined,
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow && (
          <p className={cn("eyebrow mb-3", onDark ? "text-accent-on-dark" : "text-clay-deep")}>
            {eyebrow}
          </p>
        )}
        <h2 id={id} className={cn("text-h2", onDark ? "text-white" : "text-text")}>
          {title}
        </h2>
        {intro && (
          <p className={cn("mt-4 text-body-lg", onDark ? "text-white/75" : "text-text-secondary")}>
            {intro}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
