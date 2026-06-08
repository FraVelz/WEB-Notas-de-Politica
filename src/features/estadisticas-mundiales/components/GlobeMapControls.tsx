'use client';

import { Maximize, Minimize, RotateCcw } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useState,
  type RefObject,
} from 'react';
import { useMap } from '@/components/ui/map';
import { cn } from '@/lib/utils';
import { globeHomeView } from './globe-view';

type GlobeMapControlsProps = {
  containerRef: RefObject<HTMLDivElement | null>;
};

export function GlobeMapControls({ containerRef }: GlobeMapControlsProps) {
  const { map } = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, [containerRef]);

  useEffect(() => {
    if (!map) return;
    const resize = () => {
      requestAnimationFrame(() => map.resize());
    };
    document.addEventListener('fullscreenchange', resize);
    return () => document.removeEventListener('fullscreenchange', resize);
  }, [map]);

  const handleReset = useCallback(() => {
    if (!map) return;
    map.flyTo({
      center: [...globeHomeView.center],
      zoom: globeHomeView.zoom,
      bearing: globeHomeView.bearing,
      pitch: globeHomeView.pitch,
      duration: 900,
    });
  }, [map]);

  const handleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      // Navegador sin soporte o permiso denegado
    }
  }, [containerRef]);

  return (
    <div
      className={cn(
        'absolute right-2 bottom-28 z-10',
        'flex flex-col overflow-hidden rounded-md border border-border bg-background shadow-sm',
        '[&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-border',
      )}
    >
      <button
        type="button"
        onClick={handleReset}
        className="flex size-8 items-center justify-center transition-all hover:bg-accent focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-accent/40"
        aria-label="Restablecer zoom y orientación (vista sobre Colombia)"
      >
        <RotateCcw className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        onClick={handleFullscreen}
        className="flex size-8 items-center justify-center transition-all hover:bg-accent focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-accent/40"
        aria-label={
          isFullscreen ? 'Salir de pantalla completa' : 'Ver mapa en pantalla completa'
        }
      >
        {isFullscreen ? (
          <Minimize className="size-4" aria-hidden />
        ) : (
          <Maximize className="size-4" aria-hidden />
        )}
      </button>
    </div>
  );
}
