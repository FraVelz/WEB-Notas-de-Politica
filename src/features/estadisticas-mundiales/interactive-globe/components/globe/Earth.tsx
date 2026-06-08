"use client";

import { useTexture } from "@react-three/drei";
import { GLOBE_RADIUS } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";

export function Earth() {
  const [earthMap] = useTexture(["/textures/earth.jpg"]);

  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshPhongMaterial map={earthMap} specular="#111111" shininess={12} />
    </mesh>
  );
}
