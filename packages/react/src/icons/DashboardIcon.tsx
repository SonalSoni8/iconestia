import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const DashboardIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect width={7} height={7} x={4} y={4} rx={1.75} />
    <rect width={7} height={5} x={13} y={4} rx={1.75} />
    <rect width={7} height={9} x={13} y={11} rx={1.75} />
    <rect width={7} height={7} x={4} y={13} rx={1.75} />
  </IconBase>
));

DashboardIcon.displayName = 'DashboardIcon';

export { DashboardIcon };
