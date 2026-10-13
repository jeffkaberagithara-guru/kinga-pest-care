import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Compact service strip above the header. One message; nothing to dismiss. */
export function AnnouncementBar() {
  return (
    <div className="on-dark bg-primary-strong text-white">
      <div className="shell flex min-h-9 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-1.5 text-center text-[0.8125rem] leading-snug">
        <span className="hidden sm:inline">{siteConfig.announcement.main}</span>
        <span className="sm:hidden">{siteConfig.announcement.short}</span>
        <Link
          href={siteConfig.announcement.href}
          className="shrink-0 font-semibold text-accent-on-dark underline decoration-accent-on-dark/40 underline-offset-4 hover:decoration-accent-on-dark"
        >
          {siteConfig.announcement.action}
        </Link>
      </div>
    </div>
  );
}
