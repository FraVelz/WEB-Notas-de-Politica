'use client';

import { useEffect, useState } from 'react';

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

export function useGlobeGraticuleColors() {
  const [colors, setColors] = useState(readPalette);

  useEffect(() => {
    const sync = () => setColors(readPalette());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}
