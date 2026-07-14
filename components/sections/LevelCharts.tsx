"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Potential expansion timeline (illustrative projection for a decentralised
 * BESS network build-out across Australia's NEM, 2026 to 2034).
 */
const timeline = [
  { year: "2026", label: "Foundation", capacityMw: 40, nodes: 4, commercial: 12 },
  { year: "2027", label: "First cluster", capacityMw: 95, nodes: 9, commercial: 22 },
  { year: "2028", label: "State footprint", capacityMw: 180, nodes: 16, commercial: 35 },
  { year: "2029", label: "Multi-region", capacityMw: 320, nodes: 28, commercial: 52 },
  { year: "2030", label: "Scale phase", capacityMw: 520, nodes: 45, commercial: 74 },
  { year: "2031", label: "National mesh", capacityMw: 780, nodes: 68, commercial: 98 },
  { year: "2032", label: "Portfolio depth", capacityMw: 1100, nodes: 95, commercial: 128 },
  { year: "2033", label: "High density", capacityMw: 1500, nodes: 130, commercial: 165 },
  { year: "2034", label: "Mature network", capacityMw: 2000, nodes: 175, commercial: 210 },
] as const;

const years = timeline.map((t) => t.year);
const capacitySeries = timeline.map((t) => t.capacityMw);
const nodesSeries = timeline.map((t) => t.nodes);
const revenueSeries = timeline.map((t) => t.commercial);
const yearShort = timeline.map((t) => t.year.slice(2));

const milestones = [
  {
    year: "2026/27",
    text: "Anchor sites live; first modular BESS nodes and offtake pathways.",
  },
  {
    year: "2028/29",
    text: "Multi-state clusters; generation co-location and trading stack online.",
  },
  {
    year: "2030/31",
    text: "National mesh scale-up; AI orchestration across a growing portfolio.",
  },
  {
    year: "2032/34",
    text: "Mature edge network; high-density capacity and commercial intensity.",
  },
];

/** Each chart watches itself so mobile (stacked layout) animates when scrolled into view. */
function useChartInView() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, {
    once: true,
    amount: 0.25,
    margin: "0px 0px -8% 0px",
  });
  return { ref, active };
}

function seriesToPath(
  values: number[],
  width: number,
  height: number,
  pad = 8,
): string {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  return values
    .map((v, i) => {
      const x = pad + (i / (values.length - 1)) * innerW;
      const y = pad + innerH - ((v - min) / range) * innerH;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function seriesToArea(
  values: number[],
  width: number,
  height: number,
  pad = 8,
): string {
  const line = seriesToPath(values, width, height, pad);
  const lastX = width - pad;
  const firstX = pad;
  const baseY = height - pad;
  return `${line} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
}

function LevelBarChart({
  values,
  labels,
  title,
  subtitle,
  unit,
  delay = 0,
}: {
  values: number[];
  labels: string[];
  title: string;
  subtitle: string;
  unit: string;
  delay?: number;
}) {
  const { ref, active } = useChartInView();
  const max = Math.max(...values);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-emerald-500/20 bg-[#0f1a14]/80 p-5 backdrop-blur-sm sm:rounded-3xl sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
        {title}
      </p>
      <p className="mt-1 text-sm text-gray-400">{subtitle}</p>

      <div className="mt-8 flex h-44 items-end gap-1.5 sm:gap-2">
        {values.map((v, i) => {
          const pct = Math.max((v / max) * 100, 2);
          return (
            <div
              key={labels[i]}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <div className="relative flex h-[calc(100%-1.25rem)] w-full items-end overflow-hidden rounded-t-md">
                {/*
                  Animate height (not scaleY) — scaleY often fails or finishes
                  off-screen without a visible grow on mobile WebKit.
                */}
                <motion.div
                  className="w-full rounded-t-md bg-gradient-to-t from-emerald-700 via-emerald-500 to-teal-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                  initial={{ height: "0%" }}
                  animate={active ? { height: `${pct}%` } : { height: "0%" }}
                  transition={{
                    duration: 0.95,
                    delay: delay + 0.12 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  title={`${labels[i]}: ${v} ${unit}`}
                />
              </div>
              <span className="text-[9px] text-gray-500 sm:text-[10px]">
                &apos;{yearShort[i]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-emerald-400/80">
        <span>
          2026 · {values[0]} {unit}
        </span>
        <span className="font-mono text-gray-500">projected</span>
        <span>
          2034 · {values[values.length - 1]} {unit}
        </span>
      </div>
    </motion.div>
  );
}

function LevelLineChart({
  values,
  title,
  subtitle,
  unit,
  delay = 0,
  fill = false,
  id = "a",
}: {
  values: number[];
  title: string;
  subtitle: string;
  unit: string;
  delay?: number;
  fill?: boolean;
  id?: string;
}) {
  const { ref, active } = useChartInView();
  const w = 320;
  const h = 160;
  const path = seriesToPath(values, w, h);
  const area = seriesToArea(values, w, h);
  const max = values[values.length - 1];
  const min = values[0];
  const strokeId = `levelStroke-${id}`;
  const fillId = `levelFill-${id}`;
  const clipId = `levelClip-${id}`;

  const maxV = Math.max(...values);
  const minV = Math.min(...values);
  const range = maxV - minV || 1;
  const endY = 8 + (h - 16) - ((max - minV) / range) * (h - 16);

  const points = values
    .map((v, i) => {
      const x = 8 + (i / (values.length - 1)) * (w - 16);
      const y = 8 + (h - 16) - ((v - minV) / range) * (h - 16);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-emerald-500/20 bg-[#0f1a14]/80 p-5 backdrop-blur-sm sm:rounded-3xl sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            {title}
          </p>
          <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-semibold text-emerald-300">
            {max.toLocaleString()}
            <span className="ml-1 text-sm font-normal text-emerald-400/80">
              {unit}
            </span>
          </p>
          <p className="text-[10px] uppercase tracking-wider text-gray-500">
            2034 target
          </p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-6 h-40 w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={strokeId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
          <linearGradient id={fillId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.35)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </linearGradient>
          <clipPath id={clipId}>
            <motion.rect
              x={0}
              y={0}
              height={h}
              initial={{ width: 0 }}
              animate={active ? { width: w } : { width: 0 }}
              transition={{
                duration: 1.65,
                delay: delay + 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </clipPath>
        </defs>

        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={8}
            y1={8 + (h - 16) * (1 - t)}
            x2={w - 8}
            y2={8 + (h - 16) * (1 - t)}
            stroke="rgba(16,185,129,0.08)"
            strokeWidth="1"
          />
        ))}

        <g clipPath={`url(#${clipId})`}>
          {fill && <path d={area} fill={`url(#${fillId})`} />}
          <polyline
            points={points}
            fill="none"
            stroke={`url(#${strokeId})`}
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 8px rgba(52,211,153,0.6))" }}
          />
        </g>

        {/* Fallback pathLength draw for thin lines (helps when clip wipe is subtle) */}
        <motion.path
          d={path}
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.85 }}
          animate={
            active
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0.85 }
          }
          transition={{
            pathLength: {
              duration: 1.65,
              delay: delay + 0.1,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: { duration: 0.2 },
          }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(52,211,153,0.55))",
            // Clip-group already reveals fill; pathLength is the visible draw for no-fill charts
            opacity: fill ? 0 : undefined,
          }}
        />

        <motion.circle
          cx={w - 8}
          cy={endY}
          r={5}
          fill="#6ee7b7"
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: delay + 1.55, type: "spring", stiffness: 200 }}
          style={{ filter: "drop-shadow(0 0 10px #34d399)" }}
        />
      </svg>

      <div className="mt-2 flex justify-between text-[10px] text-gray-500">
        <span>
          2026 · {min.toLocaleString()} {unit}
        </span>
        <span>2030 midpoint</span>
        <span>
          2034 · {max.toLocaleString()} {unit}
        </span>
      </div>
    </motion.div>
  );
}

