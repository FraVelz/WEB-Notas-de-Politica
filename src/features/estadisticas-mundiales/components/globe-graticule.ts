/** Coordenadas [lng, lat] a lo largo de un paralelo (latitud fija). */
export function parallelLine(
  lat: number,
  stepDeg = 2,
): [number, number][] {
  const coords: [number, number][] = [];
  for (let lng = -180; lng <= 180; lng += stepDeg) {
    coords.push([lng, lat]);
  }
  return coords;
}

/** Coordenadas [lng, lat] a lo largo de un meridiano (longitud fija). */
export function meridianLine(
  lng: number,
  stepDeg = 2,
): [number, number][] {
  const coords: [number, number][] = [];
  for (let lat = -90; lat <= 90; lat += stepDeg) {
    coords.push([lng, lat]);
  }
  return coords;
}

export type GraticuleLine = {
  id: string;
  /** Nombre visible en el mapa */
  name: string;
  coordinates: [number, number][];
  emphasis: 'primary' | 'secondary';
  /** Punto [lng, lat] donde colocar la etiqueta */
  labelAt: [number, number];
};

/** Líneas de referencia para orientarse en el globo (ecuador, meridianos, trópicos…). */
export const globeGraticuleLines: GraticuleLine[] = [
  {
    id: 'equator',
    name: 'Ecuador',
    coordinates: parallelLine(0),
    emphasis: 'primary',
    labelAt: [-28, 0],
  },
  {
    id: 'meridian-0',
    name: 'Meridiano de Greenwich (0°)',
    coordinates: meridianLine(0),
    emphasis: 'primary',
    labelAt: [0, 18],
  },
  {
    id: 'meridian-180',
    name: 'Meridiano 180°',
    coordinates: meridianLine(180),
    emphasis: 'primary',
    labelAt: [180, -12],
  },
  {
    id: 'tropic-n',
    name: 'Trópico de Cáncer',
    coordinates: parallelLine(23.436),
    emphasis: 'secondary',
    labelAt: [-155, 23.436],
  },
  {
    id: 'tropic-s',
    name: 'Trópico de Capricornio',
    coordinates: parallelLine(-23.436),
    emphasis: 'secondary',
    labelAt: [-155, -23.436],
  },
  {
    id: 'polar-n',
    name: 'Círculo polar ártico',
    coordinates: parallelLine(66.563),
    emphasis: 'secondary',
    labelAt: [120, 66.563],
  },
  {
    id: 'polar-s',
    name: 'Círculo polar antártico',
    coordinates: parallelLine(-66.563),
    emphasis: 'secondary',
    labelAt: [120, -66.563],
  },
  {
    id: 'parallel-30n',
    name: 'Paralelo 30° N',
    coordinates: parallelLine(30),
    emphasis: 'secondary',
    labelAt: [95, 30],
  },
  {
    id: 'parallel-30s',
    name: 'Paralelo 30° S',
    coordinates: parallelLine(-30),
    emphasis: 'secondary',
    labelAt: [95, -30],
  },
  {
    id: 'meridian-90e',
    name: 'Meridiano 90° E',
    coordinates: meridianLine(90),
    emphasis: 'secondary',
    labelAt: [90, 42],
  },
  {
    id: 'meridian-90w',
    name: 'Meridiano 90° O',
    coordinates: meridianLine(-90),
    emphasis: 'secondary',
    labelAt: [-90, -42],
  },
];
