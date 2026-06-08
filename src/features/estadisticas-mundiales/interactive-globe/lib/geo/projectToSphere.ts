import * as THREE from "three";
import earcut from "earcut";
import { GLOBE_RADIUS, COUNTRY_ALTITUDE } from "@/features/estadisticas-mundiales/interactive-globe/lib/constants";

const CAMERA_FACING = new THREE.Vector3(0, 0, 1);
const NORTH_POLE = new THREE.Vector3(0, 1, 0);
const focusScratch = new THREE.Vector3();
const northScratch = new THREE.Vector3();
const alignScratch = new THREE.Quaternion();
const rollScratch = new THREE.Quaternion();

export const GLOBE_EULER_ORDER: THREE.EulerOrder = "YXZ";

/** Shortest signed delta from `current` to `target` (radians). */
export function shortestAngularDelta(current: number, target: number): number {
  return Math.atan2(Math.sin(target - current), Math.cos(target - current));
}

/**
 * Target orientation: country centered toward the camera (+Z) with north pointing up (+Y).
 */
export function getFocusQuaternion(lat: number, lng: number): THREE.Quaternion {
  focusScratch.copy(latLngToVector3(lat, lng, 1)).normalize();
  alignScratch.setFromUnitVectors(focusScratch, CAMERA_FACING);

  northScratch.copy(NORTH_POLE).applyQuaternion(alignScratch);
  const roll = Math.atan2(northScratch.x, northScratch.y);
  rollScratch.setFromAxisAngle(CAMERA_FACING, roll);

  return rollScratch.multiply(alignScratch);
}

/** Pick the quaternion hemisphere closest to `from` for slerp. */
export function alignQuaternionShortestPath(
  from: THREE.Quaternion,
  to: THREE.Quaternion,
): THREE.Quaternion {
  if (from.dot(to) < 0) {
    return new THREE.Quaternion(-to.x, -to.y, -to.z, -to.w);
  }
  return to.clone();
}
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

const viewCenterScratch = new THREE.Vector3();
const viewCenterInverse = new THREE.Quaternion();

/** Inverse of `latLngToVector3` on a unit direction. */
export function vector3ToLatLng(vector: THREE.Vector3): [number, number] {
  const unit = vector.clone().normalize();
  const lat = 90 - (Math.acos(THREE.MathUtils.clamp(unit.y, -1, 1)) * 180) / Math.PI;
  const sinPhi = Math.sin((90 - lat) * (Math.PI / 180));
  let lng = 0;
  if (sinPhi > 1e-6) {
    const theta = Math.atan2(unit.z, -unit.x);
    lng = (theta * 180) / Math.PI - 180;
  }
  return [lat, lng];
}

/** Lat/lng currently at the center of the view (camera + globe orientation). */
export function getViewCenterLatLng(
  globeQuaternion: THREE.Quaternion,
  cameraPosition: THREE.Vector3,
): [number, number] {
  viewCenterScratch.copy(cameraPosition).normalize();
  viewCenterInverse.copy(globeQuaternion).invert();
  viewCenterScratch.applyQuaternion(viewCenterInverse);
  return vector3ToLatLng(viewCenterScratch);
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
