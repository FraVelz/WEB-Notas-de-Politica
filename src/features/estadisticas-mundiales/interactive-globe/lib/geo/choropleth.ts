import type { CountryDetail } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import type { DataLayer } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";

export function getChoroplethValue(
  layer: DataLayer,
  detail: CountryDetail | null,
  population?: number,
  area?: number,
): number {
  if (!detail && !population) return 0;

  switch (layer) {
    case "population":
      return detail?.population ?? population ?? 0;
    case "gdp":
      return detail?.gdpPerCapita ?? 0;
    case "area":
      return detail?.area ?? area ?? 0;
    default:
      return 0;
  }
}

export function valueToColor(
  value: number,
  min: number,
  max: number,
  selected: boolean,
): string {
  if (selected) return "#22d3ee";
  if (max === min) return "#1e3a5f";

  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const r = Math.round(30 + t * (34 - 30));
  const g = Math.round(58 + t * (211 - 58));
  const b = Math.round(95 + t * (238 - 95));
  return `rgb(${r},${g},${b})`;
}
