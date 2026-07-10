import Link from 'next/link';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LandingHero() {
  return (
    <section className="relative isolate min-h-[min(78vh,44rem)] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/landing/earth-night.webp')" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/85 to-[#05070a]/35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-[#05070a]/50"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:py-24">
        <div className="max-w-2xl">
          <p className="m-0 text-xs font-semibold tracking-[0.22em] text-link uppercase">
            Web-Prosperity
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Comprender cómo funcionan las sociedades.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Archivo para pensar la prosperidad de una nación —la tuya u otra—
            con ideas, datos y escenarios. Tendencias e incertidumbre, no
            verdades absolutas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#ejes"
              className={cn(
                'inline-flex items-center gap-2 rounded-xl bg-link px-5 py-3 text-sm font-semibold text-white no-underline',
                'shadow-[0_0_24px_rgb(37_99_235/40%)] transition hover:bg-link-hover',
              )}
            >
              Explorar temas
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/estadisticas-mundiales/indicadores"
              className={cn(
                'inline-flex items-center gap-2 rounded-xl border border-link/50 bg-transparent px-5 py-3 text-sm font-medium text-white no-underline',
                'hover:border-link hover:bg-link-muted',
              )}
            >
              <BarChart3 className="size-4 text-link" aria-hidden />
              Comparador de países
            </Link>
          </div>
        </div>

        <aside className="surface-glass w-full max-w-sm rounded-2xl p-4 shadow-[var(--shadow-theme)] lg:mb-2">
          <p className="m-0 flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Sistema activo
          </p>
          <p className="mt-2 m-0 text-sm font-semibold text-foreground">
            Conocimiento conectado
          </p>
          <p className="mt-1 m-0 text-xs leading-relaxed text-muted-foreground">
            Ideas, datos e interactivos en un mismo archivo para situar
            escenarios nacionales.
          </p>
        </aside>
      </div>
    </section>
  );
}
