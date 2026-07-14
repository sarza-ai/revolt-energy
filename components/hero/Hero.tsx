"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { HeroNodule } from "./HeroNodule";
import { EdgeEnergy } from "./EdgeEnergy";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen-safe items-center justify-center overflow-hidden bg-[#0a0f0a] pt-16 sm:pt-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:50px_50px] opacity-10" />

      {/* Energy flows — lighter on mobile via CSS / canvas sizing */}
      <div className="absolute inset-0 max-sm:opacity-70">
        <EdgeEnergy />
      </div>

      <HeroNodule />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#0a0f0a]/50 via-transparent to-[#0a0f0a]/95" />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-5xl px-4 pb-10 text-center sm:px-6 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm sm:mb-8 sm:px-5 sm:py-2 sm:text-sm">
            <Leaf className="h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
            ReVolt Energy
          </div>

          <h1 className="mb-4 text-[2.15rem] font-bold leading-[1.05] tracking-[-0.04em] text-white xs:text-4xl sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
            Australia&apos;s
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              clean-energy future
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-200 sm:mb-10 sm:text-lg md:text-xl">
            ReVolt Energy builds, owns and operates scalable, decentralised
            energy infrastructure, with battery energy storage at its core,
            enabling clean power to be generated, stored, and monetised at the
            edge.
          </p>

          <div className="pointer-events-auto mx-auto flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
            <a
              href="#solutions"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-emerald-500 active:scale-[0.98] sm:px-10 sm:text-lg"
            >
              See the Technology
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/60 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 active:scale-[0.98] sm:px-10 sm:text-lg"
            >
              Join the ReVolt
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
