'use client';

import type { Map as MapLibreMap } from 'maplibre-gl';
import { useEffect, useRef, type RefObject } from 'react';
import { useMap } from '@/components/ui/map';

const MAX_LAT = 85;
const LNG_STEP_KEY = 0.4;
const LAT_STEP_KEY = 0.3;
/** Grados de longitud por px de rueda (acumulado por frame). */
const LNG_PER_WHEEL_PX = 0.14;

type LockedGlobeView = {
  lng: number;
  lat: number;
  bearing: number;
  pitch: number;
  zoom: number;
};

type GlobeKeyboardControlsProps = {
  focusTargetRef: RefObject<HTMLElement | null>;
};

function wheelDeltaPx(event: WheelEvent): number {
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
    return event.deltaX;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * 280;
  }
  return event.deltaY;
}

function moveGlobeCenter(
  map: MapLibreMap,
  deltaLng: number,
  deltaLat: number,
) {
  if (deltaLng === 0 && deltaLat === 0) return;

  const center = map.getCenter();
  map.jumpTo({
    center: [
      center.lng + deltaLng,
      Math.max(-MAX_LAT, Math.min(MAX_LAT, center.lat + deltaLat)),
    ],
    bearing: map.getBearing(),
    pitch: map.getPitch(),
    zoom: map.getZoom(),
  });
}

function applyLockedLongitude(map: MapLibreMap, lock: LockedGlobeView) {
  map.jumpTo({
    center: [lock.lng, lock.lat],
    bearing: lock.bearing,
    pitch: lock.pitch,
    zoom: lock.zoom,
  });
}

/**
 * WASD: lat/lng. Ctrl + rueda: solo longitud con vista bloqueada (sin zoom ni inclinación).
 */
export function GlobeKeyboardControls({
  focusTargetRef,
}: GlobeKeyboardControlsProps) {
  const { map, isLoaded } = useMap();
  const activeKeysRef = useRef(new Set<string>());
  const frameRef = useRef<number | null>(null);

  const wheelLockRef = useRef<LockedGlobeView | null>(null);
  const pendingLngRef = useRef(0);
  const wheelRafRef = useRef<number | null>(null);
  const wheelIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollZoomWasOnRef = useRef(false);
  const dragRotateWasOnRef = useRef(false);
  const touchZoomWasOnRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !map) return;

    const target = focusTargetRef.current;
    if (!target) return;

    const mapContainer = map.getContainer();

    const suspendMapGestures = () => {
      if (map.scrollZoom.isEnabled()) {
        map.scrollZoom.disable();
        scrollZoomWasOnRef.current = true;
      }
      if (map.dragRotate.isEnabled()) {
        map.dragRotate.disable();
        dragRotateWasOnRef.current = true;
      }
      if (map.touchZoomRotate.isEnabled()) {
        map.touchZoomRotate.disable();
        touchZoomWasOnRef.current = true;
      }
    };

    const restoreMapGestures = () => {
      if (scrollZoomWasOnRef.current) {
        map.scrollZoom.enable();
        scrollZoomWasOnRef.current = false;
      }
      if (dragRotateWasOnRef.current) {
        map.dragRotate.enable();
        dragRotateWasOnRef.current = false;
      }
      if (touchZoomWasOnRef.current) {
        map.touchZoomRotate.enable();
        touchZoomWasOnRef.current = false;
      }
    };

    const endWheelGesture = () => {
      if (wheelIdleRef.current) {
        clearTimeout(wheelIdleRef.current);
        wheelIdleRef.current = null;
      }
      if (wheelRafRef.current != null) {
        cancelAnimationFrame(wheelRafRef.current);
        wheelRafRef.current = null;
      }
      pendingLngRef.current = 0;
      wheelLockRef.current = null;
      restoreMapGestures();
    };

    const flushWheelLng = () => {
      wheelRafRef.current = null;
      const lock = wheelLockRef.current;
      const pending = pendingLngRef.current;
      if (!lock || pending === 0) return;

      pendingLngRef.current = 0;
      lock.lng += pending;
      applyLockedLongitude(map, lock);
    };

    const scheduleWheelFlush = () => {
      if (wheelRafRef.current == null) {
        wheelRafRef.current = requestAnimationFrame(flushWheelLng);
      }
    };

    const scheduleEndWheelGesture = () => {
      if (wheelIdleRef.current) clearTimeout(wheelIdleRef.current);
      wheelIdleRef.current = setTimeout(endWheelGesture, 150);
    };

    const startWheelGesture = () => {
      if (wheelLockRef.current) return;

      const center = map.getCenter();
      wheelLockRef.current = {
        lng: center.lng,
        lat: center.lat,
        bearing: map.getBearing(),
        pitch: map.getPitch(),
        zoom: map.getZoom(),
      };
      suspendMapGestures();
    };

    const handleCtrlWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      startWheelGesture();

      const deltaPx = wheelDeltaPx(event);
      if (deltaPx === 0) return;

      pendingLngRef.current += -deltaPx * LNG_PER_WHEEL_PX;
      scheduleWheelFlush();
      scheduleEndWheelGesture();
    };

    const applyPan = () => {
      const keys = activeKeysRef.current;
      if (keys.size === 0) return;

      let deltaLng = 0;
      let deltaLat = 0;

      if (keys.has('a')) deltaLng -= LNG_STEP_KEY;
      if (keys.has('d')) deltaLng += LNG_STEP_KEY;
      if (keys.has('w')) deltaLat += LAT_STEP_KEY;
      if (keys.has('s')) deltaLat -= LAT_STEP_KEY;

      moveGlobeCenter(map, deltaLng, deltaLat);
    };

    const tick = () => {
      applyPan();
      frameRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (frameRef.current == null) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const isTypingInField = () => {
      const el = document.activeElement;
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        (el as HTMLElement).isContentEditable
      );
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        !target.contains(document.activeElement) &&
        document.activeElement !== target
      ) {
        return;
      }
      if (isTypingInField()) return;

      const key = e.key.toLowerCase();
      if (!['w', 'a', 's', 'd'].includes(key)) return;

      e.preventDefault();
      if (!activeKeysRef.current.has(key)) {
        activeKeysRef.current.add(key);
        applyPan();
        startLoop();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        activeKeysRef.current.delete(key);
        if (activeKeysRef.current.size === 0) stopLoop();
      }
      if (e.key === 'Control' || e.key === 'Meta') {
        endWheelGesture();
      }
    };

    const onBlur = () => {
      activeKeysRef.current.clear();
      stopLoop();
      endWheelGesture();
    };

    const focusWrapper = () => {
      target.focus({ preventScroll: true });
    };

    const isOverMap = (event: Event) => {
      const node = event.target as Node | null;
      return node != null && target.contains(node);
    };

    const onWindowWheel = (event: WheelEvent) => {
      if (!isOverMap(event)) return;
      handleCtrlWheel(event);
    };

    window.addEventListener('wheel', onWindowWheel, {
      passive: false,
      capture: true,
    });
    mapContainer.addEventListener('pointerdown', focusWrapper);

    target.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    target.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('wheel', onWindowWheel, { capture: true });
      mapContainer.removeEventListener('pointerdown', focusWrapper);
      target.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      target.removeEventListener('blur', onBlur);
      endWheelGesture();
      stopLoop();
    };
  }, [isLoaded, map, focusTargetRef]);

  return null;
}
