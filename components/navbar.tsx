"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { Logo } from "@/components/logo";
import { MobileMenu } from "@/components/mobile-menu";
import { ButtonLink } from "@/components/ui/button";
import { navLinks } from "@/config/nav";
import { siteConfig, telLink } from "@/config/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clicking the logo on the home page scrolls back to the top; anywhere else
  // it navigates home. `scrollTo({ top: 0 })` respects the CSS scroll-behavior
  // (smooth, or instant under reduced motion).
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-sm transition-colors duration-200",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-4">
        <Logo onClick={handleLogoClick} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center rounded-[var(--radius-pill)] px-3.5 text-nav transition-colors duration-150",
                      active ? "text-primary" : "text-text-secondary hover:text-primary",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 bottom-1 h-px origin-left bg-clay transition-transform duration-200 ease-out",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={telLink()}
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-pill)] px-3 text-nav font-medium text-text-secondary transition-colors hover:text-primary"
          >
            <Phone className="size-[1.05rem]" aria-hidden="true" />
            <span>{siteConfig.contact.phoneDisplay}</span>
          </a>
          <ButtonLink href="/contact#request" variant="primary">
            Request an inspection
          </ButtonLink>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="mobile-menu"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-primary transition-colors hover:bg-primary-soft lg:hidden"
        >
          <Menu className="size-6" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} returnFocusRef={triggerRef} />
    </header>
  );
}
