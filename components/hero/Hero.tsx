"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { InteractiveNodule } from "@/components/nodule/InteractiveNodule";
import { EdgeEnergy } from "./EdgeEnergy";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0a0f0a] pt-14 sm:pt-16 lg:flex lg:min-h-screen-safe lg:items-center lg:justify-center lg:pt-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.12] sm:[background-size:50px_50px] sm:opacity-10" />

      {/* Energy — quieter on mobile */}
      <div className="absolute inset-0 opacity-30 sm:opacity-55 lg:opacity-100">
        <EdgeEnergy />
      </div>

      {/* Desktop only: full-bleed cinematic nodule behind copy */}
      <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block">
        <div className="pointer-events-auto h-full w-full">
          <InteractiveNodule variant="hero" mode="full" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#0a0f0a]/35 via-transparent to-[#0a0f0a] lg:from-[#0a0f0a]/50 lg:to-[#0a0f0a]/95" />

      {/*
        Mobile: top-stacked, NO min-height / NO vertical center.
        Nodule sits flush under the fixed nav, then type + CTAs.
        Desktop: centered overlay over full-bleed orb.
      */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-10 pt-1 text-center sm:px-6 sm:pb-14 sm:pt-3 lg:pointer-events-none lg:pb-16 lg:pt-0">
        {/* Mobile / tablet nodule — high under nav, in document flow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65 }}
          className="pointer-events-auto relative mb-2 sm:mb-4 lg:hidden"
        >
          <div className="hero-nodule-frame hero-nodule-frame-mobile">
            <InteractiveNodule
              variant="hero"
              mode="float"
              className="hero-nodule-canvas"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-8 bottom-0 -z-10 h-10 rounded-full bg-emerald-500/30 blur-2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="w-full"
        >
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm sm:mb-5 sm:px-5 sm:py-2 sm:text-sm">
            <Leaf className="h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
            ReVolt Energy
          </div>

          <h1 className="mb-2.5 text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:mb-5 sm:text-5xl md:text-6xl lg:text-7xl">
            Australia&apos;s
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              clean-energy future
            </span>
          </h1>

          {/* Shorter on mobile so CTAs land above the fold; full copy from sm up */}
          <p className="mx-auto mb-5 max-w-md text-[0.92rem] leading-snug text-gray-300 sm:mb-8 sm:max-w-2xl sm:text-lg sm:leading-relaxed md:text-xl">
            <span className="sm:hidden">
              Scalable, decentralised BESS infrastructure — clean power
              generated, stored and monetised at the edge.
            </span>
            <span className="hidden sm:inline">
              ReVolt Energy builds, owns and operates scalable, decentralised
              energy infrastructure, with battery energy storage at its core,
              enabling clean power to be generated, stored, and monetised at the
              edge.
            </span>
          </p>

          <div className="pointer-events-auto mx-auto flex w-full max-w-sm flex-col gap-2.5 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
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
