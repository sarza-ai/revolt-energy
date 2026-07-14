"use client";

import { InteractiveNodule } from "@/components/nodule/InteractiveNodule";

/**
 * Hero energy node.
 *
 * Mobile / touch: mid-size ambient orb (~170–200px), never full-bleed.
 * Desktop (fine pointer): full-bleed cinematic.
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
