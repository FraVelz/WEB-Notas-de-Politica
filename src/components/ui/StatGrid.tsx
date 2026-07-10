import { cn } from '@/lib/utils';

export type StatItem = {
  label: string;
  value: string;
  hint?: string;
};

export function StatGrid({
  items,
  className,
}: {
  items: StatItem[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <dl
      className={cn(
        'grid gap-3 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            'rounded-xl border border-border bg-elevated px-4 py-3',
            'shadow-[var(--shadow-theme)] transition-colors duration-150',
            'hover:border-link/40',
          )}
        >
          <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {item.label}
          </dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
            {item.value}
          </dd>
          {item.hint ? (
            <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
