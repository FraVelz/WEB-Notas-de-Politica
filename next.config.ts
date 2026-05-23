import type { NextConfig } from 'next';

/**
 * Export estático solo en `npm run build` (ver script en package.json).
 * En `next dev`, sin `output: 'export'`, las rutas desconocidas pueden
 * llamar a `notFound()` y mostrar la página 404 en lugar de un error de runtime.
 */
const nextConfig: NextConfig = {
  ...(process.env.NEXT_STATIC_EXPORT === '1'
    ? { output: 'export' as const }
    : {}),
};

export default nextConfig;
