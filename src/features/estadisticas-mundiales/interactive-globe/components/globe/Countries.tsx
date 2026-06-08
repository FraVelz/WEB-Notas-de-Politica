"use client";

import { useMemo } from "react";
import type { CountriesCollection } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import { CountryMesh } from "./CountryMesh";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";
import { valueToColor } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/choropleth";

interface CountriesProps {
  data: CountriesCollection;
}

export function Countries({ data }: CountriesProps) {
  const activeLayer = useGlobeStore((s) => s.activeLayer);
  const countryDetail = useGlobeStore((s) => s.countryDetail);
  const countryStats = useGlobeStore((s) => s.countryStats);
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const compareIso2s = useGlobeStore((s) => s.compareIso2s);

  const layerValues = useMemo(() => {
    if (activeLayer === "none") return new Map<string, number>();

    const values = new Map<string, number>();
    for (const feature of data.features) {
      const iso2 = feature.properties.ISO_A2;
      if (!iso2 || iso2 === "-99") continue;

      const stats = countryStats.get(iso2);
      const detail = countryDetail?.cca2 === iso2 ? countryDetail : null;

      let value = 0;
      if (activeLayer === "population") {
        value = detail?.population ?? stats?.population ?? 0;
      } else if (activeLayer === "gdp") {
        value = detail?.gdpPerCapita ?? stats?.gdpPerCapita ?? 0;
      } else if (activeLayer === "area") {
        value = detail?.area ?? stats?.area ?? 0;
      }
      values.set(iso2, value);
    }
    return values;
  }, [data, activeLayer, countryDetail, countryStats]);

  const { min, max } = useMemo(() => {
    const vals = [...layerValues.values()].filter((v) => v > 0);
    if (!vals.length) return { min: 0, max: 1 };
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [layerValues]);

  return (
    <group>
      {data.features.map((feature, i) => {
        const iso2 = feature.properties.ISO_A2;
        const value = layerValues.get(iso2) ?? 0;
        const color =
          activeLayer !== "none" && value > 0
            ? valueToColor(
                value,
                min,
                max,
                selectedIso2 === iso2 || compareIso2s.includes(iso2),
              )
            : undefined;

        return (
          <CountryMesh
            key={`${iso2}-${i}`}
            feature={feature}
            choroplethColor={color}
          />
        );
      })}
    </group>
  );
}
