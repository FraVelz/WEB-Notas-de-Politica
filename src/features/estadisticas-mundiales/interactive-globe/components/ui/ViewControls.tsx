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
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-elevated/85 p-4 shadow-[var(--shadow-theme)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <p className="m-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Vista del globo
        </p>
        <button
          type="button"
          onClick={() => orientCurrentView()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-link hover:bg-link-muted hover:text-link"
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
            className="rounded-lg bg-muted px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-link-muted hover:text-link"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={showGraticule}
          onChange={(e) => setShowGraticule(e.target.checked)}
          className="accent-link"
        />
        Líneas de referencia y brújula (ecuador, meridianos…)
      </label>

      <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={compareMode}
          onChange={(e) => setCompareMode(e.target.checked)}
          className="accent-link"
        />
        Comparar hasta 3 países (clic en el globo)
      </label>
    </div>
  );
}
