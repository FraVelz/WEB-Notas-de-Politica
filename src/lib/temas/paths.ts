import fs from 'fs';
import path from 'path';
import { temas } from './registry';

const FEATURES_DIR = path.join(process.cwd(), 'src/features');

export function getFeatureDir(temaId: string): string {
  return path.join(FEATURES_DIR, temaId);
}

export function getFeatureContentDir(temaId: string): string {
  return path.join(getFeatureDir(temaId), 'content');
}

export function isRegisteredTema(temaId: string): boolean {
  return temas.some((t) => t.id === temaId);
}

export function featureContentExists(temaId: string): boolean {
  const dir = getFeatureContentDir(temaId);
  return fs.existsSync(dir);
}
