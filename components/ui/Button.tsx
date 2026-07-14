"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_32px_rgba(16,185,129,0.3)] hover:shadow-[0_0_48px_rgba(16,185,129,0.45)]",
  secondary:
    "border border-white/50 text-white bg-transparent hover:bg-white/10 hover:border-emerald-400/60",
  ghost: "text-ink/80 hover:text-electric hover:bg-white/5",
};

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

/** Mobile-first: 48px min tap target, full-width friendly. */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
}: Props) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold tracking-wide transition-all duration-300 charge-border active:scale-[0.98] sm:text-sm",
    variants[variant],
    disabled && "opacity-50 pointer-events-none",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
