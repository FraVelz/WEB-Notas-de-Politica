import type { Feature, FeatureCollection, Geometry } from "geojson";

export interface CountryProperties {
  NAME: string;
  ISO_A2: string;
  ISO_A3: string;
  [key: string]: string | number | undefined;
}

export type CountryFeature = Feature<Geometry, CountryProperties>;
export type CountriesCollection = FeatureCollection<Geometry, CountryProperties>;

export interface CountrySummary {
  cca2: string;
  cca3: string;
  name: string;
  nameEs: string;
  capital: string;
  population: number;
  area: number;
  latlng: [number, number];
}

export interface CountryDetail {
  cca2: string;
  cca3: string;
  name: string;
  nameEs: string;
  capital: string;
  population: number;
  area: number;
  languages: string[];
  currencies: string[];
  continents: string[];
  timezones: string[];
  borders: string[];
  flagSvg: string;
  latlng: [number, number];
  gdpPerCapita?: number;
  lifeExpectancy?: number;
}

export interface TradeConnection {
  targetCca2: string;
  targetName: string;
  volume: number;
  latlng: [number, number];
}

export interface CountryMeta {
  iso2: string;
  name: string;
  centroid: [number, number];
}
