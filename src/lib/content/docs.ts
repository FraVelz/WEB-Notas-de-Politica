import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getTemaById, temas } from '@/lib/temas/registry';
import { getFeatureContentDir, isRegisteredTema } from '@/lib/temas/paths';

export type DocMeta = {
  tema: string;
  slug: string;
  title: string;
  description?: string;
  href: string;
};

export type Doc = DocMeta & {
  content: string;
};

function normalizeRelativeSlug(relativePath: string): string {
  if (relativePath === 'index') return '';
  if (relativePath.endsWith('/index')) {
    return relativePath.slice(0, -'/index'.length);
  }
  return relativePath;
}

function hrefFor(tema: string, slug: string): string {
  if (!slug) return `/${tema}`;
  return `/${tema}/${slug}`;
}

function filePathFromTemaSlug(tema: string, slug: string): string {
  const base = getFeatureContentDir(tema);
  if (!slug) {
    const index = path.join(base, 'index.md');
    if (fs.existsSync(index)) return index;
    return path.join(base, 'index.md');
  }

  const asFile = path.join(base, `${slug}.md`);
  if (fs.existsSync(asFile)) return asFile;

  const asIndex = path.join(base, slug, 'index.md');
  if (fs.existsSync(asIndex)) return asIndex;

  return asFile;
}

export function getAllDocs(): DocMeta[] {
  const docs: DocMeta[] = [];

  for (const tema of temas) {
    const contentDir = getFeatureContentDir(tema.id);
    if (!fs.existsSync(contentDir)) continue;

    function walk(dir: string, prefix = '') {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          walk(path.join(dir, entry.name), relative);
        } else if (entry.name.endsWith('.md')) {
          const base = relative.replace(/\.md$/, '');
          const slug = normalizeRelativeSlug(base);
          const filePath = filePathFromTemaSlug(tema.id, slug);
          if (!fs.existsSync(filePath)) continue;
          const raw = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(raw);
          docs.push({
            tema: tema.id,
            slug,
            title:
              (data.title as string) ??
              (slug || getTemaById(tema.id)?.title || tema.id),
            description: data.description as string | undefined,
            href: hrefFor(tema.id, slug),
          });
        }
      }
    }

    walk(contentDir);
  }

  return docs;
}

export function getDocByTemaSlug(tema: string, slug: string): Doc | null {
  if (!isRegisteredTema(tema)) return null;

  const filePath = filePathFromTemaSlug(tema, slug);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    tema,
    slug,
    title:
      (data.title as string) ??
      (slug || getTemaById(tema)?.title || tema),
    description: data.description as string | undefined,
    href: hrefFor(tema, slug),
    content,
  };
}

export function getStaticPaths(): { tema: string; slug: string[] }[] {
  const paths: { tema: string; slug: string[] }[] = [];

  for (const doc of getAllDocs()) {
    paths.push({
      tema: doc.tema,
      slug: doc.slug ? doc.slug.split('/') : [],
    });
  }

  return paths;
}
