import {
  BookOpen,
  Clock,
  FileText,
  Globe2,
  Users,
  Wrench,
} from 'lucide-react';
import { getLandingKpis } from '@/features/inicio/landing-data';

const icons = {
  book: BookOpen,
  file: FileText,
  wrench: Wrench,
  globe: Globe2,
  users: Users,
  clock: Clock,
};

export function LandingStats() {
  const kpis = getLandingKpis();

  return (
    <section
      aria-label="Indicadores del archivo"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6"
    >
      <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:gap-3 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi) => {
          const Icon = icons[kpi.icon];
          return (
            <li
              key={kpi.label}
              className="surface-glass rounded-2xl px-3 py-4 shadow-[var(--shadow-theme)] sm:px-4 sm:py-5"
            >
              <div
                className="mb-3 inline-flex size-9 items-center justify-center rounded-xl text-white shadow-[0_0_20px_var(--glow)] sm:mb-4 sm:size-10"
                style={{
                  backgroundColor: kpi.color,
                  ['--glow' as string]: `${kpi.color}66`,
                }}
              >
                <Icon className="size-4 sm:size-5" strokeWidth={1.75} aria-hidden />
              </div>
              <p className="m-0 text-2xl font-semibold tracking-tight tabular-nums text-foreground sm:text-3xl">
                {kpi.value}
              </p>
              <p className="mt-1 m-0 text-xs font-semibold text-foreground sm:mt-1.5 sm:text-sm">
                {kpi.label}
              </p>
              <p className="mt-0.5 m-0 text-[0.7rem] leading-snug text-muted-foreground sm:text-xs">
                {kpi.hint}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
