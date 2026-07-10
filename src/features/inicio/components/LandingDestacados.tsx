import Link from 'next/link';
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

export function LandingDestacados() {
  const featured = getFeaturedTemas();

  return (
    <section
      className="mx-auto w-full max-w-7xl px-4 sm:px-6"
      aria-labelledby="destacados-heading"
    >
      <header className="mb-6">
        <h2
          id="destacados-heading"
          className="font-display m-0 text-3xl text-foreground sm:text-4xl"
        >
          Temas destacados
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Entradas activas para empezar a leer o comparar.
        </p>
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

          return (
            <li key={tema.id}>
              <Link
                href={`/${tema.id}`}
                className="surface-glass group flex items-center gap-3 rounded-2xl p-3.5 no-underline shadow-[var(--shadow-theme)] transition hover:-translate-y-0.5"
                style={{
                  boxShadow: `0 0 0 1px rgb(255 255 255 / 6%), 0 0 28px ${accent}22`,
                }}
              >
                <span
                  className="glow-icon flex size-11 shrink-0 items-center justify-center rounded-xl border border-border"
                  style={{
                    ['--glow-color' as string]: `${accent}66`,
                    color: accent,
                  }}
                >
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground group-hover:text-link">
                    {tema.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {parts.length > 0 ? parts.join(' · ') : 'Entrar al tema'}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
