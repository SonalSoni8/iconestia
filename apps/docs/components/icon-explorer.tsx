'use client';

import type { IconName } from '@thinicons/core';
import { useEffect, useMemo, useRef, useState } from 'react';

import { copyText } from '../lib/copy';
import { getCdnSvgUrl } from '../lib/cdn';
import { iconCatalog, iconCategories, iconComponentMap } from '../lib/icon-registry';

const FIRST_ICON_NAME = (iconCatalog[0]?.name ?? 'home') as IconName;

type CopyTarget = 'jsx' | 'svg' | 'import' | 'cdn';
type Variant = 'outline' | 'solid' | 'soft' | 'duotone';

const FAVORITES_KEY = 'thinicons-favorites';

export function IconExplorer() {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [selectedName, setSelectedName] = useState<IconName>(FIRST_ICON_NAME);
  const [size, setSize] = useState<number>(24);
  const [strokeWidth, setStrokeWidth] = useState<number>(1.75);
  const [color, setColor] = useState<string>('currentColor');
  const [variant, setVariant] = useState<Variant>('outline');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<CopyTarget | null>(null);

  useEffect(() => {
    const storedFavorites = window.localStorage.getItem(FAVORITES_KEY);
    if (!storedFavorites) {
      return;
    }

    try {
      const parsed = JSON.parse(storedFavorites) as string[];
      setFavorites(parsed.filter(Boolean));
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if (event.key === '/' && !isTypingTarget) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === 'Escape' && isTypingTarget) {
        setQuery('');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const filteredIcons = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const base = iconCatalog.filter((icon) => {
      const categoryMatch = category === 'all' || icon.category === category;
      const textMatch = !normalized || icon.searchText.includes(normalized);
      return categoryMatch && textMatch;
    });

    return [...base].sort((a, b) => {
      const aFav = favoritesSet.has(a.name) ? 1 : 0;
      const bFav = favoritesSet.has(b.name) ? 1 : 0;
      if (aFav !== bFav) {
        return bFav - aFav;
      }
      return a.title.localeCompare(b.title);
    });
  }, [category, favoritesSet, query]);

  useEffect(() => {
    if (!filteredIcons.some((icon) => icon.name === selectedName)) {
      const fallback = filteredIcons[0];
      if (fallback) {
        setSelectedName(fallback.name as IconName);
      }
    }
  }, [filteredIcons, selectedName]);

  const selectedIcon =
    filteredIcons.find((icon) => icon.name === selectedName) ??
    iconCatalog.find((icon) => icon.name === selectedName) ??
    iconCatalog[0];

  const SelectedIcon = selectedIcon ? iconComponentMap[selectedIcon.name as IconName] : null;

  const importSnippet = selectedIcon
    ? `import { ${selectedIcon.componentName} } from '@thinicons/react';`
    : '';

  const jsxSnippet = selectedIcon
    ? `<${selectedIcon.componentName}\n  size={${size}}\n  strokeWidth={${strokeWidth}}\n  variant="${variant}"\n  className="text-black"\n/>`
    : '';

  const cdnSnippet = selectedIcon ? getCdnSvgUrl(selectedIcon.name, 'jsdelivr') : '';

  const copy = async (target: CopyTarget, payload: string) => {
    try {
      await copyText(payload);
      setCopied(target);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  const toggleFavorite = (name: string) => {
    setFavorites((current) => {
      if (current.includes(name)) {
        return current.filter((entry) => entry !== name);
      }
      return [...current, name];
    });
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <article className="rounded-2xl border border-ink-200/80 bg-white/85 p-5 shadow-glow backdrop-blur-xl dark:border-ink-700 dark:bg-ink-900">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-ink-900 dark:text-ink-50">Icon Explorer</h1>
            <p className="text-xs text-ink-500 dark:text-ink-300">
              Search by name, tags, category, and semantic terms. Press <kbd>/</kbd> to focus search.
            </p>
          </div>
          <span className="rounded-full border border-ink-200 px-2.5 py-1 text-xs text-ink-500 dark:border-ink-600 dark:text-ink-200">
            {filteredIcons.length} results
          </span>
        </div>

        <div className="space-y-3">
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search: house, money, profile, notifications"
            className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm text-ink-700 outline-none ring-cyan-400 transition placeholder:text-ink-400 focus:ring-2 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-50 dark:placeholder:text-ink-300"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory('all')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400/70 ${
                category === 'all'
                  ? 'bg-ink-900 text-white dark:bg-cyan-300 dark:text-ink-950'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-100 dark:hover:bg-ink-700'
              }`}
            >
              All
            </button>
            {iconCategories.map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => setCategory(entry)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400/70 ${
                  category === entry
                    ? 'bg-ink-900 text-white dark:bg-cyan-300 dark:text-ink-950'
                    : 'bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-100 dark:hover:bg-ink-700'
                }`}
              >
                {entry}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {filteredIcons.map((icon) => {
            const Icon = iconComponentMap[icon.name as IconName];
            const isActive = selectedIcon?.name === icon.name;
            const isFavorite = favoritesSet.has(icon.name);

            return (
              <button
                key={icon.name}
                type="button"
                onClick={() => setSelectedName(icon.name as IconName)}
                className={`group relative rounded-xl border p-3 text-left text-ink-800 transition focus:outline-none focus:ring-2 focus:ring-cyan-400/70 dark:text-ink-100 ${
                  isActive
                    ? 'border-cyan-500 bg-cyan-50 dark:border-cyan-400 dark:bg-cyan-500/10'
                    : 'border-ink-200 bg-white hover:border-ink-400 dark:border-ink-600 dark:bg-ink-800 dark:hover:border-ink-400'
                }`}
              >
                <span className="mb-2 inline-flex">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <p className="truncate text-sm font-medium text-ink-800 dark:text-ink-100">{icon.title}</p>
                <p className="truncate text-[11px] text-ink-500 dark:text-ink-400">{icon.name}</p>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleFavorite(icon.name);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleFavorite(icon.name);
                    }
                  }}
                  className={`absolute right-2 top-2 rounded-md px-1 text-xs ${
                    isFavorite
                      ? 'text-amber-500'
                      : 'text-ink-400 group-hover:text-ink-700 dark:text-ink-500 dark:group-hover:text-ink-200'
                  }`}
                >
                  *
                </span>
              </button>
            );
          })}
        </div>
      </article>

      <article className="rounded-2xl border border-ink-200/80 bg-white/85 p-5 shadow-glow backdrop-blur-xl dark:border-ink-700 dark:bg-ink-900">
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-ink-500 dark:text-ink-300">
          Playground
        </h2>

        {selectedIcon && SelectedIcon ? (
          <>
            <div className="mt-4 rounded-2xl border border-dashed border-ink-300/80 bg-white p-8 dark:border-ink-600 dark:bg-ink-800">
              <SelectedIcon
                size={size}
                strokeWidth={strokeWidth}
                color={color}
                variant={variant}
                aria-label={selectedIcon.title}
              />
              <p className="mt-4 text-sm font-medium text-ink-800 dark:text-ink-100">{selectedIcon.title}</p>
              <p className="text-xs text-ink-500 dark:text-ink-300">{selectedIcon.componentName}</p>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-xs font-medium uppercase tracking-[0.15em] text-ink-500 dark:text-ink-300">
                Size: {size}px
                <input
                  type="range"
                  min={16}
                  max={96}
                  step={1}
                  value={size}
                  onChange={(event) => setSize(event.currentTarget.valueAsNumber)}
                  className="mt-1 w-full accent-cyan-500 dark:accent-cyan-300"
                />
              </label>

              <label className="block text-xs font-medium uppercase tracking-[0.15em] text-ink-500 dark:text-ink-300">
                Stroke Width: {strokeWidth.toFixed(2)}
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.25}
                  value={strokeWidth}
                  onChange={(event) => setStrokeWidth(event.currentTarget.valueAsNumber)}
                  className="mt-1 w-full accent-cyan-500 dark:accent-cyan-300"
                />
              </label>

              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-ink-500 dark:text-ink-300">
                  Color
                  <input
                    type="text"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-50"
                  />
                </label>

                <label className="text-xs font-medium uppercase tracking-[0.15em] text-ink-500 dark:text-ink-300">
                  Variant
                  <select
                    value={variant}
                    onChange={(event) => setVariant(event.target.value as Variant)}
                    className="mt-1 w-full rounded-lg border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-50"
                  >
                    <option value="outline">outline</option>
                    <option value="solid">solid</option>
                    <option value="soft">soft</option>
                    <option value="duotone">duotone</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => copy('jsx', jsxSnippet)}
                className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition hover:border-ink-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100 dark:hover:border-ink-400"
              >
                {copied === 'jsx' ? 'Copied JSX' : 'Copy JSX'}
              </button>
              <button
                type="button"
                onClick={() => copy('svg', selectedIcon.svg)}
                className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition hover:border-ink-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100 dark:hover:border-ink-400"
              >
                {copied === 'svg' ? 'Copied SVG' : 'Copy SVG'}
              </button>
              <button
                type="button"
                onClick={() => copy('import', importSnippet)}
                className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition hover:border-ink-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100 dark:hover:border-ink-400"
              >
                {copied === 'import' ? 'Copied Import' : 'Copy Import'}
              </button>
              <button
                type="button"
                onClick={() => copy('cdn', cdnSnippet)}
                className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition hover:border-ink-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100 dark:hover:border-ink-400"
              >
                {copied === 'cdn' ? 'Copied CDN' : 'Copy CDN Link'}
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <pre className="overflow-x-auto rounded-xl border border-ink-200 bg-ink-50 p-3 text-xs text-ink-900 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100">
                <code>{importSnippet}</code>
              </pre>
              <pre className="overflow-x-auto rounded-xl border border-ink-200 bg-ink-50 p-3 text-xs text-ink-900 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100">
                <code>{jsxSnippet}</code>
              </pre>
              <pre className="overflow-x-auto rounded-xl border border-ink-200 bg-ink-50 p-3 text-xs text-ink-900 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100">
                <code>{cdnSnippet}</code>
              </pre>
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm text-ink-500 dark:text-ink-300">No icon selected.</p>
        )}
      </article>
    </section>
  );
}
