"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} mil millones`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} millones`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)} mil`;
  return n.toLocaleString("es");
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 rounded bg-white/10" />
      ))}
    </div>
  );
}

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
        { name: "PIB/cápita (k$)", value: (countryDetail.gdpPerCapita ?? 0) / 1000 },
        { name: "Área (k km²)", value: countryDetail.area / 1000 },
      ]
    : [];

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl md:w-80">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          Información
        </h2>
        <button
          type="button"
          onClick={clearSelection}
          className="rounded-lg px-2 py-1 text-xs text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          Esc
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {isLoadingDetail && <Skeleton />}
        {detailError && (
          <p className="text-sm text-red-400">{detailError}</p>
        )}
        {countryDetail && !isLoadingDetail && (
          <div className="space-y-5">
            {countryDetail.flagSvg && (
              <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-white/10">
                <Image
                  src={countryDetail.flagSvg}
                  alt={`Bandera de ${countryDetail.nameEs}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold text-white">{countryDetail.nameEs}</h3>
              <p className="text-sm text-white/40">{countryDetail.name}</p>
            </div>

            <dl className="space-y-3 text-sm">
              <Row label="Capital" value={countryDetail.capital} />
              <Row label="Población" value={formatNumber(countryDetail.population)} />
              <Row
                label="PIB per cápita"
                value={`$${formatNumber(countryDetail.gdpPerCapita ?? 0)}`}
              />
              <Row
                label="Esperanza de vida"
                value={`${countryDetail.lifeExpectancy ?? "—"} años`}
              />
              <Row label="Área" value={`${formatNumber(countryDetail.area)} km²`} />
              <Row
                label="Idiomas"
                value={countryDetail.languages.join(", ") || "—"}
              />
              <Row
                label="Monedas"
                value={countryDetail.currencies.join(", ") || "—"}
              />
              <Row
                label="Continente"
                value={countryDetail.continents.join(", ") || "—"}
              />
            </dl>

            <div className="h-40">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
                Indicadores
              </p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" fill="#22d3ee" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {history.length > 1 && (
        <div className="border-t border-white/10 px-5 py-3">
          <p className="mb-2 text-xs text-white/40">Recientes</p>
          <div className="flex flex-wrap gap-1.5">
            {history.slice(1, 6).map((iso) => {
              const meta = countriesIndex.get(iso);
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => selectCountry(iso, meta ?? undefined)}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/60 transition-colors hover:border-cyan-500/50 hover:text-cyan-300"
                >
                  {meta?.name ?? iso}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-white/40">{label}</dt>
      <dd className="text-right font-medium text-white">{value}</dd>
    </div>
  );
}
