'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getTemaById } from '@/lib/temas/registry';
import { fetchAllCountries } from '@/features/estadisticas-mundiales/interactive-globe/lib/api/countries';
import { GlobeProvider } from '@/features/estadisticas-mundiales/interactive-globe/components/providers/GlobeProvider';
import { SearchBar } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/SearchBar';
import { CountryPanel } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/CountryPanel';
import { LayerControls } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/LayerControls';
import { ViewControls } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/ViewControls';
import { ComparePanel } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/ComparePanel';
import { LoadingOverlay } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/LoadingOverlay';
import { HoverTooltip } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/HoverTooltip';
import { useGlobeStore } from '@/features/estadisticas-mundiales/interactive-globe/store/globeStore';
import type { CountrySummary } from '@/features/estadisticas-mundiales/interactive-globe/lib/types';

const GlobeScene = dynamic(
  () =>
    import('@/features/estadisticas-mundiales/interactive-globe/components/globe/GlobeScene').then(
      (m) => m.GlobeScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Cargando globo...
      </div>
    ),
  },
);

const meta = getTemaById('estadisticas-mundiales')!;

export function EstadisticasMundialesHub({ temaId: _temaId }: { temaId?: string }) {
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const setCountryStats = useGlobeStore((s) => s.setCountryStats);
  const compareMode = useGlobeStore((s) => s.compareMode);
  const compareIso2s = useGlobeStore((s) => s.compareIso2s);
  const showComparePanel = compareMode && compareIso2s.length > 1;

  useEffect(() => {
    fetchAllCountries()
      .then((data) => {
        setCountries(data);
        setCountryStats(data);
      })
      .catch(console.error);

    const saved = localStorage.getItem('globe-history');
    if (saved) {
      try {
        const history = JSON.parse(saved) as string[];
        useGlobeStore.setState({ history });
      } catch {
        /* ignore */
      }
    }
  }, [setCountryStats]);

  useEffect(() => {
    return useGlobeStore.subscribe((state) => {
      localStorage.setItem('globe-history', JSON.stringify(state.history));
    });
  }, []);

  return (
    <GlobeProvider>
      <div className="relative h-full overflow-hidden bg-background">
        <div className="absolute inset-0">
          <GlobeScene />
        </div>

        <div className="pointer-events-none relative z-10 flex h-full flex-col p-4 md:p-6">
          <header className="pointer-events-auto flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="m-0 mb-1 text-xs font-semibold tracking-widest text-link uppercase">
                Datos
              </p>
              <h1 className="m-0 text-xl font-bold text-foreground md:text-2xl">
                {meta.title}
              </h1>
              <p className="m-0 mt-1 text-xs text-muted-foreground">
                {meta.description}
              </p>
            </div>
            <SearchBar countries={countries} />
          </header>

          <HoverTooltip />
          <LoadingOverlay />

          <div className="pointer-events-auto mt-auto flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:max-w-xl">
              <ViewControls />
              <LayerControls />
            </div>
            <div className="hidden md:block md:w-80">
              {showComparePanel ? <ComparePanel /> : <CountryPanel />}
            </div>
          </div>
        </div>

        <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-20 max-h-[50vh] overflow-y-auto p-4 md:hidden">
          {showComparePanel ? <ComparePanel /> : <CountryPanel />}
        </div>
      </div>
    </GlobeProvider>
  );
}
