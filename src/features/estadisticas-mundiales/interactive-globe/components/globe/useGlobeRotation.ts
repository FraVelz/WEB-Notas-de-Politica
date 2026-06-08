"use client";

import { useEffect, useRef, type ComponentRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import type { Group } from "three";
import { ROTATION_DURATION } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";
import {
  averageLatitude,
  averageLongitude,
  getFocusQuaternion,
  getViewCenterLatLng,
  GLOBE_EULER_ORDER,
  shortestAngularDelta,
} from "@/features/estadisticas-mundiales/interactive-globe/lib/geo/projectToSphere";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

const syncEuler = new THREE.Euler();
const endEuler = new THREE.Euler();
const ORIENT_DURATION = ROTATION_DURATION * 0.75;

type OrbitControlsImpl = ComponentRef<typeof OrbitControls>;

export function useGlobeRotation(
  globeRef: React.RefObject<Group | null>,
  controlsRef: React.RefObject<OrbitControlsImpl | null>,
) {
  const focusRequest = useGlobeStore((s) => s.focusRequest);
  const compareIso2s = useGlobeStore((s) => s.compareIso2s);
  const compareMode = useGlobeStore((s) => s.compareMode);
  const countriesIndex = useGlobeStore((s) => s.countriesIndex);
  const setIsRotating = useGlobeStore((s) => s.setIsRotating);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);
  const cameraTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!globeRef.current || focusRequest.id === 0) return;

    const globe = globeRef.current;
    const isOrient = focusRequest.mode === "orient";
    const duration = isOrient ? ORIENT_DURATION : ROTATION_DURATION;
    globe.rotation.order = GLOBE_EULER_ORDER;

    let focusLat = focusRequest.lat;
    let focusLng = focusRequest.lng;

    if (isOrient) {
      const controls = controlsRef.current;
      if (controls) {
        [focusLat, focusLng] = getViewCenterLatLng(
          globe.quaternion,
          controls.object.position,
        );
      }
    } else if (compareMode && compareIso2s.length > 1) {
      const points = compareIso2s
        .map((iso) => countriesIndex.get(iso))
        .filter((meta): meta is NonNullable<typeof meta> => meta != null)
        .map((meta) => meta.centroid as [number, number]);
      if (points.length > 1) {
        focusLat = averageLatitude(points);
        focusLng = averageLongitude(points);
      }
    }

    const endQuat = getFocusQuaternion(focusLat, focusLng);
    endEuler.setFromQuaternion(endQuat, GLOBE_EULER_ORDER);

    syncEuler.setFromQuaternion(globe.quaternion, GLOBE_EULER_ORDER);
    globe.rotation.set(syncEuler.x, syncEuler.y, 0);
    globe.quaternion.setFromEuler(globe.rotation);

    const startY = globe.rotation.y;
    const startX = globe.rotation.x;
    const targetY = startY + shortestAngularDelta(startY, endEuler.y);
    const targetX = startX + shortestAngularDelta(startX, endEuler.x);

    const deltaY = Math.abs(shortestAngularDelta(startY, targetY));
    const deltaX = Math.abs(shortestAngularDelta(startX, targetX));
    const total = deltaY + deltaX || 1;
    const yDuration = duration * (deltaY / total);
    const xDuration = duration - yDuration;

    cameraTweenRef.current?.kill();
    if (isOrient && controlsRef.current) {
      const controls = controlsRef.current;
      const cam = controls.object;
      const dist = cam.position.distanceTo(controls.target);
      cameraTweenRef.current = gsap.to(cam.position, {
        x: 0,
        y: 0,
        z: dist,
        duration,
        ease: "power2.inOut",
        onUpdate: () => controls.update(),
      });
    } else {
      controlsRef.current?.reset();
    }
    controlsRef.current?.update();

    tweenRef.current?.kill();
    setIsRotating(true);

    const syncFromEuler = () => {
      globe.quaternion.setFromEuler(globe.rotation);
    };

    const finish = () => {
      globe.quaternion.copy(endQuat);
      globe.rotation.setFromQuaternion(globe.quaternion, GLOBE_EULER_ORDER);
      controlsRef.current?.update();
      setIsRotating(false);
    };

    const timeline = gsap.timeline({
      onComplete: finish,
    });

    if (deltaY > 1e-4) {
      timeline.to(globe.rotation, {
        y: targetY,
        duration: yDuration,
        ease: "power2.inOut",
        onUpdate: syncFromEuler,
      });
    }

    if (deltaX > 1e-4) {
      timeline.to(
        globe.rotation,
        {
          x: targetX,
          duration: xDuration,
          ease: "power2.out",
          onUpdate: syncFromEuler,
        },
        deltaY > 1e-4 ? ">" : 0,
      );
    }

    if (deltaY <= 1e-4 && deltaX <= 1e-4) {
      finish();
    }

    tweenRef.current = timeline;

    return () => {
      tweenRef.current?.kill();
      cameraTweenRef.current?.kill();
    };
  }, [
    focusRequest.id,
    focusRequest.lat,
    focusRequest.lng,
    focusRequest.mode,
    compareMode,
    compareIso2s,
    countriesIndex,
    globeRef,
    controlsRef,
    setIsRotating,
  ]);
}
