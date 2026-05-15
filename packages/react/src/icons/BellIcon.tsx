import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const BellIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M18 8A6 6 0 1 0 6 8c0 6-2.5 7.5-2.5 7.5h17S18 14 18 8m-8 10h4m-3 3h2" />
  </IconBase>
));

BellIcon.displayName = 'BellIcon';

export { BellIcon };
