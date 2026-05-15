import type { Metadata } from 'next';

import { SiteFrame } from '../../components/site-frame';

const guides = [
  {
    title: 'Adding a New Icon',
    steps: [
      'Create a 24x24 SVG in packages/core/icons/raw using the Thinicons stroke rules.',
      'Add metadata entry in packages/core/metadata/icons.ts with title, category, tags, and terms.',
      'Run pnpm --filter @thinicons/core generate and pnpm --filter @thinicons/react generate.',
      'Validate in docs explorer, then run lint/typecheck/build before publishing.',
    ],
  },
  {
    title: 'Publishing to npm',
    steps: [
      'Add a changeset describing package changes.',
      'Run pnpm build and pnpm typecheck in the workspace root.',
      'Run pnpm release to version, build, and publish public packages.',
      'Verify package exports with npm + jsDelivr/unpkg smoke checks.',
    ],
  },
  {
    title: 'Using in Design Systems',
    steps: [
      'Wrap Thinicons with your own semantic primitives (IconButton, StatusIcon, NavIcon).',
      'Use variant + className for theme-level control while keeping icon geometry intact.',
      'Prefer named imports to keep tree shaking effective in large applications.',
      'Document allowed size/stroke presets in your internal DS guidelines.',
    ],
  },
] as const;

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Implementation guides for maintaining and scaling Thinicons in production teams.',
};

export default function GuidesPage() {
  return (
    <SiteFrame>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-ink-900 dark:text-ink-50">Guides</h1>
        {guides.map((guide) => (
          <article
            key={guide.title}
            className="rounded-2xl border border-ink-200/80 bg-white/85 p-6 shadow-glow backdrop-blur-xl dark:border-ink-800/70 dark:bg-ink-900/75"
          >
            <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{guide.title}</h2>
            <ol className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
              {guide.steps.map((step, index) => (
                <li key={step}>
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-ink-200 text-xs dark:border-ink-700">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </section>
    </SiteFrame>
  );
}
