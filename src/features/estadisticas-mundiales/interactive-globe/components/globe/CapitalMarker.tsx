"use client";

import { Html } from "@react-three/drei";
import { latLngToVector3 } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/projectToSphere";
import { GLOBE_RADIUS } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";

interface CapitalMarkerProps {
  lat: number;
  lng: number;
  label: string;
}

export function CapitalMarker({ lat, lng, label }: CapitalMarkerProps) {
  const position = latLngToVector3(lat, lng, GLOBE_RADIUS + 0.03);

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      <Html
        distanceFactor={6}
        style={{
          color: "#fbbf24",
          fontSize: "11px",
          fontWeight: 600,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          textShadow: "0 0 8px rgba(0,0,0,0.9)",
          transform: "translate(-50%, -150%)",
        }}
      >
        {label}
      </Html>
    </group>
  );
}
