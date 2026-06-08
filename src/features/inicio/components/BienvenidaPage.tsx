import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  BookOpen,
  Compass,
  Globe2,
  Lightbulb,
  MapPin,
  Scale,
  Sparkles,
  Target,
} from 'lucide-react';
import { siteConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';

const ambitos = [
  {
    label: 'General',
    description: 'Comparaciones entre países y temas transversales',
    icon: Globe2,
  },
  {
    label: 'Países',
    description: 'Notas por región y estado',
    icon: MapPin,
  },
  {
    label: 'Filosofía',
    description: 'Ideas, conceptos y pensamiento político',
    icon: BookOpen,
  },
  {
    label: 'Estadísticas',
    description: 'Datos que contextualizan la realidad',
    icon: BarChart3,
  },
  {
    label: 'Proyectos',
    description: 'Propuestas e ideas aplicables',
    icon: Lightbulb,
  },
] as const;

const pilares = [
  {
    icon: Compass,
    title: 'Qué es este sitio',
    text: 'Notas personales sobre política y todo lo que orbita a su alrededor: filosofía, historia, economía, sociedad y cultura.',
  },
  {
    icon: Scale,
    title: 'Más allá del dato',
    text: 'No solo quién gobierna qué país, sino por qué se piensa así, qué ideas sostienen las decisiones y qué debates merecen calma.',
  },
  {
    icon: Target,
    title: 'El objetivo',
    text: 'Comprender el mundo en el que vivimos y el de los demás, y ordenar esa información de forma útil para quien quiera pensar con claridad.',
  },
] as const;

export function BienvenidaPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 pb-4">
      <header className="relative overflow-hidden rounded-2xl border border-border bg-elevated px-6 py-8 sm:px-8 sm:py-10">
        <div
          className="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-link/10 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <div
            className={cn(
              'flex size-14 shrink-0 items-center justify-center rounded-xl',
              'border border-link/30 bg-link-muted text-link',
            )}
            aria-hidden
          >
            <Sparkles className="size-7" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 space-y-3">
            <p className="m-0 text-sm font-semibold tracking-widest text-link uppercase">
              Web Prosperity
            </p>
            <h1 className="m-0 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Prosperidad
            </h1>
            <p className="m-0 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Un archivo en construcción para explorar ideas, contexto y debates
              que ayuden a entender cómo se organiza el poder y la vida en común.
            </p>
          </div>
        </div>
      </header>

      <section aria-labelledby="pilares-heading" className="space-y-4">
        <h2
          id="pilares-heading"
          className="m-0 mb-3 text-center text-sm font-semibold tracking-widest text-muted-foreground uppercase"
        >
          En pocas palabras
        </h2>

        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-3">
          {pilares.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex h-full flex-col rounded-xl border border-border bg-elevated p-4"
            >
              <div
                className={cn(
                  'mb-3 flex size-9 items-center justify-center rounded-lg',
                  'border border-border bg-muted text-link',
                )}
                aria-hidden
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </div>
              <h3 className="m-0 text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 mb-0 flex-1 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div
        className={cn(
          'flex gap-3 rounded-xl border border-border bg-muted/60 p-4 sm:p-5',
          'text-sm leading-relaxed text-muted-foreground',
        )}
        role="note"
      >
        <AlertCircle
          className="mt-0.5 size-5 shrink-0 text-link"
          strokeWidth={1.75}
          aria-hidden
        />
        <p className="m-0">
          <strong className="font-semibold text-foreground">Nota:</strong> los
          textos actuales no deben sacarse de contexto. El contenido irá
          organizándose poco a poco para que las ideas sean más claras y
          racionales.
        </p>
      </div>

      <section
        aria-labelledby="por-que-heading"
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="rounded-xl border border-border bg-elevated p-5">
          <h2
            id="por-que-heading"
            className="m-0 text-lg font-semibold text-foreground"
          >
            ¿Por qué la política importa?
          </h2>
          <p className="mt-3 mb-0 text-sm leading-relaxed text-muted-foreground">
            Quienes están en ese mundo tienen el poder de cambiar para bien sus
            países y las futuras generaciones. Por eso merece leerse con
            atención, no solo desde titulares.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-elevated p-5">
          <h2 className="m-0 text-lg font-semibold text-foreground">
            Una mirada crítica
          </h2>
          <p className="mt-3 mb-0 text-sm leading-relaxed text-muted-foreground">
            En Latinoamérica, demasiado a menudo el poder se desvía: corrupción,
            pactos con grupos criminales y países sumidos en caos e
            inseguridad. Este sitio busca mantener una visión neutral y útil, no
            un panfleto.
          </p>
        </div>
      </section>

      <section aria-labelledby="ambitos-heading" className="space-y-5">
        <header className="text-center">
          <h2
            id="ambitos-heading"
            className="m-0 text-xl font-semibold text-foreground"
          >
            Ámbitos del sitio
          </h2>
          <p className="mx-auto mt-2 mb-0 max-w-xl text-sm text-muted-foreground">
            Cinco frentes para ordenar el contenido mientras el archivo crece.
          </p>
        </header>
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {ambitos.map(({ label, description, icon: Icon }) => (
            <li
              key={label}
              className={cn(
                'flex items-start gap-3 rounded-xl border border-border bg-elevated p-4',
                label === 'Proyectos' && 'sm:col-span-2 lg:col-span-1',
              )}
            >
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-lg',
                  'border border-border bg-muted text-link',
                )}
                aria-hidden
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h3 className="m-0 text-sm font-semibold text-foreground">
                  {label}
                </h3>
                <p className="mt-1 mb-0 text-sm leading-snug text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <Link
          href="/"
          className={cn(
            'inline-flex items-center gap-2 rounded-lg border border-border bg-elevated px-4 py-2.5',
            'text-sm font-medium text-foreground no-underline',
            'transition-colors duration-150',
            'hover:border-link hover:bg-link-muted hover:text-link',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]',
          )}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Ver apartados
        </Link>
        <p className="m-0 text-xs text-muted-foreground">
          <span className="text-foreground">{siteConfig.author}</span>
          {' · '}
          {siteConfig.license}
        </p>
      </div>
    </div>
  );
}
