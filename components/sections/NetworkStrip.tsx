"use client";

import { motion } from "framer-motion";
import { stats, networkNodes } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConstellationBg } from "./ConstellationBg";

export function NetworkStrip() {
  const live = networkNodes.filter((n) => n.status === "live").length;
  const totalMw = networkNodes.reduce((s, n) => s + n.mw, 0);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Static constellation only — no background motion */}
      <ConstellationBg />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Solid plate behind heading so stars don't compete with type */}
        <div className="mx-auto max-w-3xl rounded-3xl bg-[#07100e]/92 px-4 py-6 backdrop-blur-md sm:px-8">
          <SectionHeading
            eyebrow="Live network pulse"
            title="A constellation of clean-energy nodes"
            body="Illustrative portfolio view of edge assets across Australia, each node a modular piece of sovereign energy infrastructure."
            align="center"
          />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-emerald-500/20 bg-[#0a1411] p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
            >
              <p className="font-mono text-3xl font-semibold text-electric glow-text sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0a1411] shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
          <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
            {networkNodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group flex items-center justify-between gap-3 bg-[#0a1411] px-4 py-4 transition hover:bg-emerald-950/80"
              >
                <div>
                  <p className="text-sm font-medium text-ink group-hover:text-electric">
                    {node.name}
                  </p>
                  <p className="text-xs capitalize text-muted">{node.status}</p>
                </div>
                <div className="text-right">
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
