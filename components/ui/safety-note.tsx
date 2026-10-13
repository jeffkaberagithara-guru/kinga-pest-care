import { Info } from "lucide-react";

/**
 * Compact, honest safety reminder. Reused wherever a treatment is described,
 * so the responsible message travels with the content rather than living only
 * on one page.
 */
export function SafetyNote({ className }: { className?: string }) {
  return (
    <div
      className={
        "flex gap-3 rounded-[var(--radius-card)] border border-border bg-surface-3 p-4 text-small text-text-secondary " +
        (className ?? "")
      }
    >
      <Info className="mt-0.5 size-[1.1rem] shrink-0 text-primary" aria-hidden="true" />
      <p>
        Preparation, ventilation and re-entry requirements depend on the product, the treatment
        method and the property. Your technician will give you the specific instructions, and the
        product label always takes priority.
      </p>
    </div>
  );
}
