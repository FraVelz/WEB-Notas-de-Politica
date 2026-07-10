"use client";

import { CompareBarChart } from "@/components/ui/CompareBarChart";
import { Maximize2, Minimize2 } from "lucide-react";
import {
  COMPARE_SLOT_COLORS,
  MAX_COMPARE_COUNTRIES,
} from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import {
  CountryDetailFields,
  CountryDetailSkeleton,
} from "@/features/estadisticas-mundiales/interactive-globe/components/ui/CountryDetailFields";
import { formatCountryNumberCompact } from "@/features/estadisticas-mundiales/interactive-globe/lib/formatCountryNumber";
import type { CountryDetail } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

const METRIC_ROWS: {
  label: string;
  format: (detail: CountryDetail) => string;
}[] = [
  {
    label: "Población",
    format: (d) => formatCountryNumberCompact(d.population),
  },
  {
    label: "PIB/cápita",
    format: (d) => `$${formatCountryNumberCompact(d.gdpPerCapita ?? 0)}`,
  },
  {
    label: "Área",
    format: (d) => `${formatCountryNumberCompact(d.area)} km²`,
  },
  {
    label: "Esperanza de vida",
    format: (d) => `${d.lifeExpectancy ?? "—"} años`,
  },
];

function CompareMetricsTable({
  details,
  compareIso2s,
}: {
  details: Map<string, CountryDetail>;
  compareIso2s: string[];
}) {
  if (compareIso2s.length < 2) return null;

  return (
    <div className="shrink-0 overflow-x-auto rounded-xl border border-border bg-muted/30">
      <table className="w-full min-w-full border-collapse text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="px-3 py-2 text-left font-medium text-muted-foreground">
              Indicador
            </th>
            {compareIso2s.map((iso, index) => {
              const detail = details.get(iso);
              const color = COMPARE_SLOT_COLORS[index] ?? COMPARE_SLOT_COLORS[0];
              return (
                <th
                  key={iso}
                  className="min-w-[5.5rem] px-2 py-2 text-right font-semibold text-foreground"
                  style={{ borderTop: `2px solid ${color}` }}
                >
                  {detail?.nameEs ?? iso}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {METRIC_ROWS.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <td className="px-3 py-2 text-muted-foreground">{row.label}</td>
              {compareIso2s.map((iso) => {
                const detail = details.get(iso);
                return (
                  <td
                    key={`${iso}-${row.label}`}
                    className="px-2 py-2 text-right font-medium text-foreground"
                  >
                    {detail ? row.format(detail) : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareCountryChart({
  detail,
  color,
}: {
  detail: CountryDetail;
  color: string;
}) {
  const chartData = [
    { name: "Pobl. (M)", value: detail.population / 1_000_000, fill: color },
    { name: "PIB (k$)", value: (detail.gdpPerCapita ?? 0) / 1000, fill: color },
    { name: "Área (k)", value: detail.area / 1000, fill: color },
  ];

  return (
    <div className="h-28">
      <CompareBarChart data={chartData} height={112} />
    </div>
  );
}

function CompareCountryColumn({
  iso,
  index,
  detail,
  isLoading,
  color,
  onRemove,
}: {
  iso: string;
  index: number;
  detail?: CountryDetail;
  isLoading: boolean;
  color: string;
  onRemove: () => void;
}) {
  return (
    <section
      className="flex w-[min(18rem,82vw)] shrink-0 flex-col rounded-xl border border-border bg-muted/40 p-4 md:w-72"
      style={{ borderTopWidth: 3, borderTopColor: color }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          País {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-link-muted hover:text-foreground"
          aria-label={`Quitar ${detail?.nameEs ?? iso}`}
        >
          ✕
        </button>
      </div>

      {isLoading && !detail ? <CountryDetailSkeleton rows={8} /> : null}

      {detail ? (
        <div className="space-y-4">
          <CountryDetailFields detail={detail} compact summarizeLists />
          <div>
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Indicadores
            </p>
            <CompareCountryChart detail={detail} color={color} />
          </div>
        </div>
      ) : null}

      {!isLoading && !detail ? (
        <p className="m-0 text-xs text-muted-foreground">
          No se pudo cargar la información de este país.
        </p>
      ) : null}
    </section>
  );
}

export function ComparePanel() {
  const compareMode = useGlobeStore((s) => s.compareMode);
  const compareIso2s = useGlobeStore((s) => s.compareIso2s);
  const compareDetails = useGlobeStore((s) => s.compareDetails);
  const compareLoadingIso2s = useGlobeStore((s) => s.compareLoadingIso2s);
  const comparePanelMinimized = useGlobeStore((s) => s.comparePanelMinimized);
  const removeCompareCountry = useGlobeStore((s) => s.removeCompareCountry);
  const clearSelection = useGlobeStore((s) => s.clearSelection);
  const setComparePanelMinimized = useGlobeStore((s) => s.setComparePanelMinimized);

  if (!compareMode) return null;

  if (comparePanelMinimized) {
    return (
      <button
        type="button"
        onClick={() => setComparePanelMinimized(false)}
        className="pointer-events-auto fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-xl border border-border bg-elevated/95 px-4 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-theme)] backdrop-blur-md transition-colors hover:border-link hover:bg-link-muted hover:text-link md:right-6 md:bottom-6"
        aria-label="Maximizar panel de comparación"
      >
        <Maximize2 className="size-4 shrink-0 text-link" aria-hidden />
        Comparación ({compareIso2s.length}/{MAX_COMPARE_COUNTRIES})
      </button>
    );
  }

  return (
    <aside className="pointer-events-auto fixed inset-x-3 bottom-3 z-30 flex max-h-[min(85dvh,920px)] w-auto flex-col overflow-y-auto overscroll-contain rounded-2xl border border-border bg-elevated/95 pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-theme)] backdrop-blur-xl lg:inset-x-auto lg:right-4 lg:bottom-4 lg:left-[21rem] lg:max-h-[min(90dvh,880px)] lg:pb-0">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <h2 className="m-0 text-sm font-semibold uppercase tracking-wider text-link">
          Comparación ({compareIso2s.length}/{MAX_COMPARE_COUNTRIES})
        </h2>
        <div className="flex items-center gap-1">
          {compareIso2s.length > 0 ? (
            <button
              type="button"
              onClick={clearSelection}
              className="inline-flex min-h-11 items-center rounded-lg px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-link-muted hover:text-foreground sm:min-h-0 sm:px-2"
            >
              Limpiar
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setComparePanelMinimized(true)}
            className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-link hover:bg-link-muted hover:text-link sm:min-h-0 sm:px-2"
            aria-label="Minimizar panel de comparación"
          >
            <Minimize2 className="size-3.5" aria-hidden />
            Minimizar
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-3">
        {compareIso2s.length === 0 ? (
          <p className="m-0 text-sm leading-relaxed text-muted-foreground">
            Modo comparación activo. Haz clic en un país del globo o búscalo
            arriba para añadir hasta {MAX_COMPARE_COUNTRIES} países.
          </p>
        ) : (
          <>
            {compareIso2s.length >= 2 &&
            compareIso2s.every((iso) => compareDetails.has(iso)) ? (
              <CompareMetricsTable
                details={compareDetails}
                compareIso2s={compareIso2s}
              />
            ) : null}

            <div className="overflow-x-auto overscroll-contain">
              <div className="flex min-w-min items-start gap-3 pb-1">
                {compareIso2s.map((iso, index) => (
                  <CompareCountryColumn
                    key={iso}
                    iso={iso}
                    index={index}
                    detail={compareDetails.get(iso)}
                    isLoading={compareLoadingIso2s.includes(iso)}
                    color={COMPARE_SLOT_COLORS[index] ?? COMPARE_SLOT_COLORS[0]}
                    onRemove={() => removeCompareCountry(iso)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        <p className="m-0 shrink-0 border-t border-border pt-2 text-[11px] leading-snug text-muted-foreground">
          Haz clic en un país del globo para añadirlo o quitarlo. Desliza
          horizontalmente si no caben las columnas.
        </p>
      </div>
    </aside>
  );
}
