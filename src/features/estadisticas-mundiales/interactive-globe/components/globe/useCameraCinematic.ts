"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function useCameraCinematic() {
  const camera = useThree((s) => s.camera);
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const showTradeArcs = useGlobeStore((s) => s.showTradeArcs);
  const focusRequest = useGlobeStore((s) => s.focusRequest);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (focusRequest.resetZoom) {
      tweenRef.current?.kill();
      gsap.to(camera.position, {
        z: 5.5,
        duration: 1.2,
        ease: "power2.out",
      });
      return;
    }
  }, [focusRequest.id, focusRequest.resetZoom, camera]);

  useEffect(() => {
    if (!selectedIso2) {
      tweenRef.current?.kill();
      gsap.to(camera.position, {
        z: 5.5,
        duration: 1.2,
        ease: "power2.out",
      });
      return;
    }

    tweenRef.current?.kill();
    const timeline = gsap.timeline();

    timeline.to(camera.position, {
      z: 4.2,
      duration: 1.4,
      ease: "power2.inOut",
    });

    if (showTradeArcs) {
      timeline.to(camera.position, {
        z: 4.8,
        duration: 0.8,
        ease: "power1.inOut",
        delay: 0.3,
      });
    }

    tweenRef.current = timeline;

    return () => {
      tweenRef.current?.kill();
    };
  }, [selectedIso2, showTradeArcs, camera]);
}
