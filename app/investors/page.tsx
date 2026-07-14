import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { PageNodule } from "@/components/nodule/InteractiveNodule";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Invest in modular, revenue-generating BESS infrastructure across Australia's decentralised energy network.",
};

const theses = [
  {
    title: "Modular & deployable",
    body: "Site-by-site BESS nodes reduce single-asset concentration risk and unlock faster capital recycling versus mega-project timelines alone.",
  },
  {
    title: "Revenue pathways",
    body: "Storage paired with generation, offtake, wholesale participation and PPAs, designed as investable, operating assets.",
  },
  {
    title: "Intelligence layer",
    body: "AI orchestration for health, dispatch and portfolio visibility, software leverage on a growing physical network.",
  },
  {
    title: "Sovereign transition",
    body: "Aligned with Australia's clean-energy and energy-security priorities across the National Electricity Market.",
  },
];

export default function InvestorsPage() {
  return (
    <div className="relative overflow-hidden pt-24 pb-20">
      <PageNodule variant="investors" side="left" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-electric">
          Investors
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl glow-text">
          Capital for the edge of the grid
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          ReVolt builds, owns and operates decentralised energy infrastructure
          with battery storage at its core, scalable assets engineered for
          deployment speed, commercial resilience and network effects.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {theses.map((t, i) => (
            <GlowCard key={t.title} delay={i * 0.06}>
              <h3 className="text-lg font-semibold text-ink">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
            </GlowCard>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-navy-900/60 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-ink">
            Start an investor conversation
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Share your mandate and indicative ticket size, we&apos;ll follow up
            with the appropriate materials and discussion.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact?path=investor">Investor inquiry</Button>
            <Button href="/solutions" variant="secondary">
              Review the suite
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
