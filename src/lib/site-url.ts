const DEFAULT_SITE_URL = 'http://localhost:3000';

function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, '');
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}

/** URL canónica del sitio (SEO, Open Graph, sitemap). */
export function getSiteUrl(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim();

  if (explicit) return normalizeSiteUrl(explicit);

  // Dominio de producción del proyecto (p. ej. prosperity-six.vercel.app).
  // VERCEL_URL apunta al despliegue concreto y suele estar protegido (401) en previews.
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return normalizeSiteUrl(production);

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return normalizeSiteUrl(vercel);

  return DEFAULT_SITE_URL;
}
