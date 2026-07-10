'use client';

import Link from 'next/link';
import { CountryCompare } from '@/components/ui/CountryCompare';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';

export default function IndicadoresPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 pb-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-widest text-link uppercase">
          Datos
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Comparador de indicadores
        </h1>
        <p className="text-lg text-muted-foreground">
          Sitúa cualquier país frente a peers y al mundo. Los valores son
          snapshots del Banco Mundial: útiles para escenarios, no como veredicto
          único sobre prosperidad.
        </p>
        <p className="text-sm text-muted-foreground">
          También puedes explorar el{' '}
          <Link href="/estadisticas-mundiales" className="text-link underline-offset-2 hover:underline">
            globo 3D
          </Link>{' '}
          o leer{' '}
          <Link
            href="/estadisticas-mundiales/como-leer-indicadores"
            className="text-link underline-offset-2 hover:underline"
          >
            cómo leer estos indicadores
          </Link>
          .
        </p>
      </header>

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
    </div>
  );
}
