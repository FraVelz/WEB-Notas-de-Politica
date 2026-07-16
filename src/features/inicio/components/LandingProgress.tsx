import Link from 'next/link';
import {
  PUBLISHED_MIN_SOURCE_URLS,
  PUBLISHED_MIN_WORDS,
  getArchiveProgress,
} from '@/lib/content/progress';
import { cn } from '@/lib/utils';

/** Progreso editorial real (notas ≥800 palabras + ≥2 URLs en Fuentes). */
export function LandingProgress() {
  const p = getArchiveProgress();

  return (
    <section
      className="mx-auto w-full max-w-7xl px-4 sm:px-6"
      aria-labelledby="progreso-heading"
    >
      <div className="rounded-2xl border border-border bg-elevated/70 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="m-0 text-xs font-semibold tracking-[0.2em] text-link uppercase">
              Demo · archivo en construcción
            </p>
            <h2
              id="progreso-heading"
              className="m-0 scroll-mt-28 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            >
              Progreso editorial real
            </h2>
            <p className="m-0 text-sm leading-relaxed text-muted-foreground">
              Criterio «publicado»: ≥{PUBLISHED_MIN_WORDS} palabras y ≥
              {PUBLISHED_MIN_SOURCE_URLS} fuentes con URL en la sección Fuentes.
              Bloque foco:{' '}
              <span className="text-foreground">{p.focusGroupLabel}</span>. El
              resto del catálogo puede estar en preparación — no es un think-tank
              terminado.
            </p>
          </div>
          <dl className="m-0 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[22rem]">
            {[
              {
                label: 'Notas publicadas',
                value: `${p.notesPublished}/${p.notesTotal}`,
                hint: `${p.pct}%`,
              },
              {
                label: `Bloque ${p.focusGroupLabel}`,
                value: `${p.focusPublished}/${p.focusTotal}`,
                hint: `${p.focusPct}%`,
              },
              {
                label: 'Temas activos',
                value: `${p.temasActive}/${p.temasLanding}`,
                hint: 'badge honesto',
              },
              {
                label: 'Promesa',
                value: 'Lab',
                hint: 'no mid producto',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-background/60 px-3 py-2.5"
              >
                <dt className="m-0 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
                  {item.label}
                </dt>
                <dd className="m-0 mt-1 text-lg font-semibold text-foreground">
                  {item.value}
                </dd>
                <p className="m-0 text-xs text-muted-foreground">{item.hint}</p>
              </div>
            ))}
          </dl>
        </div>
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={p.pct}
          aria-label={`Archivo ${p.pct} por ciento publicado`}
        >
          <div
            className={cn('h-full rounded-full bg-link transition-[width]')}
            style={{ width: `${p.pct}%` }}
          />
        </div>
        <p className="mt-3 m-0 text-xs text-muted-foreground">
          Detalle del bloque foco:{' '}
          <Link
            href="/temas/marco-teorico"
            className="text-link underline-offset-2 hover:underline"
          >
            Marco teórico
          </Link>
          {' · '}
          <Link
            href="/filosofia/introduccion"
            className="text-link underline-offset-2 hover:underline"
          >
            Nota publicada (filosofía)
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
