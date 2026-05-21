import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_DIR = path.join(process.cwd(), 'src/content/docs');

export type DocMeta = {
  slug: string;
  title: string;
  description?: string;
};

export type Doc = DocMeta & {
  content: string;
};

function normalizeSlug(relativePath: string): string {
  if (relativePath === 'index') return '';
  if (relativePath.endsWith('/index')) {
    return relativePath.slice(0, -'/index'.length);
  }
  return relativePath;
}

function filePathFromSlug(slug: string): string {
  if (!slug) return path.join(DOCS_DIR, 'index.md');

  const asFile = path.join(DOCS_DIR, `${slug}.md`);
  if (fs.existsSync(asFile)) return asFile;

  const asIndex = path.join(DOCS_DIR, slug, 'index.md');
  if (fs.existsSync(asIndex)) return asIndex;

  return asFile;
}

export function slugFromSegments(segments?: string[]): string {
  if (!segments || segments.length === 0) return '';
  return segments.join('/');
}

export function getAllDocSlugs(): string[] {
  const slugs: string[] = [];

  function walk(dir: string, prefix = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), relative);
      } else if (entry.name.endsWith('.md')) {
        const base = relative.replace(/\.md$/, '');
        slugs.push(normalizeSlug(base));
      }
    }
  }

  walk(DOCS_DIR);
  return slugs;
}

export function getDocBySlug(slug: string): Doc | null {
  const filePath = filePathFromSlug(slug);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: data.description as string | undefined,
    content,
  };
}

export function getAllDocs(): DocMeta[] {
  return getAllDocSlugs().map((slug) => {
    const doc = getDocBySlug(slug)!;
    return {
      slug,
      title: doc.title,
      description: doc.description,
    };
  });
}
