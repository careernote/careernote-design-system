import React from 'react';
import { BaseIconProps } from '../display';

export const ExpandIcon: React.FC<BaseIconProps> = ({
  size = 20,
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    className={className}
    aria-label={ariaLabel || 'Expand'}
    data-testid={testId}
  >
    <path
      d="M11.6667 8.33333L17.5 2.5M17.5 2.5H12.5M17.5 2.5V7.5M8.33333 11.6667L2.5 17.5M2.5 17.5H7.5M2.5 17.5L2.5 12.5"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
