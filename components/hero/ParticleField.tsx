"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      speeds[i] = 0.15 + Math.random() * 0.55;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;
    const arr = points.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      arr[ix + 1] += Math.sin(t * speeds[i] + i) * delta * 0.15;
      arr[ix] += Math.cos(t * speeds[i] * 0.7 + i * 0.01) * delta * 0.08;
      if (arr[ix + 1] > 8) arr[ix + 1] = -8;
      if (arr[ix] > 14) arr[ix] = -14;
      if (arr[ix] < -14) arr[ix] = 14;
    }
    points.geometry.attributes.position.needsUpdate = true;
    points.rotation.y = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00f5d4"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function EnergyLines() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  const curves = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const points = [];
      for (let j = 0; j <= 40; j++) {
        const t = j / 40;
        const r = 2 + t * 6;
        points.push(
          new THREE.Vector3(
            Math.cos(angle + t * 1.4) * r,
            Math.sin(angle * 0.7 + t * 2) * 1.4,
            Math.sin(angle + t) * r * 0.3,
          ),
        );
      }
      return new THREE.CatmullRomCurve3(points);
    });
  }, []);

  return (
    <group ref={ref}>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 64, 0.008, 6, false]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00f5d4" : "#4ade80"}
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        className="!h-full !w-full"
      >
        <color attach="background" args={["#0a0f1c"]} />
        <fog attach="fog" args={["#0a0f1c", 8, 22]} />
        <Particles />
        <EnergyLines />
        <ambientLight intensity={0.4} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0f1c]/20 via-transparent to-[#0a0f1c]/80" />
    </div>
  );
}
