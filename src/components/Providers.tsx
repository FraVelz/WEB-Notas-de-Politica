'use client';

import { ThemeProvider } from 'next-themes';
import { ReadingTracker } from '@/components/ReadingTracker';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <ReadingTracker />
      {children}
    </ThemeProvider>
  );
}
