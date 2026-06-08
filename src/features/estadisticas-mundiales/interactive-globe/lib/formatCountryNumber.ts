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
