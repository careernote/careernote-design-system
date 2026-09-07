import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const ArrowDownIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Arrow down'}
    data-testid={testId}
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
