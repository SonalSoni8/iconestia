import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const WalletIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect width={18} height={12} x={3} y={6} rx={2.5} />
    <path d="M15.5 12h3" />
  </IconBase>
));

WalletIcon.displayName = 'WalletIcon';

export { WalletIcon };
