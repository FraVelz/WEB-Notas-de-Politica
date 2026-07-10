import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowUpRight, LayoutGrid } from 'lucide-react';
import {
  EJE_ICONS,
  EJE_VISUAL,
  getEjeCounts,
} from '@/features/inicio/landing-data';
import { temaNavCategories } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

export function LandingEjes() {
  return (
    <section
      id="ejes"
      className="mx-auto w-full max-w-7xl scroll-mt-28 px-4 sm:px-6"
      aria-labelledby="ejes-heading"
    >
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2
            id="ejes-heading"
            className="m-0 flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            <span
              className="size-2.5 shrink-0 rounded-full bg-link shadow-[0_0_12px_#3b82f6]"
              aria-hidden
            />
            Explora por grandes ejes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Cuatro puertas al archivo: teoría, poder, debate contemporáneo y
            datos.
          </p>
        </div>
        <Link
          href="/temas"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-elevated/60 px-3.5 py-2 text-sm font-medium text-foreground no-underline hover:border-link hover:text-link"
        >
          <LayoutGrid className="size-3.5" aria-hidden />
          Ver todos los temas
        </Link>
      </header>

      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-4">
        {temaNavCategories.map((category) => {
          const visual = EJE_VISUAL[category.id];
          const counts = getEjeCounts(category.id);
          const Icon = EJE_ICONS[category.id];
          const href = `/temas/${category.id}`;

          return (
            <li key={category.id} id={category.id} className="scroll-mt-28">
              <Link
                href={href}
                className={cn(
                  'eje-card group',
                  `eje-card--${category.id}`,
                )}
                style={
                  {
                    ['--eje-accent']: visual.accent,
                    ['--eje-glow']: visual.glow,
                    ['--eje-image']: `url('${visual.image}')`,
                  } as CSSProperties
                }
              >
                <div className="eje-card-media" aria-hidden />
                <div className="eje-card-scrim" aria-hidden />
                <div className="eje-card-body">
                  <div className="eje-card-icon">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="eje-card-title">{category.label}</h3>
                  <p className="eje-card-desc">{category.description}</p>
                  <div className="eje-card-footer">
                    <dl className="eje-card-stats">
                      {[
                        { label: 'Temas', value: counts.temas },
                        { label: 'Artículos', value: counts.articulos },
                        { label: 'Herramientas', value: counts.herramientas },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <dd className="eje-card-stat-value">{stat.value}</dd>
                          <dt className="eje-card-stat-label">{stat.label}</dt>
                        </div>
                      ))}
                    </dl>
                    <span className="eje-card-arrow" aria-hidden>
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
