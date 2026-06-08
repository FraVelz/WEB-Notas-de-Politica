"use client";

import { Suspense, useRef, useEffect, useState, type ComponentRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Group } from "three";
import type { CountriesCollection } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import { Earth } from "./Earth";
import { Atmosphere } from "./Atmosphere";
import { Countries } from "./Countries";
import { CapitalMarker } from "./CapitalMarker";
import { TradeArcs } from "./TradeArcs";
import { CameraController } from "./CameraController";
import { SceneEnvironment } from "./SceneEnvironment";
import { GlobeGraticule3D } from "./GlobeGraticule3D";
import { GlobeOrientationSync } from "./GlobeOrientationSync";
import { useGlobeRotation } from "./useGlobeRotation";
import { getCountryCentroid, getFeatureIso2 } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/getCountryCentroid";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

type OrbitControlsImpl = ComponentRef<typeof OrbitControls>;

function GlobeContent({
  geoData,
  globeRef,
  controlsRef,
}: {
  geoData: CountriesCollection;
  globeRef: React.RefObject<Group | null>;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const setCountriesIndex = useGlobeStore((s) => s.setCountriesIndex);
  const countryDetail = useGlobeStore((s) => s.countryDetail);
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const compareMode = useGlobeStore((s) => s.compareMode);
  const showGraticule = useGlobeStore((s) => s.showGraticule);

  useGlobeRotation(globeRef, controlsRef);

  useEffect(() => {
    const { focusRequest, applyViewPreset } = useGlobeStore.getState();
    if (focusRequest.id === 0) applyViewPreset("home");
  }, []);

  useEffect(() => {
    const index = new Map<
      string,
      { iso2: string; name: string; centroid: [number, number] }
    >();
    for (const feature of geoData.features) {
      const iso2 = getFeatureIso2(feature);
      if (!iso2 || iso2 === "-99") continue;
      index.set(iso2, {
        iso2,
        name: feature.properties.NAME,
        centroid: getCountryCentroid(feature),
      });
    }
    setCountriesIndex(index);
  }, [geoData, setCountriesIndex]);

  return (
    <group ref={globeRef}>
      <GlobeOrientationSync globeRef={globeRef} />
      <Earth />
      <GlobeGraticule3D visible={showGraticule} />
      <Countries data={geoData} />
      <Atmosphere />
      {selectedIso2 && countryDetail && !compareMode && (
        <CapitalMarker
          lat={countryDetail.latlng[0]}
          lng={countryDetail.latlng[1]}
          label={countryDetail.capital}
        />
      )}
      <TradeArcs />
    </group>
  );
}

function SceneLoader() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color="#1e293b" wireframe />
    </mesh>
  );
}

export function GlobeScene() {
  const globeRef = useRef<Group>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isRotating = useGlobeStore((s) => s.isRotating);
  const [geoData, setGeoData] = useState<CountriesCollection | null>(null);

  useEffect(() => {
    fetch("/data/countries-110m.json")
      .then((r) => r.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <SceneEnvironment />
      <CameraController />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableRotate={!isRotating}
        minDistance={3.5}
        maxDistance={8}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />
      <Suspense fallback={<SceneLoader />}>
        {geoData ? (
          <GlobeContent
            geoData={geoData}
            globeRef={globeRef}
            controlsRef={controlsRef}
          />
        ) : (
          <SceneLoader />
        )}
      </Suspense>
    </Canvas>
  );
}
