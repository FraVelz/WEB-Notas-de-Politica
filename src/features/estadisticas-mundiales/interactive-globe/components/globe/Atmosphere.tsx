"use client";

import { GLOBE_RADIUS } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";

export function Atmosphere() {
  return (
    <mesh scale={[1.08, 1.08, 1.08]}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshPhongMaterial
        color="#22d3ee"
        transparent
        opacity={0.06}
        side={2}
        depthWrite={false}
      />
    </mesh>
  );
}
