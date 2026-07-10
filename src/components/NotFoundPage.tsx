import Link from 'next/link';
import { getTemasForLanding } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

const activeTemas = getTemasForLanding().filter((t) => t.status === 'active');

export function NotFoundPage() {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem-4rem)] flex-col justify-center py-12 sm:py-16">
      <p
        className="m-0 select-none font-semibold tracking-tighter text-muted-foreground/40 tabular-nums"
        aria-hidden
      >
        <span className="text-[clamp(5rem,18vw,9rem)] leading-none">404</span>
      </p>

      <h1 className="m-0 mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
        La ruta que buscas no existe, cambió de sitio o aún no tiene contenido.
        Puedes volver al inicio o entrar por uno de los apartados con material
        disponible.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className={cn(
            'inline-flex items-center rounded-lg border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground no-underline',
            'transition-colors duration-150',
            'hover:border-accent-strong hover:bg-accent-strong',
            '[[data-theme=dark]_&]:hover:border-neutral-400 [[data-theme=dark]_&]:hover:bg-neutral-400',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]',
          )}
        >
          Volver al inicio
        </Link>
        <Link
          href="/temas"
          className={cn(
            'inline-flex items-center rounded-lg border border-border bg-elevated px-4 py-2.5 text-sm font-medium text-foreground no-underline',
            'transition-colors duration-150',
            'hover:border-link hover:bg-link-muted hover:text-link',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]',
          )}
        >
          Ver todos los apartados
        </Link>
      </div>

      {activeTemas.length > 0 && (
        <nav
          className="mt-12 border-t border-border pt-10"
          aria-label="Apartados con contenido"
        >
          <h2 className="m-0 text-sm font-semibold tracking-wide text-foreground uppercase">
            Apartados con contenido
          </h2>
          <ul className="m-0 mt-4 grid list-none gap-3 p-0 sm:grid-cols-2">
            {activeTemas.map((tema) => (
              <li key={tema.id}>
                <Link
                  href={`/${tema.id}`}
                  className="flex flex-col rounded-lg border border-border bg-elevated p-4 no-underline transition hover:-translate-y-0.5 hover:border-link hover:shadow-[var(--shadow-theme)]"
                >
                  <span className="text-base font-semibold text-foreground">
                    {tema.title}
                  </span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    {tema.description}
                  </span>
                  <span className="mt-2 text-sm font-medium text-link">
                    Entrar →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
}
