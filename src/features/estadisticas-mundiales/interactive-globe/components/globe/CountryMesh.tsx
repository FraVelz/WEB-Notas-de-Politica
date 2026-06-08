"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import type { CountryFeature } from "@/features/estadisticas-mundiales/interactive-globe/lib/types";
import { createCountryGeometry } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/projectToSphere";
import { getFeatureIso2 } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/getCountryCentroid";
import { LAYER_COLORS } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

interface CountryMeshProps {
  feature: CountryFeature;
  choroplethColor?: string;
}

export function CountryMesh({ feature, choroplethColor }: CountryMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const iso2 = getFeatureIso2(feature);
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const hoveredIso2 = useGlobeStore((s) => s.hoveredIso2);
  const activeLayer = useGlobeStore((s) => s.activeLayer);
  const selectCountry = useGlobeStore((s) => s.selectCountry);
  const setHoveredCountry = useGlobeStore((s) => s.setHoveredCountry);
  const countriesIndex = useGlobeStore((s) => s.countriesIndex);

  const geometry = useMemo(() => {
    if (feature.geometry.type === "Polygon") {
      return createCountryGeometry(feature.geometry.coordinates);
    }
    if (feature.geometry.type === "MultiPolygon") {
      return createCountryGeometry(feature.geometry.coordinates);
    }
    return null;
  }, [feature]);

  const isSelected = selectedIso2 === iso2 && iso2 !== "-99" && iso2 !== "";
  const isHovered = hoveredIso2 === iso2 && iso2 !== "-99" && iso2 !== "";

  useEffect(() => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;

    let targetColor: THREE.ColorRepresentation = LAYER_COLORS.default;
    if (isSelected) targetColor = LAYER_COLORS.selected;
    else if (isHovered) targetColor = LAYER_COLORS.hover;
    else if (activeLayer !== "none" && choroplethColor)
      targetColor = choroplethColor;

    gsap.to(material.color, {
      r: new THREE.Color(targetColor).r,
      g: new THREE.Color(targetColor).g,
      b: new THREE.Color(targetColor).b,
      duration: 0.4,
    });

    gsap.to(material, {
      opacity: isSelected ? 0.95 : isHovered ? 0.85 : 0.65,
      duration: 0.3,
    });
  }, [isSelected, isHovered, activeLayer, choroplethColor]);

  useFrame(() => {
    if (meshRef.current && isSelected) {
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
        if (meta) selectCountry(iso2, meta);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHoveredCountry(iso2);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        setHoveredCountry(null);
      }}
    >
      <meshStandardMaterial
        color={LAYER_COLORS.default}
        transparent
        opacity={0.65}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
