"use client";

import {
  COMPARE_SLOT_COLORS,
  MAX_COMPARE_COUNTRIES,
} from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} mil M`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)} mil`;
  return n.toLocaleString("es");
}

export function ComparePanel() {
  const compareMode = useGlobeStore((s) => s.compareMode);
  const compareIso2s = useGlobeStore((s) => s.compareIso2s);
  const countriesIndex = useGlobeStore((s) => s.countriesIndex);
  const countryStats = useGlobeStore((s) => s.countryStats);
  const removeCompareCountry = useGlobeStore((s) => s.removeCompareCountry);
  const clearSelection = useGlobeStore((s) => s.clearSelection);

  if (!compareMode) return null;

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-elevated/90 shadow-[var(--shadow-theme)] backdrop-blur-xl md:w-80">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-link">
          Comparación ({compareIso2s.length}/{MAX_COMPARE_COUNTRIES})
        </h2>
        {compareIso2s.length > 0 ? (
          <button
            type="button"
            onClick={clearSelection}
            className="rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-link-muted hover:text-foreground"
          >
            Limpiar
          </button>
        ) : null}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {compareIso2s.length === 0 ? (
          <p className="m-0 text-sm leading-relaxed text-muted-foreground">
            Modo comparación activo. Haz clic en un país del globo o búscalo
            arriba para añadir hasta {MAX_COMPARE_COUNTRIES} países.
          </p>
        ) : null}
        {compareIso2s.map((iso, index) => {
          const meta = countriesIndex.get(iso);
          const stats = countryStats.get(iso);
          const color = COMPARE_SLOT_COLORS[index] ?? COMPARE_SLOT_COLORS[0];

          return (
            <div
              key={iso}
              className="rounded-xl border border-border bg-muted/50 p-3"
              style={{ borderLeftWidth: 3, borderLeftColor: color }}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="m-0 text-sm font-semibold text-foreground">
                    {meta?.name ?? iso}
                  </p>
                  <p className="m-0 text-xs text-muted-foreground">{iso}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeCompareCountry(iso)}
                  className="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-link-muted hover:text-foreground"
                  aria-label={`Quitar ${meta?.name ?? iso}`}
                >
                  ✕
                </button>
              </div>
              {stats ? (
                <dl className="grid grid-cols-1 gap-1 text-xs">
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Población</dt>
                    <dd className="font-medium text-foreground">
                      {formatNumber(stats.population)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">PIB/cápita</dt>
                    <dd className="font-medium text-foreground">
                      ${formatNumber(stats.gdpPerCapita)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Área</dt>
                    <dd className="font-medium text-foreground">
                      {formatNumber(stats.area)} km²
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="m-0 text-xs text-muted-foreground">
                  Sin datos rápidos
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="border-t border-border px-5 py-3 text-[11px] leading-snug text-muted-foreground">
        Haz clic en un país del globo para añadirlo o quitarlo. Con 2–3
        seleccionados, la vista se centra entre todos.
      </p>
    </aside>
  );
}
