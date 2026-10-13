"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle, Phone, X } from "lucide-react";

import { LogoMark } from "@/components/logo";
import { navLinks } from "@/config/nav";
import { siteConfig, telLink, waLink } from "@/config/site";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Close on navigation.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Scroll lock, initial focus, Escape + focus trap, focus restore.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const trigger = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  const handleBackdrop = useCallback(() => onClose(), [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-primary-strong/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdrop}
            aria-hidden="true"
          />

          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="on-dark absolute inset-y-0 right-0 flex w-[min(22rem,100vw)] flex-col bg-primary-strong text-white"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduce ? 0.15 : 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 pb-4 pt-5">
              <span className="flex items-center gap-2.5">
                <LogoMark className="size-8" reversed />
                <span className="font-display text-[1.0625rem] font-extrabold tracking-[-0.02em]">
                  {siteConfig.wordmark}
                </span>
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-white transition-colors hover:bg-white/10"
              >
                <X className="size-6" aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex h-14 items-center justify-between border-b border-white/10 px-3 font-display text-[1.25rem] font-semibold text-white transition-colors hover:text-accent-on-dark"
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-white/30">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-2.5 px-5 pb-6 pt-4">
              <a
                href={telLink()}
                className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-accent text-accent-ink font-semibold transition-colors hover:bg-accent-hover"
              >
                <Phone className="size-[1.05rem]" aria-hidden="true" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={waLink("Hello KINGA Pest Care, I would like to request an inspection.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-white/30 text-white font-semibold transition-colors hover:bg-white/10"
              >
                <MessageCircle className="size-[1.05rem]" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
