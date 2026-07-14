"use client";

import { cn } from "@/lib/cn";

export function EnergyBar({
  className,
  active = true,
  variant = "flat",
}: {
  className?: string;
  active?: boolean;
  /** flat = original load bar; heartbeat = ECG-style pulse */
  variant?: "flat" | "heartbeat";
}) {
  if (variant === "heartbeat") {
    return (
      <div
        className={cn("relative w-full", className)}
        aria-hidden
      >
        <svg
          viewBox="0 0 240 48"
          className="h-12 w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hb-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="40%" stopColor="#34d399" />
              <stop offset="70%" stopColor="#5eead4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="hb-glow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="1.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Baseline track */}
          <line
            x1="0"
            y1="24"
            x2="240"
            y2="24"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

          {/* ECG heartbeat path — flat, spike, recover, flat */}
          <path
            d="M0 24 H36 L42 24 L48 10 L54 38 L62 6 L70 24 L78 24 L84 18 L90 24 H240"
            fill="none"
            stroke="url(#hb-stroke)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#hb-glow)"
            className={cn(active && "energy-heartbeat")}
            pathLength={100}
          />

          {/* Soft trailing echo for depth */}
          <path
            d="M0 24 H36 L42 24 L48 10 L54 38 L62 6 L70 24 L78 24 L84 18 L90 24 H240"
            fill="none"
            stroke="rgba(52,211,153,0.25)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(active && "energy-heartbeat energy-heartbeat-echo")}
            pathLength={100}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-0.5 w-full overflow-hidden rounded-full bg-white/10",
        className,
      )}
    >
      <div
        className={cn(
          "h-full w-full origin-left rounded-full bg-gradient-to-r from-electric-dim via-electric to-green-400",
          active && "energy-loader",
        )}
      />
    </div>
  );
}
