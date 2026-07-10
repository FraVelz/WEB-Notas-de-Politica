import Link from 'next/link';
import { LandingDestacados } from '@/features/inicio/components/LandingDestacados';
import { LandingEjes } from '@/features/inicio/components/LandingEjes';
import { LandingHero } from '@/features/inicio/components/LandingHero';
import { LandingStats } from '@/features/inicio/components/LandingStats';
import { siteConfig } from '@/lib/navigation';

export function InicioPage() {
  return (
    <>
      <LandingHero />

      <div className="flex flex-col gap-16 py-12 pb-20">
        <LandingStats />
        <LandingEjes />
        <LandingDestacados />

        <footer className="mx-auto w-full max-w-7xl border-t border-border px-4 pt-10 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
            <div className="min-w-0 max-w-2xl flex-1">
              <p className="m-0 text-sm font-semibold tracking-wide text-foreground uppercase">
                Prosperidad
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {siteConfig.description}
              </p>
            </div>
            <nav
              className="shrink-0"
              aria-label="Enlaces del sitio"
            >
              <p className="m-0 text-sm font-semibold text-foreground">Enlaces</p>
              <ul className="mt-3 flex flex-col gap-2.5 p-0 text-sm">
                <li className="list-none">
                  <Link
                    href="/inicio/bienvenida"
                    className="font-medium text-link no-underline hover:text-link-hover"
                  >
                    Texto de bienvenida
                  </Link>
                </li>
                <li className="list-none">
                  <a
                    href="#ejes"
                    className="font-medium text-link no-underline hover:text-link-hover"
                  >
                    Volver a los ejes
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
            <p className="m-0">
              <span className="text-foreground">{siteConfig.author}</span>
              {' · '}
              notas personales en construcción
            </p>
            <p className="m-0">{siteConfig.license}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
