import type { Metadata } from "next";
import { BessConfigurator } from "@/components/configurator/BessConfigurator";
import { PageNodule } from "@/components/nodule/InteractiveNodule";

export const metadata: Metadata = {
  title: "BESS Configurator",
  description:
    "Interactive mock BESS configurator, size power, duration, region and use case for a ReVolt-style edge node.",
};

export default function ConfiguratorPage() {
  return (
    <div className="relative overflow-hidden pt-24 pb-20">
      <PageNodule variant="configurator" side="right" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-electric">
          Interactive mockup
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl glow-text">
          Configure an edge node
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Explore how modular storage scales with duration, region and use
          case. Outputs are illustrative, request an engineered proposal for
          real siting and commercial modelling.
        </p>
        <div className="mt-12">
          <BessConfigurator />
        </div>
      </div>
    </div>
  );
}
