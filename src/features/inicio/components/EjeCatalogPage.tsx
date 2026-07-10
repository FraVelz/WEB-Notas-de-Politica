import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TemaCatalogSections } from '@/features/inicio/components/TemaCatalogSections';
import {
  EJE_ICONS,
  EJE_VISUAL,
  getEjeCounts,
} from '@/features/inicio/landing-data';
import { getNavCategoryGroupedById } from '@/lib/temas/registry';
import type { TemaNavCategoryId } from '@/lib/temas/types';
import { cn } from '@/lib/utils';

export function EjeCatalogPage({ ejeId }: { ejeId: TemaNavCategoryId }) {
  const entry = getNavCategoryGroupedById(ejeId);
  if (!entry) return null;

  const { category, sections } = entry;
  const visual = EJE_VISUAL[category.id];
  const Icon = EJE_ICONS[category.id];
  const counts = getEjeCounts(category.id);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 pb-20 sm:px-6">
      <nav
        aria-label="Migas de pan"
        className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link href="/" className="no-underline hover:text-link">
          Inicio
        </Link>
        <span aria-hidden>/</span>
        <Link href="/temas" className="no-underline hover:text-link">
          Todos los temas
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">{category.label}</span>
      </nav>

      <header
        className={cn('eje-hero', `eje-hero--${category.id}`)}
        style={
          {
            ['--eje-accent']: visual.accent,
            ['--eje-glow']: visual.glow,
            ['--eje-image']: `url('${visual.image}')`,
          } as CSSProperties
        }
      >
        <div className="eje-hero-media" aria-hidden />
        <div className="eje-hero-scrim" aria-hidden />
        <div className="eje-hero-body">
          <div className="eje-hero-copy">
            <div className="eje-hero-icon">
              <Icon className="size-6" strokeWidth={1.5} aria-hidden />
            </div>
            <p className="eje-hero-eyebrow">Eje</p>
            <h1 className="eje-hero-title">{category.label}</h1>
            <p className="eje-hero-desc">{category.description}</p>
          </div>
          <dl className="eje-hero-stats">
            {[
              { label: 'Temas', value: counts.temas },
              { label: 'Artículos', value: counts.articulos },
              { label: 'Herramientas', value: counts.herramientas },
            ].map((stat) => (
              <div key={stat.label}>
                <dd className="eje-hero-stat-value">{stat.value}</dd>
                <dt className="eje-hero-stat-label">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/temas"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground no-underline hover:text-link"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Ver todos los ejes
        </Link>
        <Link
          href="/temas"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-link no-underline hover:underline"
        >
          Catálogo completo
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>

      <TemaCatalogSections sections={sections} accent={visual.accent} />
    </div>
  );
}
