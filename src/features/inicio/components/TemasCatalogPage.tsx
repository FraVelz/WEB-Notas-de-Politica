import Link from 'next/link';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { TemaCatalogSections } from '@/features/inicio/components/TemaCatalogSections';
import { EJE_VISUAL } from '@/features/inicio/landing-data';
import { getNavCategoriesGrouped } from '@/lib/temas/registry';

export function TemasCatalogPage() {
  const categories = getNavCategoriesGrouped();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 pb-20 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground no-underline hover:text-link"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        Volver al inicio
      </Link>

      <header className="mb-12 max-w-2xl">
        <h1 className="m-0 flex items-center gap-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          <span className="flex size-10 items-center justify-center rounded-xl bg-link-muted text-link">
            <LayoutGrid className="size-5" strokeWidth={1.75} aria-hidden />
          </span>
          Todos los temas
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Catálogo completo por eje y subtema. Entra a cualquier apartado para
          leer notas o abrir herramientas.
        </p>
      </header>

      <div className="flex flex-col gap-14">
        {categories.map(({ category, sections }) => {
          const visual = EJE_VISUAL[category.id];
          const temaCount = sections.reduce((n, s) => n + s.temas.length, 0);

          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-28"
              aria-labelledby={`heading-${category.id}`}
            >
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
                <div className="min-w-0">
                  <p
                    className="m-0 text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: visual.accent }}
                  >
                    Eje
                  </p>
                  <h2
                    id={`heading-${category.id}`}
                    className="mt-1 m-0 text-2xl font-semibold tracking-tight text-foreground"
                  >
                    <Link
                      href={`/temas/${category.id}`}
                      className="text-inherit no-underline hover:text-link"
                    >
                      {category.label}
                    </Link>
                  </h2>
                  <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="m-0 text-xs text-muted-foreground">
                    {temaCount} tema{temaCount === 1 ? '' : 's'}
                  </p>
                  <Link
                    href={`/temas/${category.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-link no-underline hover:underline"
                  >
                    Abrir eje
                    <ArrowRight className="size-3" aria-hidden />
                  </Link>
                </div>
              </div>

              <TemaCatalogSections
                sections={sections}
                accent={visual.accent}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
