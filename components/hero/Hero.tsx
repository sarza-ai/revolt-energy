"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { InteractiveNodule } from "@/components/nodule/InteractiveNodule";
import { EdgeEnergy } from "./EdgeEnergy";

/**
 * Mobile-first hero.
 * Phone is the primary composition (dense, top-aligned, CTAs above the fold).
 * Desktop (lg+) is progressive enhancement: full-bleed cinematic nodule.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0a0f0a] pt-14 sm:pt-16 lg:flex lg:min-h-screen-safe lg:items-center lg:justify-center lg:pt-20"
    >
      <div
        className="absolute inset-0 opacity-[0.1] [background-size:28px_28px] bg-[radial-gradient(#10b981_1px,transparent_1px)] sm:opacity-10 sm:[background-size:50px_50px]"
        aria-hidden
      />

      {/* Energy particles on all sizes (EdgeEnergy tunes mobile density) */}
      <div
        className="absolute inset-0 z-[3] opacity-70 sm:opacity-80 lg:opacity-100"
        aria-hidden
      >
        <EdgeEnergy />
      </div>

      {/* Desktop full-bleed nodule */}
      <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block">
        <div className="pointer-events-auto h-full w-full">
          <InteractiveNodule variant="hero" mode="full" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#0a0f0a]/20 via-transparent to-[#0a0f0a] lg:from-[#0a0f0a]/50 lg:to-[#0a0f0a]/95"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-9 pt-2 text-center sm:px-6 sm:pb-14 sm:pt-4 lg:pointer-events-none lg:pb-16 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-black/55 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm sm:mb-5 sm:gap-2 sm:px-5 sm:py-2 sm:text-sm">
            <Leaf className="h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
            ReVolt Energy
          </div>

          <h1 className="mb-3 text-[2rem] font-bold leading-[1.05] tracking-[-0.035em] text-white sm:mb-5 sm:text-5xl md:text-6xl lg:text-7xl">
            Australia&apos;s
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              clean energy future
            </span>
          </h1>
        </motion.div>

        {/* In-flow nodule: overflow visible so sphere edges are not cut off */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="pointer-events-auto relative my-0 sm:my-2 lg:hidden"
        >
          <div className="hero-nodule-frame hero-nodule-frame-mobile">
            <InteractiveNodule
              variant="hero"
              mode="float"
              className="hero-nodule-canvas"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-x-8 bottom-2 -z-10 h-14 rounded-full bg-emerald-500/30 blur-2xl"
            aria-hidden
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="w-full"
        >
          <p className="mx-auto mb-5 max-w-[22rem] text-[0.95rem] leading-snug text-gray-300 sm:mb-8 sm:max-w-2xl sm:text-lg sm:leading-relaxed md:text-xl">
            <span className="sm:hidden">
              Decentralised BESS infrastructure. Clean power generated, stored
              and monetised at the edge.
            </span>
            <span className="hidden sm:inline">
              ReVolt Energy builds, owns and operates scalable, decentralised
              energy infrastructure, with battery energy storage at its core,
              enabling clean power to be generated, stored, and monetised at the
              edge.
            </span>
          </p>

          <div className="pointer-events-auto mx-auto flex w-full flex-col gap-2.5 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="#solutions"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_0_28px_rgba(16,185,129,0.35)] transition active:scale-[0.98] hover:bg-emerald-500 sm:w-auto sm:px-10 sm:text-lg"
            >
              See the Technology
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/55 px-6 py-3.5 text-base font-semibold text-white transition active:scale-[0.98] hover:bg-white/10 sm:w-auto sm:px-10 sm:text-lg"
            >
              Join the ReVolt
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
