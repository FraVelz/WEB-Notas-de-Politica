import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsShell } from '@/components/DocsShell';
import { Markdown } from '@/components/Markdown';
import {
  getAllDocSlugs,
  getAllDocs,
  getDocBySlug,
  slugFromSegments,
} from '@/lib/docs';
import { siteConfig } from '@/lib/navigation';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) =>
    slug ? { slug: slug.split('/') } : { slug: [] },
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: segments } = await params;
  const doc = getDocBySlug(slugFromSegments(segments));
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description ?? siteConfig.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug: segments } = await params;
  const doc = getDocBySlug(slugFromSegments(segments));

  if (!doc) notFound();

  const allDocs = getAllDocs();

  return (
    <DocsShell docs={allDocs}>
      <article>
        {doc.description && (
          <p className="page-description">{doc.description}</p>
        )}
        <Markdown content={doc.content} />
      </article>
    </DocsShell>
  );
}
