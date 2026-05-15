import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const CloseIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="m6 6 12 12m0-12L6 18" />
  </IconBase>
));

CloseIcon.displayName = 'CloseIcon';

export { CloseIcon };
