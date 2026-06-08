"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Vector3 } from "three";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

const NORTH_POLE = new Vector3(0, 1, 0);
const scratchForward = new Vector3();
const scratchRight = new Vector3();
const scratchUp = new Vector3();
const scratchNorth = new Vector3();
const scratchProjected = new Vector3();

export function GlobeOrientationSync({
  globeRef,
}: {
  globeRef: React.RefObject<Group | null>;
}) {
  const setCompassHeading = useGlobeStore((s) => s.setCompassHeading);
  const lastHeading = useRef(0);

  useFrame(({ camera }) => {
    const globe = globeRef.current;
    if (!globe) return;

    scratchNorth.copy(NORTH_POLE).applyQuaternion(globe.quaternion);

    camera.getWorldDirection(scratchForward);
    scratchRight.crossVectors(scratchForward, camera.up).normalize();
    scratchUp.crossVectors(scratchRight, scratchForward).normalize();

    const forwardComponent = scratchNorth.dot(scratchForward);
    scratchProjected
      .copy(scratchNorth)
      .addScaledVector(scratchForward, -forwardComponent);

    if (scratchProjected.lengthSq() < 1e-8) {
      if (Math.abs(lastHeading.current) > 1e-4) {
        lastHeading.current = 0;
        setCompassHeading(0);
      }
      return;
    }

    scratchProjected.normalize();
    const heading = Math.atan2(
      scratchProjected.dot(scratchRight),
      scratchProjected.dot(scratchUp),
    );

    if (Math.abs(heading - lastHeading.current) > 0.002) {
      lastHeading.current = heading;
      setCompassHeading(heading);
    }
  });

  return null;
}
