import type { TradeConnection } from '@/features/estadisticas-mundiales/interactive-globe/lib/types';

interface TradeEntry {
  cca2: string;
  targetName: string;
  /** Volumen ilustrativo relativo (no es un ranking oficial de comercio) */
  volume: number;
  latlng: [number, number];
}

/**
 * Muestra curada de socios frecuentes por país (órdenes de magnitud relativos).
 * No sustituye estadísticas oficiales de aduanas/OMC; sirve para visualizar
 * escenarios de interdependencia en el globo.
 */
const TRADE_DATA: Record<string, TradeEntry[]> = {
  CO: [
    { cca2: 'US', targetName: 'Estados Unidos', volume: 14.2, latlng: [38.9, -77.0] },
    { cca2: 'CN', targetName: 'China', volume: 10.8, latlng: [39.9, 116.4] },
    { cca2: 'BR', targetName: 'Brasil', volume: 4.1, latlng: [-15.8, -47.9] },
    { cca2: 'MX', targetName: 'México', volume: 2.3, latlng: [19.4, -99.1] },
    { cca2: 'DE', targetName: 'Alemania', volume: 1.8, latlng: [52.5, 13.4] },
  ],
  JP: [
    { cca2: 'US', targetName: 'Estados Unidos', volume: 18.5, latlng: [38.9, -77.0] },
    { cca2: 'CN', targetName: 'China', volume: 15.2, latlng: [39.9, 116.4] },
    { cca2: 'KR', targetName: 'Corea del Sur', volume: 5.4, latlng: [37.5, 126.9] },
    { cca2: 'AU', targetName: 'Australia', volume: 3.1, latlng: [-35.3, 149.1] },
  ],
  US: [
    { cca2: 'CN', targetName: 'China', volume: 32.1, latlng: [39.9, 116.4] },
    { cca2: 'CA', targetName: 'Canadá', volume: 28.4, latlng: [45.4, -75.7] },
    { cca2: 'MX', targetName: 'México', volume: 22.7, latlng: [19.4, -99.1] },
    { cca2: 'DE', targetName: 'Alemania', volume: 11.0, latlng: [52.5, 13.4] },
    { cca2: 'JP', targetName: 'Japón', volume: 10.2, latlng: [35.7, 139.7] },
  ],
  DE: [
    { cca2: 'US', targetName: 'Estados Unidos', volume: 12.1, latlng: [38.9, -77.0] },
    { cca2: 'FR', targetName: 'Francia', volume: 9.8, latlng: [48.8, 2.3] },
    { cca2: 'CN', targetName: 'China', volume: 8.5, latlng: [39.9, 116.4] },
    { cca2: 'NL', targetName: 'Países Bajos', volume: 7.2, latlng: [52.4, 4.9] },
  ],
  BR: [
    { cca2: 'CN', targetName: 'China', volume: 11.3, latlng: [39.9, 116.4] },
    { cca2: 'US', targetName: 'Estados Unidos', volume: 9.7, latlng: [38.9, -77.0] },
    { cca2: 'AR', targetName: 'Argentina', volume: 3.2, latlng: [-34.6, -58.4] },
    { cca2: 'DE', targetName: 'Alemania', volume: 2.8, latlng: [52.5, 13.4] },
  ],
  CN: [
    { cca2: 'US', targetName: 'Estados Unidos', volume: 30.0, latlng: [38.9, -77.0] },
    { cca2: 'JP', targetName: 'Japón', volume: 14.0, latlng: [35.7, 139.7] },
    { cca2: 'KR', targetName: 'Corea del Sur', volume: 12.0, latlng: [37.5, 126.9] },
    { cca2: 'DE', targetName: 'Alemania', volume: 11.5, latlng: [52.5, 13.4] },
    { cca2: 'VN', targetName: 'Vietnam', volume: 8.0, latlng: [21.0, 105.8] },
  ],
  IN: [
    { cca2: 'US', targetName: 'Estados Unidos', volume: 9.5, latlng: [38.9, -77.0] },
    { cca2: 'CN', targetName: 'China', volume: 8.2, latlng: [39.9, 116.4] },
    { cca2: 'AE', targetName: 'Emiratos Árabes', volume: 5.1, latlng: [24.5, 54.4] },
    { cca2: 'SA', targetName: 'Arabia Saudita', volume: 3.4, latlng: [24.7, 46.7] },
  ],
  ZA: [
    { cca2: 'CN', targetName: 'China', volume: 6.2, latlng: [39.9, 116.4] },
    { cca2: 'DE', targetName: 'Alemania', volume: 4.1, latlng: [52.5, 13.4] },
    { cca2: 'US', targetName: 'Estados Unidos', volume: 3.8, latlng: [38.9, -77.0] },
    { cca2: 'IN', targetName: 'India', volume: 2.9, latlng: [28.6, 77.2] },
  ],
  NG: [
    { cca2: 'IN', targetName: 'India', volume: 5.5, latlng: [28.6, 77.2] },
    { cca2: 'CN', targetName: 'China', volume: 4.8, latlng: [39.9, 116.4] },
    { cca2: 'ES', targetName: 'España', volume: 3.2, latlng: [40.4, -3.7] },
    { cca2: 'NL', targetName: 'Países Bajos', volume: 2.7, latlng: [52.4, 4.9] },
  ],
  MX: [
    { cca2: 'US', targetName: 'Estados Unidos', volume: 40.0, latlng: [38.9, -77.0] },
    { cca2: 'CN', targetName: 'China', volume: 8.5, latlng: [39.9, 116.4] },
    { cca2: 'CA', targetName: 'Canadá', volume: 6.0, latlng: [45.4, -75.7] },
    { cca2: 'DE', targetName: 'Alemania', volume: 3.1, latlng: [52.5, 13.4] },
  ],
};

export function getTradeConnections(cca2: string): TradeConnection[] {
  const entries = TRADE_DATA[cca2.toUpperCase()] ?? [];
  return entries.map(({ cca2: targetCca2, ...rest }) => ({
    targetCca2,
    ...rest,
  }));
}
