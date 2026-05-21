import { worldPoints } from '@/features/estadisticas-mundiales/data/world-connections';

const colombia = worldPoints.find((p) => p.id === 'colombia')!;

/** Vista por defecto del globo: orientación neutra y Colombia hacia el frente. */
export const globeHomeView = {
  center: [colombia.lng, colombia.lat] as [number, number],
  zoom: 2,
  bearing: 0,
  pitch: 0,
} as const;
