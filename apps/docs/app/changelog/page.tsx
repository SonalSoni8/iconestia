import type { Metadata } from 'next';

import { SiteFrame } from '../../components/site-frame';

const changelog = [
  {
    version: '0.1.0',
    date: '2026-05-15',
    notes: [
      'Initial monorepo release with @thinicons/core, @thinicons/react, and @thinicons/cli.',
      'SVGO + SVGR generation pipeline with strict icon-style validation.',
      'Docs playground with search, filters, favorites, dark mode, and copy actions.',
      'CDN-ready asset paths for unpkg/jsDelivr and ESM entrypoints for React usage.',
    ],
  },
] as const;

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Release notes and package evolution for Thinicons.',
};

export default function ChangelogPage() {
  return (
    <SiteFrame>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-ink-900 dark:text-ink-50">Changelog</h1>
        {changelog.map((entry) => (
          <article
            key={entry.version}
            className="rounded-2xl border border-ink-200/80 bg-white/85 p-6 shadow-glow backdrop-blur-xl dark:border-ink-800/70 dark:bg-ink-900/75"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">v{entry.version}</h2>
              <span className="rounded-full border border-ink-200 px-2 py-0.5 text-xs text-ink-500 dark:border-ink-700 dark:text-ink-300">
                {entry.date}
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
              {entry.notes.map((note) => (
                <li key={note}>- {note}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </SiteFrame>
  );
}
