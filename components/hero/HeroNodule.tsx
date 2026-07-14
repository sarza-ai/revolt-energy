"use client";

import { InteractiveNodule } from "@/components/nodule/InteractiveNodule";

/**
 * Hero energy node.
 *
 * Mobile / touch: fixed tiny accent (never full-bleed — Android often reports
 * wide CSS widths or "desktop site", so we size by max-width breakpoints AND
 * force compact via max() constraints).
 * Desktop: full-bleed cinematic only from lg up with fine pointer.
 */
export function HeroNodule() {
  return (
    <div
      className="hero-nodule-layer pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div className="hero-nodule-frame pointer-events-auto">
        <InteractiveNodule
          variant="hero"
          mode="float"
          className="hero-nodule-canvas"
        />
      </div>
    </div>
  );
}
