"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll for desktop pointer devices only.
 * Touch / iOS / Android keep native scrolling (better performance & rubber-band).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Skip Lenis on touch-primary devices
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    const touchPoints =
      typeof navigator !== "undefined" ? navigator.maxTouchPoints > 0 : false;
    if (coarse || (noHover && touchPoints)) return;

    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
