import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const SearchIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx={11} cy={11} r={6} />
    <path d="m20 20-4.2-4.2" />
  </IconBase>
));

SearchIcon.displayName = 'SearchIcon';

export { SearchIcon };
