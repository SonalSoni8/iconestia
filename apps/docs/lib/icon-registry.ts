import type { IconName } from '@thinicons/core';
import { iconsMetadata } from '@thinicons/core';
import {
  ArrowRightIcon,
  BellIcon,
  CloseIcon,
  DashboardIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  WalletIcon,
} from '@thinicons/react';
import type { ThinIconProps } from '@thinicons/react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type IconComponent = ForwardRefExoticComponent<
  ThinIconProps & RefAttributes<SVGSVGElement>
>;

export const iconComponentMap = {
  'arrow-right': ArrowRightIcon,
  bell: BellIcon,
  close: CloseIcon,
  dashboard: DashboardIcon,
  home: HomeIcon,
  menu: MenuIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  user: UserIcon,
  wallet: WalletIcon,
} satisfies Record<IconName, IconComponent>;

export const iconCatalog = iconsMetadata.map((icon) => {
  const keywords = [...icon.tags, ...(icon.terms ?? []), icon.category, icon.title, icon.name];

  return {
    ...icon,
    keywords,
    searchText: keywords.join(' ').toLowerCase(),
  };
});

export const iconCategories = Array.from(new Set(iconCatalog.map((icon) => icon.category))).sort();

export type IconCatalogEntry = (typeof iconCatalog)[number];
