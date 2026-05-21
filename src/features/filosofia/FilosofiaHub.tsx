import Link from 'next/link';
import { getTemaById } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';
import { nav } from './config';

const meta = getTemaById('filosofia')!;

export function FilosofiaHub({ temaId: _temaId }: { temaId?: string }) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-[var(--text-muted)]">Fundamentos</p>
        <h1 className="text-3xl font-bold tracking-tight">{meta.title}</h1>
        <p className="text-lg text-[var(--text-muted)]">{meta.description}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Temas previstos</h2>
        <ul className="flex flex-wrap gap-2">
          {nav
            .flatMap((item) =>
              'href' in item && item.href !== '/filosofia'
                ? [item]
                : 'items' in item
                  ? item.items.filter((c): c is { label: string; href: string } => 'href' in c)
                  : [],
            )
            .map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'inline-block rounded-md border border-[var(--border)] px-3 py-1.5 text-sm',
                    'hover:bg-[var(--accent-low)] hover:text-[var(--accent)]',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
        <p className="text-sm text-[var(--text-muted)]">
          Las rutas enlazadas tendrán contenido en{' '}
          <code>src/features/filosofia/content/</code> cuando estén listas.
        </p>
      </section>
    </div>
  );
}
