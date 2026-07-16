import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getFeatureContentDir, isRegisteredTema } from '@/lib/temas/paths';
import {
  getTemasByGroup,
  getTemasForLanding,
  temaGroups,
} from '@/lib/temas/registry';
import type { TemaGroupId } from '@/lib/temas/types';

/** Criterio editorial «published» (ficha 07 / plan L7). */
export const PUBLISHED_MIN_WORDS = 800;
export const PUBLISHED_MIN_SOURCE_URLS = 2;

export type NoteProgressMeta = {
  tema: string;
  slug: string;
  href: string;
  title: string;
  wordCount: number;
  sourceUrlCount: number;
  published: boolean;
};

export type ArchiveProgress = {
  notesTotal: number;
  notesPublished: number;
  pct: number;
  temasLanding: number;
  temasActive: number;
  focusGroupId: TemaGroupId;
  focusGroupLabel: string;
  focusPublished: number;
  focusTotal: number;
  focusPct: number;
  notes: NoteProgressMeta[];
};

const FOCUS_GROUP: TemaGroupId = 'fundamentos';

function filePathFromTemaSlug(tema: string, slug: string): string {
  const base = getFeatureContentDir(tema);
  if (!slug) {
    return path.join(base, 'index.md');
  }
  const asFile = path.join(base, `${slug}.md`);
  if (fs.existsSync(asFile)) return asFile;
  return path.join(base, slug, 'index.md');
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function countSourceUrls(content: string): number {
  const fuentesIdx = content.search(/^##\s+Fuentes\b/im);
  const section =
    fuentesIdx >= 0 ? content.slice(fuentesIdx) : content;
  const matches = section.match(/https?:\/\/[^\s)\]]+/gi);
  return matches?.length ?? 0;
}

function walkNotes(temaId: string): NoteProgressMeta[] {
  if (!isRegisteredTema(temaId)) return [];
  const contentDir = getFeatureContentDir(temaId);
  if (!fs.existsSync(contentDir)) return [];

  const notes: NoteProgressMeta[] = [];

  function walk(dir: string, prefix = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), relative);
        continue;
      }
      if (!entry.name.endsWith('.md')) continue;

      const base = relative.replace(/\.md$/, '');
      const slug =
        base === 'index'
          ? ''
          : base.endsWith('/index')
            ? base.slice(0, -'/index'.length)
            : base;
      if (!slug) continue;

      const filePath = filePathFromTemaSlug(temaId, slug);
      if (!fs.existsSync(filePath)) continue;

      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);
      const wordCount = countWords(content);
      const sourceUrlCount = countSourceUrls(content);
      const published =
        wordCount >= PUBLISHED_MIN_WORDS &&
        sourceUrlCount >= PUBLISHED_MIN_SOURCE_URLS;

      notes.push({
        tema: temaId,
        slug,
        href: `/${temaId}/${slug}`,
        title: (data.title as string) ?? slug,
        wordCount,
        sourceUrlCount,
        published,
      });
    }
  }

  walk(contentDir);
  return notes;
}

export function getAllNoteProgress(): NoteProgressMeta[] {
  return getTemasForLanding().flatMap((t) => walkNotes(t.id));
}

export function getArchiveProgress(): ArchiveProgress {
  const notes = getAllNoteProgress();
  const notesPublished = notes.filter((n) => n.published).length;
  const notesTotal = notes.length;
  const pct =
    notesTotal === 0 ? 0 : Math.round((notesPublished / notesTotal) * 100);

  const landing = getTemasForLanding();
  const temasActive = landing.filter((t) => t.status === 'active').length;

  const focusGroup = temaGroups.find((g) => g.id === FOCUS_GROUP)!;
  const focusTemas = getTemasByGroup(FOCUS_GROUP).filter(
    (t) => !t.hiddenOnLanding,
  );
  const focusNotes = notes.filter((n) =>
    focusTemas.some((t) => t.id === n.tema),
  );
  const focusPublished = focusNotes.filter((n) => n.published).length;
  const focusTotal = focusNotes.length;
  const focusPct =
    focusTotal === 0
      ? 0
      : Math.round((focusPublished / focusTotal) * 100);

  return {
    notesTotal,
    notesPublished,
    pct,
    temasLanding: landing.length,
    temasActive,
    focusGroupId: FOCUS_GROUP,
    focusGroupLabel: focusGroup.label,
    focusPublished,
    focusTotal,
    focusPct,
    notes,
  };
}

export function isTemaContentPublished(temaId: string): boolean {
  return walkNotes(temaId).some((n) => n.published);
}
