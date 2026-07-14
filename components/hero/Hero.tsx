"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { InteractiveNodule } from "@/components/nodule/InteractiveNodule";
import { EdgeEnergy } from "./EdgeEnergy";

/**
 * Mobile: entire hero fits one viewport (100dvh) — no scroll within hero.
 * Desktop (lg+): full-bleed cinematic nodule, centered.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden bg-[#0a0f0a] pt-14 sm:pt-16 max-lg:h-[100dvh] max-lg:max-h-[100dvh] lg:min-h-screen-safe lg:items-center lg:justify-center lg:pt-20"
    >
      <div
        className="absolute inset-0 opacity-[0.1] [background-size:28px_28px] bg-[radial-gradient(#10b981_1px,transparent_1px)] sm:opacity-10 sm:[background-size:50px_50px]"
        aria-hidden
      />

      <div
        className="absolute inset-0 z-[3] opacity-70 sm:opacity-80 lg:opacity-100"
        aria-hidden
      >
        <EdgeEnergy />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block">
        <div className="pointer-events-auto h-full w-full">
          <InteractiveNodule variant="hero" mode="full" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#0a0f0a]/20 via-transparent to-[#0a0f0a] lg:from-[#0a0f0a]/50 lg:to-[#0a0f0a]/95"
        aria-hidden
      />

      {/*
        Mobile: flex column fills remaining viewport under the fixed nav.
        justify-between + flexible nodule keeps badge → CTAs on one screen.
      */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 text-center sm:px-6 sm:pb-14 sm:pt-4 max-lg:min-h-0 max-lg:justify-between lg:pointer-events-none lg:flex-none lg:pb-16 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full shrink-0"
        >
          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-black/55 px-3 py-1 text-[0.95rem] font-medium text-white backdrop-blur-sm sm:mb-5 sm:gap-2 sm:px-5 sm:py-2 sm:text-sm">
            <Leaf className="h-4 w-4 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
            ReVolt Energy
          </div>

          {/* Larger than original on mobile, clamped so two lines fit short phones */}
          <h1 className="text-[clamp(1.85rem,8.2vw,2.65rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white sm:mb-5 sm:text-5xl md:text-6xl lg:text-7xl">
            Australia&apos;s
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              clean energy future
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="pointer-events-auto relative my-1 flex min-h-0 w-full shrink items-center justify-center sm:my-2 lg:hidden"
        >
          <div className="hero-nodule-frame hero-nodule-frame-mobile">
            <InteractiveNodule
              variant="hero"
              mode="float"
              className="hero-nodule-canvas"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-x-10 bottom-1 -z-10 h-10 rounded-full bg-emerald-500/30 blur-2xl"
            aria-hidden
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full shrink-0"
        >
          <p className="mx-auto mb-2.5 max-w-xl text-[0.82rem] leading-snug text-gray-300 sm:mb-8 sm:max-w-2xl sm:text-lg sm:leading-relaxed md:text-xl">
            ReVolt Energy builds, owns and operates scalable, decentralised
            energy infrastructure, with battery energy storage at its core,
            enabling clean power to be generated, stored, and monetised at the
            edge.
          </p>

          {/* Side-by-side on mobile saves vertical space for one-screen fit */}
          <div className="pointer-events-auto mx-auto grid w-full grid-cols-2 gap-2 sm:flex sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="#solutions"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-2 py-2.5 text-center text-[0.8rem] font-semibold leading-tight text-white shadow-[0_0_24px_rgba(16,185,129,0.3)] transition active:scale-[0.98] hover:bg-emerald-500 sm:min-h-12 sm:rounded-2xl sm:px-10 sm:py-3.5 sm:text-lg"
            >
              See the Technology
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/55 px-2 py-2.5 text-center text-[0.8rem] font-semibold leading-tight text-white transition active:scale-[0.98] hover:bg-white/10 sm:min-h-12 sm:rounded-2xl sm:px-10 sm:py-3.5 sm:text-lg"
            >
              Join the ReVolt
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
