import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'corrientes-y-modelos-modernos';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Modelos',
    items: [
      {
        label: 'Neoliberalismo y alternativas',
        href: `/${TEMA_ID}/neoliberalismo-y-alternativas`,
      },
      {
        label: 'Modelos en competencia',
        href: `/${TEMA_ID}/modelos-en-competencia`,
      },
      { label: 'Ingreso (PIB per cápita)', href: `/${TEMA_ID}/modelos` },
    ],
  },
];
