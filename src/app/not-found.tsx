import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="main" style={{ margin: '2rem auto', maxWidth: '40rem' }}>
      <h1>Página no encontrada</h1>
      <p>
        <Link href="/">Volver al inicio</Link>
      </p>
    </main>
  );
}
