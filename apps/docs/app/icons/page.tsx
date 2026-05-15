import type { Metadata } from 'next';

import { IconExplorer } from '../../components/icon-explorer';
import { SiteFrame } from '../../components/site-frame';

export const metadata: Metadata = {
  title: 'Icons',
  description: 'Search, preview, and copy Thinicons assets for React, SVG, and CDN usage.',
};

export default function IconsPage() {
  return (
    <SiteFrame>
      <IconExplorer />
    </SiteFrame>
  );
}
