import { notFound } from 'next/navigation';
import { TemaScope } from '@/components/TemaScope';
import { getTemaById } from '@/lib/temas/registry';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ tema: string }>;
};

export default async function TemaLayout({ children, params }: LayoutProps) {
  const { tema } = await params;
  if (!getTemaById(tema)) notFound();

  return <TemaScope temaId={tema}>{children}</TemaScope>;
}
