"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/cn";

export type NoduleVariant =
  | "hero"
  | "solutions"
  | "about"
  | "partners"
  | "investors"
  | "contact"
  | "blog"
  | "configurator";

type VariantConfig = {
  map: string;
  period: number;
  emissive: string;
  light: string;
  metalness: number;
  roughness: number;
  /** Slight rotation bias so each page feels different at rest */
  tilt: number;
};

const VARIANTS: Record<NoduleVariant, VariantConfig> = {
  hero: {
    map: "/images/nodule-full-surface.jpg",
    period: 28,
    emissive: "#042f2e",
    light: "#34d399",
    metalness: 0.08,
    roughness: 0.32,
    tilt: 0.1,
  },
  solutions: {
    map: "/images/nodule-cyan.jpg",
    period: 32,
    emissive: "#083344",
    light: "#22d3ee",
    metalness: 0.12,
    roughness: 0.28,
    tilt: 0.14,
  },
  about: {
    map: "/images/nodule-forest.jpg",
    period: 36,
    emissive: "#052e16",
    light: "#4ade80",
    metalness: 0.06,
    roughness: 0.38,
    tilt: 0.08,
  },
  partners: {
    map: "/images/nodule-jade.jpg",
    period: 30,
    emissive: "#064e3b",
    light: "#2dd4bf",
    metalness: 0.1,
    roughness: 0.3,
    tilt: 0.12,
  },
  investors: {
    map: "/images/nodule-midnight.jpg",
    period: 34,
    emissive: "#022c22",
    light: "#a7f3d0",
    metalness: 0.16,
    roughness: 0.26,
    tilt: 0.06,
  },
  contact: {
    map: "/images/nodule-cyan.jpg",
    period: 26,
    emissive: "#0c4a6e",
    light: "#67e8f9",
    metalness: 0.14,
    roughness: 0.3,
    tilt: 0.16,
  },
  blog: {
    map: "/images/nodule-forest.jpg",
    period: 40,
    emissive: "#14532d",
    light: "#86efac",
    metalness: 0.05,
    roughness: 0.4,
    tilt: 0.09,
  },
  configurator: {
    map: "/images/nodule-jade.jpg",
    period: 24,
    emissive: "#134e4a",
    light: "#5eead4",
    metalness: 0.18,
    roughness: 0.24,
    tilt: 0.11,
  },
};

function NoduleMesh({
  config,
  nearRef,
}: {
  config: VariantConfig;
  nearRef: React.MutableRefObject<number>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const speedMult = useRef(1);

  const map = useTexture(config.map);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;
  map.anisotropy = 8;

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const target = nearRef.current > 0.12 ? 0.5 : 1;
    speedMult.current += (target - speedMult.current) * Math.min(1, delta * 4);
    mesh.current.rotation.y +=
      ((Math.PI * 2) / config.period) * delta * speedMult.current;
  });

  return (
    <mesh ref={mesh} rotation={[config.tilt, 0, 0]}>
      <sphereGeometry args={[1.7, 80, 80]} />
      <meshPhysicalMaterial
        map={map}
        roughness={config.roughness}
        metalness={config.metalness}
        clearcoat={0.55}
        clearcoatRoughness={0.25}
        envMapIntensity={0.9}
        emissive={config.emissive}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

type Props = {
  variant?: NoduleVariant;
  className?: string;
  /** full = hero fill; float = decorative page accent */
  mode?: "full" | "float";
};

/**
 * Interactive energy nodule. Mouse near → spin slows to ~50%.
 * Variants use different surface textures and material tuning.
 */
export function InteractiveNodule({
  variant = "hero",
  className,
  mode = "float",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef(0);
  const config = VARIANTS[variant];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const dist = Math.min(1, Math.hypot(nx, ny));
      // Float orbs are smaller on screen → slightly wider near radius
      const falloff = mode === "full" ? 0.55 : 0.85;
      nearRef.current = Math.max(0, 1 - dist / falloff);
    };

    const onLeave = () => {
      nearRef.current = 0;
    };

    // Track over this nodule's box (works with multiple on site)
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    // Also window so cursor over nearby text still counts when close to orb
    const onWin = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const dist = Math.min(1.5, Math.hypot(dx, dy));
      const falloff = mode === "full" ? 0.55 : 1.1;
      nearRef.current = Math.max(0, 1 - dist / falloff);
    };
    window.addEventListener("pointermove", onWin, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onWin);
      onLeave();
    };
  }, [mode]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        mode === "full" ? "absolute inset-0 z-[1]" : "h-full w-full",
        className,
      )}
      title="Move near the nodule to slow its spin"
    >
      <Canvas
        camera={{ position: [0, 0.08, mode === "full" ? 5.1 : 4.6], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 3, 5]} intensity={1.2} />
        <directionalLight
          position={[-4, 2, -4]}
          intensity={0.85}
          color={config.light}
        />
        <pointLight position={[0, 1.5, 2]} intensity={0.35} color={config.light} />

        <Suspense fallback={null}>
          <NoduleMesh config={config} nearRef={nearRef} />
          <Environment preset="city" environmentIntensity={0.35} />
        </Suspense>
      </Canvas>
    </div>
  );
}

/** Decorative interactive nodule for interior pages */
export function PageNodule({
  variant,
  side = "right",
}: {
  variant: Exclude<NoduleVariant, "hero">;
  side?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-24 z-0 hidden opacity-90 lg:block",
        side === "right"
          ? "right-[-4%] h-[min(52vh,420px)] w-[min(52vh,420px)]"
          : "left-[-4%] h-[min(52vh,420px)] w-[min(52vh,420px)]",
      )}
      aria-hidden
    >
      <div className="pointer-events-auto h-full w-full">
        <InteractiveNodule variant={variant} mode="float" />
      </div>
      {/* Soft glow under orb */}
      <div
        className={cn(
          "pointer-events-none absolute inset-[15%] -z-10 rounded-full blur-3xl",
          variant === "solutions" || variant === "contact"
            ? "bg-cyan-500/15"
            : variant === "investors"
              ? "bg-emerald-200/10"
              : "bg-emerald-500/15",
        )}
      />
    </div>
  );
}
