import { getTemaSkin } from '@/lib/temas/skins';

export function TemaScope({
  temaId,
  children,
}: {
  temaId: string;
  children: React.ReactNode;
}) {
  const skin = getTemaSkin(temaId);

  return (
    <div
      data-tema={temaId}
      data-tema-skin={skin.id}
      className="tema-scope flex min-h-screen flex-col bg-background text-foreground"
      style={{ fontFamily: 'var(--font-tema, inherit)' }}
    >
      <style>{skin.css}</style>
      {children}
    </div>
  );
}
