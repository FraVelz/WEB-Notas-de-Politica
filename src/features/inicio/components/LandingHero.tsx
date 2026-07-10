import Link from 'next/link';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LandingHero() {
  return (
    <section className="relative isolate min-h-[min(82vh,46rem)] overflow-hidden">
      {/* Earth sits on the right (asymmetric composition) */}
      <div
        className="absolute inset-y-0 right-0 w-full bg-cover bg-[position:70%_center] lg:w-[62%]"
        style={{ backgroundImage: "url('/landing/earth-night.webp')" }}
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/orbits.svg"
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[62%] object-cover opacity-70 lg:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-8 right-[18%] hidden size-40 rounded-full bg-sky-300/30 blur-3xl lg:block"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/92 to-[#05070a]/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-[#05070a]/40"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:py-24">
        <div className="max-w-xl lg:pt-6">
          <p className="m-0 text-xs font-semibold tracking-[0.28em] text-link uppercase">
            WEB-PROSPERITY
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]">
            Comprender cómo funcionan las sociedades.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
            Explora ideas, instituciones, datos y escenarios para pensar la
            prosperidad de una nación —sin verdades absolutas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#ejes"
              className={cn(
                'inline-flex items-center gap-2 rounded-xl bg-link px-5 py-3 text-sm font-semibold text-white no-underline',
                'shadow-[0_0_28px_rgb(37_99_235/45%)] transition hover:bg-link-hover',
              )}
            >
              Explorar temas
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/estadisticas-mundiales/indicadores"
              className={cn(
                'inline-flex items-center gap-2 rounded-xl border border-white/25 bg-black/20 px-5 py-3 text-sm font-medium text-white no-underline backdrop-blur-sm',
                'hover:border-link hover:bg-link-muted',
              )}
            >
              <BarChart3 className="size-4 text-link" aria-hidden />
              Comparador de países
            </Link>
          </div>
        </div>

        <aside className="surface-glass w-full max-w-xs rounded-2xl p-4 shadow-[var(--shadow-theme)] lg:mt-4 lg:ml-auto">
          <p className="m-0 text-sm font-semibold text-foreground">
            Conocimiento conectado
          </p>
          <p className="mt-1 m-0 text-xs leading-relaxed text-muted-foreground">
            Ideas, datos y contexto para mejores decisiones.
          </p>
          <p className="mt-3 m-0 flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Sistema activo
          </p>
        </aside>
      </div>
    </section>
  );
}
