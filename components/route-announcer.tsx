"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Announces client-side route changes to assistive technology. A soft
 * navigation in the App Router is otherwise silent, so the new document title
 * is repeated through a polite live region.
 */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const title = document.title || "Page loaded";
    setMessage(`Navigated to ${title}`);
  }, [pathname]);

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
}
