"use client";

import { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import type { Mesh } from "three";
import { GLOBE_RADIUS } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { useGlobeSceneTheme } from "@/features/estadisticas-mundiales/interactive-globe/hooks/useGlobeSceneTheme";

export function Earth() {
  const meshRef = useRef<Mesh>(null);
  const theme = useGlobeSceneTheme();
  const [earthMap] = useTexture(["/textures/earth.jpg"]);

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.raycast = () => {};
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshPhongMaterial
        map={earthMap}
        specular="#222222"
        shininess={14}
        emissive={theme.earthEmissive}
        emissiveIntensity={theme.earthEmissiveIntensity}
      />
    </mesh>
  );
}
