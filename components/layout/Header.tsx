"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0f0a]/90 backdrop-blur-md transition-shadow pt-safe",
        scrolled && "shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
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

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Full-screen mobile / tablet drawer (was broken between md–lg) */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-14 z-50 flex flex-col border-t border-white/10 bg-[#0a0f0a]/98 backdrop-blur-xl sm:top-16 lg:hidden pb-safe">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-white hover:bg-white/5 hover:text-emerald-400"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center rounded-xl px-3 text-base text-muted hover:bg-white/5 hover:text-emerald-400"
            >
              About
            </Link>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center rounded-xl px-3 text-base text-muted hover:bg-white/5 hover:text-emerald-400"
            >
              Insights
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-center text-base font-semibold text-black"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
