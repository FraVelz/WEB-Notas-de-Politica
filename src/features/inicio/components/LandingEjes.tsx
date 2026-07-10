import Link from 'next/link';
import {
  ArrowUpRight,
  Landmark,
  Map,
  Megaphone,
  Swords,
} from 'lucide-react';
import {
  EJE_VISUAL,
  getEjeCounts,
} from '@/features/inicio/landing-data';
import {
  getNavCategoriesGrouped,
  temaNavCategories,
} from '@/lib/temas/registry';
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
      <header className="mb-8 max-w-2xl">
        <h2
          id="ejes-heading"
          className="font-display m-0 text-3xl text-foreground sm:text-4xl"
        >
          Explora por grandes ejes
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Cuatro puertas al archivo: teoría, poder, debate contemporáneo y
          datos.
        </p>
      </header>

      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-4">
        {temaNavCategories.map((category) => {
          const visual = EJE_VISUAL[category.id];
          const counts = getEjeCounts(category.id);
          const Icon = ejeIcons[category.id];
          const grouped = getNavCategoriesGrouped().find(
            (c) => c.category.id === category.id,
          );
          const firstTema = grouped?.sections
            .flatMap((s) => s.temas)
            .find((t) => t.status === 'active');
          const href = firstTema ? `/${firstTema.id}` : `/#${category.id}`;

          return (
            <li key={category.id} id={category.id} className="scroll-mt-28">
              <Link
                href={href}
                className={cn(
                  'group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-border no-underline',
                  'shadow-[var(--shadow-theme)] transition hover:-translate-y-0.5',
                )}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${visual.image}')` }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${visual.accent}33 0%, #05070acc 45%, #05070af2 100%)`,
                  }}
                  aria-hidden
                />
                <div className="relative flex h-full flex-col p-5">
                  <div
                    className="glow-icon mb-6 inline-flex size-12 items-center justify-center rounded-xl border border-white/15 bg-black/20"
                    style={{ ['--glow-color' as string]: visual.glow }}
                  >
                    <Icon
                      className="size-6 text-white"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  <h3 className="m-0 text-xl font-semibold text-white">
                    {category.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                    {category.description}
                  </p>
                  <div className="mt-6 flex items-end justify-between gap-3">
                    <dl className="m-0 grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: 'Temas', value: counts.temas },
                        { label: 'Artículos', value: counts.articulos },
                        { label: 'Herramientas', value: counts.herramientas },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <dt className="text-[0.65rem] text-slate-400">
                            {stat.label}
                          </dt>
                          <dd className="m-0 text-sm font-semibold text-white">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <span
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition group-hover:bg-link group-hover:border-link"
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
