"use client";

import { motion } from "framer-motion";
import { stats, networkNodes } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConstellationBg } from "./ConstellationBg";

export function NetworkStrip() {
  const live = networkNodes.filter((n) => n.status === "live").length;
  const totalMw = networkNodes.reduce((s, n) => s + n.mw, 0);

  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-28">
      <ConstellationBg />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-[#07100e]/92 px-3 py-4 backdrop-blur-md sm:rounded-3xl sm:px-8 sm:py-6">
          <SectionHeading
            eyebrow="Live network pulse"
            title="A constellation of clean-energy nodes"
            body="Illustrative portfolio view of edge assets across Australia. Each node is a modular piece of sovereign energy infrastructure."
            align="center"
          />
        </div>

        {/* 2×2 stats on phone — no tall single column */}
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {[
            { label: "Live nodes", value: String(live) },
            { label: "Illustrative capacity", value: `${totalMw} MW` },
            ...stats.slice(1, 3).map((s) => ({
              label: s.label,
              value: s.value,
            })),
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-emerald-500/20 bg-[#0a1411] p-3.5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.45)] sm:rounded-2xl sm:p-6"
            >
              <p className="font-mono text-2xl font-semibold text-electric glow-text sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-1 text-[10px] uppercase leading-tight tracking-[0.14em] text-muted sm:mt-2 sm:text-xs sm:tracking-[0.18em]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0a1411] shadow-[0_8px_32px_rgba(0,0,0,0.45)] sm:mt-10">
          <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
            {networkNodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group flex items-center justify-between gap-3 bg-[#0a1411] px-3.5 py-3.5 transition hover:bg-emerald-950/80 sm:px-4 sm:py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink group-hover:text-electric">
                    {node.name}
                  </p>
                  <p className="text-xs capitalize text-muted">{node.status}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-sm text-electric">{node.mw} MW</p>
                  <span
                    className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${
                      node.status === "live"
                        ? "bg-electric node-pulse"
                        : node.status === "deploying"
                          ? "bg-green-400"
                          : "bg-teal-300/70"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
