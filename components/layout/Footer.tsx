import Link from "next/link";
import { brand, nav } from "@/lib/content";
import { Logo } from "@/components/brand/Logo";

/** Mobile-first footer — compact stack on phone, 4-col on desktop. */
export function Footer() {
  return (
    <footer className="relative border-t border-border bg-navy-900">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent"
        aria-hidden
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo variant="full" className="opacity-95" />
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:mt-4">
            {brand.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:contents">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric sm:text-xs">
              Navigate
            </p>
            <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-sm text-muted transition hover:text-electric"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric sm:text-xs">
              Engage
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted sm:mt-4 sm:space-y-2">
              <li>
                <Link
                  href="/contact?path=partner"
                  className="inline-flex min-h-10 items-center hover:text-electric"
                >
                  Partner / host a node
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?path=investor"
                  className="inline-flex min-h-10 items-center hover:text-electric"
                >
                  Investor inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 pb-safe">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {brand.legal}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/about"
              className="font-medium text-muted transition hover:text-electric"
            >
              About
            </Link>
            <p className="text-muted/70">
              Built for Australia&apos;s clean-energy future
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
