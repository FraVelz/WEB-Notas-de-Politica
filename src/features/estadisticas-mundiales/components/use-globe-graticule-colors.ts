'use client';

import { useSyncExternalStore } from 'react';

/** MapLibre solo acepta colores literales, no var(--…). */
const PALETTE = {
  light: { primary: '#0a0a0a', secondary: '#525252' },
  dark: { primary: '#ffffff', secondary: '#888888' },
} as const;

function readPalette() {
  if (typeof document === 'undefined') return PALETTE.light;
  const theme = document.documentElement.getAttribute('data-theme');
  return theme === 'dark' ? PALETTE.dark : PALETTE.light;
}

function subscribeThemeChanges(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class'],
  });
  return () => observer.disconnect();
}

export function useGlobeGraticuleColors() {
  return useSyncExternalStore(
    subscribeThemeChanges,
    readPalette,
    () => PALETTE.light,
  );
}
