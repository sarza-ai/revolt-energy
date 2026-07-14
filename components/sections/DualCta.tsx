"use client";

import { Building2, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/** Mobile-first dual path CTAs — full-width buttons on phone. */
export function DualCta() {
  return (
    <section
      id="contact"
      className="relative bg-[#0a0f0a] py-10 sm:py-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-electric/30 bg-gradient-to-br from-electric/15 via-navy-800 to-navy-900 p-5 sm:rounded-3xl sm:p-10"
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-electric/20 blur-3xl"
              aria-hidden
            />
            <Building2 className="h-7 w-7 text-electric sm:h-8 sm:w-8" />
            <h3 className="mt-3 text-xl font-semibold text-ink sm:mt-4 sm:text-3xl">
              Host a clean-energy node
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
              Land, load, grid access, solar potential or EV demand. Partner with
              ReVolt to turn underutilised sites into productive infrastructure.
            </p>
            <Button
              href="/contact?path=partner"
              className="mt-5 w-full sm:mt-8 sm:w-auto"
            >
              Start partner inquiry
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border glass p-5 sm:rounded-3xl sm:p-10"
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-green-400/10 blur-3xl"
              aria-hidden
            />
            <LineChart className="h-7 w-7 text-green-400 sm:h-8 sm:w-8" />
            <h3 className="mt-3 text-xl font-semibold text-ink sm:mt-4 sm:text-3xl">
              Invest in the network
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
              Modular BESS assets designed to be scalable, investable and
              revenue-generating, backed by generation, trading and AI
              orchestration.
            </p>
            <Button
              href="/contact?path=investor"
              variant="secondary"
              className="mt-5 w-full sm:mt-8 sm:w-auto"
            >
              Investor relations
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
