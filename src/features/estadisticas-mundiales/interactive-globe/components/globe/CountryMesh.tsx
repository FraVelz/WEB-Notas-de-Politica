"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import type { CountryFeature } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import { createCountryGeometry } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/projectToSphere";
import { getFeatureIso2 } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/getCountryCentroid";
import { COMPARE_SLOT_COLORS } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { useGlobeSceneTheme } from "@/features/estadisticas-mundiales/interactive-globe/hooks/useGlobeSceneTheme";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

interface CountryMeshProps {
  feature: CountryFeature;
  choroplethColor?: string;
}

export function CountryMesh({ feature, choroplethColor }: CountryMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const iso2 = getFeatureIso2(feature);
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const compareMode = useGlobeStore((s) => s.compareMode);
  const compareIso2s = useGlobeStore((s) => s.compareIso2s);
  const hoveredIso2 = useGlobeStore((s) => s.hoveredIso2);
  const activeLayer = useGlobeStore((s) => s.activeLayer);
  const selectCountry = useGlobeStore((s) => s.selectCountry);
  const toggleCompareCountry = useGlobeStore((s) => s.toggleCompareCountry);
  const setHoveredCountry = useGlobeStore((s) => s.setHoveredCountry);
  const countriesIndex = useGlobeStore((s) => s.countriesIndex);
  const sceneTheme = useGlobeSceneTheme();

  const geometry = useMemo(() => {
    if (feature.geometry.type === "Polygon") {
      return createCountryGeometry(feature.geometry.coordinates);
    }
    if (feature.geometry.type === "MultiPolygon") {
      return createCountryGeometry(feature.geometry.coordinates);
    }
    return null;
  }, [feature]);

  const compareIndex = compareIso2s.indexOf(iso2);
  const isCompareSlot = compareIndex >= 0;
  const isSelected =
    !compareMode &&
    selectedIso2 === iso2 &&
    iso2 !== "-99" &&
    iso2 !== "";
  const isHovered = hoveredIso2 === iso2 && iso2 !== "-99" && iso2 !== "";

  useEffect(() => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    const hasChoropleth = activeLayer !== "none" && !!choroplethColor;

    let targetColor: THREE.ColorRepresentation = sceneTheme.countryHover;
    if (isCompareSlot) {
      targetColor = COMPARE_SLOT_COLORS[compareIndex] ?? sceneTheme.countrySelected;
    } else if (isSelected) targetColor = sceneTheme.countrySelected;
    else if (isHovered) targetColor = sceneTheme.countryHover;
    else if (hasChoropleth) targetColor = choroplethColor;

    let targetOpacity = 0;
    if (isCompareSlot) targetOpacity = 0.9;
    else if (isSelected) targetOpacity = 0.92;
    else if (isHovered) targetOpacity = 0.78;
    else if (hasChoropleth) targetOpacity = 0.72;

    gsap.to(material.color, {
      r: new THREE.Color(targetColor).r,
      g: new THREE.Color(targetColor).g,
      b: new THREE.Color(targetColor).b,
      duration: 0.4,
    });

    gsap.to(material, {
      opacity: targetOpacity,
      duration: 0.3,
    });
  }, [
    isCompareSlot,
    compareIndex,
    isSelected,
    isHovered,
    activeLayer,
    choroplethColor,
    sceneTheme.countryHover,
    sceneTheme.countrySelected,
  ]);

  useFrame(() => {
    if (meshRef.current && (isSelected || isCompareSlot)) {
      meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.008);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  if (!geometry || !iso2 || iso2 === "-99") return null;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onClick={(e) => {
        e.stopPropagation();
        const meta = countriesIndex.get(iso2);
        if (!meta) return;
        if (compareMode) toggleCompareCountry(iso2, meta);
        else selectCountry(iso2, meta);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        const faceNormal = e.face?.normal;
        if (faceNormal) {
          const worldNormal = faceNormal
            .clone()
            .transformDirection(e.object.matrixWorld);
          const toCamera = e.camera.position.clone().sub(e.point).normalize();
          if (worldNormal.dot(toCamera) < 0) return;
        }
        document.body.style.cursor = "pointer";
        setHoveredCountry(iso2);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        setHoveredCountry(null);
      }}
    >
      <meshStandardMaterial
        color={sceneTheme.countryHover}
        transparent
        opacity={0}
        side={THREE.FrontSide}
        depthWrite={false}
      />
    </mesh>
  );
}
