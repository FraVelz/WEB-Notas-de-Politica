import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocArticleChrome } from '@/components/DocArticleChrome';
import { DocsShell } from '@/components/DocsShell';
import { Markdown } from '@/components/Markdown';
import { getAllDocs, getDocByTemaSlug, getDocsByTema } from '@/lib/content/docs';
import { getFeatureNavigation } from '@/lib/temas/navigation';
import { getTemaById } from '@/lib/temas/registry';
import {
  getTsxPageMeta,
  getTsxStaticPaths,
  resolveTemaTsxPage,
} from '@/lib/temas/tsx-pages';
import { siteConfig } from '@/lib/navigation';

type PageProps = {
  params: Promise<{ tema: string; slug: string[] }>;
};

export async function generateStaticParams() {
  const { getStaticPaths } = await import('@/lib/content/docs');
  const params: { tema: string; slug: string[] }[] = [];
  const seen = new Set<string>();

  for (const { tema, slug } of getStaticPaths()) {
    if (slug.length > 0) {
      const key = `${tema}/${slug.join('/')}`;
      seen.add(key);
      params.push({ tema, slug });
    }
  }

  for (const { tema, slug } of getTsxStaticPaths()) {
    const key = `${tema}/${slug.join('/')}`;
    if (!seen.has(key)) params.push({ tema, slug });
  }

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tema, slug: segments } = await params;
  const slug = segments.join('/');
  const tsxMeta = getTsxPageMeta(tema, slug);
  if (tsxMeta) {
    return {
      title: tsxMeta.title,
      description: tsxMeta.description ?? siteConfig.description,
      openGraph: {
        title: tsxMeta.title,
        description: tsxMeta.description,
      },
    };
  }

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
  const TsxPage = await resolveTemaTsxPage(tema, slug);

  const docs = getAllDocs();
  const navigation = await getFeatureNavigation(tema);
  const { getFeatureNavIcons } = await import('@/lib/temas/navigation');
  const navIcons = await getFeatureNavIcons(tema);

  if (TsxPage) {
    return (
      <DocsShell
        docs={docs}
        navigation={navigation}
        temaId={tema}
        navIcons={navIcons}
      >
        <TsxPage />
      </DocsShell>
    );
  }

  const doc = getDocByTemaSlug(tema, slug);
  if (!doc) notFound();

  const siblings = getDocsByTema(tema).filter((d) => d.slug !== '');

  return (
    <DocsShell
      docs={docs}
      navigation={navigation}
      temaId={tema}
      navIcons={navIcons}
    >
      <DocArticleChrome
        temaId={tema}
        title={doc.title}
        description={doc.description}
        siblings={siblings}
      >
        <Markdown content={doc.content} />
      </DocArticleChrome>
    </DocsShell>
  );
}
