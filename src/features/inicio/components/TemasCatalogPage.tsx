import Link from 'next/link';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { EJE_VISUAL } from '@/features/inicio/landing-data';
import { getDocsByTema } from '@/lib/content/docs';
import { getTemaIcon } from '@/lib/temas/icons';
import { getNavCategoriesGrouped } from '@/lib/temas/registry';
import { getTemaTsxTools } from '@/lib/temas/tsx-pages';
import type { TemaStatus } from '@/lib/temas/types';
import { cn } from '@/lib/utils';

const statusLabel: Record<TemaStatus, string> = {
  active: 'Con contenido',
  stub: 'En preparación',
  planned: 'Próximamente',
};

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
                    {category.label}
                  </h2>
                  <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <p className="m-0 text-xs text-muted-foreground">
                  {temaCount} tema{temaCount === 1 ? '' : 's'}
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {sections.map(({ group, temas }) => (
                  <div key={group.id} id={group.id} className="scroll-mt-28">
                    <header className="mb-4 flex items-center gap-2">
                      <span
                        className="h-4 w-0.5 rounded-full"
                        style={{ backgroundColor: visual.accent }}
                        aria-hidden
                      />
                      <div>
                        <h3 className="m-0 text-sm font-semibold text-foreground">
                          {group.label}
                        </h3>
                        <p className="m-0 text-xs text-muted-foreground">
                          {group.description}
                        </p>
                      </div>
                    </header>

                    <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
                      {temas.map((tema) => {
                        const Icon = getTemaIcon(tema.id);
                        const docs = getDocsByTema(tema.id).filter(
                          (d) => d.slug !== '',
                        );
                        const tools = getTemaTsxTools(tema.id);
                        const meta = [
                          docs.length > 0
                            ? `${docs.length} nota${docs.length === 1 ? '' : 's'}`
                            : null,
                          tools.length > 0
                            ? `${tools.length} herramienta${tools.length === 1 ? '' : 's'}`
                            : null,
                        ].filter(Boolean);

                        return (
                          <li key={tema.id}>
                            <Link
                              href={`/${tema.id}`}
                              className={cn(
                                'group surface-glass flex h-full flex-col gap-3 rounded-2xl p-4 no-underline',
                                'transition hover:-translate-y-0.5 hover:border-link/40',
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <span
                                  className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                                  style={{
                                    backgroundColor: `${visual.accent}28`,
                                    color: visual.accent,
                                  }}
                                >
                                  <Icon
                                    className="size-5"
                                    strokeWidth={1.75}
                                    aria-hidden
                                  />
                                </span>
                                <span
                                  className={cn(
                                    'rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide uppercase',
                                    tema.status === 'active'
                                      ? 'border-link/40 bg-link-muted text-link'
                                      : 'border-border text-muted-foreground',
                                  )}
                                >
                                  {statusLabel[tema.status]}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="m-0 text-sm font-semibold text-foreground group-hover:text-link">
                                  {tema.title}
                                </p>
                                <p className="mt-1.5 m-0 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                  {tema.description}
                                </p>
                              </div>
                              <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                                <span className="text-[0.7rem] text-muted-foreground">
                                  {meta.length > 0
                                    ? meta.join(' · ')
                                    : 'Sin contenido aún'}
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-link opacity-0 transition group-hover:opacity-100">
                                  Entrar
                                  <ArrowRight className="size-3" aria-hidden />
                                </span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
