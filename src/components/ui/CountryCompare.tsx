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
import { cn } from '@/lib/utils';

const DEFAULT_COUNTRIES = ['COL', 'USA', 'DEU', 'JPN', 'BRA', 'ZAF', 'IND'];
const COMPARE_SLOTS = [
  'anchor',
  'compare-1',
  'compare-2',
  'compare-3',
  'compare-4',
  'compare-5',
] as const;

function formatValue(n: number, unit: string): string {
  if (unit === 'USD' || unit === 'personas') {
    return n.toLocaleString('es', { maximumFractionDigits: 0 });
  }
  return n.toLocaleString('es', { maximumFractionDigits: 2 });
}

function CompareSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Cargando indicador">
      <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COMPARE_SLOTS.map((slot) => (
          <div key={slot} className="h-16 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {['primary', 'percentile', 'coverage'].map((slot) => (
          <div key={slot} className="h-20 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}

export function CountryCompare({
  indicatorId,
  defaultCountries = DEFAULT_COUNTRIES,
  title,
}: {
  indicatorId: string;
  defaultCountries?: string[];
  title?: string;
}) {
  const [loadState, setLoadState] = useState<{
    indicatorId: string;
    snapshot: IndicatorSnapshot | null;
    loading: boolean;
  }>({ indicatorId, snapshot: null, loading: true });
  const [selected, setSelected] = useState<string[]>(defaultCountries);

  if (loadState.indicatorId !== indicatorId) {
    setLoadState({ indicatorId, snapshot: null, loading: true });
  }

  const { snapshot, loading } =
    loadState.indicatorId === indicatorId
      ? loadState
      : { snapshot: null, loading: true };

  useEffect(() => {
    let cancelled = false;
    loadIndicator(indicatorId).then((data) => {
      if (cancelled) return;
      setLoadState({ indicatorId, snapshot: data, loading: false });
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
    return selected.flatMap((iso3) => {
        const entry = snapshot.latest[iso3];
        return entry ? [{ name: entry.name, value: entry.value }] : [];
      });
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

  if (loading) return <CompareSkeleton />;

  if (!snapshot) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
        No hay snapshot para «{indicatorId}». Ejecuta{' '}
        <code className="rounded bg-muted px-1">
          node scripts/fetch-datasets.mjs
        </code>
        .
      </p>
    );
  }

  return (
    <section className="space-y-5">
      <div
        className={cn(
          'sticky top-14 z-10 space-y-4 rounded-2xl border border-border',
          'bg-elevated/95 p-4 shadow-[var(--shadow-theme)] backdrop-blur-md sm:p-5',
        )}
      >
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
          {selected.slice(0, COMPARE_SLOTS.length).map((iso3, i) => (
            <CountrySelect
              key={COMPARE_SLOTS[i]}
              label={i === 0 ? 'País ancla' : `Comparar ${i}`}
              countries={options}
              value={iso3}
              onChange={(v) => setSlot(i, v)}
            />
          ))}
        </div>
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

      <div className="rounded-2xl border border-border bg-elevated p-4 shadow-[var(--shadow-theme)] sm:p-5">
        <h3 className="m-0 mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Comparación
        </h3>
        <CompareBarChart data={chartData} unit={snapshot.unit} />
      </div>

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
