import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const HomeIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.25 9.75V21h13.5V9.75" />
  </IconBase>
));

HomeIcon.displayName = 'HomeIcon';

export { HomeIcon };
