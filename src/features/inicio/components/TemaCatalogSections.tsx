import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDocsByTema } from '@/lib/content/docs';
import { getTemaIcon } from '@/lib/temas/icons';
import { getTemaTsxTools } from '@/lib/temas/tsx-pages';
import type { TemaDefinition, TemaGroup, TemaStatus } from '@/lib/temas/types';
import { cn } from '@/lib/utils';

const statusLabel: Record<TemaStatus, string> = {
  active: 'Con contenido',
  stub: 'En preparación',
  planned: 'Próximamente',
};

export type CatalogSection = {
  group: TemaGroup;
  temas: TemaDefinition[];
};

export function TemaCatalogSections({
  sections,
  accent,
}: {
  sections: CatalogSection[];
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      {sections.map(({ group, temas }) => (
        <div key={group.id} id={group.id} className="scroll-mt-28">
          <header className="mb-4 flex items-center gap-2">
            <span
              className="h-4 w-0.5 rounded-full"
              style={{ backgroundColor: accent }}
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
              const docs = getDocsByTema(tema.id).filter((d) => d.slug !== '');
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
                          backgroundColor: `${accent}28`,
                          color: accent,
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
  );
}
