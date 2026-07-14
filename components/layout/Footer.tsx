import Link from "next/link";
import { brand, nav } from "@/lib/content";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-navy-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo variant="full" className="opacity-95" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {brand.description}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition hover:text-electric"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
            Engage
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href="/contact?path=partner" className="hover:text-electric">
                Partner / host a node
              </Link>
            </li>
            <li>
              <Link href="/contact?path=investor" className="hover:text-electric">
                Investor inquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {brand.legal}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="font-medium text-muted transition hover:text-electric"
            >
              About
            </Link>
            <p className="text-muted/70">
              Built for Australia&apos;s clean-energy future · NEM-focused
              infrastructure
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
