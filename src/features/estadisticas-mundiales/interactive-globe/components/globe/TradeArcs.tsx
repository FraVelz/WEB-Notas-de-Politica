"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { createArcPoints } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/projectToSphere";
import { getTradeConnections } from "@/features/estadisticas-mundiales/interactive-globe/lib/data/tradeConnections";
import { useGlobeSceneTheme } from "@/features/estadisticas-mundiales/interactive-globe/hooks/useGlobeSceneTheme";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function TradeArcs() {
  const theme = useGlobeSceneTheme();
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const showTradeArcs = useGlobeStore((s) => s.showTradeArcs);
  const countryDetail = useGlobeStore((s) => s.countryDetail);

  const arcs = useMemo(() => {
    if (!selectedIso2 || !showTradeArcs || !countryDetail) return [];
    const connections = getTradeConnections(selectedIso2);
    const origin = countryDetail.latlng;

    return connections.map((conn) => ({
      points: createArcPoints(origin, conn.latlng, 48, 0.35 + conn.volume * 0.02),
      targetName: conn.targetName,
      volume: conn.volume,
    }));
  }, [selectedIso2, showTradeArcs, countryDetail]);

  if (!arcs.length) return null;

  return (
    <group>
      {arcs.map((arc) => (
        <Line
          key={arc.targetName}
          points={arc.points}
          color={theme.countrySelected}
          lineWidth={1 + arc.volume * 0.1}
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      ))}
    </group>
  );
}
