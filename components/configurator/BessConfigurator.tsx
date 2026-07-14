"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Battery, Gauge, MapPin, PlugZap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EnergyBar } from "@/components/ui/EnergyBar";
import { cn } from "@/lib/cn";

const regions = [
  "NSW",
  "VIC",
  "QLD",
  "SA",
  "WA",
  "TAS",
  "NT",
  "ACT",
] as const;

const useCases = [
  { id: "candi", label: "C&I peak shaving", mult: 1 },
  { id: "solar", label: "Solar + storage", mult: 1.15 },
  { id: "ev", label: "EV fast-charge hub", mult: 1.25 },
  { id: "grid", label: "Grid support / FCAS", mult: 1.35 },
] as const;

export function BessConfigurator() {
  const [mw, setMw] = useState(5);
  const [hours, setHours] = useState(2);
  const [region, setRegion] = useState<(typeof regions)[number]>("NSW");
  const [useCase, setUseCase] = useState<(typeof useCases)[number]["id"]>(
    "candi",
  );

  const result = useMemo(() => {
    const mwh = mw * hours;
    const uc = useCases.find((u) => u.id === useCase)!;
    const modules = Math.ceil(mwh / 2.5);
    const footprint = Math.round(modules * 14);
    const revenueIndex = Math.round(mw * hours * uc.mult * 12);
    const chargeRate = Math.min(100, Math.round((mw / 20) * 100 + hours * 8));
    return { mwh, modules, footprint, revenueIndex, chargeRate, uc };
  }, [mw, hours, useCase]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric/10 ring-1 ring-electric/30">
            <Battery className="h-5 w-5 text-electric" />
          </span>
          <div>
            <h3 className="font-semibold text-ink">BESS configurator</h3>
            <p className="text-xs text-muted">Interactive mock, not a quote engine</p>
          </div>
        </div>

        <Control
          label="Power capacity"
          value={`${mw} MW`}
          min={1}
          max={50}
          step={1}
          current={mw}
          onChange={setMw}
        />
        <Control
          label="Duration"
          value={`${hours} h`}
          min={1}
          max={8}
          step={0.5}
          current={hours}
          onChange={setHours}
        />

        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-wider text-muted">
            Region
          </p>
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  region === r
                    ? "bg-electric text-navy-950"
                    : "bg-white/5 text-muted hover:text-electric",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-wider text-muted">
            Primary use case
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {useCases.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setUseCase(u.id)}
                className={cn(
                  "rounded-xl border px-3 py-3 text-left text-sm transition",
                  useCase === u.id
                    ? "border-electric/50 bg-electric/10 text-ink"
                    : "border-border text-muted hover:border-electric/30",
                )}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        key={`${mw}-${hours}-${region}-${useCase}`}
        initial={{ opacity: 0.6, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-electric/25 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-electric/20 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.2em] text-electric">
          System readout
        </p>
        <p className="mt-2 font-mono text-4xl font-semibold text-ink glow-text sm:text-5xl">
          {result.mwh.toFixed(1)}{" "}
          <span className="text-2xl text-electric">MWh</span>
        </p>
        <p className="mt-1 text-sm text-muted">
          {mw} MW × {hours} h · {region} · {result.uc.label}
        </p>

        <div className="mt-8 space-y-4">
          <Metric
            icon={PlugZap}
            label="Modular units (est.)"
            value={`${result.modules} packs`}
          />
          <Metric
            icon={MapPin}
            label="Footprint (indicative)"
            value={`~${result.footprint} m²`}
          />
          <Metric
            icon={Gauge}
            label="Revenue index (relative)"
            value={String(result.revenueIndex)}
          />
        </div>

        <div className="mt-8">
          <div className="mb-2 flex justify-between text-xs text-muted">
            <span>Deployment charge</span>
            <span className="text-electric">{result.chargeRate}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-electric-dim via-electric to-green-400"
              initial={{ width: 0 }}
              animate={{ width: `${result.chargeRate}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        <EnergyBar className="mt-6 opacity-60" />

        <Button href="/contact?path=partner" className="mt-8 w-full sm:w-auto">
          Request engineered proposal
        </Button>
      </motion.div>
    </div>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className="font-mono text-sm text-electric">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-electric"
      />
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-navy-950/50 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Icon className="h-4 w-4 text-electric" />
        {label}
      </div>
      <span className="font-mono text-sm text-ink">{value}</span>
    </div>
  );
}
