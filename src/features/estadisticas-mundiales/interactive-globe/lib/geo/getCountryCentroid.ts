import { geoCentroid } from "d3-geo";
import type { CountryFeature } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import { ISO_CORRECTIONS } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";

export function getCountryCentroid(feature: CountryFeature): [number, number] {
  const [lng, lat] = geoCentroid(feature);
  return [lat, lng];
}

export function normalizeIso2(iso2: string, iso3?: string): string {
  if (iso2 && iso2 !== "-99") return iso2;
  if (iso3 && ISO_CORRECTIONS[iso3]) return ISO_CORRECTIONS[iso3];
  return iso2;
}

export function getFeatureIso2(feature: CountryFeature): string {
  const { ISO_A2, ISO_A3 } = feature.properties;
  return normalizeIso2(ISO_A2, ISO_A3);
}
