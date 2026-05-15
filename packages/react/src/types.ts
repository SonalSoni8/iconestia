import type { SVGProps } from 'react';

export type ThinIconVariant = 'outline' | 'solid' | 'soft' | 'duotone';

export interface ThinIconProps
  extends Omit<SVGProps<SVGSVGElement>, 'color' | 'width' | 'height'> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  title?: string;
  variant?: ThinIconVariant;
}
