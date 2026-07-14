"use client";

import { Building2, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function DualCta() {
  return (
    <section id="contact" className="relative bg-[#0a0f0a] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-electric/30 bg-gradient-to-br from-electric/15 via-navy-800 to-navy-900 p-6 sm:rounded-3xl sm:p-10"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-electric/20 blur-3xl" />
            <Building2 className="h-8 w-8 text-electric" />
            <h3 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
              Host a clean-energy node
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Land, load, grid access, solar potential or EV demand, partner with
              ReVolt to turn underutilised sites into productive infrastructure
              that accelerates Australia&apos;s transition.
            </p>
            <Button href="/contact?path=partner" className="mt-6 sm:mt-8">
              Start partner inquiry
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border glass p-6 sm:rounded-3xl sm:p-10"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-green-400/10 blur-3xl" />
            <LineChart className="h-8 w-8 text-green-400" />
            <h3 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
              Invest in the network
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Modular BESS assets designed to be scalable, investable and
              revenue-generating, backed by generation, trading pathways and an
              AI orchestration layer.
            </p>
            <Button href="/contact?path=investor" variant="secondary" className="mt-6 sm:mt-8">
              Investor relations
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
