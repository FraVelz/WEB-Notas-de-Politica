'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getTemaById } from '@/lib/temas/registry';
import { worldPoints } from '@/features/estadisticas-mundiales/data/world-connections';
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
        className="h-[min(70vh,520px)] w-full animate-pulse rounded-lg border border-border bg-muted"
        aria-hidden
      />
    ),
  },
);

const meta = getTemaById('estadisticas-mundiales')!;

const statusLabel = {
  active: 'Disponible',
  planned: 'Próximamente',
} as const;

export function EstadisticasMundialesHub({ temaId: _temaId }: { temaId?: string }) {
  const active = worldPoints.filter((p) => p.status === 'active');
  const planned = worldPoints.filter((p) => p.status === 'planned');

  return (
    <>
      <section className="border-b border-border pb-8">
        <p className="m-0 mb-2 text-sm font-semibold tracking-widest text-link uppercase">
          Datos · mapa global
        </p>
        <h1 className="m-0 text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {meta.description} Explora conexiones entre países y, poco a poco, añade
          indicadores: población, zona horaria, economía y más.
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
          +rueda en horizontal). ↺ restablece la vista y ⛶ pantalla completa. Los marcadores
          azules
          enlazan a notas ya publicadas.
        </p>
        <div className="mt-4">
          <WorldConnectionsMap />
        </div>
      </section>

      <section
        id="paises"
        className="scroll-mt-24 border-t border-border py-8"
        aria-labelledby="countries-heading"
      >
        <h2 id="countries-heading" className="m-0 text-lg font-semibold text-foreground">
          Países e indicadores
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Elige un país para ver fichas detalladas (en construcción).
        </p>

        {active.length > 0 && (
          <div className="mt-6">
            <h3 className="m-0 text-sm font-semibold text-foreground">
              Con contenido
            </h3>
            <ul className="m-0 mt-3 grid list-none gap-4 p-0 sm:grid-cols-2">
              {active.map((point) => (
                <li key={point.id}>
                  <Link
                    href={point.href!}
                    className="flex h-full flex-col rounded-lg border border-border bg-elevated p-4 no-underline transition hover:border-link hover:shadow-[var(--shadow-theme)]"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h4 className="m-0 text-base font-semibold text-foreground">
                        {point.name}
                      </h4>
                      <span className="shrink-0 rounded border border-link bg-link-muted px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wide text-link uppercase">
                        {statusLabel.active}
                      </span>
                    </div>
                    {point.hint && (
                      <p className="m-0 flex-1 text-sm text-muted-foreground">
                        {point.hint}
                      </p>
                    )}
                    <span className="mt-3 text-sm font-medium text-link">
                      Ver ficha →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {planned.length > 0 && (
          <div className="mt-8">
            <h3 className="m-0 text-sm font-semibold text-muted-foreground">
              En preparación
            </h3>
            <ul className="m-0 mt-3 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {planned.map((point) => (
                <li
                  key={point.id}
                  className={cn(
                    'rounded-lg border border-border bg-muted/50 p-3',
                    'text-sm text-muted-foreground',
                  )}
                >
                  <span className="font-medium text-foreground">{point.name}</span>
                  {point.hint && (
                    <span className="mt-1 block text-xs">{point.hint}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="border-t border-border py-8 text-sm text-muted-foreground">
        <p className="m-0 max-w-2xl">
          Próximas piezas: reloj mundial por capital, tablas comparativas y enlaces a
          fuentes. Añade países en{' '}
          <code className="rounded border border-border bg-muted px-1 text-[0.85em]">
            src/features/estadisticas-mundiales/data/world-connections.ts
          </code>
          .
        </p>
      </section>
    </>
  );
}
