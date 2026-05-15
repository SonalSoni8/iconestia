import { forwardRef } from 'react';
import { IconBase } from '../icon-base';
import type { ThinIconProps } from '../types';

const MenuIcon = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </IconBase>
));

MenuIcon.displayName = 'MenuIcon';

export { MenuIcon };
