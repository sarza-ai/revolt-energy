"use client";

import { solutions } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

/** Mobile-first pillars: single column, dense cards; multi-col from sm. */
export function SolutionsHorizontal() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden bg-navy-900/50 py-10 sm:py-16 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 energy-grid opacity-30 sm:opacity-40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Clean Energy Infrastructure Suite"
          title="Four pillars. One network."
          body="Generation, storage, trading, and the AI orchestration layer that binds them. One suite for Australia's edge."
        />

        <div className="mt-6 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {solutions.map((sol, i) => (
            <motion.article
              key={sol.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass charge-border relative flex h-full flex-col rounded-2xl p-4 sm:rounded-3xl sm:p-7"
            >
              <span className="font-mono text-xs text-electric/70 sm:text-sm">
                {sol.eyebrow}
              </span>
              <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-ink sm:mt-2 sm:text-2xl lg:text-xl xl:text-2xl">
                {sol.title}
              </h3>
              <p className="mt-1.5 text-sm text-electric/90 sm:mt-2">
                {sol.summary}
              </p>
              {/* Long body only from sm — keeps phone cards scannable */}
              <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-muted sm:mt-3 sm:block">
                {sol.body}
              </p>
              <ul className="mt-3 space-y-1.5 sm:mt-5 sm:space-y-2">
                {sol.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-xs text-ink/90 sm:text-sm"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric shadow-[0_0_8px_var(--glow)]" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={`/solutions#${sol.id}`}
                className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-electric transition hover:gap-2 sm:mt-6"
              >
                Explore {sol.title}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
