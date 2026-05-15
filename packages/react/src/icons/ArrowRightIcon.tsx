import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const ArrowRightIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </IconBase>
));

ArrowRightIcon.displayName = 'ArrowRightIcon';

export { ArrowRightIcon };
