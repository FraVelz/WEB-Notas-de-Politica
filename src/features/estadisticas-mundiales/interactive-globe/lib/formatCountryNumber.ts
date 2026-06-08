export function formatCountryNumber(n: number): string {
  if (n >= 1_000_000_000) {
    return `${(n / 1_000_000_000).toFixed(1)} mil millones`;
  }
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} millones`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)} mil`;
  return n.toLocaleString("es");
}

export function formatCountryNumberCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} mil M`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)} mil`;
  return n.toLocaleString("es");
}

/** Compact list for compare panels (e.g. many time zones). */
export function formatCountryListSummary(
  items: string[],
  opts?: { maxInline?: number },
): string {
  if (items.length === 0) return "—";
  const maxInline = opts?.maxInline ?? 2;
  if (items.length <= maxInline) return items.join(", ");
  if (items.length === 3) return items.join(", ");
  return `${items.length} entradas (${items[0]} … ${items[items.length - 1]})`;
}
