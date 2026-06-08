"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Group } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ROTATION_DURATION } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import {
  alignQuaternionShortestPath,
  averageLatitude,
  averageLongitude,
  getFocusQuaternion,
} from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/projectToSphere";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function useGlobeRotation(
  globeRef: React.RefObject<Group | null>,
  controlsRef: React.RefObject<OrbitControlsImpl | null>,
) {
  const focusRequest = useGlobeStore((s) => s.focusRequest);
  const compareIso2s = useGlobeStore((s) => s.compareIso2s);
  const compareMode = useGlobeStore((s) => s.compareMode);
  const countriesIndex = useGlobeStore((s) => s.countriesIndex);
  const setIsRotating = useGlobeStore((s) => s.setIsRotating);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!globeRef.current || focusRequest.id === 0) return;

    const globe = globeRef.current;

    let focusLat = focusRequest.lat;
    let focusLng = focusRequest.lng;

    if (compareMode && compareIso2s.length > 1) {
      const points = compareIso2s
        .map((iso) => countriesIndex.get(iso))
        .filter((meta): meta is NonNullable<typeof meta> => meta != null)
        .map((meta) => meta.centroid as [number, number]);
      if (points.length > 1) {
        focusLat = averageLatitude(points);
        focusLng = averageLongitude(points);
      }
    }

    const startQuat = globe.quaternion.clone();
    const endQuat = alignQuaternionShortestPath(
      startQuat,
      getFocusQuaternion(focusLat, focusLng),
    );

    controlsRef.current?.reset();
    controlsRef.current?.update();

    tweenRef.current?.kill();
    setIsRotating(true);

    const proxy = { t: 0 };
    tweenRef.current = gsap.to(proxy, {
      t: 1,
      duration: ROTATION_DURATION,
      ease: "power2.inOut",
      onUpdate: () => {
        globe.quaternion.slerpQuaternions(startQuat, endQuat, proxy.t);
      },
      onComplete: () => {
        globe.quaternion.copy(endQuat);
        controlsRef.current?.update();
        setIsRotating(false);
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [
    focusRequest.id,
    focusRequest.lat,
    focusRequest.lng,
    compareMode,
    compareIso2s,
    countriesIndex,
    globeRef,
    controlsRef,
    setIsRotating,
  ]);
}
