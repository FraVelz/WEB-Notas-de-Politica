import { create } from "zustand";
import type { CountryDetail, CountryMeta, CountrySummary } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import {
  GLOBE_VIEW_PRESETS,
  type DataLayer,
  type GlobeViewPresetId,
  MAX_COMPARE_COUNTRIES,
} from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { averageLatitude, averageLongitude } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/projectToSphere";
import { iso2ToIso3, loadIndicator } from "@/lib/data/indicators";

export interface CountryStats {
  population: number;
  area: number;
  gdpPerCapita: number;
}

export type GlobeFocusRequest = {
  id: number;
  lat: number;
  lng: number;
  resetZoom?: boolean;
  mode?: "focus" | "orient";
};

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
  showGraticule: boolean;
  compareMode: boolean;
  compareIso2s: string[];
  compareDetails: Map<string, CountryDetail>;
  compareLoadingIso2s: string[];
  comparePanelMinimized: boolean;
  history: string[];
  countriesIndex: Map<string, CountryMeta>;
  countryStats: Map<string, CountryStats>;
  focusRequest: GlobeFocusRequest;
  compassHeading: number;

  setCountriesIndex: (index: Map<string, CountryMeta>) => void;
  setCountryStats: (countries: CountrySummary[]) => void;
  selectCountry: (iso2: string, meta?: CountryMeta) => void;
  toggleCompareCountry: (iso2: string, meta?: CountryMeta) => void;
  setCompareMode: (enabled: boolean) => void;
  setCompareDetail: (iso2: string, detail: CountryDetail) => void;
  removeCompareDetail: (iso2: string) => void;
  setCompareLoadingIso2s: (iso2s: string[]) => void;
  clearCompareDetails: () => void;
  setComparePanelMinimized: (minimized: boolean) => void;
  removeCompareCountry: (iso2: string) => void;
  setHoveredCountry: (iso2: string | null) => void;
  setCountryDetail: (detail: CountryDetail | null) => void;
  setLoadingDetail: (loading: boolean) => void;
  setDetailError: (error: string | null) => void;
  setIsRotating: (rotating: boolean) => void;
  setActiveLayer: (layer: DataLayer) => void;
  setShowTradeArcs: (show: boolean) => void;
  setShowGraticule: (show: boolean) => void;
  setCompassHeading: (heading: number) => void;
  applyViewPreset: (presetId: GlobeViewPresetId) => void;
  orientCurrentView: () => void;
  resetHomeView: () => void;
  clearSelection: () => void;
}

let focusSeq = 0;

function pushFocus(
  lat: number,
  lng: number,
  opts?: { resetZoom?: boolean },
): GlobeFocusRequest {
  focusSeq += 1;
  return { id: focusSeq, lat, lng, resetZoom: opts?.resetZoom };
}

function pushOrientFocus(): GlobeFocusRequest {
  focusSeq += 1;
  return { id: focusSeq, lat: 0, lng: 0, mode: "orient" };
}

