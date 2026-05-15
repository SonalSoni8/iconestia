import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const SettingsIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx={12} cy={12} r={3} />
    <path d="M19.4 15a8 8 0 0 0 .05-.9 8 8 0 0 0-.05-.9l2-1.55-2-3.46-2.4.9a7.8 7.8 0 0 0-1.56-.9L14.95 4h-4l-.49 2.19a7.8 7.8 0 0 0-1.56.9l-2.4-.9-2 3.46 2 1.55a8 8 0 0 0-.05.9 8 8 0 0 0 .05.9l-2 1.55 2 3.46 2.4-.9a7.8 7.8 0 0 0 1.56.9l.49 2.19h4l.49-2.19a7.8 7.8 0 0 0 1.56-.9l2.4.9 2-3.46-2-1.55Z" />
  </IconBase>
));

SettingsIcon.displayName = 'SettingsIcon';

export { SettingsIcon };
