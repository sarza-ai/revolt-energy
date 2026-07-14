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

/** Mobile-first: compact icon+text rows; desktop keeps alternating layout. */
export function Advantage() {
  return (
    <section
      id="advantage"
      className="bg-[#111811] px-4 py-10 sm:px-6 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 text-center text-[1.65rem] font-bold tracking-tight text-white sm:mb-4 sm:text-4xl md:text-5xl"
        >
          The ReVolt Advantage
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-6 max-w-2xl text-center text-sm text-gray-400 sm:mb-12 sm:text-base"
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`flex flex-row items-start gap-3.5 p-4 sm:items-center sm:gap-8 sm:p-8 ${
                  reverse ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30 sm:h-16 sm:w-16 sm:rounded-2xl">
                  <Icon className="h-5 w-5 text-emerald-400 sm:h-8 sm:w-8" />
                </div>
                <div className={`min-w-0 flex-1 ${reverse ? "sm:text-right" : ""}`}>
                  <h3 className="text-base font-semibold text-white sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400 sm:mt-2 sm:text-base">
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
