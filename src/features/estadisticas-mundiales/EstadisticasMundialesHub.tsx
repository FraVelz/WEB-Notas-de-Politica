'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getTemaById } from '@/lib/temas/registry';
import { fetchAllCountries } from '@/features/estadisticas-mundiales/interactive-globe/lib/api/countries';
import { GlobeProvider } from '@/features/estadisticas-mundiales/interactive-globe/components/providers/GlobeProvider';
import { SearchBar } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/SearchBar';
import { CountryPanel } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/CountryPanel';
import { LayerControls } from '@/features/estadisticas-mundiales/interactive-globe/components/ui/LayerControls';
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
      <div className="flex h-full items-center justify-center text-white/40">
        Cargando globo...
      </div>
    ),
  },
);

const meta = getTemaById('estadisticas-mundiales')!;

export function EstadisticasMundialesHub({ temaId: _temaId }: { temaId?: string }) {
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const setCountryStats = useGlobeStore((s) => s.setCountryStats);

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
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] min-h-[calc(100vh-3.5rem)] overflow-hidden bg-[#020617]">
        <div className="absolute inset-0">
          <GlobeScene />
        </div>

        <div className="pointer-events-none relative z-10 flex h-full min-h-[calc(100vh-3.5rem)] flex-col p-4 md:p-6">
          <header className="pointer-events-auto flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="m-0 mb-1 text-xs font-semibold tracking-widest text-cyan-400/80 uppercase">
                Datos
              </p>
              <h1 className="m-0 text-xl font-bold text-white md:text-2xl">
                {meta.title}
              </h1>
              <p className="m-0 mt-1 text-xs text-white/40">
                {meta.description}
              </p>
            </div>
            <SearchBar countries={countries} />
          </header>

          <HoverTooltip />
          <LoadingOverlay />

          <div className="pointer-events-auto mt-auto flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <LayerControls />
            <div className="hidden md:block md:w-80">
              <CountryPanel />
            </div>
          </div>
        </div>

        <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-20 max-h-[50vh] overflow-y-auto p-4 md:hidden">
          <CountryPanel />
        </div>
      </div>
    </GlobeProvider>
  );
}
