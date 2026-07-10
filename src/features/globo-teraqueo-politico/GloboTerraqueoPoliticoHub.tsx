'use client';

import dynamic from 'next/dynamic';
import { getTemaById } from '@/lib/temas/registry';

const WorldConnectionsMap = dynamic(
  () =>
    import('@/features/estadisticas-mundiales/components/WorldConnectionsMap').then(
      (m) => m.WorldConnectionsMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[min(70vh,520px)] w-full animate-pulse rounded-lg border border-border bg-muted"
        aria-hidden
      />
    ),
  },
);

const meta = getTemaById('globo-teraqueo-politico')!;

export function GloboTerraqueoPoliticoHub({ temaId: _temaId }: { temaId?: string }) {
  return (
    <>
      <section className="border-b border-border pb-8">
        <p className="m-0 mb-2 text-sm font-semibold tracking-widest text-link uppercase">
          Datos · globo terráqueo
        </p>
        <h1 className="m-0 text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Vista para orientar fronteras y países de cualquier región. Los puntos
          enlazan a indicadores y notas: úsalos para situar un caso, no como
          mapa diplomático definitivo.
        </p>
      </section>

      <section className="py-8" aria-labelledby="map-heading">
        <h2 id="map-heading" className="m-0 text-lg font-semibold text-foreground">
          Vista global
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Globo con líneas de referencia (ecuador, meridianos, trópicos), centrado en
          Colombia. Haz clic en el mapa y usa{' '}
          <kbd className="rounded border border-border px-1 font-mono text-xs">W</kbd>{' '}
          <kbd className="rounded border border-border px-1 font-mono text-xs">A</kbd>{' '}
          <kbd className="rounded border border-border px-1 font-mono text-xs">S</kbd>{' '}
          <kbd className="rounded border border-border px-1 font-mono text-xs">D</kbd> mueven el
          mapa (<kbd className="rounded border border-border px-1 font-mono text-xs">Ctrl</kbd>
          +rueda en horizontal). ↺ restablece la vista y ⛶ pantalla completa.
        </p>
        <div className="mt-4">
          <WorldConnectionsMap />
        </div>
      </section>
    </>
  );
}
