export type WorldPointStatus = 'active' | 'planned';

export type WorldPoint = {
  id: string;
  name: string;
  lng: number;
  lat: number;
  status: WorldPointStatus;
  href?: string;
  hint?: string;
};

/** Puntos de anclaje multi-región → comparador / notas de datos */
export const worldPoints: WorldPoint[] = [
  {
    id: 'colombia',
    name: 'Colombia',
    lng: -74.0721,
    lat: 4.711,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'Comparador de indicadores',
  },
  {
    id: 'mexico',
    name: 'México',
    lng: -99.1332,
    lat: 19.4326,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'América del Norte / LatAm',
  },
  {
    id: 'brasil',
    name: 'Brasil',
    lng: -46.6333,
    lat: -23.5505,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'Economía y territorio',
  },
  {
    id: 'usa',
    name: 'Estados Unidos',
    lng: -74.006,
    lat: 40.7128,
    status: 'active',
    href: '/estadisticas-mundiales/como-leer-indicadores',
    hint: 'Referencia OCDE frecuente',
  },
  {
    id: 'uk',
    name: 'Reino Unido',
    lng: -0.1276,
    lat: 51.5074,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'Europa occidental',
  },
  {
    id: 'germany',
    name: 'Alemania',
    lng: 13.405,
    lat: 52.52,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'Economía europea',
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    lng: 3.3792,
    lat: 6.5244,
    status: 'active',
    href: '/estadisticas-mundiales/poblacion',
    hint: 'África occidental · demografía',
  },
  {
    id: 'south-africa',
    name: 'Sudáfrica',
    lng: 18.4241,
    lat: -33.9249,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'África austral',
  },
  {
    id: 'china',
    name: 'China',
    lng: 116.4074,
    lat: 39.9042,
    status: 'active',
    href: '/relaciones-internacionales-y-geopolitica/paises/asia/china',
    hint: 'Geopolítica · Asia',
  },
  {
    id: 'india',
    name: 'India',
    lng: 77.209,
    lat: 28.6139,
    status: 'active',
    href: '/estadisticas-mundiales/poblacion',
    hint: 'Demografía · Asia',
  },
  {
    id: 'japan',
    name: 'Japón',
    lng: 139.6917,
    lat: 35.6895,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'Envejecimiento · ingreso alto',
  },
  {
    id: 'australia',
    name: 'Australia',
    lng: 151.2093,
    lat: -33.8688,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'Oceanía',
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    lng: 106.8456,
    lat: -6.2088,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'Sudeste asiático',
  },
  {
    id: 'egypt',
    name: 'Egipto',
    lng: 31.2357,
    lat: 30.0444,
    status: 'active',
    href: '/estadisticas-mundiales/indicadores',
    hint: 'Norte de África',
  },
];
