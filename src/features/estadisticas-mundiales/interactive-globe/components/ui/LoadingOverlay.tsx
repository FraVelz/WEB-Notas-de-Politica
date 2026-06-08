"use client";

import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function LoadingOverlay() {
  const isRotating = useGlobeStore((s) => s.isRotating);

  if (!isRotating) return null;

  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border bg-elevated/90 px-4 py-2 text-xs text-link shadow-[var(--shadow-theme)] backdrop-blur-md">
      Girando al país...
    </div>
  );
}
