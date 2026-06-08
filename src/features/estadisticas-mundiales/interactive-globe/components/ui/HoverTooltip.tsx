"use client";

import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function HoverTooltip() {
  const hoveredIso2 = useGlobeStore((s) => s.hoveredIso2);
  const countriesIndex = useGlobeStore((s) => s.countriesIndex);

  if (!hoveredIso2) return null;
  const meta = countriesIndex.get(hoveredIso2);
  if (!meta) return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-24 z-10 -translate-x-1/2 rounded-lg border border-border bg-elevated/90 px-3 py-1.5 text-sm text-foreground shadow-[var(--shadow-theme)] backdrop-blur-md">
      {meta.name}
    </div>
  );
}
