"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";
import type {
  CountryMeta,
  CountrySummary,
} from "@/features/estadisticas-mundiales/interactive-globe/lib/types";

interface SearchBarProps {
  countries: CountrySummary[];
}

export function SearchBar({ countries }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const compareMode = useGlobeStore((s) => s.compareMode);
  const selectCountry = useGlobeStore((s) => s.selectCountry);
  const toggleCompareCountry = useGlobeStore((s) => s.toggleCompareCountry);
  const countriesIndex = useGlobeStore((s) => s.countriesIndex);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return countries
      .filter((c) => {
        const name = c.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        const nameEs = c.nameEs.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        return name.includes(q) || nameEs.includes(q) || c.cca2.toLowerCase().includes(q);
      })
      .slice(0, 8);
  }, [query, countries]);

  const handleSelect = useCallback(
    (country: CountrySummary) => {
      const meta = countriesIndex.get(country.cca2);
      const resolved: CountryMeta =
        meta ?? {
          iso2: country.cca2,
          name: country.nameEs,
          centroid: [country.latlng[0], country.latlng[1]],
        };
      if (compareMode) toggleCompareCountry(country.cca2, resolved);
      else selectCountry(country.cca2, resolved);
      setQuery(country.nameEs);
      setIsOpen(false);
    },
    [compareMode, countriesIndex, selectCountry, toggleCompareCountry],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-elevated/85 px-4 py-3 shadow-[var(--shadow-theme)] backdrop-blur-md">
        <Search
          className="size-4 shrink-0 text-link"
          aria-hidden
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            }
            if (e.key === "Enter" && filtered[activeIndex]) {
              handleSelect(filtered[activeIndex]);
            }
          }}
          placeholder="Buscar país... (ej. Japón)"
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
          /
        </kbd>
      </div>

      {isOpen && filtered.length > 0 && (
        <ul className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-elevated/95 shadow-[var(--shadow-theme)] backdrop-blur-md">
          {filtered.map((country, i) => (
            <li key={country.cca2}>
              <button
                type="button"
                onClick={() => handleSelect(country)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-link-muted ${
                  i === activeIndex
                    ? "bg-link-muted text-link"
                    : "text-foreground"
                }`}
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {country.cca2}
                </span>
                <span>{country.nameEs}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {country.capital}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
