import type { CountryDetail, CountrySummary } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";

const REST_COUNTRIES_BASE = "https://restcountries.com/v3.1";

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

function mapSummary(country: RestCountry): CountrySummary {
  return {
    cca2: country.cca2,
    cca3: country.cca3,
    name: country.name.common,
    nameEs: country.translations?.spa?.common ?? country.name.common,
    capital: country.capital?.[0] ?? "—",
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
    capital: country.capital?.[0] ?? "—",
    population: country.population,
    area: country.area ?? 0,
    languages: country.languages ? Object.values(country.languages) : [],
    currencies: country.currencies
      ? Object.values(country.currencies).map((c) => c.name)
      : [],
    continents: country.continents ?? [],
    timezones: country.timezones ?? [],
    borders: country.borders ?? [],
    flagSvg: country.flags?.svg ?? country.flags?.png ?? "",
    latlng: country.latlng ?? [0, 0],
    gdpPerCapita: estimateGdpPerCapita(country.cca2),
    lifeExpectancy: estimateLifeExpectancy(country.cca2),
  };
}

export function estimateGdpPerCapita(cca2: string): number {
  const data: Record<string, number> = {
    US: 76330, JP: 33815, DE: 48718, CO: 6632, BR: 8917,
    CN: 12520, IN: 2389, FR: 40494, GB: 45850, MX: 11496,
    AR: 13651, ES: 30103, IT: 34776, AU: 64491, CA: 51988,
  };
  return data[cca2] ?? 15000;
}

function estimateLifeExpectancy(cca2: string): number {
  const data: Record<string, number> = {
    US: 77.5, JP: 84.6, DE: 81.0, CO: 77.3, BR: 75.9,
    CN: 78.2, IN: 70.4, FR: 82.7, GB: 81.3, MX: 75.1,
    AR: 76.5, ES: 83.6, IT: 83.5, AU: 83.3, CA: 82.9,
  };
  return data[cca2] ?? 73;
}

export async function fetchAllCountries(): Promise<CountrySummary[]> {
  const res = await fetch(
    `${REST_COUNTRIES_BASE}/all?fields=cca2,cca3,name,translations,capital,population,area,latlng`,
  );
  if (!res.ok) throw new Error("Error al cargar países");
  const data = (await res.json()) as RestCountry[];
  return data.map(mapSummary).sort((a, b) => a.nameEs.localeCompare(b.nameEs, "es"));
}

export async function fetchCountryByCode(
  code: string,
  init?: RequestInit,
): Promise<CountryDetail | null> {
  const res = await fetch(`${REST_COUNTRIES_BASE}/alpha/${code}`, init);
  if (!res.ok) return null;
  const data = (await res.json()) as RestCountry | RestCountry[];
  const country = Array.isArray(data) ? data[0] : data;
  if (!country) return null;
  return mapDetail(country);
}
