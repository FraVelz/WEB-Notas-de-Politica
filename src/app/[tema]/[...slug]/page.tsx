import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsShell } from '@/components/DocsShell';
import { Markdown } from '@/components/Markdown';
import { getAllDocs, getDocByTemaSlug } from '@/lib/content/docs';
import { getFeatureNavigation } from '@/lib/temas/navigation';
import { getTemaById } from '@/lib/temas/registry';
import { siteConfig } from '@/lib/navigation';

type PageProps = {
  params: Promise<{ tema: string; slug: string[] }>;
};

export async function generateStaticParams() {
  const { getStaticPaths } = await import('@/lib/content/docs');
  const params: { tema: string; slug: string[] }[] = [];
  for (const { tema, slug } of getStaticPaths()) {
    if (slug.length > 0) params.push({ tema, slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tema, slug: segments } = await params;
  const slug = segments.join('/');
  const doc = getDocByTemaSlug(tema, slug);
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

export default async function TemaDocPage({ params }: PageProps) {
  const { tema, slug: segments } = await params;
  if (!getTemaById(tema)) notFound();

  const slug = segments.join('/');
  const doc = getDocByTemaSlug(tema, slug);
  if (!doc) notFound();

  const docs = getAllDocs();
  const navigation = await getFeatureNavigation(tema);

  return (
    <DocsShell docs={docs} navigation={navigation} temaId={tema}>
      <article className="article">
        {doc.description && (
          <p className="-mt-2 mb-6 text-lg text-muted-foreground">
            {doc.description}
          </p>
        )}
        <Markdown content={doc.content} />
      </article>
    </DocsShell>
  );
}
