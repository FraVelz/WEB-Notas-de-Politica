import * as THREE from "three";
import earcut from "earcut";
import { GLOBE_RADIUS, COUNTRY_ALTITUDE } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";

/** Yaw (rad) to face `lng` on the equator toward +Z. */
export function getHorizontalFocusYaw(lng: number): number {
  const equatorPoint = latLngToVector3(0, lng, 1).normalize();
  return -Math.atan2(equatorPoint.x, equatorPoint.z);
}

/** Soft X tilt (rad): equator stays the default, latitude nudges the view north/south. */
export function getSoftFocusTilt(
  lat: number,
  factor = 0.4,
): number {
  return (lat * Math.PI) / 180 * factor;
}

/** Shortest tilt path from `current` to `target` (both radians). */
export function normalizeTiltTarget(current: number, target: number): number {
  let next = target;
  while (next - current > Math.PI) next -= 2 * Math.PI;
  while (next - current < -Math.PI) next += 2 * Math.PI;
  return next;
}

/** Circular mean longitude for multi-country horizontal focus. */
export function averageLongitude(points: [number, number][]): number {
  if (points.length === 0) return 0;

  let sinSum = 0;
  let cosSum = 0;
  for (const [, lng] of points) {
    const rad = (lng * Math.PI) / 180;
    sinSum += Math.sin(rad);
    cosSum += Math.cos(rad);
  }

  return (Math.atan2(sinSum, cosSum) * 180) / Math.PI;
}

/** Mean latitude for multi-country focus. */
export function averageLatitude(points: [number, number][]): number {
  if (points.length === 0) return 0;
  return points.reduce((acc, [lat]) => acc + lat, 0) / points.length;
}

/** Shortest yaw path from `current` to `target` (both radians). */
export function normalizeYawTarget(current: number, target: number): number {
  let next = target;
  while (next - current > Math.PI) next -= 2 * Math.PI;
  while (next - current < -Math.PI) next += 2 * Math.PI;
  return next;
}

export function latLngToVector3(
  lat: number,
  lng: number,
  radius = GLOBE_RADIUS + COUNTRY_ALTITUDE,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function ringToFlatCoords(ring: number[][]): number[] {
  const flat: number[] = [];
  for (const [lng, lat] of ring) {
    flat.push(lng, lat);
  }
  return flat;
}

export function createCountryGeometry(
  coordinates: number[][][][] | number[][][],
  radius = GLOBE_RADIUS + COUNTRY_ALTITUDE,
): THREE.BufferGeometry | null {
  const positions: number[] = [];
  const polygons =
    coordinates[0]?.[0] !== undefined &&
    typeof coordinates[0][0][0] === "number"
      ? [coordinates as number[][][]]
      : (coordinates as number[][][][]);

  for (const polygon of polygons) {
    if (!polygon.length) continue;

    const outerRing = polygon[0];
    if (!outerRing || outerRing.length < 3) continue;

    const flatCoords = ringToFlatCoords(outerRing);
    const holeIndices: number[] = [];
    let indexOffset = outerRing.length;

    for (let h = 1; h < polygon.length; h++) {
      holeIndices.push(indexOffset);
      const hole = polygon[h];
      flatCoords.push(...ringToFlatCoords(hole));
      indexOffset += hole.length;
    }

    const indices = earcut(flatCoords, holeIndices.length ? holeIndices : undefined, 2);

    for (const idx of indices) {
      const lng = flatCoords[idx * 2];
      const lat = flatCoords[idx * 2 + 1];
      const v = latLngToVector3(lat, lng, radius);
      positions.push(v.x, v.y, v.z);
    }
  }

  if (positions.length === 0) return null;

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.computeVertexNormals();
  return geometry;
}

export function createArcPoints(
  start: [number, number],
  end: [number, number],
  segments = 64,
  altitude = 0.4,
): THREE.Vector3[] {
  const startVec = latLngToVector3(start[0], start[1], GLOBE_RADIUS);
  const endVec = latLngToVector3(end[0], end[1], GLOBE_RADIUS);
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const interpolated = new THREE.Vector3().lerpVectors(startVec, endVec, t);
    interpolated.normalize();
    const height = GLOBE_RADIUS + altitude * Math.sin(Math.PI * t);
    interpolated.multiplyScalar(height);
    points.push(interpolated);
  }

  return points;
}
