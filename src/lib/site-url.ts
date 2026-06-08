const DEFAULT_SITE_URL = 'http://localhost:3000';

/** URL canónica del sitio (SEO, Open Graph, sitemap). */
export function getSiteUrl(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim();

  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;

  return DEFAULT_SITE_URL;
}
