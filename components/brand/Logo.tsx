"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** mark = icon only; full = icon + wordmark */
  variant?: "mark" | "full";
  href?: string | null;
};

export function Logo({
  className,
  variant = "full",
  href = "/#hero",
}: Props) {
  const goHome = () => {
    if (typeof window === "undefined") return;
    if (window.location.pathname === "/") {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const inner =
    variant === "mark" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/logo-mark.svg"
        alt="ReVolt"
        width={36}
        height={36}
        className="h-9 w-9"
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/logo.svg"
        alt="ReVolt Energy"
        width={180}
        height={40}
        className="h-7 w-auto max-w-[min(52vw,200px)] object-contain object-left sm:h-9 sm:max-w-none"
      />
    );

  if (href === null) {
    return <span className={cn("inline-flex items-center", className)}>{inner}</span>;
  }

  return (
    <Link
      href={href}
      onClick={goHome}
      className={cn("inline-flex items-center transition hover:opacity-90", className)}
      aria-label="ReVolt Energy home"
    >
      {inner}
    </Link>
  );
}
