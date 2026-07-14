"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { HeroNodule } from "./HeroNodule";
import { EdgeEnergy } from "./EdgeEnergy";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0f0a]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:50px_50px] opacity-10" />

      {/* Energy flows in from page edges toward the nodule */}
      <EdgeEnergy />

      <HeroNodule />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#0a0f0a]/40 via-transparent to-[#0a0f0a]/90" />

      {/* pointer-events-none so hover hits the nodule; CTAs re-enabled */}
      <div className="pointer-events-none relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/60 px-5 py-2 text-sm text-white backdrop-blur-sm">
            <Leaf className="h-4 w-4 text-emerald-400" />
            ReVolt Energy
          </div>

          <h1 className="mb-6 text-6xl font-bold leading-none tracking-[-2px] text-white md:text-7xl">
            Australia&apos;s
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              clean-energy future
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-200 md:text-xl">
            ReVolt Energy builds, owns and operates scalable, decentralised
            energy infrastructure, with battery energy storage at its
            core, enabling clean power to be generated, stored, and monetised at
            the edge.
          </p>

          <div className="pointer-events-auto flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#solutions"
              className="rounded-2xl bg-emerald-600 px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-emerald-500 active:scale-95"
            >
              See the Technology
            </a>
            <a
              href="/contact"
              className="rounded-2xl border border-white/60 px-10 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              Join the ReVolt
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
