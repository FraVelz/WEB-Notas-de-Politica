#!/usr/bin/env node
/**
 * Downloads World Bank indicators for all countries into public/data/indicators/.
 * Run: node scripts/fetch-datasets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../public/data/indicators');

const INDICATORS = [
  {
    id: 'gdp-per-capita',
    code: 'NY.GDP.PCAP.CD',
    label: 'PIB per cápita (US$ corrientes)',
    unit: 'USD',
  },
  {
    id: 'life-expectancy',
    code: 'SP.DYN.LE00.IN',
    label: 'Esperanza de vida al nacer',
    unit: 'años',
  },
  {
    id: 'population',
    code: 'SP.POP.TOTL',
    label: 'Población total',
    unit: 'personas',
  },
  {
    id: 'gini',
    code: 'SI.POV.GINI',
    label: 'Índice de Gini',
    unit: '0-100',
  },
  {
    id: 'poverty-319',
    code: 'SI.POV.DDAY',
    label: 'Pobreza extrema (% < $3.00/día 2021 PPP)',
    unit: '%',
  },
  {
    id: 'co2-per-capita',
    code: 'EN.GHG.CO2.PC.CE.AR5',
    label: 'Emisiones de CO₂ per cápita (GEI)',
    unit: 't CO₂e',
  },
  {
    id: 'urban-population',
    code: 'SP.URB.TOTL.IN.ZS',
    label: 'Población urbana',
    unit: '%',
  },
  {
    id: 'rd-gdp',
    code: 'GB.XPD.RSDV.GD.ZS',
    label: 'Gasto en I+D (% del PIB)',
    unit: '% PIB',
  },
  {
    id: 'tax-revenue',
    code: 'GC.TAX.TOTL.GD.ZS',
    label: 'Ingresos tributarios (% del PIB)',
    unit: '% PIB',
  },
  {
    id: 'fdi-gdp',
    code: 'BX.KLT.DINV.WD.GD.ZS',
    label: 'IED neta (% del PIB)',
    unit: '% PIB',
  },
  {
    id: 'homicide',
    code: 'VC.IHR.PSRC.P5',
    label: 'Homicidios intencionales (por 100.000)',
    unit: 'por 100k',
  },
];

const DATE_RANGE = '2000:2024';
const PER_PAGE = 20000;

async function fetchIndicator(code) {
  const url = `https://api.worldbank.org/v2/country/all/indicator/${code}?format=json&per_page=${PER_PAGE}&date=${DATE_RANGE}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`World Bank ${code}: HTTP ${res.status}`);
  }
  const json = await res.json();
  const rows = Array.isArray(json?.[1]) ? json[1] : [];
  return rows;
}

function isCountryIso2(id) {
  // World Bank uses ISO3 in country.id; skip aggregates (regions start with digits or are 3+ letter codes that aren't countries)
  return typeof id === 'string' && /^[A-Z]{3}$/.test(id);
}

function buildSnapshot(indicator, rows) {
  /** @type {Record<string, { iso3: string; name: string; values: Record<string, number> }>} */
  const byCountry = {};

  for (const row of rows) {
    const iso3 = row?.countryiso3code || row?.country?.id;
    if (!iso3 || !isCountryIso2(iso3)) continue;
    if (row.value === null || row.value === undefined) continue;
    const year = String(row.date);
    if (!byCountry[iso3]) {
      byCountry[iso3] = {
        iso3,
        name: row.country?.value ?? iso3,
        values: {},
      };
    }
    byCountry[iso3].values[year] = Number(row.value);
  }

  const countries = Object.values(byCountry).sort((a, b) =>
    a.name.localeCompare(b.name, 'en'),
  );

  // Latest non-null year per country
  const latest = {};
  for (const c of countries) {
    const years = Object.keys(c.values)
      .map(Number)
      .sort((a, b) => b - a);
    if (years.length === 0) continue;
    const y = String(years[0]);
    latest[c.iso3] = {
      value: c.values[y],
      year: Number(y),
      name: c.name,
    };
  }

  const withData = Object.keys(latest).length;

  return {
    id: indicator.id,
    code: indicator.code,
    label: indicator.label,
    unit: indicator.unit,
    source: 'World Bank Open Data',
    sourceUrl: `https://data.worldbank.org/indicator/${indicator.code}`,
    license: 'CC BY 4.0 (World Bank)',
    fetchedAt: new Date().toISOString(),
    dateRange: DATE_RANGE,
    countryCount: withData,
    coverageNote:
      'No todos los países tienen dato en todos los años. Un valor ausente no implica cero.',
    latest,
    series: Object.fromEntries(
      countries.map((c) => [c.iso3, { name: c.name, values: c.values }]),
    ),
  };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const catalog = [];

  for (const indicator of INDICATORS) {
    process.stdout.write(`Fetching ${indicator.id} (${indicator.code})… `);
    try {
      const rows = await fetchIndicator(indicator.code);
      const snapshot = buildSnapshot(indicator, rows);
      const outPath = path.join(OUT_DIR, `${indicator.id}.json`);
      fs.writeFileSync(outPath, JSON.stringify(snapshot));
      catalog.push({
        id: indicator.id,
        code: indicator.code,
        label: indicator.label,
        unit: indicator.unit,
        countryCount: snapshot.countryCount,
        file: `indicators/${indicator.id}.json`,
        sourceUrl: snapshot.sourceUrl,
        fetchedAt: snapshot.fetchedAt,
      });
      console.log(`ok (${snapshot.countryCount} countries)`);
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
    }
    // Be polite to the API
    await new Promise((r) => setTimeout(r, 400));
  }

  const meta = {
    fetchedAt: new Date().toISOString(),
    source: 'World Bank Open Data API',
    epistemicNote:
      'Los indicadores son señales imperfectas. Correlación no implica causalidad. Úsalos para escenarios y comparaciones, no como verdades absolutas.',
    indicators: catalog,
  };
  fs.writeFileSync(
    path.join(OUT_DIR, 'meta.json'),
    JSON.stringify(meta, null, 2),
  );
  console.log(`Wrote ${catalog.length} indicators → ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
