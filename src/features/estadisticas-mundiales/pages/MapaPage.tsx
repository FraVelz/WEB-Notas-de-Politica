'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getTemaById } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

const WorldConnectionsMap = dynamic(
  () =>
    import('@/features/estadisticas-mundiales/components/WorldConnectionsMap').then(
      (m) => m.WorldConnectionsMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-[min(70vh,520px)] w-full items-center justify-center rounded-xl border border-border bg-muted text-sm text-muted-foreground"
        role="status"
      >
        Cargando mapa…
      </div>
    ),
  },
);

const meta = getTemaById('estadisticas-mundiales')!;

/**
 * Mapa de orientación (MapLibre). El globo Three.js se retiró del build:
 * no aportaba dataset con provenance y solo inflaba el bundle.
 */
export default function MapaPage() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto bg-background p-3 sm:p-4 md:p-6">
      <header className="shrink-0 space-y-2">
        <p className="m-0 text-xs font-semibold tracking-widest text-link uppercase">
          Datos
        </p>
        <h1 className="m-0 text-lg font-bold text-foreground md:text-2xl">
          {meta.title} · mapa
        </h1>
        <p className="m-0 max-w-2xl text-sm text-muted-foreground">
          Vista MapLibre para situar países y fronteras. No es un atlas
          diplomático ni un choropleth de indicadores: para comparar series
          usa el{' '}
          <Link
            href="/estadisticas-mundiales/indicadores"
            className="text-link underline-offset-2 hover:underline"
          >
            comparador de indicadores
          </Link>
          .
        </p>
      </header>

      <div className="min-h-0 flex-1">
        <WorldConnectionsMap />
      </div>

      <p
        className={cn(
          'm-0 shrink-0 rounded-lg border border-border bg-elevated/80 px-3 py-2',
          'text-xs leading-relaxed text-muted-foreground',
        )}
      >
        El globo WebGL (Three.js) se eliminó del build: era decorativo y no
        citaba fuentes por capa. El mapa 2D/globo MapLibre de{' '}
        <Link
          href="/globo-teraqueo-politico"
          className="text-link underline-offset-2 hover:underline"
        >
          Globo terráqueo político
        </Link>{' '}
        cubre la orientación espacial.
      </p>
    </div>
  );
}
