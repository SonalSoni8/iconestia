import type { Metadata } from 'next';

import { SiteFrame } from '../../components/site-frame';

const propsRows = [
  ['size', 'number | string', '24', 'Sets both width and height when explicit width/height are not provided.'],
  ['width', 'number | string', 'size', 'Explicit width override.'],
  ['height', 'number | string', 'size', 'Explicit height override.'],
  ['color', 'string', 'currentColor', 'Stroke color for outline icons.'],
  ['strokeWidth', 'number', '1.75', 'Line thickness for stroke-based icons.'],
  ['className', 'string', '-', 'Attach utility classes (Tailwind, CSS Modules, etc).'],
  ['variant', 'outline | solid | soft | duotone', 'outline', 'Variant-ready API for current and future styles.'],
] as const;

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Install, use, and customize Thinicons across React apps and design systems.',
};

export default function DocsPage() {
  return (
    <SiteFrame>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-2xl border border-ink-200/80 bg-white/85 p-6 shadow-glow backdrop-blur-xl dark:border-ink-600 dark:bg-ink-900">
          <h1 className="text-2xl font-semibold text-ink-900 dark:text-ink-50">Getting Started</h1>
          <pre className="mt-4 rounded-xl border border-ink-200 bg-ink-50 p-4 text-xs text-ink-900 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100">
            <code>pnpm add @thinicons/react</code>
          </pre>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-ink-50 p-4 text-xs text-ink-900 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100">
            <code>{`import { HomeIcon } from '@thinicons/react';\n\nexport function HeaderHome() {\n  return <HomeIcon size={24} strokeWidth={1.75} variant="outline" />;\n}`}</code>
          </pre>

          <h2 className="mt-6 text-lg font-semibold text-ink-900 dark:text-ink-50">CDN</h2>
          <pre className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-ink-50 p-4 text-xs text-ink-900 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100">
            <code>{`https://cdn.jsdelivr.net/npm/@thinicons/core@latest/icons/optimized/home.svg\nhttps://unpkg.com/@thinicons/core@latest/icons/optimized/home.svg\nhttps://esm.sh/@thinicons/react@latest`}</code>
          </pre>
        </article>

        <article className="rounded-2xl border border-ink-200/80 bg-white/85 p-6 shadow-glow backdrop-blur-xl dark:border-ink-700 dark:bg-ink-900">
          <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">React Props</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-xs uppercase tracking-[0.14em] text-ink-500 dark:border-ink-700 dark:text-ink-200">
                  <th className="pb-2 pr-3">Prop</th>
                  <th className="pb-2 pr-3">Type</th>
                  <th className="pb-2 pr-3">Default</th>
                  <th className="pb-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {propsRows.map((row) => (
                  <tr key={row[0]} className="border-b border-ink-100 align-top dark:border-ink-800">
                    <td className="py-2 pr-3 font-mono text-ink-800 dark:text-ink-100">{row[0]}</td>
                    <td className="py-2 pr-3 text-ink-600 dark:text-ink-200">{row[1]}</td>
                    <td className="py-2 pr-3 text-ink-600 dark:text-ink-200">{row[2]}</td>
                    <td className="py-2 text-ink-600 dark:text-ink-200">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </SiteFrame>
  );
}
