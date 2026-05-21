export type WorldPointStatus = 'active' | 'planned';

export type WorldPoint = {
  id: string;
  name: string;
  lng: number;
  lat: number;
  status: WorldPointStatus;
  /** Ruta bajo /estadisticas-mundiales cuando hay nota */
  href?: string;
  /** Datos rápidos para la tarjeta del hub */
  hint?: string;
};

export const worldPoints: WorldPoint[] = [
  {
    id: 'colombia',
    name: 'Colombia',
    lng: -74.0721,
    lat: 4.711,
    status: 'active',
    href: '/estadisticas-mundiales/poblacion',
    hint: 'Población y demografía',
  },
  {
    id: 'mexico',
    name: 'México',
    lng: -99.1332,
    lat: 19.4326,
    status: 'planned',
    hint: 'Zona horaria, indicadores',
  },
  {
    id: 'brasil',
    name: 'Brasil',
    lng: -46.6333,
    lat: -23.5505,
    status: 'planned',
    hint: 'Economía y territorio',
  },
  {
    id: 'usa',
    name: 'Estados Unidos',
    lng: -74.006,
    lat: 40.7128,
    status: 'planned',
  },
  {
    id: 'uk',
    name: 'Reino Unido',
    lng: -0.1276,
    lat: 51.5074,
    status: 'planned',
  },
  {
    id: 'china',
    name: 'China',
    lng: 116.4074,
    lat: 39.9042,
    status: 'planned',
  },
  {
    id: 'india',
    name: 'India',
    lng: 77.209,
    lat: 28.6139,
    status: 'planned',
  },
  {
    id: 'japan',
    name: 'Japón',
    lng: 139.6917,
    lat: 35.6895,
    status: 'planned',
  },
  {
    id: 'south-africa',
    name: 'Sudáfrica',
    lng: 18.4241,
    lat: -33.9249,
    status: 'planned',
  },
  {
    id: 'australia',
    name: 'Australia',
    lng: 151.2093,
    lat: -33.8688,
    status: 'planned',
  },
];
