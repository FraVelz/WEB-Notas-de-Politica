import { create } from "zustand";
import type { CountryDetail, CountryMeta, CountrySummary } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import type { DataLayer } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { estimateGdpPerCapita } from "@/features/estadisticas-mundiales/interactive-globe/lib/api/countries";

export interface CountryStats {
  population: number;
  area: number;
  gdpPerCapita: number;
}

interface GlobeState {
  selectedIso2: string | null;
  hoveredIso2: string | null;
  countryMeta: CountryMeta | null;
  countryDetail: CountryDetail | null;
  isLoadingDetail: boolean;
  detailError: string | null;
  isRotating: boolean;
  activeLayer: DataLayer;
  showTradeArcs: boolean;
  history: string[];
  countriesIndex: Map<string, CountryMeta>;
  countryStats: Map<string, CountryStats>;

  setCountriesIndex: (index: Map<string, CountryMeta>) => void;
  setCountryStats: (countries: CountrySummary[]) => void;
  selectCountry: (iso2: string, meta?: CountryMeta) => void;
  setHoveredCountry: (iso2: string | null) => void;
  setCountryDetail: (detail: CountryDetail | null) => void;
  setLoadingDetail: (loading: boolean) => void;
  setDetailError: (error: string | null) => void;
  setIsRotating: (rotating: boolean) => void;
  setActiveLayer: (layer: DataLayer) => void;
  setShowTradeArcs: (show: boolean) => void;
  clearSelection: () => void;
}

export const useGlobeStore = create<GlobeState>((set, get) => ({
  selectedIso2: null,
  hoveredIso2: null,
  countryMeta: null,
  countryDetail: null,
  isLoadingDetail: false,
  detailError: null,
  isRotating: false,
  activeLayer: "none",
  showTradeArcs: false,
  history: [],
  countriesIndex: new Map(),
  countryStats: new Map(),

  setCountriesIndex: (index) => set({ countriesIndex: index }),

  setCountryStats: (countries) => {
    const stats = new Map<string, CountryStats>();
    for (const c of countries) {
      stats.set(c.cca2, {
        population: c.population,
        area: c.area,
        gdpPerCapita: estimateGdpPerCapita(c.cca2),
      });
    }
    set({ countryStats: stats });
  },

  selectCountry: (iso2, meta) => {
    const index = get().countriesIndex;
    const resolvedMeta = meta ?? index.get(iso2) ?? null;
    const history = get().history.filter((h) => h !== iso2);
    history.unshift(iso2);
    set({
      selectedIso2: iso2,
      countryMeta: resolvedMeta,
      detailError: null,
      history: history.slice(0, 8),
    });
  },

  setHoveredCountry: (iso2) => set({ hoveredIso2: iso2 }),

  setCountryDetail: (detail) => {
    if (detail) {
      const stats = new Map(get().countryStats);
      stats.set(detail.cca2, {
        population: detail.population,
        area: detail.area,
        gdpPerCapita: detail.gdpPerCapita ?? estimateGdpPerCapita(detail.cca2),
      });
      set({ countryDetail: detail, countryStats: stats });
    } else {
      set({ countryDetail: null });
    }
  },

  setLoadingDetail: (loading) => set({ isLoadingDetail: loading }),

  setDetailError: (error) => set({ detailError: error }),

  setIsRotating: (rotating) => set({ isRotating: rotating }),

  setActiveLayer: (layer) => set({ activeLayer: layer }),

  setShowTradeArcs: (show) => set({ showTradeArcs: show }),

  clearSelection: () =>
    set({
      selectedIso2: null,
      countryMeta: null,
      countryDetail: null,
      detailError: null,
    }),
}));
