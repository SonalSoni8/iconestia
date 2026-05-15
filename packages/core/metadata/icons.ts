import type { IconDefinition } from '../src/types';

export const iconDefinitions = {
  home: {
    title: 'Home',
    category: 'navigation',
    tags: ['house', 'dashboard', 'main'],
    terms: ['landing', 'start'],
  },
  user: {
    title: 'User',
    category: 'users',
    tags: ['profile', 'account', 'person'],
    terms: ['member', 'identity'],
  },
  settings: {
    title: 'Settings',
    category: 'ui',
    tags: ['preferences', 'controls', 'gear'],
    terms: ['configuration'],
  },
  search: {
    title: 'Search',
    category: 'ui',
    tags: ['find', 'query', 'magnify'],
    terms: ['lookup'],
  },
  bell: {
    title: 'Bell',
    category: 'communication',
    tags: ['notification', 'alert', 'reminder'],
    terms: ['announce'],
  },
  wallet: {
    title: 'Wallet',
    category: 'finance',
    tags: ['money', 'payment', 'billing'],
    terms: ['funds'],
  },
  dashboard: {
    title: 'Dashboard',
    category: 'analytics',
    tags: ['grid', 'overview', 'metrics'],
    terms: ['panel'],
  },
  menu: {
    title: 'Menu',
    category: 'navigation',
    tags: ['hamburger', 'list', 'toggle'],
    terms: ['nav'],
  },
  close: {
    title: 'Close',
    category: 'actions',
    tags: ['dismiss', 'cancel', 'x'],
    terms: ['remove'],
  },
  'arrow-right': {
    title: 'Arrow Right',
    category: 'arrows',
    tags: ['next', 'forward', 'direction'],
    terms: ['continue'],
  },
} satisfies Record<string, IconDefinition>;
