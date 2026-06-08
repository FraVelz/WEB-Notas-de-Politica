"use client";

import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function LoadingOverlay() {
  const isRotating = useGlobeStore((s) => s.isRotating);

  if (!isRotating) return null;

  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-cyan-500/30 bg-black/60 px-4 py-2 text-xs text-cyan-300 backdrop-blur-md">
      Girando al país...
    </div>
  );
}
