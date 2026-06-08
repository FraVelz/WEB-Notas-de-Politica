"use client";

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
  const resetHomeView = useGlobeStore((s) => s.resetHomeView);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-elevated/85 p-4 shadow-[var(--shadow-theme)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <p className="m-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Vista del globo
        </p>
        <button
          type="button"
          onClick={() => resetHomeView()}
          className="rounded-lg border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-link hover:bg-link-muted hover:text-link"
          title="Restablecer vista hacia Colombia"
        >
          ↺ Restablecer
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
