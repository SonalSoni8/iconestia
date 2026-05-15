'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/icons', label: 'Icons' },
  { href: '/docs', label: 'Docs' },
  { href: '/guides', label: 'Guides' },
  { href: '/changelog', label: 'Changelog' },
] as const;

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-2">
      {navLinks.map((link) => {
        const active =
          pathname === link.href ||
          (link.href !== '/' && pathname.startsWith(`${link.href}/`));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-xl px-3 py-1.5 text-sm font-medium transition ${
              active
                ? 'bg-ink-900 text-white dark:bg-cyan-300 dark:text-ink-950'
                : 'text-ink-700 hover:bg-ink-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 dark:text-ink-100 dark:hover:bg-ink-800'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
