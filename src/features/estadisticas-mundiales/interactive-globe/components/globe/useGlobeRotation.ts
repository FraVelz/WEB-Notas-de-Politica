"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Group } from "three";
import { ROTATION_DURATION } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function useGlobeRotation(globeRef: React.RefObject<Group | null>) {
  const countryMeta = useGlobeStore((s) => s.countryMeta);
  const setIsRotating = useGlobeStore((s) => s.setIsRotating);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!countryMeta || !globeRef.current) return;

    const [, lng] = countryMeta.centroid;
    const [lat] = countryMeta.centroid;

    const targetY = (-lng * Math.PI) / 180;
    const targetX = (lat * Math.PI) / 180;

    tweenRef.current?.kill();
    setIsRotating(true);

    tweenRef.current = gsap.to(globeRef.current.rotation, {
      x: targetX,
      y: targetY,
      duration: ROTATION_DURATION,
      ease: "power2.inOut",
      onComplete: () => setIsRotating(false),
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [countryMeta, globeRef, setIsRotating]);
}
