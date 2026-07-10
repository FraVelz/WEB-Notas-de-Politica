export type IndicatorLatestEntry = {
  value: number;
  year: number;
  name: string;
};

export type IndicatorSnapshot = {
  id: string;
  code: string;
  label: string;
  unit: string;
  source: string;
  sourceUrl: string;
  license: string;
  fetchedAt: string;
  dateRange: string;
  countryCount: number;
  coverageNote: string;
  latest: Record<string, IndicatorLatestEntry>;
  series: Record<string, { name: string; values: Record<string, number> }>;
};

export type IndicatorsMeta = {
  fetchedAt: string;
  source: string;
  epistemicNote: string;
  indicators: Array<{
    id: string;
    code: string;
    label: string;
    unit: string;
    countryCount: number;
    file: string;
    sourceUrl: string;
    fetchedAt: string;
  }>;
};

const cache = new Map<string, Promise<IndicatorSnapshot>>();

export async function loadIndicator(
  id: string,
): Promise<IndicatorSnapshot | null> {
  if (!cache.has(id)) {
    cache.set(
      id,
      fetch(`/data/indicators/${id}.json`)
        .then((res) => {
          if (!res.ok) throw new Error(`Indicator ${id}: ${res.status}`);
          return res.json() as Promise<IndicatorSnapshot>;
        })
        .catch(() => null as unknown as IndicatorSnapshot),
    );
  }
  const data = await cache.get(id)!;
  return data ?? null;
}

export async function loadIndicatorsMeta(): Promise<IndicatorsMeta | null> {
  try {
    const res = await fetch('/data/indicators/meta.json');
    if (!res.ok) return null;
    return (await res.json()) as IndicatorsMeta;
  } catch {
    return null;
  }
}

export function listCountriesFromLatest(
  snapshot: IndicatorSnapshot,
): Array<{ iso3: string; name: string; value: number; year: number }> {
  return Object.entries(snapshot.latest)
    .map(([iso3, entry]) => ({
      iso3,
      name: entry.name,
      value: entry.value,
      year: entry.year,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

export function percentileRank(
  value: number,
  allValues: number[],
): number | null {
  if (allValues.length === 0) return null;
  const sorted = [...allValues].sort((a, b) => a - b);
  const below = sorted.filter((v) => v < value).length;
  return Math.round((below / sorted.length) * 100);
}

/** ISO2 (cca2) → ISO3 for common lookups when bridging REST Countries. */
export const ISO2_TO_ISO3: Record<string, string> = {
  AF: 'AFG', AL: 'ALB', DZ: 'DZA', AD: 'AND', AO: 'AGO', AR: 'ARG', AM: 'ARM',
  AU: 'AUS', AT: 'AUT', AZ: 'AZE', BS: 'BHS', BH: 'BHR', BD: 'BGD', BB: 'BRB',
  BY: 'BLR', BE: 'BEL', BZ: 'BLZ', BJ: 'BEN', BT: 'BTN', BO: 'BOL', BA: 'BIH',
  BW: 'BWA', BR: 'BRA', BN: 'BRN', BG: 'BGR', BF: 'BFA', BI: 'BDI', CV: 'CPV',
  KH: 'KHM', CM: 'CMR', CA: 'CAN', CF: 'CAF', TD: 'TCD', CL: 'CHL', CN: 'CHN',
  CO: 'COL', CG: 'COG', CD: 'COD', CR: 'CRI', CI: 'CIV', HR: 'HRV', CU: 'CUB',
  CY: 'CYP', CZ: 'CZE', DK: 'DNK', DJ: 'DJI', DO: 'DOM', EC: 'ECU', EG: 'EGY',
  SV: 'SLV', GQ: 'GNQ', ER: 'ERI', EE: 'EST', SZ: 'SWZ', ET: 'ETH', FJ: 'FJI',
  FI: 'FIN', FR: 'FRA', GA: 'GAB', GM: 'GMB', GE: 'GEO', DE: 'DEU', GH: 'GHA',
  GR: 'GRC', GT: 'GTM', GN: 'GIN', GW: 'GNB', GY: 'GUY', HT: 'HTI', HN: 'HND',
  HU: 'HUN', IS: 'ISL', IN: 'IND', ID: 'IDN', IR: 'IRN', IQ: 'IRQ', IE: 'IRL',
  IL: 'ISR', IT: 'ITA', JM: 'JAM', JP: 'JPN', JO: 'JOR', KZ: 'KAZ', KE: 'KEN',
  KP: 'PRK', KR: 'KOR', KW: 'KWT', KG: 'KGZ', LA: 'LAO', LV: 'LVA', LB: 'LBN',
  LS: 'LSO', LR: 'LBR', LY: 'LBY', LT: 'LTU', LU: 'LUX', MG: 'MDG', MW: 'MWI',
  MY: 'MYS', MV: 'MDV', ML: 'MLI', MT: 'MLT', MR: 'MRT', MU: 'MUS', MX: 'MEX',
  MD: 'MDA', MN: 'MNG', ME: 'MNE', MA: 'MAR', MZ: 'MOZ', MM: 'MMR', NA: 'NAM',
  NP: 'NPL', NL: 'NLD', NZ: 'NZL', NI: 'NIC', NE: 'NER', NG: 'NGA', MK: 'MKD',
  NO: 'NOR', OM: 'OMN', PK: 'PAK', PA: 'PAN', PG: 'PNG', PY: 'PRY', PE: 'PER',
  PH: 'PHL', PL: 'POL', PT: 'PRT', QA: 'QAT', RO: 'ROU', RU: 'RUS', RW: 'RWA',
  SA: 'SAU', SN: 'SEN', RS: 'SRB', SC: 'SYC', SL: 'SLE', SG: 'SGP', SK: 'SVK',
  SI: 'SVN', SO: 'SOM', ZA: 'ZAF', SS: 'SSD', ES: 'ESP', LK: 'LKA', SD: 'SDN',
  SR: 'SUR', SE: 'SWE', CH: 'CHE', SY: 'SYR', TW: 'TWN', TJ: 'TJK', TZ: 'TZA',
  TH: 'THA', TL: 'TLS', TG: 'TGO', TT: 'TTO', TN: 'TUN', TR: 'TUR', TM: 'TKM',
  UG: 'UGA', UA: 'UKR', AE: 'ARE', GB: 'GBR', US: 'USA', UY: 'URY', UZ: 'UZB',
  VE: 'VEN', VN: 'VNM', YE: 'YEM', ZM: 'ZMB', ZW: 'ZWE',
};

export function iso2ToIso3(cca2: string): string | undefined {
  return ISO2_TO_ISO3[cca2.toUpperCase()];
}
