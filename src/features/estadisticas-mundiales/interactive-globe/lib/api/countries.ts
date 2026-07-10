import type {
  CountryDetail,
  CountrySummary,
} from '@/features/estadisticas-mundiales/interactive-globe/lib/types';
import {
  iso2ToIso3,
  loadIndicator,
  type IndicatorSnapshot,
} from '@/lib/data/indicators';

const REST_COUNTRIES_BASE = 'https://restcountries.com/v3.1';

interface RestCountry {
  cca2: string;
  cca3: string;
  name: { common: string };
  translations?: { spa?: { common?: string } };
  capital?: string[];
  population: number;
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string }>;
  continents?: string[];
  timezones?: string[];
  borders?: string[];
  flags?: { svg?: string; png?: string };
  latlng?: [number, number];
}

let gdpSnapshot: IndicatorSnapshot | null | undefined;
let lifeSnapshot: IndicatorSnapshot | null | undefined;

async function ensureIndicatorSnapshots() {
  if (gdpSnapshot === undefined) {
    gdpSnapshot = await loadIndicator('gdp-per-capita');
  }
  if (lifeSnapshot === undefined) {
    lifeSnapshot = await loadIndicator('life-expectancy');
  }
}

function lookupLatest(
  snapshot: IndicatorSnapshot | null | undefined,
  cca2: string,
  cca3: string,
): number | undefined {
  if (!snapshot) return undefined;
  const iso3 = cca3 || iso2ToIso3(cca2);
  if (!iso3) return undefined;
  return snapshot.latest[iso3]?.value;
}

function mapSummary(country: RestCountry): CountrySummary {
  return {
    cca2: country.cca2,
    cca3: country.cca3,
    name: country.name.common,
    nameEs: country.translations?.spa?.common ?? country.name.common,
    capital: country.capital?.[0] ?? '—',
    population: country.population,
    area: country.area ?? 0,
    latlng: country.latlng ?? [0, 0],
  };
}

function mapDetail(country: RestCountry): CountryDetail {
  return {
    cca2: country.cca2,
    cca3: country.cca3,
    name: country.name.common,
    nameEs: country.translations?.spa?.common ?? country.name.common,
    capital: country.capital?.[0] ?? '—',
    population: country.population,
    area: country.area ?? 0,
    languages: country.languages ? Object.values(country.languages) : [],
    currencies: country.currencies
      ? Object.values(country.currencies).map((c) => c.name)
      : [],
    continents: country.continents ?? [],
    timezones: country.timezones ?? [],
    borders: country.borders ?? [],
    flagSvg: country.flags?.svg ?? country.flags?.png ?? '',
    latlng: country.latlng ?? [0, 0],
    gdpPerCapita:
      lookupLatest(gdpSnapshot, country.cca2, country.cca3) ?? 0,
    lifeExpectancy:
      lookupLatest(lifeSnapshot, country.cca2, country.cca3) ?? 0,
  };
}

export async function fetchAllCountries(): Promise<CountrySummary[]> {
  const res = await fetch(
    `${REST_COUNTRIES_BASE}/all?fields=cca2,cca3,name,translations,capital,population,area,latlng`,
  );
  if (!res.ok) throw new Error('Error al cargar países');
  const data = (await res.json()) as RestCountry[];
  return data
    .map(mapSummary)
    .sort((a, b) => a.nameEs.localeCompare(b.nameEs, 'es'));
}

export async function fetchCountryByCode(
  code: string,
  init?: RequestInit,
): Promise<CountryDetail | null> {
  await ensureIndicatorSnapshots();
  const res = await fetch(`${REST_COUNTRIES_BASE}/alpha/${code}`, init);
  if (!res.ok) return null;
  const data = (await res.json()) as RestCountry | RestCountry[];
  const country = Array.isArray(data) ? data[0] : data;
  if (!country) return null;
  return mapDetail(country);
}
