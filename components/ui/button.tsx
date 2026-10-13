import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDarkPrimary" | "onDarkSecondary";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold " +
  "transition-[background-color,border-color,color,transform] duration-150 ease-out " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "border border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-primary-soft",
  onDarkPrimary: "bg-accent text-accent-ink hover:bg-accent-hover",
  onDarkSecondary: "border border-white/35 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-[1rem]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return cn(base, variants[variant], sizes[size], extra);
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/** Anchor/Link styled as a button. Works as a server component. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ...rest
}: ButtonLinkProps) {
  const isExternal = /^https?:|^mailto:|^tel:/.test(href);
  const content = (
    <>
      {children}
      {withArrow && <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={buttonClass(variant, size, className)}
        {...(rest as ComponentProps<"a">)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {content}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
} & Omit<ComponentProps<"button">, "className" | "children">;

/** Native button styled as a button. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      {children}
      {withArrow && <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />}
    </button>
  );
}
