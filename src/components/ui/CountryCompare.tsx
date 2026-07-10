'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  listCountriesFromLatest,
  loadIndicator,
  percentileRank,
  type IndicatorSnapshot,
} from '@/lib/data/indicators';
import { CompareBarChart } from '@/components/ui/CompareBarChart';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { SourceFooter } from '@/components/ui/SourceFooter';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';
import { StatGrid } from '@/components/ui/StatGrid';

function formatValue(n: number, unit: string): string {
  if (unit === 'USD' || unit === 'personas') {
    return n.toLocaleString('es', { maximumFractionDigits: 0 });
  }
  return n.toLocaleString('es', { maximumFractionDigits: 2 });
}

export function CountryCompare({
  indicatorId,
  defaultCountries = ['COL', 'USA', 'DEU', 'JPN', 'BRA', 'ZAF', 'IND'],
  title,
}: {
  indicatorId: string;
  defaultCountries?: string[];
  title?: string;
}) {
  const [snapshot, setSnapshot] = useState<IndicatorSnapshot | null>(null);
  const [selected, setSelected] = useState<string[]>(defaultCountries);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadIndicator(indicatorId).then((data) => {
      if (cancelled) return;
      setSnapshot(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [indicatorId]);

  const countries = useMemo(
    () => (snapshot ? listCountriesFromLatest(snapshot) : []),
    [snapshot],
  );

  const options = useMemo(
    () => countries.map((c) => ({ iso3: c.iso3, name: c.name })),
    [countries],
  );

  const allValues = useMemo(
    () => countries.map((c) => c.value),
    [countries],
  );

  const chartData = useMemo(() => {
    if (!snapshot) return [];
    return selected
      .map((iso3) => {
        const entry = snapshot.latest[iso3];
        if (!entry) return null;
        return { name: entry.name, value: entry.value };
      })
      .filter(Boolean) as Array<{ name: string; value: number }>;
  }, [snapshot, selected]);

  const primary = selected[0] ? snapshot?.latest[selected[0]] : undefined;
  const pct =
    primary && allValues.length
      ? percentileRank(primary.value, allValues)
      : null;

  function setSlot(index: number, iso3: string) {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = iso3;
      return next;
    });
  }

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Cargando indicador…</p>
    );
  }

  if (!snapshot) {
    return (
      <p className="text-sm text-muted-foreground">
        No hay snapshot para «{indicatorId}». Ejecuta{' '}
        <code className="rounded bg-muted px-1">node scripts/fetch-datasets.mjs</code>
        .
      </p>
    );
  }

  return (
    <section className="space-y-5">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">
          {title ?? snapshot.label}
        </h2>
        <p className="text-sm text-muted-foreground">
          Elige países de cualquier región. Los valores son el último año
          disponible por país (puede diferir entre ellos).
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {selected.slice(0, 6).map((iso3, i) => (
          <CountrySelect
            key={i}
            label={i === 0 ? 'País ancla' : `Comparar ${i}`}
            countries={options}
            value={iso3}
            onChange={(v) => setSlot(i, v)}
          />
        ))}
      </div>

      {primary ? (
        <StatGrid
          items={[
            {
              label: 'Valor (último año)',
              value: `${formatValue(primary.value, snapshot.unit)} ${snapshot.unit}`,
              hint: `${primary.name} · ${primary.year}`,
            },
            {
              label: 'Percentil aproximado',
              value: pct !== null ? `P${pct}` : '—',
              hint: 'Fracción de países con valor menor (no es un ranking moral)',
            },
            {
              label: 'Cobertura del snapshot',
              value: String(snapshot.countryCount),
              hint: 'Países con al menos un dato en la serie',
            },
          ]}
        />
      ) : null}

      <CompareBarChart data={chartData} unit={snapshot.unit} />

      <ScenarioCallout variant="uncertainty">
        Un percentil alto o bajo no «demuestra» prosperidad ni fracaso. Depende
        de definiciones, años faltantes y del resto de indicadores. Úsalo para
        plantear escenarios: si el ancla se acerca a un peer, ¿qué condiciones
        suelen acompañar esa trayectoria?
      </ScenarioCallout>

      <SourceFooter
        source={snapshot.source}
        sourceUrl={snapshot.sourceUrl}
        year={snapshot.dateRange}
        note={snapshot.coverageNote}
        fetchedAt={snapshot.fetchedAt}
      />
    </section>
  );
}
