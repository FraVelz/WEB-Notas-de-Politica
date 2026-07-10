'use client';

import { useCallback, useSyncExternalStore } from 'react';
import {
  pageTitleFromDocument,
  readBookmarks,
  readContinueReading,
  writeBookmarks,
  writeContinueReading,
  type BookmarkEntry,
  type ContinueReading,
} from '@/lib/bookmarks';

const LISTENERS = new Set<() => void>();
let bookmarksCache: BookmarkEntry[] = [];
let continueCache: ContinueReading | null = null;
let hydrated = false;

function hydrate() {
  if (hydrated || typeof window === 'undefined') return;
  bookmarksCache = readBookmarks();
  continueCache = readContinueReading();
  hydrated = true;
}

function emit() {
  bookmarksCache = readBookmarks();
  continueCache = readContinueReading();
  for (const listener of LISTENERS) listener();
}

function subscribe(listener: () => void) {
  hydrate();
  LISTENERS.add(listener);
  return () => {
    LISTENERS.delete(listener);
  };
}

function getBookmarksSnapshot() {
  hydrate();
  return bookmarksCache;
}

function getContinueSnapshot() {
  hydrate();
  return continueCache;
}

const EMPTY_BOOKMARKS: BookmarkEntry[] = [];

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(
    subscribe,
    getBookmarksSnapshot,
    () => EMPTY_BOOKMARKS,
  );
  const continueReading = useSyncExternalStore(
    subscribe,
    getContinueSnapshot,
    () => null,
  );

  const isBookmarked = useCallback(
    (href: string) => bookmarks.some((b) => b.href === href),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    (input: { href: string; title?: string; temaId?: string }) => {
      const current = readBookmarks();
      const exists = current.some((b) => b.href === input.href);
      const next = exists
        ? current.filter((b) => b.href !== input.href)
        : [
            {
              href: input.href,
              title: input.title?.trim() || pageTitleFromDocument(),
              temaId: input.temaId,
              savedAt: Date.now(),
            },
            ...current,
          ];
      writeBookmarks(next);
      emit();
      return !exists;
    },
    [],
  );

  const removeBookmark = useCallback((href: string) => {
    writeBookmarks(readBookmarks().filter((b) => b.href !== href));
    emit();
  }, []);

  const trackVisit = useCallback(
    (input: { href: string; title?: string; temaId?: string }) => {
      if (!input.href || input.href === '/') return;
      const entry: ContinueReading = {
        href: input.href,
        title: input.title?.trim() || pageTitleFromDocument(),
        temaId: input.temaId,
        visitedAt: Date.now(),
      };
      writeContinueReading(entry);
      emit();
    },
    [],
  );

  return {
    bookmarks,
    continueReading,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    trackVisit,
  };
}
