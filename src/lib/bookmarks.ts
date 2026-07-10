export type BookmarkEntry = {
  href: string;
  title: string;
  temaId?: string;
  savedAt: number;
};

export type ContinueReading = {
  href: string;
  title: string;
  temaId?: string;
  visitedAt: number;
};

const BOOKMARKS_KEY = 'wp:bookmarks';
const CONTINUE_KEY = 'wp:continue-reading';
const MAX_BOOKMARKS = 40;

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function readBookmarks(): BookmarkEntry[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BookmarkEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeBookmarks(entries: BookmarkEntry[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(entries.slice(0, MAX_BOOKMARKS)));
}

export function readContinueReading(): ContinueReading | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(CONTINUE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ContinueReading;
  } catch {
    return null;
  }
}

export function writeContinueReading(entry: ContinueReading) {
  if (!canUseStorage()) return;
  localStorage.setItem(CONTINUE_KEY, JSON.stringify(entry));
}

export function pageTitleFromDocument(fallback = 'Página') {
  if (typeof document === 'undefined') return fallback;
  const raw = document.title || fallback;
  return raw.replace(/\s*[·|].*$/, '').trim() || fallback;
}
