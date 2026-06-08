export const GLOBE_RADIUS = 2;
export const COUNTRY_ALTITUDE = 0.012;
export const ROTATION_DURATION = 1.8;

export const ISO_CORRECTIONS: Record<string, string> = {
  "-99": "",
  FRA: "FR",
  NOR: "NO",
  SAH: "EH",
};

export const LAYER_COLORS = {
  choroplethLow: "#94a3b8",
  choroplethHigh: "#0070f3",
} as const;

export type DataLayer = "none" | "population" | "gdp" | "area";

export const DATA_LAYERS: { id: DataLayer; label: string }[] = [
  { id: "none", label: "Sin capa" },
  { id: "population", label: "Población" },
  { id: "gdp", label: "PIB per cápita" },
  { id: "area", label: "Área" },
];

export const MAX_COMPARE_COUNTRIES = 3;

export const COMPARE_SLOT_COLORS = ["#0070f3", "#e67700", "#7928ca"] as const;

export type GlobeViewPresetId =
  | "home"
  | "equator"
  | "greenwich"
  | "americas"
  | "europe"
  | "asia";

export const GLOBE_VIEW_PRESETS: {
  id: GlobeViewPresetId;
  label: string;
  lat: number;
  lng: number;
}[] = [
  { id: "home", label: "Colombia", lat: 4.711, lng: -74.0721 },
  { id: "equator", label: "Ecuador", lat: 0, lng: -30 },
  { id: "greenwich", label: "Meridiano 0°", lat: 12, lng: 0 },
  { id: "americas", label: "Américas", lat: 8, lng: -78 },
  { id: "europe", label: "Europa", lat: 48, lng: 12 },
  { id: "asia", label: "Asia", lat: 28, lng: 105 },
];
