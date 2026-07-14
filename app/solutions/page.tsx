import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { PageNodule } from "@/components/nodule/InteractiveNodule";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Generation, storage, trading and AI orchestration, ReVolt's clean energy infrastructure suite for Australia.",
};

export default function SolutionsPage() {
  return (
    <div className="relative overflow-hidden pt-24 pb-20">
      <PageNodule variant="solutions" side="right" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-electric">
          Solutions
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl glow-text">
          Clean energy infrastructure suite
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          From electrons to contracts, modular assets that generate, store, trade
          and optimise power at the edge of Australia&apos;s grid.
        </p>

        <div className="mt-16 space-y-20">
          {solutions.map((sol, i) => (
            <section
              key={sol.id}
              id={sol.id}
              className="scroll-mt-28 grid gap-8 lg:grid-cols-2 lg:items-center"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <span className="font-mono text-sm text-electric/70">
                  {sol.eyebrow}
                </span>
                <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
                  {sol.title}
                </h2>
                <p className="mt-3 text-electric/90">{sol.summary}</p>
                <p className="mt-4 text-muted leading-relaxed">{sol.body}</p>
                <ul className="mt-6 space-y-2">
                  {sol.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`glass charge-border relative min-h-[260px] overflow-hidden rounded-3xl p-8 ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="absolute inset-0 energy-grid opacity-50" />
                <div className="relative flex h-full flex-col justify-between">
                  <p className="text-6xl font-semibold text-electric/20">
                    {sol.eyebrow}
                  </p>
                  <div>
                    <p className="text-sm text-muted">Explore the stack</p>
                    <Link
                      href="/configurator"
                      className="mt-2 inline-block text-electric hover:underline"
                    >
                      Open BESS configurator →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-electric/25 bg-electric/5 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-semibold text-ink">
            Ready to deploy a node?
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-muted">
            Whether you hold land, load or capital, let&apos;s map the opportunity.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact?path=partner">Partner inquiry</Button>
            <Button href="/contact?path=investor" variant="secondary">
              Investor inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
