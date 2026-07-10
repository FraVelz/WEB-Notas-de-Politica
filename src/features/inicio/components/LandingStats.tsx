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
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi) => {
          const Icon = icons[kpi.icon];
          return (
            <li
              key={kpi.label}
              className="surface-glass rounded-2xl px-4 py-4 shadow-[var(--shadow-theme)]"
            >
              <div
                className="glow-icon mb-3 inline-flex size-9 items-center justify-center rounded-lg border border-border"
                style={{ ['--glow-color' as string]: kpi.color }}
              >
                <Icon
                  className="size-4"
                  style={{ color: kpi.color }}
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <p className="m-0 text-2xl font-semibold tabular-nums text-foreground">
                {kpi.value}
              </p>
              <p className="mt-1 m-0 text-xs font-medium text-foreground">
                {kpi.label}
              </p>
              <p className="mt-0.5 m-0 text-[0.7rem] text-muted-foreground">
                {kpi.hint}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
