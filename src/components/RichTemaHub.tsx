import Link from 'next/link';
import Image from 'next/image';
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Wrench,
  Zap,
} from 'lucide-react';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';
import { getDocsByTema } from '@/lib/content/docs';
import { getTemaIcon } from '@/lib/temas/icons';
import { getTemaById, temaGroups } from '@/lib/temas/registry';
import { getTemaSkin } from '@/lib/temas/skins';
import { getTemaTsxTools } from '@/lib/temas/tsx-pages';
import { cn } from '@/lib/utils';

const statusLabel = {
  active: 'Con contenido',
  stub: 'En preparación',
  planned: 'Próximamente',
} as const;

const EMPTY_GUIDING_QUESTIONS: string[] = [];
const EMPTY_TAGS: string[] = [];

const TAG_COLORS = [
  'border-link/40 bg-link-muted text-link',
  'border-purple-400/40 bg-purple-500/15 text-purple-300',
  'border-emerald-400/40 bg-emerald-500/15 text-emerald-300',
];
const UPDATED_DATE_FORMATTER = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function estimateReadingMinutes(text?: string) {
  if (!text) return null;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 180));
}

export function RichTemaHub({
  temaId,
  groupLabel,
  guidingQuestions = EMPTY_GUIDING_QUESTIONS,
  tags = EMPTY_TAGS,
  illustrationSrc,
  children,
}: {
  temaId: string;
  groupLabel?: string;
  guidingQuestions?: string[];
  tags?: string[];
  illustrationSrc?: string;
  children?: React.ReactNode;
}) {
  const meta = getTemaById(temaId);
  if (!meta) return null;

  const docs = getDocsByTema(temaId).filter((d) => d.slug !== '');
  const tools = getTemaTsxTools(temaId);
  const Icon = getTemaIcon(temaId);
  const skin = getTemaSkin(temaId);
  const resolvedGroup =
    groupLabel ?? temaGroups.find((g) => g.id === meta.group)?.label;
  const headerStyle = skin.headerStyle;
  const updatedLabel = UPDATED_DATE_FORMATTER.format(new Date());

  return (
    <div className="space-y-8 pb-4">
      <header
        className={cn(
          'relative overflow-hidden rounded-2xl border border-border bg-elevated',
          headerStyle === 'accent-band' && 'border-t-4 border-t-[var(--accent)]',
          headerStyle === 'inverted' &&
            'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-on)]',
        )}
      >
        {headerStyle !== 'inverted' ? (
          <div
            className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-link/15 blur-3xl"
            aria-hidden
          />
        ) : null}
        <div className="relative flex flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-9">
          <div
            className={cn(
              'flex size-14 shrink-0 items-center justify-center rounded-xl border',
              headerStyle === 'inverted'
                ? 'border-[var(--accent-on)]/25 bg-[var(--accent-on)]/10 text-[var(--accent-on)]'
                : 'border-link/30 bg-link-muted text-link shadow-[0_0_28px_rgb(59_130_246/35%)]',
            )}
            aria-hidden
          >
            <Icon className="size-7" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            {resolvedGroup ? (
              <p
                className={cn(
                  'm-0 text-sm font-semibold tracking-widest uppercase',
                  headerStyle === 'inverted'
                    ? 'text-[var(--accent-on)]/70'
                    : 'text-link',
                )}
              >
                {resolvedGroup}
              </p>
            ) : null}
            <h1
              className={cn(
                'font-display m-0 text-3xl tracking-tight sm:text-4xl',
                headerStyle === 'inverted'
                  ? 'text-[var(--accent-on)]'
                  : 'text-foreground',
              )}
            >
              {meta.title}
            </h1>
            <p
              className={cn(
                'm-0 max-w-2xl text-base leading-relaxed sm:text-lg',
                headerStyle === 'inverted'
                  ? 'text-[var(--accent-on)]/80'
                  : 'text-muted-foreground',
              )}
            >
              {meta.description}
            </p>
            {tags.length > 0 ? (
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {tags.map((tag, i) => (
                  <li
                    key={tag}
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 text-xs font-medium',
                      TAG_COLORS[i % TAG_COLORS.length],
                    )}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {illustrationSrc ? (
            <div className="pointer-events-none relative hidden w-52 shrink-0 sm:block lg:w-72">
              <div
                className="absolute inset-0 rounded-full bg-link/20 blur-3xl"
                aria-hidden
              />
              <Image
                src={illustrationSrc}
                alt=""
                width={288}
                height={192}
                unoptimized
                className="relative h-auto w-full object-contain drop-shadow-[0_0_32px_rgb(59_130_246/55%)]"
              />
            </div>
          ) : null}
        </div>
      </header>

      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Notas',
            value: String(docs.length),
            hint: 'Ensayos y fichas publicadas',
            icon: FileText,
            color: '#3b82f6',
          },
          {
            label: 'Herramientas',
            value: String(tools.length),
            hint: 'Comparadores activos',
            icon: Wrench,
            color: '#a855f7',
          },
          {
            label: 'Estado',
            value: statusLabel[meta.status],
            hint: 'Disponible para explorar',
            icon: CheckCircle2,
            color: '#10b981',
          },
          {
            label: 'Última actualización',
            value: 'Hoy',
            hint: updatedLabel,
            icon: Calendar,
            color: '#f59e0b',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="surface-glass rounded-2xl px-4 py-4 shadow-[var(--shadow-theme)]"
          >
            <div
              className="mb-3 inline-flex size-9 items-center justify-center rounded-xl text-white shadow-[0_0_16px_var(--glow)]"
              style={{
                backgroundColor: stat.color,
                ['--glow' as string]: `${stat.color}55`,
              }}
            >
              <stat.icon className="size-4" strokeWidth={1.75} aria-hidden />
            </div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {stat.label}
            </dt>
            <dd className="mt-1 m-0 text-xl font-semibold text-foreground">
              {stat.value}
            </dd>
            <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
          </div>
        ))}
      </dl>

      <ScenarioCallout variant="scenario" title="Cómo leer este apartado">
        Aquí no hay verdades absolutas: hay marcos, tendencias y escenarios
        posibles. Los datos ayudan a situar un país —el tuyo u otro— frente a
        peers y al mundo; no sustituyen el juicio ni demuestran causalidad por
        sí solos.
      </ScenarioCallout>

      {guidingQuestions.length > 0 ? (
        <section className="space-y-4" aria-labelledby="preguntas-guia">
          <h2
            id="preguntas-guia"
            className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground"
          >
            <span className="h-0.5 w-5 rounded-full bg-link" aria-hidden />
            Preguntas guía
          </h2>
          <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {guidingQuestions.map((q, i) => {
              const watermark =
                i === 0
                  ? '/landing/watermarks/scales.svg'
                  : i === 1
                    ? '/landing/watermarks/globe.svg'
                    : '/landing/watermarks/book.svg';
              return (
                <li
                  key={q}
                  className={cn(
                    'relative flex min-h-[8.5rem] flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-elevated p-4',
                    'transition-colors duration-150 hover:border-link/40',
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={watermark}
                    alt=""
                    className="pointer-events-none absolute right-2 bottom-1 size-24 text-link opacity-[0.08]"
                    aria-hidden
                  />
                  <span
                    className={cn(
                      'relative z-[1] flex size-7 shrink-0 items-center justify-center rounded-full',
                      'bg-link text-xs font-semibold text-white',
                    )}
                  >
                    {i + 1}
                  </span>
                  <p className="relative z-[1] m-0 flex-1 text-sm leading-relaxed font-medium text-foreground/90">
                    {q}
                  </p>
                  <ExternalLink
                    className="relative z-[1] mt-auto size-3.5 self-end text-muted-foreground"
                    aria-hidden
                  />
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}

      {children}

      {tools.length > 0 ? (
        <section className="space-y-4" aria-labelledby="herramientas-heading">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-link" strokeWidth={1.75} aria-hidden />
            <h2
              id="herramientas-heading"
              className="m-0 text-xl font-semibold tracking-tight"
            >
              Herramientas
            </h2>
          </div>
          <ul className="m-0 grid list-none gap-3 p-0">
            {tools.map((tool) => (
              <li key={tool.href}>
                <div
                  className={cn(
                    'flex flex-col gap-4 rounded-2xl border border-border bg-elevated p-5 sm:flex-row sm:items-center sm:justify-between',
                    'shadow-[var(--shadow-theme)]',
                  )}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-link/30 bg-link-muted text-link">
                      <Zap className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div className="min-w-0 space-y-1">
                      <p className="m-0 font-medium text-foreground">
                        {tool.title}
                      </p>
                      {tool.description ? (
                        <p className="m-0 text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <Link
                    href={tool.href}
                    className={cn(
                      'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-link px-4 py-2.5 text-sm font-semibold text-white no-underline',
                      'hover:bg-link-hover',
                    )}
                  >
                    Explorar herramienta
                    <ExternalLink className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="space-y-4" aria-labelledby="notas-heading">
        <div className="flex items-center gap-2">
          <FileText
            className="size-4 text-link"
            strokeWidth={1.75}
            aria-hidden
          />
          <h2
            id="notas-heading"
            className="m-0 text-xl font-semibold tracking-tight"
          >
            Notas publicadas
          </h2>
        </div>
        {docs.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
            Aún no hay notas en{' '}
            <code className="rounded bg-muted px-1">
              src/features/{temaId}/content/
            </code>
            .
          </p>
        ) : (
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {docs.map((doc) => {
              const minutes = estimateReadingMinutes(doc.description);
              return (
                <li key={doc.href}>
                  <Link
                    href={doc.href}
                    className={cn(
                      'group flex h-full flex-col gap-3 rounded-2xl border border-border bg-elevated p-4',
                      'no-underline transition-all duration-150',
                      'hover:-translate-y-0.5 hover:border-link hover:bg-link-muted',
                      'shadow-[var(--shadow-theme)]',
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-link">
                        <FileText className="size-4" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="font-medium text-foreground group-hover:text-link">
                          {doc.title}
                        </span>
                        {doc.description ? (
                          <span className="line-clamp-2 block text-sm text-muted-foreground">
                            {doc.description}
                          </span>
                        ) : null}
                      </div>
                      <ChevronRight
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-link"
                        aria-hidden
                      />
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full border border-border px-2 py-0.5">
                        Ensayo
                      </span>
                      {minutes ? (
                        <span>{minutes} min de lectura</span>
                      ) : null}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="flex flex-col gap-4 rounded-2xl border border-link/30 bg-link-muted/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-link text-white">
            <BarChart3 className="size-5" strokeWidth={1.75} aria-hidden />
          </span>
          <p className="m-0 text-sm font-medium text-foreground sm:text-base">
            ¿Quieres situar un país con datos?
          </p>
        </div>
        <Link
          href="/estadisticas-mundiales/indicadores"
          className={cn(
            'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-link px-4 py-2.5 text-sm font-semibold text-white no-underline',
            'hover:bg-link-hover',
          )}
        >
          Comparador de indicadores
          <ExternalLink className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
