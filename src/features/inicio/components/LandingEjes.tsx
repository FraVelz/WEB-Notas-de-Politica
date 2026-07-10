import Link from 'next/link';
import {
  ArrowUpRight,
  LayoutGrid,
  Landmark,
  Map,
  Megaphone,
  Swords,
} from 'lucide-react';
import { EJE_VISUAL, getEjeCounts } from '@/features/inicio/landing-data';
import { temaNavCategories } from '@/lib/temas/registry';
import type { TemaNavCategoryId } from '@/lib/temas/types';
import { cn } from '@/lib/utils';

const ejeIcons: Record<TemaNavCategoryId, typeof Landmark> = {
  'marco-teorico': Landmark,
  'poder-y-accion': Swords,
  'debate-actual': Megaphone,
  datos: Map,
};

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
          const Icon = ejeIcons[category.id];
          const href = `/temas#${category.id}`;

          return (
            <li key={category.id} id={category.id} className="scroll-mt-28">
              <Link
                href={href}
                className={cn(
                  'group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-2xl border border-border no-underline',
                  'shadow-[var(--shadow-theme)] transition hover:-translate-y-0.5',
                )}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${visual.image}')` }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${visual.accent}22 0%, #05070a99 38%, #05070af5 100%)`,
                  }}
                  aria-hidden
                />
                <div className="relative z-[1] flex h-full flex-col p-5">
                  <div
                    className="mb-8 inline-flex size-11 items-center justify-center rounded-xl text-white shadow-[0_0_24px_var(--glow)]"
                    style={{
                      backgroundColor: visual.accent,
                      ['--glow' as string]: visual.glow,
                    }}
                  >
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="m-0 text-xl font-semibold tracking-tight text-white">
                    {category.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                    {category.description}
                  </p>
                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <dl className="m-0 grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: 'Temas', value: counts.temas },
                        { label: 'Artículos', value: counts.articulos },
                        { label: 'Herramientas', value: counts.herramientas },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <dd className="m-0 text-sm font-semibold text-white">
                            {stat.value}
                          </dd>
                          <dt className="text-[0.65rem] text-slate-400">
                            {stat.label}
                          </dt>
                        </div>
                      ))}
                    </dl>
                    <span
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition group-hover:border-link group-hover:bg-link"
                      aria-hidden
                    >
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
