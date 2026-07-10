"use client";

import { Compass } from "lucide-react";
import {
  GLOBE_VIEW_PRESETS,
  type GlobeViewPresetId,
} from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function ViewControls() {
  const showGraticule = useGlobeStore((s) => s.showGraticule);
  const compareMode = useGlobeStore((s) => s.compareMode);
  const setShowGraticule = useGlobeStore((s) => s.setShowGraticule);
  const setCompareMode = useGlobeStore((s) => s.setCompareMode);
  const applyViewPreset = useGlobeStore((s) => s.applyViewPreset);
  const orientCurrentView = useGlobeStore((s) => s.orientCurrentView);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-elevated/85 p-3 shadow-[var(--shadow-theme)] backdrop-blur-md sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="m-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Vista del globo
        </p>
        <button
          type="button"
          onClick={() => orientCurrentView()}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-link hover:bg-link-muted hover:text-link sm:min-h-0 sm:px-2.5 sm:py-1"
          title="Enderezar la vista actual: norte arriba, sin cambiar la región visible"
        >
          <Compass className="size-3.5 shrink-0 text-link" aria-hidden />
          Orientar
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {GLOBE_VIEW_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyViewPreset(preset.id as GlobeViewPresetId)}
            className="min-h-11 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-link-muted hover:text-link sm:min-h-0 sm:px-2.5 sm:py-1.5"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <label className="flex min-h-11 cursor-pointer items-center gap-2 text-xs text-muted-foreground sm:min-h-0">
        <input
          type="checkbox"
          checked={showGraticule}
          onChange={(e) => setShowGraticule(e.target.checked)}
          className="size-4 accent-link"
        />
        Líneas de referencia y brújula (ecuador, meridianos…)
      </label>

      <label className="flex min-h-11 cursor-pointer items-center gap-2 text-xs text-muted-foreground sm:min-h-0">
        <input
          type="checkbox"
          checked={compareMode}
          onChange={(e) => setCompareMode(e.target.checked)}
          className="size-4 accent-link"
        />
        Comparar hasta 3 países (clic en el globo)
      </label>
    </div>
  );
}
