import type { Metadata } from "next";
import { brand } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { PageNodule } from "@/components/nodule/InteractiveNodule";

export const metadata: Metadata = {
  title: "About",
  description: brand.description,
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden pt-24 pb-20">
      <PageNodule variant="about" side="left" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-electric">
          About ReVolt
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl glow-text">
          Building Australia&apos;s decentralised energy layer
        </h1>
        <div className="prose-invert mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>
            {brand.description}
          </p>
          <p>
            The grid is shifting from centralised generation to a fabric of edge
            assets. ReVolt designs for that future: modular battery energy storage
            systems (BESS) as independent clean-energy nodes, paired with
            generation, trading pathways, and an AI-enabled orchestration platform.
          </p>
          <p>
            We work with EPC developers, property owners, commercial and industrial
            sites, airports, data centre builders and operators, and local councils
            to identify, develop and deploy infrastructure that reduces
            concentration risk and accelerates site-by-site deployment across the
            National Electricity Market.
          </p>
          <p>
            Where second-life EV batteries and high-capacity BESS engineering
            align, we pursue faster deployment and lower embodied carbon, without
            compromising investable, revenue-generating asset design.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Model", v: "Build · Own · Operate" },
            { k: "Core", v: "BESS-first network" },
            { k: "Market", v: "Australia NEM" },
          ].map((item) => (
            <div key={item.k} className="glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-muted">
                {item.k}
              </p>
              <p className="mt-1 font-medium text-ink">{item.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/partners">Partner with us</Button>
          <Button href="/investors" variant="secondary">
            For investors
          </Button>
        </div>
      </div>
    </div>
  );
}
