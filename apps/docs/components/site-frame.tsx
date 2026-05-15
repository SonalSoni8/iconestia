import Link from 'next/link';
import type { ReactNode } from 'react';

import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';

interface SiteFrameProps {
  children: ReactNode;
}

export function SiteFrame({ children }: SiteFrameProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-noise opacity-45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] bg-gradient-to-b from-cyan-200/40 via-transparent to-transparent dark:from-cyan-900/25" />

      <header className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-200/80 bg-white/85 px-5 py-4 shadow-glow backdrop-blur-xl dark:border-ink-800/80 dark:bg-ink-900/75">
          <div className="space-y-1">
            <Link href="/" className="text-lg font-semibold text-ink-900 dark:text-ink-50">
              Thinicons
            </Link>
            <p className="text-xs text-ink-500 dark:text-ink-300">
              Developer-first icon ecosystem built for speed, consistency, and customization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <MainNav />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-8">{children}</main>

      <footer className="border-t border-ink-200/80 bg-white/75 py-8 backdrop-blur dark:border-ink-800 dark:bg-ink-950/80">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-8">
          <p className="text-sm text-ink-600 dark:text-ink-300">Thinicons. Open icon tooling for modern frontend teams.</p>
          <p className="text-xs text-ink-600 dark:text-ink-300">MIT Licensed - npm - unpkg - jsDelivr</p>
        </div>
      </footer>
    </div>
  );
}
