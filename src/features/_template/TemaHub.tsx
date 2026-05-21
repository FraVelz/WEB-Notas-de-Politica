import Link from 'next/link';
import { cn } from '@/lib/utils';
import { nav, temaMeta } from './config';

/**
 * Hub TSX de /{tema} — página principal del feature.
 * Sustituir por diseño propio: stats, mapas, timeline, etc.
 */
export function TemaHub() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-[var(--text-muted)]">Tema principal</p>
        <h1 className="text-3xl font-bold tracking-tight">{temaMeta.title}</h1>
        <p className="text-lg text-[var(--text-muted)]">{temaMeta.description}</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Artículos', value: '0' },
          { label: 'Secciones', value: String(nav.length) },
          { label: 'Estado', value: 'Plantilla' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={cn(
              'rounded-lg border border-[var(--border)] bg-[var(--bg-muted)] p-4',
            )}
          >
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Explorar</h2>
        <ul className="flex flex-wrap gap-2">
          {nav.flatMap((item) =>
            'href' in item
              ? [item]
              : item.items.flatMap((child) =>
                  'href' in child ? [child] : [],
                ),
          ).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'inline-block rounded-md border border-[var(--border)] px-3 py-1.5 text-sm',
                  'hover:bg-link-muted hover:text-link',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-[var(--text-muted)]">
        Añade notas en <code>content/</code> o páginas en <code>pages/</code> y
        enlázalas en <code>config.ts</code>.
      </p>
    </div>
  );
}
