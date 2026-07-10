import { AlertTriangle, HelpCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  trend: {
    icon: TrendingUp,
    label: 'Tendencia',
    className: 'border-link/30 bg-link-muted/40',
  },
  scenario: {
    icon: HelpCircle,
    label: 'Escenario',
    className: 'border-border bg-elevated',
  },
  uncertainty: {
    icon: AlertTriangle,
    label: 'Incertidumbre',
    className: 'border-amber-500/30 bg-amber-500/5',
  },
} as const;

export function ScenarioCallout({
  children,
  variant = 'scenario',
  title,
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  title?: string;
  className?: string;
}) {
  const cfg = variants[variant];
  const Icon = cfg.icon;
  return (
    <aside
      className={cn(
        'flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed',
        cfg.className,
        className,
      )}
    >
      <Icon
        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
        strokeWidth={1.75}
        aria-hidden
      />
      <div className="min-w-0 space-y-1">
        <p className="m-0 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {title ?? cfg.label}
        </p>
        <div className="text-foreground/90 [&_p]:m-0">{children}</div>
      </div>
    </aside>
  );
}
