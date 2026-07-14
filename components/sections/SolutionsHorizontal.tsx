"use client";

import { solutions } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

/** Four pillars in one viewport grid (no horizontal scroll). */
export function SolutionsHorizontal() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden bg-navy-900/50 py-14 sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 energy-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Clean Energy Infrastructure Suite"
          title="Four pillars. One network."
          body="Generation, storage, trading, and the AI orchestration layer that binds them, one suite for Australia's edge."
        />

        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {solutions.map((sol, i) => (
            <motion.article
              key={sol.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass charge-border relative flex h-full flex-col rounded-2xl p-5 sm:rounded-3xl sm:p-7"
            >
              <span className="font-mono text-sm text-electric/70">
                {sol.eyebrow}
              </span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink lg:text-xl xl:text-2xl">
                {sol.title}
              </h3>
              <p className="mt-2 text-sm text-electric/90">{sol.summary}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {sol.body}
              </p>
              <ul className="mt-5 space-y-2">
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
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-electric transition hover:gap-2"
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
