"use client";

import { useMemo } from "react";

type Star = { id: number; x: number; y: number; r: number; o: number };

/** Deterministic pseudo-random from index */
function nrand(i: number, salt = 1) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Static constellation field — no background motion.
 */
export function ConstellationBg() {
  const { stars, links, clusters } = useMemo(() => {
    const stars: Star[] = Array.from({ length: 72 }, (_, i) => ({
      id: i,
      x: nrand(i, 1) * 100,
      y: nrand(i, 2) * 100,
      r: 0.35 + nrand(i, 3) * 1.4,
      o: 0.25 + nrand(i, 4) * 0.55,
    }));

    const clusters = [
      [
        { x: 18, y: 28 },
        { x: 22, y: 38 },
        { x: 14, y: 42 },
        { x: 26, y: 48 },
        { x: 20, y: 55 },
      ],
      [
        { x: 42, y: 22 },
        { x: 50, y: 30 },
        { x: 58, y: 26 },
        { x: 66, y: 34 },
        { x: 74, y: 28 },
      ],
      [
        { x: 78, y: 52 },
        { x: 86, y: 48 },
        { x: 90, y: 60 },
        { x: 82, y: 68 },
        { x: 74, y: 62 },
      ],
      [
        { x: 12, y: 68 },
        { x: 20, y: 72 },
        { x: 28, y: 66 },
        { x: 24, y: 80 },
      ],
    ];

    const links: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (const c of clusters) {
      for (let i = 0; i < c.length - 1; i++) {
        links.push({
          x1: c[i].x,
          y1: c[i].y,
          x2: c[i + 1].x,
          y2: c[i + 1].y,
        });
      }
      if (c.length >= 4) {
        links.push({
          x1: c[0].x,
          y1: c[0].y,
          x2: c[2].x,
          y2: c[2].y,
        });
      }
    }

    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 11 && nrand(i * 100 + j, 9) > 0.72) {
          links.push({
            x1: stars[i].x,
            y1: stars[i].y,
            x2: stars[j].x,
            y2: stars[j].y,
          });
        }
      }
    }

    return { stars, links, clusters };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#050a0c]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(16,185,129,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(45,212,191,0.08),transparent_45%)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="1" />
            <stop offset="40%" stopColor="#34d399" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {links.map((l, i) => (
          <line
            key={`l-${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="rgba(52,211,153,0.22)"
            strokeWidth="0.12"
          />
        ))}

        {stars.map((s) => (
          <circle
            key={s.id}
            cx={s.x}
            cy={s.y}
            r={s.r * 0.18}
            fill="#ecfdf5"
            opacity={s.o * 0.55}
          />
        ))}

        {clusters.flat().map((p, i) => (
          <g
            key={`c-${i}`}
            className="constellation-bright-fade"
            style={{ animationDelay: `${i * 1.1}s` }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r="1.1"
              fill="url(#starGlow)"
              opacity="0.85"
            />
            <circle cx={p.x} cy={p.y} r="0.35" fill="#ecfdf5" opacity="0.95" />
          </g>
        ))}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-[#050a0c]/50 via-transparent to-[#050a0c]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,10,12,0.55)_100%)]" />
    </div>
  );
}
