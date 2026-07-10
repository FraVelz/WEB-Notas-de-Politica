'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CountryCompare } from '@/components/ui/CountryCompare';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';
import { TemaPageHeader } from '@/components/ui/TemaPageHeader';
import { cn } from '@/lib/utils';

const TEMA_ID = 'estadisticas-mundiales';

const SIBLINGS = [
  {
    href: `/${TEMA_ID}/como-leer-indicadores`,
    title: 'Cómo leer los indicadores',
    description:
      'Límites, cobertura y lectura epistémica de las series del Banco Mundial.',
  },
  {
    href: `/${TEMA_ID}/poblacion`,
    title: 'Población',
    description: 'Notas y contexto demográfico dentro del mismo apartado.',
  },
  {
    href: `/${TEMA_ID}/mapa`,
    title: 'Mapa mundial',
    description: 'Vista inmersiva para situar países y capas de datos.',
  },
] as const;

export default function IndicadoresPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <TemaPageHeader
        temaId={TEMA_ID}
        eyebrow="Datos"
        title="Comparador de indicadores"
        description="Sitúa cualquier país frente a peers y al mundo. Los valores son snapshots del Banco Mundial: útiles para escenarios, no como veredicto único sobre prosperidad."
        relatedHref={`/${TEMA_ID}/como-leer-indicadores`}
        relatedLabel="Cómo leer estos indicadores"
      />

      <ScenarioCallout variant="trend">
        Cambia el país ancla: el percentil se recalcula respecto a todos los
        países con dato en el snapshot. Un mismo país puede verse «alto» en PIB
        per cápita y «bajo» en otro indicador — eso es señal para hipótesis, no
        para una conclusión cerrada.
      </ScenarioCallout>

      <CountryCompare
        indicatorId="gdp-per-capita"
        title="PIB per cápita"
        defaultCountries={['COL', 'CHL', 'MEX', 'DEU', 'KOR', 'NGA']}
      />

      <CountryCompare
        indicatorId="life-expectancy"
        title="Esperanza de vida"
        defaultCountries={['COL', 'JPN', 'USA', 'IND', 'ZAF', 'ESP']}
      />

      <CountryCompare
        indicatorId="gini"
        title="Desigualdad (Gini)"
        defaultCountries={['COL', 'BRA', 'SWE', 'USA', 'ZAF', 'VNM']}
      />

      <CountryCompare
        indicatorId="homicide"
        title="Homicidios (por 100.000)"
        defaultCountries={['COL', 'MEX', 'USA', 'JPN', 'ZAF', 'DEU']}
      />

      <footer className="space-y-3 border-t border-border pt-6">
        <h2 className="m-0 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Más en este tema
        </h2>
        <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
          {SIBLINGS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'group flex items-start gap-2 rounded-xl border border-border bg-elevated px-3 py-3',
                  'no-underline transition-all duration-150',
                  'hover:-translate-y-0.5 hover:border-link hover:bg-link-muted',
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground group-hover:text-link">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </span>
                </span>
                <ChevronRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-link"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
