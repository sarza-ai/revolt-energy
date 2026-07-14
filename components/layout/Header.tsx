"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";

/** Primary nav: pages only (no redundant home-section anchors) */
const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "/configurator", label: "BESS Configurator" },
  { href: "/partners", label: "Partners" },
  { href: "/investors", label: "Investors" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const menu =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {/* Dim backdrop — tap to close */}
            <button
              type="button"
              className="absolute inset-0 bg-black/70"
              aria-label="Close menu"
              onClick={close}
            />

            {/* Sheet sits under the header bar */}
            <div
              className={cn(
                "relative z-10 mt-[calc(3.5rem+env(safe-area-inset-top,0px))] flex min-h-0 flex-1 flex-col",
                "border-t border-white/10 bg-[#0a0f0a] sm:mt-[calc(4rem+env(safe-area-inset-top,0px))]",
              )}
            >
              <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-4 py-3 pb-safe sm:px-6 sm:py-4">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-white active:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/about"
                  onClick={close}
                  className="flex min-h-12 items-center rounded-xl px-3 text-base text-muted active:bg-white/10"
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  onClick={close}
                  className="flex min-h-12 items-center rounded-xl px-3 text-base text-muted active:bg-white/10"
                >
                  Insights
                </Link>
                <Link
                  href="/contact"
                  onClick={close}
                  className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-center text-base font-semibold text-black active:scale-[0.98]"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[110] border-b border-white/10 bg-[#0a0f0a]/95 pt-safe",
          scrolled && "shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-3 sm:px-6">
          <Logo variant="full" className="min-w-0 shrink" />

          <div className="hidden items-center gap-5 text-sm font-medium text-white lg:flex xl:gap-7">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center whitespace-nowrap transition hover:text-emerald-400"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400 lg:inline-flex"
          >
            Get In Touch
          </Link>

          {/* Phone / tablet controls */}
          <div className="relative z-[120] flex items-center gap-1.5 lg:hidden">
            <Link
              href="/contact"
              className="inline-flex min-h-10 items-center rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black active:scale-[0.98] sm:px-4 sm:text-sm"
            >
              Contact
            </Link>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg p-2 text-white active:bg-white/10"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-site-menu">{menu}</div>
    </>
  );
}
