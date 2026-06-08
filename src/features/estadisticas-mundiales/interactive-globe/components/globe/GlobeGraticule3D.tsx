'use client';

import { Line } from '@react-three/drei';
import { globeGraticuleLines } from '@/features/estadisticas-mundiales/components/globe-graticule';
import { GLOBE_RADIUS } from '@/features/estadisticas-mundiales/interactive-globe/lib/constants';
import { latLngToVector3 } from '@/features/estadisticas-mundiales/interactive-globe/lib/geo/projectToSphere';
import { useGlobeGraticuleColors } from '@/features/estadisticas-mundiales/components/use-globe-graticule-colors';

const GRATICULE_ALTITUDE = 0.006;

export function GlobeGraticule3D({ visible }: { visible: boolean }) {
  const { primary, secondary } = useGlobeGraticuleColors();

  if (!visible) return null;

  return (
    <group>
      {globeGraticuleLines.map((line) => {
        const points = line.coordinates.map(([lng, lat]) =>
          latLngToVector3(lat, lng, GLOBE_RADIUS + GRATICULE_ALTITUDE),
        );
        const isPrimary = line.emphasis === 'primary';

        return (
          <Line
            key={line.id}
            points={points}
            color={isPrimary ? primary : secondary}
            lineWidth={isPrimary ? 1.2 : 0.8}
            transparent
            opacity={isPrimary ? 0.55 : 0.35}
            depthWrite={false}
          />
        );
      })}
    </group>
  );
}
