"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** mark = battery icon only; full = battery + wordmark */
  variant?: "mark" | "full";
  href?: string | null;
};

/**
 * Brand logo — battery + orbit mark matches favicon and header.
 * Mobile: battery mark + compact wordmark (clearer than tiny full SVG text).
 * Desktop: full SVG wordmark lockup.
 */
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

  const mark = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-mark.svg"
      alt=""
      width={40}
      height={40}
      className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
      decoding="async"
    />
  );

  const inner =
    variant === "mark" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/logo-mark.svg"
        alt="ReVolt"
        width={40}
        height={40}
        className="h-9 w-9 sm:h-10 sm:w-10"
        decoding="async"
      />
    ) : (
      <>
        {/* Mobile: mark + text (favours the battery symbol, matches favicon) */}
        <span className="inline-flex items-center gap-2 sm:hidden">
          {mark}
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-white">
              ReVolt
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-emerald-400">
              Energy
            </span>
          </span>
        </span>
        {/* Desktop / tablet: full lockup SVG */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.svg"
          alt="ReVolt Energy"
          width={200}
          height={40}
          className="hidden h-9 w-auto object-contain object-left sm:block sm:h-10"
          decoding="async"
        />
      </>
    );

  if (href === null) {
    return (
      <span className={cn("inline-flex items-center", className)}>{inner}</span>
    );
  }

  return (
    <Link
      href={href}
      onClick={goHome}
      className={cn(
        "inline-flex items-center transition hover:opacity-90",
        className,
      )}
      aria-label="ReVolt Energy home"
    >
      {inner}
    </Link>
  );
}
