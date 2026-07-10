'use client';

import Link from 'next/link';
import { useRef } from 'react';
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
} from '@/components/ui/map';
import { worldPoints } from '@/features/estadisticas-mundiales/data/world-connections';
import { cn } from '@/lib/utils';
import { GlobeGraticule } from './GlobeGraticule';
import { GlobeKeyboardControls } from './GlobeKeyboardControls';
import { GlobeMapControls } from './GlobeMapControls';
import { globeHomeView } from './globe-view';

export function WorldConnectionsMap() {
  const mapFocusRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={mapFocusRef}
      tabIndex={0}
      aria-label="Mapa mundial interactivo. WASD mueve el mapa; Ctrl y rueda desplaza solo en longitud (horizontal)."
      className={cn(
        'relative h-[min(70vh,520px)] w-full overflow-hidden rounded-lg border border-border bg-background',
        'outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        '[&:fullscreen]:fixed [&:fullscreen]:inset-0 [&:fullscreen]:z-50',
        '[&:fullscreen]:h-screen [&:fullscreen]:w-screen [&:fullscreen]:max-h-none',
        '[&:fullscreen]:rounded-none [&:fullscreen]:border-0',
      )}
    >
      <p className="pointer-events-none absolute top-2 right-2 z-10 m-0 max-w-[14rem] rounded border border-border bg-elevated/90 px-2 py-1 text-[10px] leading-snug text-muted-foreground backdrop-blur">
        Clic en el mapa · <kbd className="font-mono">WASD</kbd> mueve ·{' '}
        <kbd className="font-mono">Ctrl</kbd>+rueda (solo ↔)
      </p>
      <Map
        center={[...globeHomeView.center]}
        zoom={globeHomeView.zoom}
        projection={{ type: 'globe' }}
        pitch={globeHomeView.pitch}
        bearing={globeHomeView.bearing}
      >
        <GlobeMapControls containerRef={mapFocusRef} />
        <MapControls showZoom position="bottom-right" />
        <GlobeKeyboardControls focusTargetRef={mapFocusRef} />
        <GlobeGraticule />

        {worldPoints.map((point) => (
          <MapMarker key={point.id} longitude={point.lng} latitude={point.lat}>
            <MarkerContent>
              {point.href ? (
                <Link
                  href={point.href}
                  className="block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  aria-label={`Ver datos de ${point.name}`}
                >
                  <div
                    className={cn(
                      'size-2.5 rounded-full border-2 border-elevated shadow',
                      'bg-link',
                    )}
                  />
                </Link>
              ) : (
                <div
                  className={cn(
                    'size-2 rounded-full border-2 border-elevated bg-muted-foreground shadow',
                    point.status === 'planned' && 'opacity-60',
                  )}
                />
              )}
              <MarkerLabel position="top" className="text-[10px]">
                {point.name}
              </MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}
      </Map>
    </section>
  );
}
