export const iconCategories = [
  'navigation',
  'actions',
  'communication',
  'files',
  'finance',
  'commerce',
  'analytics',
  'users',
  'arrows',
  'media',
  'development',
  'ui',
  'weather',
  'security',
  'devices',
  'brands',
] as const;

export type IconCategory = (typeof iconCategories)[number];

export interface IconDefinition {
  title: string;
  category: IconCategory;
  tags: string[];
  terms?: string[];
}

export interface IconMetadata extends IconDefinition {
  name: string;
  componentName: string;
  rawPath: string;
  optimizedPath: string;
  svg: string;
}

export interface IconManifest {
  packageName: '@thinicons/core';
  generatedAt: string;
  total: number;
  categories: Partial<Record<IconCategory, number>>;
  icons: ReadonlyArray<IconMetadata>;
}
