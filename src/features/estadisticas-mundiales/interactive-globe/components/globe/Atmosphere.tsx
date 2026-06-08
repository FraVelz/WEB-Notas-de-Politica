'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Mesh } from 'three';
import { GLOBE_RADIUS } from '@/features/estadisticas-mundiales/interactive-globe/lib/constants';
import { useGlobeSceneTheme } from '@/features/estadisticas-mundiales/interactive-globe/hooks/useGlobeSceneTheme';
import { useGlobeStore } from '@/features/estadisticas-mundiales/interactive-globe/store/globeStore';

export function Atmosphere() {
  const meshRef = useRef<Mesh>(null);
  const theme = useGlobeSceneTheme();
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const hoveredIso2 = useGlobeStore((s) => s.hoveredIso2);
  const compareIso2s = useGlobeStore((s) => s.compareIso2s);
  const isActive = !!(selectedIso2 || hoveredIso2 || compareIso2s.length > 0);

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.raycast = () => {};
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.MeshPhongMaterial;
    material.color.set(theme.atmosphereColor);
    material.opacity = isActive ? theme.atmosphereOpacity : 0;
  }, [isActive, theme.atmosphereColor, theme.atmosphereOpacity]);

  return (
    <mesh ref={meshRef} scale={[1.06, 1.06, 1.06]}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshPhongMaterial
        color={theme.atmosphereColor}
        transparent
        opacity={0}
        side={2}
        depthWrite={false}
      />
    </mesh>
  );
}
