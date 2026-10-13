import Link from "next/link";
import { ClipboardList, MessageCircle, Phone } from "lucide-react";

import { siteConfig, telLink, waLink } from "@/config/site";

/**
 * Persistent mobile action bar. Phone and WhatsApp are the fastest routes to
 * help; the request link is the primary conversion path. Hidden from `md` up,
 * where the header already carries these actions. `main` reserves bottom space
 * so the bar never covers content.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-sm md:hidden">
      <div
        className="shell grid grid-cols-3 gap-2 py-2"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={telLink()}
          className="inline-flex h-12 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-sm)] text-[0.6875rem] font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          <Phone className="size-5" aria-hidden="true" />
          Call
        </a>
        <a
          href={waLink("Hello KINGA Pest Care, I would like to ask about pest treatment.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-sm)] text-[0.6875rem] font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          WhatsApp
        </a>
        <Link
          href="/contact#request"
          className="inline-flex h-12 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-sm)] bg-accent text-[0.6875rem] font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
        >
          <ClipboardList className="size-5" aria-hidden="true" />
          Request
        </Link>
      </div>
    </div>
  );
}
