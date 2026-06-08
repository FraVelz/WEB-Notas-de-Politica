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
    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
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
                ? "bg-cyan-500/30 text-cyan-300"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-xs text-white/60">
        <input
          type="checkbox"
          checked={showTradeArcs}
          onChange={(e) => setShowTradeArcs(e.target.checked)}
          disabled={!selectedIso2}
          className="accent-cyan-400"
        />
        Conexiones comerciales
      </label>
    </div>
  );
}
