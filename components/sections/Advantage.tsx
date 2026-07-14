"use client";

import { BatteryCharging, Leaf, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    icon: Leaf,
    title: "Nature-Powered Design",
    desc: "Organic-inspired nodules that sit lightly on the landscape, infrastructure that feels native to Australia.",
  },
  {
    icon: BatteryCharging,
    title: "Advanced BESS Core",
    desc: "Modular battery storage that generates, stores and monetises clean power at the edge of the grid.",
  },
  {
    icon: Zap,
    title: "Fast-Deploy Nodes",
    desc: "Independent clean-energy nodules across the NEM. Scale site-by-site, not decade-by-decade.",
  },
  {
    icon: Users,
    title: "Partner Ecosystem",
    desc: "Built with landowners, developers, C&I sites, councils and capital partners for a shared transition.",
  },
];

/** Advantage as stacked feature rows (not a 4-up card grid). */
export function Advantage() {
  return (
    <section id="advantage" className="bg-[#111811] px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-center text-3xl font-bold tracking-tight text-white sm:mb-4 sm:text-4xl md:text-5xl"
        >
          The ReVolt Advantage
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-2xl text-center text-sm text-gray-400 sm:mb-14 sm:text-base"
        >
          Why decentralised, modular infrastructure wins for hosts, partners and
          the grid.
        </motion.p>

        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] sm:rounded-3xl">
          {items.map((item, i) => {
            const Icon = item.icon;
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: reverse ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-8 ${
                  reverse ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/30 sm:h-16 sm:w-16">
                  <Icon className="h-7 w-7 text-emerald-400 sm:h-8 sm:w-8" />
                </div>
                <div className={reverse ? "sm:text-right" : undefined}>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base sm:inline-block">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
