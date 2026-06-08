'use client';

import { useEffect, useState } from 'react';

export type GlobeSceneTheme = {
  ambient: number;
  directional: number;
  hemisphereIntensity: number;
  hemisphereSky: string;
  hemisphereGround: string;
  fillIntensity: number;
  pointLight: string;
  pointIntensity: number;
  starsCount: number;
  starsFactor: number;
  atmosphereColor: string;
  atmosphereOpacity: number;
  countryHover: string;
  countrySelected: string;
  earthEmissive: string;
  earthEmissiveIntensity: number;
  earthSpecular: string;
  earthShininess: number;
};

const PALETTES: Record<'light' | 'dark', GlobeSceneTheme> = {
  light: {
    ambient: 0.72,
    directional: 1.5,
    hemisphereIntensity: 0.16,
    hemisphereSky: '#c8e4f5',
    hemisphereGround: '#64748b',
    fillIntensity: 0.08,
    pointLight: '#d4d4d4',
    pointIntensity: 0.12,
    starsCount: 800,
    starsFactor: 1.2,
    atmosphereColor: '#0070f3',
    atmosphereOpacity: 0.07,
    countryHover: '#0070f3',
    countrySelected: '#0059c9',
    earthEmissive: '#000000',
    earthEmissiveIntensity: 0,
    earthSpecular: '#2a2a2a',
    earthShininess: 16,
  },
  dark: {
    ambient: 0.9,
    directional: 1.65,
    hemisphereIntensity: 0.35,
    hemisphereSky: '#ffffff',
    hemisphereGround: '#1e293b',
    fillIntensity: 0.18,
    pointLight: '#ffffff',
    pointIntensity: 0.22,
    starsCount: 2200,
    starsFactor: 2.4,
    atmosphereColor: '#3291ff',
    atmosphereOpacity: 0.1,
    countryHover: '#3291ff',
    countrySelected: '#0070f3',
    earthEmissive: '#1e293b',
    earthEmissiveIntensity: 0.12,
    earthSpecular: '#111111',
    earthShininess: 10,
  },
};

function readTheme(): GlobeSceneTheme {
  if (typeof document === 'undefined') return PALETTES.light;
  const mode = document.documentElement.getAttribute('data-theme');
  return mode === 'dark' ? PALETTES.dark : PALETTES.light;
}

export function useGlobeSceneTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}
