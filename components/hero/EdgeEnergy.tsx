"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  /** Half the energy seeks the nodule center; half seeks the cursor */
  target: "center" | "mouse";
};

function spawnFromEdge(
  w: number,
  h: number,
  mouseX: number,
  mouseY: number,
): Particle {
  const edge = Math.floor(Math.random() * 4); // 0 L, 1 R, 2 T, 3 B
  let x = 0;
  let y = 0;

  switch (edge) {
    case 0:
      x = -4;
      y = Math.random() * h;
      break;
    case 1:
      x = w + 4;
      y = Math.random() * h;
      break;
    case 2:
      x = Math.random() * w;
      y = -4;
      break;
    default:
      x = Math.random() * w;
      y = h + 4;
      break;
  }

  // 50% of particles → page center, 50% → mouse
  const target: "center" | "mouse" = Math.random() < 0.5 ? "center" : "mouse";
  const tx = target === "center" ? w * 0.5 : mouseX;
  const ty = target === "center" ? h * 0.5 : mouseY;

  const dx = tx - x + (Math.random() - 0.5) * 40;
  const dy = ty - y + (Math.random() - 0.5) * 40;
  const len = Math.hypot(dx, dy) || 1;
  const speed = 0.28 + Math.random() * 0.55;

  return {
    x,
    y,
    vx: (dx / len) * speed,
    vy: (dy / len) * speed,
    life: 0,
    maxLife: 160 + Math.random() * 160,
    size: 1 + Math.random() * 2.4,
    hue: 150 + Math.random() * 30, // emerald → cyan
    target,
  };
}

/**
 * Energy from the page edges: 50% gravitates to the center, 50% to the mouse.
 */
export function EdgeEnergy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    // Default gravity target = page center until the mouse moves
    let mx = typeof window !== "undefined" ? window.innerWidth * 0.5 : 0;
    let my = typeof window !== "undefined" ? window.innerHeight * 0.5 : 0;
    let hasMouse = false;

    const isMobile = () => window.innerWidth < 768;

    const resize = () => {
      // Lower DPR on phones for smoother scroll
      dpr = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.25 : 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!hasMouse) {
        mx = w * 0.5;
        my = h * 0.5;
      }
    };

    const onPointer = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      hasMouse = true;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    // Seed: keep mobile energetic enough to read on phones
    const seedCount = isMobile() ? 20 : 24;
    for (let i = 0; i < seedCount; i++) {
      const p = spawnFromEdge(w, h, mx, my);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Edge energy flares
      drawEdgeFlare(ctx, 0, h * 0.5, 1, 0, w * 0.28); // left
      drawEdgeFlare(ctx, w, h * 0.5, -1, 0, w * 0.28); // right
      drawEdgeFlare(ctx, w * 0.5, 0, 0, 1, h * 0.22); // top
      drawEdgeFlare(ctx, w * 0.5, h, 0, -1, h * 0.22); // bottom

      // Mobile: more particles so the "energy coming in" is obvious
      const maxParticles = isMobile() ? 36 : 45;
      const spawnChance = isMobile() ? 0.16 : 0.14;
      if (particles.length < maxParticles && Math.random() < spawnChance) {
        particles.push(spawnFromEdge(w, h, mx, my));
      }
      if (Math.random() < (isMobile() ? 0.05 : 0.03)) {
        particles.push(spawnFromEdge(w, h, mx, my));
      }

      // On mobile the nodule sits higher in the hero, not dead center
      const cx = w * 0.5;
      const cy = isMobile() ? h * 0.32 : h * 0.5;

      particles = particles.filter((p) => {
        p.life += 1;

        // Each particle has a fixed attractor: center OR mouse
        const gx = p.target === "center" ? cx : mx;
        const gy = p.target === "center" ? cy : my;

        const mdx = gx - p.x;
        const mdy = gy - p.y;
        const mdist = Math.hypot(mdx, mdy) || 1;
        const pull = 0.055 + Math.min(mdist, 900) * 0.00004;
        p.vx += (mdx / mdist) * pull;
        p.vy += (mdy / mdist) * pull;

        // Light damping so paths curve into the target
        p.vx *= 0.985;
        p.vy *= 0.985;

        const spd = Math.hypot(p.vx, p.vy);
        const maxSpd = 2.2;
        if (spd > maxSpd) {
          p.vx = (p.vx / spd) * maxSpd;
          p.vy = (p.vy / spd) * maxSpd;
        }

        p.x += p.vx;
        p.y += p.vy;

        const distToTarget = Math.hypot(p.x - gx, p.y - gy);
        const lifeT = p.life / p.maxLife;
        const nearFade = distToTarget < 100 ? distToTarget / 100 : 1;
        // Brighter on mobile so energy reads clearly on small screens
        const alphaBoost = isMobile() ? 0.72 : 0.525;
        const alpha = Math.max(0, (1 - lifeT) * nearFade * alphaBoost);

        if (alpha <= 0.02 || p.life >= p.maxLife || distToTarget < 18) {
          return false;
        }

        // Trail
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${p.hue}, 90%, 62%, ${alpha * 0.44})`;
        ctx.lineWidth = p.size * 0.6;
        ctx.moveTo(p.x - p.vx * 6, p.y - p.vy * 6);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Core spark
        const g = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 4,
        );
        g.addColorStop(0, `hsla(${p.hue}, 100%, 72%, ${alpha})`);
        g.addColorStop(0.4, `hsla(${p.hue}, 90%, 50%, ${alpha * 0.45})`);
        g.addColorStop(1, `hsla(${p.hue}, 80%, 40%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <>
      {/* Ambient edge light wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <div className="energy-edge energy-edge-l" />
        <div className="energy-edge energy-edge-r" />
        <div className="energy-edge energy-edge-t" />
        <div className="energy-edge energy-edge-b" />
        {/* Lightning veins from edges → center (viewBox coords 0-100) */}
        <svg
          className="absolute inset-0 h-full w-full opacity-35"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="vein-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="vein-grad-r" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="energy-vein"
            d="M0 18 C12 22, 22 35, 38 45"
            fill="none"
            stroke="url(#vein-grad)"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="energy-vein energy-vein-delay"
            d="M0 55 C15 50, 25 48, 40 50"
            fill="none"
            stroke="url(#vein-grad)"
            strokeWidth="0.28"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="energy-vein"
            d="M100 22 C88 28, 75 38, 62 46"
            fill="none"
            stroke="url(#vein-grad-r)"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="energy-vein energy-vein-delay"
            d="M0 88 C18 78, 28 65, 42 55"
            fill="none"
            stroke="url(#vein-grad)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="energy-vein"
            d="M100 85 C82 75, 72 62, 58 54"
            fill="none"
            stroke="url(#vein-grad-r)"
            strokeWidth="0.32"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="energy-vein energy-vein-delay"
            d="M50 0 C48 18, 48 28, 50 40"
            fill="none"
            stroke="url(#vein-grad)"
            strokeWidth="0.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
      />
    </>
  );
}

function drawEdgeFlare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  reach: number,
) {
  const g = ctx.createRadialGradient(x, y, 0, x + dx * reach * 0.3, y + dy * reach * 0.3, reach);
  g.addColorStop(0, "rgba(52, 211, 153, 0.138)");
  g.addColorStop(0.35, "rgba(16, 185, 129, 0.05)");
  g.addColorStop(1, "rgba(16, 185, 129, 0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, reach, 0, Math.PI * 2);
  ctx.fill();
}
