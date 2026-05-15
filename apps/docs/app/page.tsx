import Link from 'next/link';

import { iconCategories, iconManifest } from '@thinicons/core';
import { ArrowRightIcon, HomeIcon, SearchIcon, SettingsIcon, WalletIcon } from '@thinicons/react';

import { SiteFrame } from '../components/site-frame';

const features = [
  {
    title: 'Consistency First',
    text: 'Every icon follows one geometry system: 24x24 grid, 1.75 stroke, and rounded joins.',
  },
  {
    title: 'Built for Developers',
    text: 'Typed React components, tree-shakeable exports, and predictable naming conventions.',
  },
  {
    title: 'Customizable by Default',
    text: 'Tune size, stroke, color, className, and variant without touching raw SVG files.',
  },
  {
    title: 'Fast Pipeline',
    text: 'SVGO + SVGR + tsup pipeline keeps package output clean and small.',
  },
] as const;

const usageExample = `import { HomeIcon } from '@thinicons/react';\n\n<HomeIcon\n  size={24}\n  strokeWidth={1.75}\n  variant="outline"\n  className="text-black"\n/>;`;

export default function HomePage() {
  return (
    <SiteFrame>
      <section className="rounded-3xl border border-ink-200/80 bg-white/85 p-7 shadow-glow backdrop-blur-xl dark:border-ink-700 dark:bg-ink-900">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300">
          THINICONS
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold leading-tight text-ink-950 dark:text-white sm:text-5xl">
          Developer-first icon ecosystem built for speed, consistency, and customization.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-ink-600 dark:text-ink-300">
          Thinicons gives React and TypeScript teams a clean icon workflow: fast installs, consistent visuals,
          and easy customization.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/icons"
            className="inline-flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-700 dark:bg-cyan-300 dark:text-ink-950"
          >
            Explore Icons
            <ArrowRightIcon size={16} />
          </Link>
          <Link
            href="/docs"
            className="rounded-xl border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-ink-400 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-50 dark:hover:border-ink-500"
          >
            Read Docs
          </Link>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-5">
          {[HomeIcon, SearchIcon, WalletIcon, SettingsIcon, ArrowRightIcon].map((Icon, index) => (
            <div
              key={index}
              className="rounded-xl border border-ink-200 bg-white p-4 text-ink-800 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100"
            >
              <Icon size={22} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-ink-200/80 bg-white/85 p-5 shadow-glow backdrop-blur-xl dark:border-ink-700 dark:bg-ink-900"
          >
            <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{feature.title}</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-2xl border border-ink-200/80 bg-white/85 p-5 shadow-glow backdrop-blur-xl dark:border-ink-600 dark:bg-ink-900">
          <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">Installation</h2>
          <pre className="mt-3 rounded-xl border border-ink-200 bg-ink-50 p-3 text-xs text-ink-900 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100">
            <code>pnpm add @thinicons/react</code>
          </pre>
          <pre className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-ink-50 p-3 text-xs text-ink-900 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100">
            <code>{usageExample}</code>
          </pre>
        </article>

        <article className="rounded-2xl border border-ink-200/80 bg-white/85 p-5 shadow-glow backdrop-blur-xl dark:border-ink-700 dark:bg-ink-900">
          <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">Categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {iconCategories.map((category) => (
              <span
                key={category}
                className="rounded-lg border border-ink-200 bg-white px-2.5 py-1 text-xs text-ink-600 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100"
              >
                {category}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl border border-ink-200 bg-white/80 p-4 dark:border-ink-700 dark:bg-ink-900">
          <p className="text-xs uppercase tracking-[0.15em] text-ink-500 dark:text-ink-300">Icons Available</p>
          <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-ink-50">{iconManifest.total}</p>
        </article>
        <article className="rounded-xl border border-ink-200 bg-white/80 p-4 dark:border-ink-700 dark:bg-ink-900">
          <p className="text-xs uppercase tracking-[0.15em] text-ink-500 dark:text-ink-300">Package Targets</p>
          <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-ink-50">npm + CDN</p>
        </article>
        <article className="rounded-xl border border-ink-200 bg-white/80 p-4 dark:border-ink-700 dark:bg-ink-900">
          <p className="text-xs uppercase tracking-[0.15em] text-ink-500 dark:text-ink-300">Style Contract</p>
          <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-ink-50">24 / 1.75</p>
        </article>
      </section>
    </SiteFrame>
  );
}
