'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { TemaPageHeader } from '@/components/ui/TemaPageHeader';
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
        className="h-[min(70vh,520px)] w-full animate-pulse rounded-xl border border-border bg-muted"
        aria-hidden
      />
    ),
  },
);

const meta = getTemaById('globo-teraqueo-politico')!;

export function GloboTerraqueoPoliticoHub({
  temaId = 'globo-teraqueo-politico',
}: {
  temaId?: string;
}) {
  return (
    <div className="space-y-8 pb-4">
      <TemaPageHeader
        temaId={temaId}
        eyebrow="Datos · globo terráqueo"
        title={meta.title}
        description="Vista para orientar fronteras y países de cualquier región. Los puntos enlazan a indicadores y notas: úsalos para situar un caso, no como mapa diplomático definitivo."
        relatedHref="/estadisticas-mundiales/indicadores"
        relatedLabel="Comparador de indicadores"
      />

      <section
        className="rounded-2xl border border-border bg-elevated p-5 shadow-[var(--shadow-theme)] sm:p-6"
        aria-labelledby="map-heading"
      >
        <h2
          id="map-heading"
          className="m-0 text-lg font-semibold text-foreground"
        >
          Vista global
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Globo con líneas de referencia (ecuador, meridianos, trópicos). Haz
          clic en el mapa y usa{' '}
          <kbd
            className={cn(
              'rounded border border-border bg-muted px-1 font-mono text-xs',
            )}
          >
            W
          </kbd>{' '}
          <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            A
          </kbd>{' '}
          <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            S
          </kbd>{' '}
          <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            D
          </kbd>{' '}
          para mover (
          <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            Ctrl
          </kbd>
          +rueda en horizontal). También:{' '}
          <Link
            href="/globo-teraqueo-politico/leer-el-mapa"
            className="text-link underline-offset-2 hover:underline"
          >
            cómo leer el mapa
          </Link>
          .
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <WorldConnectionsMap />
        </div>
      </section>
    </div>
  );
}
