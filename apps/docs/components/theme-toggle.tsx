'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('thinicons-theme');
    const isDark = storedTheme
      ? storedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

    document.documentElement.classList.toggle('dark', isDark);
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      window.localStorage.setItem('thinicons-theme', nextTheme);
      return nextTheme;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-700 transition hover:border-ink-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-50 dark:hover:border-ink-400"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
