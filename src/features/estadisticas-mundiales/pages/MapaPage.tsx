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
import { GlobeCompass } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/GlobeCompass';
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
const GLOBE_HISTORY_STORAGE_KEY = 'globe-history:v1';

export default function MapaPage() {
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const setCountryStats = useGlobeStore((s) => s.setCountryStats);
  const compareMode = useGlobeStore((s) => s.compareMode);
  const showComparePanel = compareMode;

  useEffect(() => {
    fetchAllCountries()
      .then((data) => {
        setCountries(data);
        setCountryStats(data);
      })
      .catch(console.error);

    const saved = localStorage.getItem(GLOBE_HISTORY_STORAGE_KEY);
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
      localStorage.setItem(
        GLOBE_HISTORY_STORAGE_KEY,
        JSON.stringify(state.history),
      );
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
          <GlobeCompass />
          <LoadingOverlay />

          <div className="pointer-events-none mt-auto flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="pointer-events-auto flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:max-w-xl">
              <ViewControls />
              <LayerControls />
            </div>
            <div className="pointer-events-auto hidden md:block md:w-80">
              {!showComparePanel ? <CountryPanel /> : null}
            </div>
          </div>
        </div>

        {showComparePanel ? <ComparePanel /> : null}

        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 p-4 md:hidden">
          <div className="pointer-events-auto max-h-[45vh] overflow-y-auto overscroll-contain">
            {!showComparePanel ? <CountryPanel /> : null}
          </div>
        </div>
      </div>
    </GlobeProvider>
  );
}
