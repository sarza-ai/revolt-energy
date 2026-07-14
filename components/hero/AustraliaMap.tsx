"use client";

import { motion } from "framer-motion";
import { networkNodes } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Stylised Australia outline (viewBox 0 0 100 100) for node overlay */
const AU_PATH =
  "M48 8 C42 9 36 14 33 20 C28 18 24 20 22 25 C16 28 12 34 11 42 C9 50 10 56 14 60 C12 64 14 68 18 70 C16 74 20 78 26 78 C24 82 28 86 34 86 C38 90 44 92 50 91 C56 93 62 90 66 86 C72 88 78 84 80 78 C86 76 90 70 91 62 C93 54 90 46 86 40 C88 34 86 28 80 26 C78 20 72 16 66 14 C62 10 56 8 50 8 C49 8 48 8 48 8 Z M72 88 C70 92 72 96 76 95 C78 93 76 90 72 88 Z";

const statusColor = {
  live: "#00f5d4",
  deploying: "#4ade80",
  pipeline: "#5eead4",
};

export function AustraliaMap({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[5/4] w-full max-w-xl", className)}>
      <div className="absolute inset-0 rounded-full bg-electric/10 blur-3xl" />
      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full drop-shadow-[0_0_40px_rgba(0,245,212,0.2)]"
        role="img"
        aria-label="Australia decentralised energy network map"
      >
        <defs>
          <linearGradient id="auFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a1f3d" />
            <stop offset="100%" stopColor="#061428" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={AU_PATH}
          fill="url(#auFill)"
          stroke="rgba(0,245,212,0.45)"
          strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          filter="url(#glow)"
        />

        {/* Connection lines between nearby nodes */}
        {networkNodes.slice(0, -1).map((node, i) => {
          const next = networkNodes[(i + 1) % networkNodes.length];
          if (Math.abs(node.x - next.x) > 35 || Math.abs(node.y - next.y) > 35)
            return null;
          return (
            <motion.line
              key={`${node.id}-${next.id}`}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(0,245,212,0.25)"
              strokeWidth="0.25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.8 }}
            />
          );
        })}

        {networkNodes.map((node, i) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="2.8"
              fill={statusColor[node.status]}
              opacity="0.25"
              className="node-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="1.1"
              fill={statusColor[node.status]}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
              filter="url(#glow)"
            />
            <title>
              {node.name} · {node.mw} MW · {node.status}
            </title>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-2 left-2 flex flex-wrap gap-3 rounded-xl glass px-3 py-2 text-[10px] uppercase tracking-wider text-muted sm:text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-electric" /> Live
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Deploying
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Pipeline
        </span>
      </div>
    </div>
  );
}
