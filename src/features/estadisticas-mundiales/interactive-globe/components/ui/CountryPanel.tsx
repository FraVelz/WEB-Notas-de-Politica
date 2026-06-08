"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CountryDetailFields,
  CountryDetailSkeleton,
} from "@/features/estadisticas-mundiales/interactive-globe/components/ui/CountryDetailFields";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function CountryPanel() {
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const countryDetail = useGlobeStore((s) => s.countryDetail);
  const isLoadingDetail = useGlobeStore((s) => s.isLoadingDetail);
  const detailError = useGlobeStore((s) => s.detailError);
  const clearSelection = useGlobeStore((s) => s.clearSelection);
  const history = useGlobeStore((s) => s.history);
  const selectCountry = useGlobeStore((s) => s.selectCountry);
  const countriesIndex = useGlobeStore((s) => s.countriesIndex);

  if (!selectedIso2) return null;

  const chartData = countryDetail
    ? [
        { name: "Población (M)", value: countryDetail.population / 1_000_000 },
        {
          name: "PIB/cápita (k$)",
          value: (countryDetail.gdpPerCapita ?? 0) / 1000,
        },
        { name: "Área (k km²)", value: countryDetail.area / 1000 },
      ]
    : [];

  return (
    <aside className="flex max-h-[min(48vh,440px)] w-full flex-col overflow-hidden rounded-2xl border border-border bg-elevated/90 shadow-[var(--shadow-theme)] backdrop-blur-xl md:w-80">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-link">
          Información
        </h2>
        <button
          type="button"
          onClick={clearSelection}
          className="rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-link-muted hover:text-foreground"
        >
          Esc
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3">
        {isLoadingDetail && <CountryDetailSkeleton />}
        {detailError && (
          <p className="text-sm text-red-400">{detailError}</p>
        )}
        {countryDetail && !isLoadingDetail && (
          <div className="space-y-4">
            <CountryDetailFields detail={countryDetail} compact />

            <div className="h-32">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Indicadores
              </p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={88}
                    tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                      color: "var(--text)",
                    }}
                  />
                  <Bar dataKey="value" fill="var(--link)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {history.length > 1 && (
          <div className="mt-4 border-t border-border pt-3">
            <p className="mb-2 text-xs text-muted-foreground">Recientes</p>
            <div className="flex flex-wrap gap-1.5">
              {history.slice(1, 6).map((iso) => {
                const meta = countriesIndex.get(iso);
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => selectCountry(iso, meta ?? undefined)}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-link hover:bg-link-muted hover:text-link"
                  >
                    {meta?.name ?? iso}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
