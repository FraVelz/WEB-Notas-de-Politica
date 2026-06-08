"use client";

import { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Mesh } from "three";
import { GLOBE_RADIUS } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { useGlobeSceneTheme } from "@/features/estadisticas-mundiales/interactive-globe/hooks/useGlobeSceneTheme";

export function Earth() {
  const meshRef = useRef<Mesh>(null);
  const theme = useGlobeSceneTheme();
  const [earthMap] = useTexture(["/textures/earth.jpg"]);

  useEffect(() => {
    earthMap.colorSpace = THREE.SRGBColorSpace;
  }, [earthMap]);

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.raycast = () => {};
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshStandardMaterial
        map={earthMap}
        roughness={theme.earthRoughness}
        metalness={theme.earthMetalness}
        emissive={theme.earthEmissive}
        emissiveIntensity={theme.earthEmissiveIntensity}
      />
    </mesh>
  );
}