function focusFromCompare(
  compareIso2s: string[],
  index: Map<string, CountryMeta>,
): GlobeFocusRequest | null {
  const points = compareIso2s
    .map((iso) => index.get(iso))
    .filter((meta): meta is CountryMeta => meta != null)
    .map((meta) => meta.centroid as [number, number]);

  if (points.length === 0) return null;
  if (points.length === 1) return pushFocus(points[0][0], points[0][1]);

  return pushFocus(averageLatitude(points), averageLongitude(points));
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
  showGraticule: true,
  compareMode: false,
  compareIso2s: [],
  compareDetails: new Map(),
  compareLoadingIso2s: [],
  comparePanelMinimized: false,
  history: [],
  countriesIndex: new Map(),
  countryStats: new Map(),
  focusRequest: { id: 0, lat: 4.711, lng: -74.0721 },
  compassHeading: 0,

  setCountriesIndex: (index) => set({ countriesIndex: index }),

  setCountryStats: (countries) => {
    const provisional = new Map<string, CountryStats>();
    for (const c of countries) {
      provisional.set(c.cca2, {
        population: c.population,
        area: c.area,
        gdpPerCapita: 0,
      });
    }
    set({ countryStats: provisional });

    void loadIndicator("gdp-per-capita").then((snap) => {
      if (!snap) return;
      const stats = new Map<string, CountryStats>();
      for (const c of countries) {
        const iso3 = c.cca3 || iso2ToIso3(c.cca2);
        stats.set(c.cca2, {
          population: c.population,
          area: c.area,
          gdpPerCapita: iso3 ? (snap.latest[iso3]?.value ?? 0) : 0,
        });
      }
      set({ countryStats: stats });
    });
  },

  selectCountry: (iso2, meta) => {
    const state = get();
    if (state.compareMode) {
      state.toggleCompareCountry(iso2, meta);
      return;
    }

    const index = state.countriesIndex;
    const resolvedMeta = meta ?? index.get(iso2) ?? null;
    const history = get().history.filter((h) => h !== iso2);
    history.unshift(iso2);
    const [lat, lng] = resolvedMeta?.centroid ?? [0, 0];

    set({
      selectedIso2: iso2,
      countryMeta: resolvedMeta,
      detailError: null,
      history: history.slice(0, 8),
      focusRequest: pushFocus(lat, lng),
    });
  },

  toggleCompareCountry: (iso2, meta) => {
    const state = get();
    if (!state.compareMode) return;

    const index = state.countriesIndex;
    const resolvedMeta = meta ?? index.get(iso2) ?? null;
    const current = [...state.compareIso2s];
    const existing = current.indexOf(iso2);

    let next: string[];
    if (existing >= 0) {
      next = current.filter((id) => id !== iso2);
    } else if (current.length >= MAX_COMPARE_COUNTRIES) {
      next = [...current.slice(1), iso2];
    } else {
      next = [...current, iso2];
    }

    const focus = focusFromCompare(next, index);
    set({
      compareIso2s: next,
      selectedIso2: next[0] ?? null,
      countryMeta:
        next[0] != null
          ? (index.get(next[0]) ??
            (resolvedMeta?.iso2 === next[0] ? resolvedMeta : null))
          : null,
      countryDetail: null,
      detailError: null,
      focusRequest: focus ?? state.focusRequest,
    });
  },

  setCompareMode: (enabled) => {
    if (!enabled) {
      set({
        compareMode: false,
        compareIso2s: [],
        compareDetails: new Map(),
        compareLoadingIso2s: [],
        comparePanelMinimized: false,
        selectedIso2: null,
        countryMeta: null,
        countryDetail: null,
        detailError: null,
      });
      return;
    }

    const state = get();
    const seed =
      state.compareIso2s.length > 0
        ? state.compareIso2s
        : state.selectedIso2
          ? [state.selectedIso2]
          : [];

    const focus =
      seed.length > 0
        ? focusFromCompare(seed, state.countriesIndex)
        : null;

    set({
      compareMode: true,
      compareIso2s: seed,
      comparePanelMinimized: false,
      selectedIso2: seed[0] ?? null,
      countryMeta: seed[0] ? state.countriesIndex.get(seed[0]) ?? null : null,
      countryDetail: null,
      ...(focus ? { focusRequest: focus } : {}),
    });
  },

  removeCompareCountry: (iso2) => {
    const state = get();
    const next = state.compareIso2s.filter((id) => id !== iso2);
    const focus = focusFromCompare(next, state.countriesIndex);
    const nextDetails = new Map(state.compareDetails);
    nextDetails.delete(iso2);
    set({
      compareIso2s: next,
      compareDetails: nextDetails,
      compareLoadingIso2s: state.compareLoadingIso2s.filter((id) => id !== iso2),
      selectedIso2: next[0] ?? null,
      countryMeta: next[0] ? state.countriesIndex.get(next[0]) ?? null : null,
      focusRequest: focus ?? state.focusRequest,
    });
  },

  setCompareDetail: (iso2, detail) => {
    const stats = new Map(get().countryStats);
    stats.set(detail.cca2, {
      population: detail.population,
      area: detail.area,
      gdpPerCapita: detail.gdpPerCapita ?? 0,
    });
    const nextDetails = new Map(get().compareDetails);
    nextDetails.set(iso2, detail);
    set({
      compareDetails: nextDetails,
      countryStats: stats,
      compareLoadingIso2s: get().compareLoadingIso2s.filter((id) => id !== iso2),
    });
  },

  removeCompareDetail: (iso2) => {
    const nextDetails = new Map(get().compareDetails);
    nextDetails.delete(iso2);
    set({ compareDetails: nextDetails });
  },

  setCompareLoadingIso2s: (iso2s) => set({ compareLoadingIso2s: iso2s }),

  clearCompareDetails: () =>
    set({ compareDetails: new Map(), compareLoadingIso2s: [] }),

  setComparePanelMinimized: (minimized) => set({ comparePanelMinimized: minimized }),

  setHoveredCountry: (iso2) => set({ hoveredIso2: iso2 }),

  setCountryDetail: (detail) => {
    if (detail) {
      const stats = new Map(get().countryStats);
      stats.set(detail.cca2, {
        population: detail.population,
        area: detail.area,
        gdpPerCapita: detail.gdpPerCapita ?? 0,
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

  setShowGraticule: (show) => set({ showGraticule: show }),

  setCompassHeading: (heading) => set({ compassHeading: heading }),

  applyViewPreset: (presetId) => {
    const preset = GLOBE_VIEW_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const resetZoom = presetId === "home";
    const clearOnHome = presetId === "home";

    set({
      ...(clearOnHome
        ? {
            selectedIso2: null,
            countryMeta: null,
            countryDetail: null,
            compareIso2s: [],
            detailError: null,
          }
        : {}),
      focusRequest: pushFocus(preset.lat, preset.lng, { resetZoom }),
    });
  },

  resetHomeView: () => {
    get().applyViewPreset("home");
  },

  orientCurrentView: () => {
    set({ focusRequest: pushOrientFocus() });
  },

  clearSelection: () => {
    const { compareMode } = get();
    if (compareMode) {
      set({
        compareIso2s: [],
        compareDetails: new Map(),
        compareLoadingIso2s: [],
        selectedIso2: null,
        countryMeta: null,
        countryDetail: null,
        detailError: null,
      });
      return;
    }
    set({
      selectedIso2: null,
      countryMeta: null,
      countryDetail: null,
      detailError: null,
    });
  },
}));
