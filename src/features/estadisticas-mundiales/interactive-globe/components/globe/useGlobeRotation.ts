"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import type { Group } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ROTATION_DURATION } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { latLngToVector3 } from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/projectToSphere";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

function getTargetRotation(lat: number, lng: number): THREE.Euler {
  const target = latLngToVector3(lat, lng, 1).normalize();
  const desired = new THREE.Vector3(0, 0, 1);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(target, desired);
  return new THREE.Euler().setFromQuaternion(quaternion, "YXZ");
}

export function useGlobeRotation(
  globeRef: React.RefObject<Group | null>,
  controlsRef: React.RefObject<OrbitControlsImpl | null>,
) {
  const countryMeta = useGlobeStore((s) => s.countryMeta);
  const setIsRotating = useGlobeStore((s) => s.setIsRotating);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!countryMeta || !globeRef.current) return;

    const [lat, lng] = countryMeta.centroid;
    const { x, y, z } = getTargetRotation(lat, lng);

    controlsRef.current?.reset();

    tweenRef.current?.kill();
    setIsRotating(true);

    tweenRef.current = gsap.to(globeRef.current.rotation, {
      x,
      y,
      z,
      duration: ROTATION_DURATION,
      ease: "power2.inOut",
      onComplete: () => setIsRotating(false),
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [countryMeta, globeRef, controlsRef, setIsRotating]);
}
