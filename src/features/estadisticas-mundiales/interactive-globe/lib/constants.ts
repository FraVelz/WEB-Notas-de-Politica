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
  default: "#1e3a5f",
  hover: "#2d6a9f",
  selected: "#22d3ee",
  choroplethLow: "#1e3a5f",
  choroplethHigh: "#22d3ee",
} as const;

export type DataLayer = "none" | "population" | "gdp" | "area";

export const DATA_LAYERS: { id: DataLayer; label: string }[] = [
  { id: "none", label: "Sin capa" },
  { id: "population", label: "Población" },
  { id: "gdp", label: "PIB per cápita" },
  { id: "area", label: "Área" },
];
