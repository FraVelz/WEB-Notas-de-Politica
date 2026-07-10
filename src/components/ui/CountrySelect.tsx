'use client';

import { cn } from '@/lib/utils';

export type CountryOption = {
  iso3: string;
  name: string;
};

export function CountrySelect({
  countries,
  value,
  onChange,
  label = 'País',
  className,
  id,
}: {
  countries: CountryOption[];
  value: string;
  onChange: (iso3: string) => void;
  label?: string;
  className?: string;
  id?: string;
}) {
  const selectId = id ?? `country-select-${label}`;
  return (
    <label className={cn('flex min-w-0 flex-col gap-1 text-sm', className)}>
      <span className="font-medium text-muted-foreground">{label}</span>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'h-10 w-full rounded-lg border border-border bg-elevated px-3',
          'text-foreground outline-none focus-visible:ring-2 focus-visible:ring-link/40',
        )}
      >
        <option value="">— Elegir —</option>
        {countries.map((c) => (
          <option key={c.iso3} value={c.iso3}>
            {c.name} ({c.iso3})
          </option>
        ))}
      </select>
    </label>
  );
}
