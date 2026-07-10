import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LandingShell } from '@/components/LandingShell';
import { EjeCatalogPage } from '@/features/inicio/components/EjeCatalogPage';
import {
  getNavCategoryById,
  temaNavCategories,
} from '@/lib/temas/registry';

type PageProps = {
  params: Promise<{ eje: string }>;
};

export function generateStaticParams() {
  return temaNavCategories.map((c) => ({ eje: c.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { eje } = await params;
  const category = getNavCategoryById(eje);
  if (!category) return {};

  return {
    title: category.label,
    description: category.description,
    openGraph: {
      title: category.label,
      description: category.description,
    },
  };
}

export default async function EjePage({ params }: PageProps) {
  const { eje } = await params;
  const category = getNavCategoryById(eje);
  if (!category) notFound();

  return (
    <LandingShell>
      <EjeCatalogPage ejeId={category.id} />
    </LandingShell>
  );
}
