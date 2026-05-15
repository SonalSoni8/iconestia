import { forwardRef } from 'react';
import type { ReactNode } from 'react';

import type { ThinIconProps } from './types';

interface IconBaseProps extends ThinIconProps {
  children: ReactNode;
}

export const IconBase = forwardRef<SVGSVGElement, IconBaseProps>(
  (
    {
      children,
      size = 24,
      width,
      height,
      strokeWidth = 1.75,
      color = 'currentColor',
      className,
      title,
      variant = 'outline',
      ...props
    },
    ref,
  ) => {
    const resolvedWidth = width ?? size;
    const resolvedHeight = height ?? size;
    const hasAccessibleLabel = Boolean(props['aria-label'] ?? title);

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        width={resolvedWidth}
        height={resolvedHeight}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        color={color}
        className={className}
        role={hasAccessibleLabel ? 'img' : 'presentation'}
        aria-hidden={hasAccessibleLabel ? undefined : true}
        data-variant={variant}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </svg>
    );
  },
);

IconBase.displayName = 'IconBase';
