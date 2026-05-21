import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-6 py-12">
      <h1 className="text-2xl font-semibold text-foreground">
        Página no encontrada
      </h1>
      <p className="mt-4">
        <Link href="/" className="text-link hover:text-link-hover">
          Volver al inicio
        </Link>
      </p>
    </main>
  );
}
