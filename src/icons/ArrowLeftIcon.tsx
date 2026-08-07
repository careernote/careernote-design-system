import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const ArrowLeftIcon: React.FC<BaseIconProps> = ({
  size = 20,
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={ariaLabel || 'Arrow left'}
    data-testid={testId}
  >
    <path
      d="M13 4.316L7 10L13 15.684"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

