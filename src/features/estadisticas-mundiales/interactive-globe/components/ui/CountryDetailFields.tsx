"use client";

import Image from "next/image";
import type { CountryDetail } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import { formatCountryNumber, formatCountryListSummary } from "@/features/estadisticas-mundiales/interactive-globe/lib/formatCountryNumber";

function Row({
  label,
  value,
  compact,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "flex justify-between gap-3 text-xs"
          : "flex justify-between gap-4 text-sm"
      }
    >
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="max-w-[58%] text-right font-medium leading-snug text-foreground">
        {value}
      </dd>
    </div>
  );
}

export function CountryDetailFields({
  detail,
  compact = false,
  summarizeLists = false,
}: {
  detail: CountryDetail;
  compact?: boolean;
  summarizeLists?: boolean;
}) {
  const textClass = compact ? "text-xs" : "text-sm";
  const listValue = (items: string[]) => {
    if (items.length === 0) return "—";
    return summarizeLists ? formatCountryListSummary(items) : items.join(", ");
  };

  return (
    <div className={compact ? "space-y-3" : "space-y-5"}>
      {detail.flagSvg ? (
        <div
          className={
            compact
              ? "relative h-10 w-14 overflow-hidden rounded-md border border-border"
              : "relative h-16 w-24 overflow-hidden rounded-lg border border-border"
          }
        >
          <Image
            src={detail.flagSvg}
            alt={`Bandera de ${detail.nameEs}`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : null}

      <div>
        <h3
          className={
            compact
              ? "text-base font-bold text-foreground"
              : "text-2xl font-bold text-foreground"
          }
        >
          {detail.nameEs}
        </h3>
        <p className={`${textClass} text-muted-foreground`}>{detail.name}</p>
      </div>

      <dl className={compact ? "space-y-1.5" : "space-y-3"}>
        <Row compact={compact} label="Código ISO" value={`${detail.cca2} · ${detail.cca3}`} />
        <Row compact={compact} label="Capital" value={detail.capital} />
        <Row
          compact={compact}
          label="Población"
          value={formatCountryNumber(detail.population)}
        />
        <Row
          compact={compact}
          label="PIB per cápita"
          value={`$${formatCountryNumber(detail.gdpPerCapita ?? 0)}`}
        />
        <Row
          compact={compact}
          label="Esperanza de vida"
          value={`${detail.lifeExpectancy ?? "—"} años`}
        />
        <Row
          compact={compact}
          label="Área"
          value={`${formatCountryNumber(detail.area)} km²`}
        />
        <Row
          compact={compact}
          label="Coordenadas"
          value={`${detail.latlng[0].toFixed(2)}°, ${detail.latlng[1].toFixed(2)}°`}
        />
        <Row
          compact={compact}
          label="Idiomas"
          value={listValue(detail.languages)}
        />
        <Row
          compact={compact}
          label="Monedas"
          value={listValue(detail.currencies)}
        />
        <Row
          compact={compact}
          label="Continente"
          value={listValue(detail.continents)}
        />
        <Row
          compact={compact}
          label="Zonas horarias"
          value={listValue(detail.timezones)}
        />
        <Row
          compact={compact}
          label="Fronteras"
          value={listValue(detail.borders)}
        />
      </dl>
    </div>
  );
}

export function CountryDetailSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-10 w-14 rounded-md bg-muted" />
      <div className="h-5 w-3/4 rounded bg-muted" />
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="h-3 rounded bg-muted" />
      ))}
    </div>
  );
}
