import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// URL base del sitio (cambiar al desplegar). Ej: https://notas-de-politica.vercel.app
const SITE_URL = process.env.SITE_URL || 'https://notas-de-politica.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    starlight({
      title: 'Notas de Política',
      description: 'Notas personales sobre política - ideas, estudios comparativos y análisis',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Español',
          lang: 'es',
        },
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      head: [
        // SEO básico
        { tag: 'meta', attrs: { name: 'keywords', content: 'política, notas personales, análisis político, Colombia, Latinoamérica, estudios comparativos, gobernanza, estadísticas' } },
        { tag: 'meta', attrs: { name: 'robots', content: 'index, follow' } },
        { tag: 'meta', attrs: { name: 'author', content: 'Fravelz' } },
        // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:title', content: 'Notas de Política' } },
        { tag: 'meta', attrs: { property: 'og:description', content: 'Notas personales sobre política. Ideas, estudios comparativos y análisis para comprender el mundo y sus posibles soluciones.' } },
        { tag: 'meta', attrs: { property: 'og:image', content: `${SITE_URL}/screenshot.png` } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1843' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '1074' } },
        { tag: 'meta', attrs: { property: 'og:url', content: SITE_URL } },
        { tag: 'meta', attrs: { property: 'og:locale', content: 'es_ES' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Notas de Política' } },
        // Twitter Card
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:title', content: 'Notas de Política' } },
        { tag: 'meta', attrs: { name: 'twitter:description', content: 'Notas personales sobre política. Ideas, estudios comparativos y análisis para comprender el mundo y sus posibles soluciones.' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE_URL}/screenshot.png` } },
      ],
      sidebar: [
        { label: 'Inicio', link: '/' },
        {
          label: 'General',
          items: [
            { slug: 'general' },
          ],
        },
        {
          label: 'Países',
          collapsed: false,
          items: [
            {
              label: 'Suramérica',
              items: [
                { slug: 'paises/suramerica/colombia' },
                { slug: 'paises/suramerica/ecuador' },
              ],
            },
            {
              label: 'Asia',
              items: [
                { slug: 'paises/asiaticos/china' },
                { slug: 'paises/asiaticos/corea-del-sur' },
              ],
            },
          ],
        },
        {
          label: 'Estadísticas',
          items: [
            { slug: 'estadistica/poblacion' },
          ],
        },
        {
          label: 'Proyectos',
          items: [
            { slug: 'proyectos/general' },
          ],
        },
      ],
    }),
  ],
});
