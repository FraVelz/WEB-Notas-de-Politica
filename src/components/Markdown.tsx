import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

/**
 * El chrome del artículo ya aporta el h1 (título del frontmatter).
 * Remapeamos h1→h2 en el cuerpo MD para no saltar/duplicar jerarquía.
 */
const components: Components = {
  h1: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 text-lg font-semibold text-foreground">{children}</h3>
  ),
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>;
    const isInternal = href.startsWith('/') && !href.startsWith('//');
    if (isInternal) {
      return <Link href={href}>{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
