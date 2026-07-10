import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';
import { getFeaturedTemas } from '@/features/inicio/landing-data';
import { getDocsByTema } from '@/lib/content/docs';
import { getTemaIcon } from '@/lib/temas/icons';
import { getTemaTsxTools } from '@/lib/temas/tsx-pages';

const accentByIndex = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#06b6d4',
  '#a855f7',
  '#f43f5e',
];

const shortTitle: Record<string, string> = {
  filosofia: 'Filosofía',
  economia: 'Economía',
  historia: 'Historia',
  'estadisticas-mundiales': 'Estadísticas',
  'relaciones-internacionales-y-geopolitica': 'Geopolítica',
  'etica-politica': 'Ética',
};

export function LandingDestacados() {
  const featured = getFeaturedTemas();

  return (
    <section
      id="destacados"
      className="mx-auto w-full max-w-7xl scroll-mt-28 px-4 sm:px-6"
      aria-labelledby="destacados-heading"
    >
      <header className="mb-6 flex items-center justify-between gap-4">
        <h2
          id="destacados-heading"
          className="m-0 flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          <Star
            className="size-5 shrink-0 text-amber-400"
            strokeWidth={1.75}
            aria-hidden
          />
          Temas destacados
        </h2>
        <Link
          href="/temas"
          className="shrink-0 text-sm font-medium text-link no-underline hover:text-link-hover"
        >
          Explorar todos →
        </Link>
      </header>

      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((tema, i) => {
          const Icon = getTemaIcon(tema.id);
          const docs = getDocsByTema(tema.id).filter((d) => d.slug !== '');
          const tools = getTemaTsxTools(tema.id);
          const accent = accentByIndex[i % accentByIndex.length];
          const parts = [
            docs.length > 0
              ? `${docs.length} artículo${docs.length === 1 ? '' : 's'}`
              : null,
            tools.length > 0
              ? `${tools.length} herramienta${tools.length === 1 ? '' : 's'}`
              : null,
          ].filter(Boolean);
          const title = shortTitle[tema.id] ?? tema.title;

          return (
            <li key={tema.id}>
              <Link
                href={`/${tema.id}`}
                className="surface-glass group flex h-full items-center gap-3 rounded-2xl px-3.5 py-3.5 no-underline transition hover:border-link/40"
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl shadow-[0_0_18px_var(--glow)]"
                  style={{
                    backgroundColor: `${accent}33`,
                    color: accent,
                    ['--glow' as string]: `${accent}44`,
                  }}
                >
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground group-hover:text-link">
                    {title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {parts.length > 0 ? parts.join(' · ') : 'Entrar al tema'}
                  </span>
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-muted-foreground group-hover:text-link"
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
