import type { Metadata } from 'next';
import { JetBrains_Mono, Sora } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const themeScript = `(() => {
  try {
    const stored = localStorage.getItem('thinicons-theme');
    const shouldUseDark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    }
  } catch (_error) {
    // ignore theme boot failures
  }
})();`;

export const metadata: Metadata = {
  metadataBase: new URL('https://thinicons.dev'),
  title: {
    default: 'Thinicons',
    template: '%s | Thinicons',
  },
  description:
    'Developer-first icon ecosystem built for speed, consistency, and customization.',
  keywords: [
    'svg icons',
    'react icons',
    'typescript icons',
    'nextjs icons',
    'open source icon library',
  ],
  openGraph: {
    title: 'Thinicons',
    description:
      'Developer-first icon ecosystem built for speed, consistency, and customization.',
    type: 'website',
    url: 'https://thinicons.dev',
    siteName: 'Thinicons',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thinicons',
    description:
      'Developer-first icon ecosystem built for speed, consistency, and customization.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sora.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
