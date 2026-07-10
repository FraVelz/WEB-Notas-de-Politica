'use client';

import Link from 'next/link';
import { CountryCompare } from '@/components/ui/CountryCompare';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';
import { TemaBreadcrumb } from '@/components/ui/TemaBreadcrumb';

export default function SenalesDemocraciaPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <TemaBreadcrumb
        temaId="democracia-y-elecciones"
        currentLabel="Señales de contexto (no un índice de democracia)"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-widest text-link uppercase">
          Democracia y elecciones
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Señales de contexto (no un índice de democracia)
        </h1>
        <p className="text-lg text-muted-foreground">
          El PIB per cápita describe escala material. No mide pluralismo,
          integridad electoral ni libertades civiles. Para eso hacen falta
          índices dedicados (V-Dem, Freedom House, etc.), con sus propios
          matices. Esta página solo ofrece contexto económico mientras lees las
          notas del tema.
        </p>
        <p className="text-sm text-muted-foreground">
          Relacionado:{' '}
          <Link
            href="/democracia-y-elecciones/que-miden-los-indices"
            className="text-link underline-offset-2 hover:underline"
          >
            Qué miden los índices
          </Link>
          {' · '}
          <Link
            href="/estadisticas-mundiales/indicadores"
            className="text-link underline-offset-2 hover:underline"
          >
            Comparador global
          </Link>
        </p>
      </header>

      <ScenarioCallout variant="uncertainty">
        Hay países de ingreso alto con erosión democrática documentada en
        índices especializados, y países de ingreso medio con elecciones
        competitivas. No infieras régimen político a partir del PIB.
      </ScenarioCallout>

      <ScenarioCallout variant="scenario">
        Cambia el ancla hacia tu país y pregunta qué otros datos (libertad de
        prensa, independencia judicial, competitividad electoral) necesitarías
        antes de hablar de «calidad democrática».
      </ScenarioCallout>

      <CountryCompare
        indicatorId="gdp-per-capita"
        title="PIB per cápita (solo contexto material)"
        defaultCountries={['COL', 'DEU', 'KOR', 'ZAF', 'IND', 'BRA']}
      />
    </div>
  );
}
