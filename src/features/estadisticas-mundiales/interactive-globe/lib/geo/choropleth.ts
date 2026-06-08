import type { CountryDetail } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import {
  LAYER_COLORS,
  type DataLayer,
} from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";

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
  if (selected) return LAYER_COLORS.choroplethHigh;
  if (max === min) return LAYER_COLORS.choroplethLow;

  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const low = parseInt(LAYER_COLORS.choroplethLow.slice(1), 16);
  const high = parseInt(LAYER_COLORS.choroplethHigh.slice(1), 16);
  const r = Math.round(((low >> 16) & 255) + t * ((((high >> 16) & 255) - ((low >> 16) & 255))));
  const g = Math.round(((low >> 8) & 255) + t * ((((high >> 8) & 255) - ((low >> 8) & 255))));
  const b = Math.round((low & 255) + t * (((high & 255) - (low & 255))));
  return `rgb(${r},${g},${b})`;
}
