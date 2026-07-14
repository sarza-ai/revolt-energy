import type { Metadata } from "next";
import { partnerTypes } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { InteractiveNodule } from "@/components/nodule/InteractiveNodule";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with ReVolt Energy to host decentralised clean-energy infrastructure across Australia.",
};

export default function PartnersPage() {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero: headline + nodule (nodule muted on small screens for readability) */}
        <section className="relative min-h-[min(70dvh,560px)] overflow-hidden rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-[#0f1a14] via-[#0a0f0a] to-[#0a1210] sm:rounded-3xl">
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-40 sm:opacity-100">
            <div className="pointer-events-auto absolute inset-y-0 right-0 w-full sm:w-[58%] lg:w-[52%]">
              <InteractiveNodule variant="partners" mode="float" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#0a0f0a] via-[#0a0f0a]/90 to-[#0a0f0a]/40 sm:via-[#0a0f0a]/70 sm:to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#0a0f0a]/95 via-transparent to-[#0a0f0a]/50" />

          <div className="relative z-10 flex min-h-[min(70dvh,560px)] max-w-xl flex-col justify-center px-5 py-12 sm:px-10 sm:py-14 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400">
              Partners
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl glow-text">
              Accelerate Australia&apos;s clean energy transition with us
            </h1>
            <p className="mt-4 text-base text-muted sm:text-lg">
              ReVolt works with EPC developers, property owners, commercial and
              industrial sites, airports, data centre builders and operators, and
              local councils to identify, develop and deploy decentralised
              clean-energy infrastructure.
            </p>
            <div className="mt-8">
              <Button href="/contact?path=partner">Partner with us</Button>
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partnerTypes.map((type, i) => (
            <GlowCard key={type} delay={i * 0.05}>
              <p className="text-lg font-medium text-ink">{type}</p>
              <p className="mt-2 text-sm text-muted">
                Bring land, load, grid access, solar potential or EV demand, we
                help turn underutilised sites into productive clean-energy nodes.
              </p>
            </GlowCard>
          ))}
        </div>

        <div className="mt-16 glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-ink">
            What we look for in a site
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Available land or rooftop with development potential",
              "Significant energy load or growth trajectory",
              "Grid connection opportunity or constraint story",
              "Solar resource or co-location potential",
              "EV charging demand or transport adjacency",
              "Council, airport or industrial precinct alignment",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                {item}
              </li>
            ))}
          </ul>
          <Button href="/contact?path=partner" className="mt-8">
            Submit a partner inquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
