import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const UserIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx={12} cy={8} r={4} />
    <path d="M4 20q2.4-5 8-5c5.6 0 6.4 1.667 8 5" />
  </IconBase>
));

UserIcon.displayName = 'UserIcon';

export { UserIcon };