function LevelSteps() {
  const max = Math.max(...capacitySeries);
  const { ref, active } = useChartInView();

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-emerald-500/20 bg-[#0f1a14]/80 p-5 backdrop-blur-sm sm:rounded-3xl sm:p-6 lg:col-span-2"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
        Capacity by year
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Potential deployed MW along the 2026 to 2034 expansion path
      </p>

      <div className="mt-8 space-y-3">
        {timeline.map((row, i) => {
          const pct = (row.capacityMw / max) * 100;
          return (
            <div key={row.year} className="flex items-center gap-3">
              <span className="w-12 shrink-0 font-mono text-xs text-gray-500">
                {row.year}
              </span>
              <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-emerald-950/80">
                {/*
                  Animate width % (not scaleX) — more reliable on mobile browsers.
                */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-300"
                  style={{ boxShadow: "0 0 12px rgba(16,185,129,0.35)" }}
                  initial={{ width: "0%" }}
                  animate={active ? { width: `${pct}%` } : { width: "0%" }}
                  transition={{
                    duration: 0.85,
                    delay: 0.06 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <span className="hidden w-28 shrink-0 text-right text-[10px] text-gray-500 sm:block">
                {row.label}
              </span>
              <span className="w-16 shrink-0 text-right font-mono text-xs text-emerald-300">
                {row.capacityMw} MW
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LevelCharts() {
  const sectionRef = useRef<HTMLElement>(null);
  const milestonesActive = useInView(sectionRef, {
    once: true,
    amount: 0.12,
  });

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="relative bg-[#0a0f0a] py-10 sm:py-16 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expansion timeline"
          title="2026 to 2034 growth path"
          body="A potential multi-year build-out for a decentralised BESS network across Australia: capacity, node count and commercial intensity from foundation sites to a mature national mesh."
        />

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 16 }}
              animate={
                milestonesActive
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-emerald-500/15 bg-emerald-950/30 p-3 sm:rounded-2xl sm:p-4"
            >
              <p className="font-mono text-xs font-semibold text-emerald-400 sm:text-sm">
                {m.year}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-gray-400 sm:mt-2 sm:text-xs">
                {m.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-2">
          <LevelLineChart
            id="capacity"
            values={capacitySeries}
            title="Deployed capacity"
            subtitle="Potential MW online by calendar year"
            unit="MW"
            fill
            delay={0.05}
          />
          <LevelBarChart
            values={nodesSeries}
            labels={years}
            title="Live node count"
            subtitle="Modular sites projected online"
            unit="nodes"
            delay={0.05}
          />
          <LevelLineChart
            id="revenue"
            values={revenueSeries}
            title="Commercial intensity"
            subtitle="Relative portfolio index (illustrative)"
            unit="idx"
            delay={0.05}
          />
          <LevelSteps />
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Timeline and figures are illustrative expansion scenarios for discussion
          only. They are not forecasts, targets or offers of securities.
        </p>
      </div>
    </section>
  );
}
