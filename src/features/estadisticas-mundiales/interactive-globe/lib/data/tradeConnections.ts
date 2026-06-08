import type { TradeConnection } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";

interface TradeEntry {
  cca2: string;
  targetName: string;
  volume: number;
  latlng: [number, number];
}

const TRADE_DATA: Record<string, TradeEntry[]> = {
  CO: [
    { cca2: "US", targetName: "Estados Unidos", volume: 14.2, latlng: [38.9, -77.0] },
    { cca2: "CN", targetName: "China", volume: 10.8, latlng: [39.9, 116.4] },
    { cca2: "BR", targetName: "Brasil", volume: 4.1, latlng: [-15.8, -47.9] },
    { cca2: "MX", targetName: "México", volume: 2.3, latlng: [19.4, -99.1] },
  ],
  JP: [
    { cca2: "US", targetName: "Estados Unidos", volume: 18.5, latlng: [38.9, -77.0] },
    { cca2: "CN", targetName: "China", volume: 15.2, latlng: [39.9, 116.4] },
    { cca2: "KR", targetName: "Corea del Sur", volume: 5.4, latlng: [37.5, 126.9] },
  ],
  US: [
    { cca2: "CN", targetName: "China", volume: 32.1, latlng: [39.9, 116.4] },
    { cca2: "CA", targetName: "Canadá", volume: 28.4, latlng: [45.4, -75.7] },
    { cca2: "MX", targetName: "México", volume: 22.7, latlng: [19.4, -99.1] },
  ],
  DE: [
    { cca2: "US", targetName: "Estados Unidos", volume: 12.1, latlng: [38.9, -77.0] },
    { cca2: "FR", targetName: "Francia", volume: 9.8, latlng: [48.8, 2.3] },
    { cca2: "CN", targetName: "China", volume: 8.5, latlng: [39.9, 116.4] },
  ],
  BR: [
    { cca2: "CN", targetName: "China", volume: 11.3, latlng: [39.9, 116.4] },
    { cca2: "US", targetName: "Estados Unidos", volume: 9.7, latlng: [38.9, -77.0] },
    { cca2: "AR", targetName: "Argentina", volume: 3.2, latlng: [-34.6, -58.4] },
  ],
};

export function getTradeConnections(cca2: string): TradeConnection[] {
  const entries = TRADE_DATA[cca2] ?? [];
  return entries.map(({ cca2: targetCca2, ...rest }) => ({
    targetCca2,
    ...rest,
  }));
}
