'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageTitleFromDocument } from '@/lib/bookmarks';
import { useBookmarks } from '@/hooks/useBookmarks';

/** Registra la ruta actual para «continuar leyendo». */
export function ReadingTracker({ temaId }: { temaId?: string }) {
  const pathname = usePathname();
  const { trackVisit } = useBookmarks();

  useEffect(() => {
    if (!pathname || pathname === '/') return;
    const t = window.setTimeout(() => {
      trackVisit({
        href: pathname,
        title: pageTitleFromDocument(),
        temaId,
      });
    }, 500);
    return () => window.clearTimeout(t);
  }, [pathname, temaId, trackVisit]);

  return null;
}
