export const THINICONS_CDN_BASE = {
  unpkg: 'https://unpkg.com/@thinicons/core@latest/icons/optimized',
  jsdelivr: 'https://cdn.jsdelivr.net/npm/@thinicons/core@latest/icons/optimized',
  esm: 'https://esm.sh/@thinicons/react@latest',
} as const;

export const getCdnSvgUrl = (
  iconName: string,
  provider: keyof typeof THINICONS_CDN_BASE = 'jsdelivr',
): string => `${THINICONS_CDN_BASE[provider]}/${iconName}.svg`;
