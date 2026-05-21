import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'relaciones-internacionales-y-geopolitica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Países',
    items: [
      {
        label: 'Suramérica',
        items: [
          {
            label: 'Colombia',
            href: `/${TEMA_ID}/paises/suramerica/colombia`,
          },
          {
            label: 'Ecuador',
            href: `/${TEMA_ID}/paises/suramerica/ecuador`,
          },
        ],
      },
      {
        label: 'Asia',
        items: [
          {
            label: 'China',
            href: `/${TEMA_ID}/paises/asiaticos/china`,
          },
          {
            label: 'Corea del Sur',
            href: `/${TEMA_ID}/paises/asiaticos/corea-del-sur`,
          },
        ],
      },
    ],
  },
];
