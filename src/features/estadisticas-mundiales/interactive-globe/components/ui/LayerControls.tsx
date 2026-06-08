"use client";

import { DATA_LAYERS } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function LayerControls() {
  const activeLayer = useGlobeStore((s) => s.activeLayer);
  const setActiveLayer = useGlobeStore((s) => s.setActiveLayer);
  const showTradeArcs = useGlobeStore((s) => s.showTradeArcs);
  const setShowTradeArcs = useGlobeStore((s) => s.setShowTradeArcs);
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-elevated/85 p-4 shadow-[var(--shadow-theme)] backdrop-blur-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Capas de datos
      </p>
      <div className="flex flex-wrap gap-2">
        {DATA_LAYERS.map((layer) => (
          <button
            key={layer.id}
            type="button"
            onClick={() => setActiveLayer(layer.id)}
            className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
              activeLayer === layer.id
                ? "bg-link-muted text-link"
                : "bg-muted text-muted-foreground hover:bg-link-muted hover:text-foreground"
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={showTradeArcs}
          onChange={(e) => setShowTradeArcs(e.target.checked)}
          disabled={!selectedIso2}
          className="accent-link"
        />
        Conexiones comerciales
      </label>
    </div>
  );
}
