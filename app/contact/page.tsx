import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { EnergyBar } from "@/components/ui/EnergyBar";
import { PageNodule } from "@/components/nodule/InteractiveNodule";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Partner, host a node, or invest, multi-step inquiry for ReVolt Energy.",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden pt-24 pb-20">
      <PageNodule variant="contact" side="right" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-electric">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl glow-text">
            Let&apos;s power the next node
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            Dual pathways for partners and investors. Tell us who you are, what
            you hold (site or capital), and we&apos;ll route your inquiry.
          </p>
          <div className="mt-8 space-y-4 text-sm text-muted">
            <p>
              <span className="text-ink">Partners:</span> land, load, grid, solar,
              EV demand, councils & developers
            </p>
            <p>
              <span className="text-ink">Investors:</span> modular BESS portfolio
              & infrastructure thesis
            </p>
          </div>
          <EnergyBar variant="heartbeat" className="mt-10 max-w-sm" />
        </div>
        <div className="lg:col-span-3">
          <Suspense
            fallback={
              <div className="glass h-96 animate-pulse rounded-3xl" />
            }
          >
            <InquiryForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
