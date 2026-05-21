'use client';

import { MapMarker, MapRoute, MarkerContent, MarkerLabel } from '@/components/ui/map';
import { cn } from '@/lib/utils';
import { globeGraticuleLines } from './globe-graticule';
import { useGlobeGraticuleColors } from './use-globe-graticule-colors';

const PRIMARY_STYLE = {
  width: 1.25,
  opacity: 0.55,
} as const;

const SECONDARY_STYLE = {
  width: 0.75,
  opacity: 0.35,
  dashArray: [3, 4] as [number, number],
} as const;

const labelClass = cn(
  'pointer-events-none rounded border border-border bg-elevated/95 px-1.5 py-0.5',
  'text-[9px] font-medium text-muted-foreground shadow-sm backdrop-blur',
);

export function GlobeGraticule() {
  const { primary, secondary } = useGlobeGraticuleColors();

  return (
    <>
      {globeGraticuleLines.map((line) => {
        const isPrimary = line.emphasis === 'primary';
        return (
          <MapRoute
            key={line.id}
            id={`graticule-${line.id}`}
            coordinates={line.coordinates}
            color={isPrimary ? primary : secondary}
            width={isPrimary ? PRIMARY_STYLE.width : SECONDARY_STYLE.width}
            opacity={isPrimary ? PRIMARY_STYLE.opacity : SECONDARY_STYLE.opacity}
            dashArray={isPrimary ? undefined : SECONDARY_STYLE.dashArray}
            interactive={false}
          />
        );
      })}
      {globeGraticuleLines.map((line) => (
        <MapMarker
          key={`label-${line.id}`}
          longitude={line.labelAt[0]}
          latitude={line.labelAt[1]}
        >
          <MarkerContent>
            <span className="block size-0 overflow-hidden" aria-hidden>
              ·
            </span>
            <MarkerLabel position="top" className={labelClass}>
              {line.name}
            </MarkerLabel>
          </MarkerContent>
        </MapMarker>
      ))}
    </>
  );
}
