import Link from 'next/link';
import { siteConfig } from '@/lib/navigation';
import { getNavCategoriesGrouped } from '@/lib/temas/registry';
import type { TemaStatus } from '@/lib/temas/types';
import { cn } from '@/lib/utils';

const statusLabel: Record<TemaStatus, string> = {
  active: 'Con contenido',
  stub: 'En preparación',
  planned: 'Próximamente',
};

export function InicioPage() {
  const categories = getNavCategoriesGrouped();

  return (
    <>
      <section className="border-b border-border py-10 pb-8">
        <p className="m-0 mb-2 text-sm font-semibold tracking-widest text-link uppercase">
          Web Prosperity
        </p>
        <h1 className="m-0 text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
          Prosperidad
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Un espacio para la búsqueda de la prosperidad de una nación,
          explorada en sentido amplio: desde la filosofía y el Estado hasta
          economía, geopolítica, datos y debates actuales. Elige un apartado
          para entrar.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#apartados"
            className={cn(
              'inline-flex items-center rounded-lg border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground no-underline',
              'transition-colors duration-150',
              'hover:border-accent-strong hover:bg-accent-strong',
              '[[data-theme=dark]_&]:hover:border-neutral-400 [[data-theme=dark]_&]:hover:bg-neutral-400',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]',
            )}
          >
            Ver apartados
          </a>
          <Link
            href="/inicio/bienvenida"
            className={cn(
              'inline-flex items-center rounded-lg border border-border bg-elevated px-4 py-2.5 text-sm font-medium text-foreground no-underline',
              'transition-colors duration-150',
              'hover:border-link hover:bg-link-muted hover:text-link',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]',
            )}
          >
            Texto de bienvenida
          </Link>
        </div>
      </section>

      <div id="apartados" className="pt-8">
        {categories.map(({ category, sections }, categoryIndex) => (
          <section
            key={category.id}
            id={category.id}
            className={cn(
              'scroll-mt-32 pb-12 md:scroll-mt-28',
              categoryIndex > 0 && 'border-t border-border pt-10',
            )}
            aria-labelledby={`heading-${category.id}`}
          >
            <header className="mb-8 text-center">
              <h2
                id={`heading-${category.id}`}
                className="m-0 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                {category.label}
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {category.description}
              </p>
            </header>

            <div className="flex flex-col gap-10">
              {sections.map(({ group, temas: items }) => (
                <section
                  key={group.id}
                  id={group.id}
                  className="scroll-mt-32 md:scroll-mt-28"
                  aria-labelledby={`heading-${group.id}`}
                >
                  <header className="mb-5">
                    <h3
                      id={`heading-${group.id}`}
                      className="m-0 text-xl font-semibold text-foreground"
                    >
                      {group.label}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                      {group.description}
                    </p>
                  </header>
                  <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((tema) => (
                      <li key={tema.id}>
                        <Link
                          href={`/${tema.id}`}
                          className="flex h-full flex-col rounded-lg border border-border bg-elevated p-4 no-underline transition hover:-translate-y-0.5 hover:border-link hover:shadow-[var(--shadow-theme)]"
                        >
                          <div className="mb-2 flex items-start justify-between gap-2">
                            <h4 className="m-0 text-base leading-snug font-semibold text-foreground">
                              {tema.title}
                            </h4>
                            <span
                              className={cn(
                                'shrink-0 rounded border border-border px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wide uppercase',
                                tema.status === 'active'
                                  ? 'border-link bg-link-muted text-link'
                                  : 'text-muted-foreground',
                              )}
                            >
                              {statusLabel[tema.status]}
                            </span>
                          </div>
                          <p className="m-0 flex-1 text-sm leading-snug text-muted-foreground">
                            {tema.description}
                          </p>
                          <span className="mt-3 text-sm font-medium text-link">
                            Entrar al tema →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-12 border-t border-border pt-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-20">
          <div className="min-w-0 max-w-2xl flex-1">
            <p className="m-0 text-sm font-semibold text-foreground">
              {siteConfig.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <nav
            className="shrink-0 md:pt-0.5 md:pl-8 lg:min-w-44"
            aria-label="Enlaces del sitio"
          >
            <p className="m-0 text-sm font-semibold text-foreground">
              Enlaces
            </p>
            <ul className="mt-3 flex flex-col gap-2.5 p-0 text-sm">
              <li className="list-none">
                <Link
                  href="/inicio/bienvenida"
                  className="font-medium text-link no-underline hover:text-link-hover"
                >
                  Texto de bienvenida
                </Link>
              </li>
              <li className="list-none">
                <a
                  href="#apartados"
                  className="font-medium text-link no-underline hover:text-link-hover"
                >
                  Volver a los apartados
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
          <p className="m-0">
            <span className="text-foreground">{siteConfig.author}</span>
            {' · '}
            notas personales en construcción
          </p>
          <p className="m-0">{siteConfig.license}</p>
        </div>
      </footer>
    </>
  );
}
