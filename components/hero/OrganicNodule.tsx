"use client";

import { motion } from "framer-motion";

/** Organic energy-nodule visual placeholder */
export function OrganicNodule({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 320 320" className="h-full w-full">
        <defs>
          <radialGradient id="noduleCore" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#059669" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
          </radialGradient>
          <radialGradient id="noduleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <circle cx="160" cy="160" r="140" fill="url(#noduleGlow)" />

        <motion.path
          d="M160 48 C210 52 268 88 278 148 C288 210 248 272 180 284 C112 296 48 250 42 180 C36 112 100 44 160 48 Z"
          fill="url(#noduleCore)"
          initial={{ scale: 0.92, opacity: 0.85 }}
          animate={{ scale: [0.96, 1.02, 0.96], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "160px 160px" }}
        />

        <motion.ellipse
          cx="130"
          cy="120"
          rx="36"
          ry="22"
          fill="white"
          opacity="0.18"
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Energy veins */}
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M160 160 Q${180 + i * 12} ${100 + i * 20} ${200 + i * 18} ${70 + i * 30}`}
            fill="none"
            stroke="#a7f3d0"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 3.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <circle cx="160" cy="160" r="10" fill="#ecfdf5" opacity="0.85" />
        <circle
          cx="160"
          cy="160"
          r="22"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="1"
          opacity="0.5"
          className="node-pulse"
        />
      </svg>
    </div>
  );
}
