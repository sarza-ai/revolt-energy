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

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0f0a]/90 backdrop-blur-md transition-shadow",
        scrolled && "shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo variant="full" className="shrink-0" />

        <div className="hidden items-center gap-5 text-sm font-medium text-white lg:flex xl:gap-7">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition hover:text-emerald-400"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400 lg:inline-flex"
        >
          Get In Touch
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0a0f0a]/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-white hover:text-emerald-400"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-6 py-2.5 text-center text-sm font-semibold text-black"
            >
              Get In Touch
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="py-2 text-center text-sm text-muted hover:text-emerald-400"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
