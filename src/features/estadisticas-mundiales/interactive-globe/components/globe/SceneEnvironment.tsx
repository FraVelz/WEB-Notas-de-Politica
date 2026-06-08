'use client';

import { Stars } from '@react-three/drei';
import { useGlobeSceneTheme } from '@/features/estadisticas-mundiales/interactive-globe/hooks/useGlobeSceneTheme';

export function SceneEnvironment() {
  const theme = useGlobeSceneTheme();

  return (
    <>
      <ambientLight intensity={theme.ambient} />
      <hemisphereLight
        args={[
          theme.hemisphereSky,
          theme.hemisphereGround,
          theme.hemisphereIntensity,
        ]}
      />
      <directionalLight position={[5, 3, 5]} intensity={theme.directional} />
      <directionalLight position={[0, 0, 8]} intensity={theme.fillIntensity} />
      <pointLight
        position={[-5, -3, -5]}
        intensity={theme.pointIntensity}
        color={theme.pointLight}
      />
      <Stars
        radius={80}
        depth={50}
        count={theme.starsCount}
        factor={theme.starsFactor}
        fade
        speed={0.5}
      />
    </>
  );
}
