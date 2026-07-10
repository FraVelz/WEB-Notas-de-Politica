import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsShell } from '@/components/DocsShell';
import { getAllDocs } from '@/lib/content/docs';
import { resolveTemaHub } from '@/lib/temas/hubs';
import { getFeatureNavigation } from '@/lib/temas/navigation';
import { getTemaById } from '@/lib/temas/registry';
import { siteConfig } from '@/lib/navigation';

type PageProps = {
  params: Promise<{ tema: string }>;
};

export async function generateStaticParams() {
  const { temas } = await import('@/lib/temas/registry');
  return temas.map((t) => ({ tema: t.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tema } = await params;
  const meta = getTemaById(tema);
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description ?? siteConfig.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function TemaHubPage({ params }: PageProps) {
  const { tema } = await params;
  const meta = getTemaById(tema);
  if (!meta) notFound();

  const Hub = await resolveTemaHub(tema);
  const docs = getAllDocs();
  const navigation = await getFeatureNavigation(tema);
  const { getFeatureNavIcons } = await import('@/lib/temas/navigation');
  const navIcons = await getFeatureNavIcons(tema);

  return (
    <DocsShell
      docs={docs}
      navigation={navigation}
      temaId={tema}
      navIcons={navIcons}
    >
      <Hub temaId={tema} />
    </DocsShell>
  );
}
