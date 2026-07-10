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
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const showComparePanel = compareMode;
  const showMobileCountrySheet = Boolean(selectedIso2) && !showComparePanel;

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

        <div className="pointer-events-none relative z-10 flex h-full flex-col p-3 sm:p-4 md:p-6">
          <header className="pointer-events-auto flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
            <div className="min-w-0">
              <p className="m-0 mb-1 text-xs font-semibold tracking-widest text-link uppercase">
                Datos
              </p>
              <h1 className="m-0 text-lg font-bold text-foreground md:text-2xl">
                {meta.title}
              </h1>
              <p className="m-0 mt-1 hidden text-xs text-muted-foreground sm:block">
                {meta.description}
              </p>
            </div>
            <SearchBar countries={countries} />
          </header>

          <HoverTooltip />
          <GlobeCompass />
          <LoadingOverlay />

          <div
            className={
              showMobileCountrySheet
                ? 'pointer-events-none mt-auto flex flex-col gap-3 pb-[min(42dvh,21rem)] lg:flex-row lg:items-end lg:justify-between lg:pb-[max(0.25rem,env(safe-area-inset-bottom))]'
                : 'pointer-events-none mt-auto flex flex-col gap-3 pb-[max(0.25rem,env(safe-area-inset-bottom))] lg:flex-row lg:items-end lg:justify-between'
            }
          >
            <div className="pointer-events-auto flex max-h-[min(32dvh,14rem)] flex-col gap-3 overflow-y-auto overscroll-contain sm:max-h-none sm:flex-row sm:flex-wrap lg:max-w-xl">
              <ViewControls />
              <LayerControls />
            </div>
            <div className="pointer-events-auto hidden md:block md:w-80">
              {!showComparePanel ? <CountryPanel /> : null}
            </div>
          </div>
        </div>

        {showComparePanel ? <ComparePanel /> : null}

        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
          <div className="pointer-events-auto max-h-[min(40dvh,20rem)] overflow-y-auto overscroll-contain">
            {!showComparePanel ? <CountryPanel /> : null}
          </div>
        </div>
      </div>
    </GlobeProvider>
  );
}
