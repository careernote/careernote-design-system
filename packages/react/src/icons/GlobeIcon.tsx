import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const GlobeIcon: React.FC<BaseIconProps> = ({
  size = 20,
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={ariaLabel || 'Globe'}
    data-testid={testId}
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
    <path
      d="M2 12H22"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="4"
      ry="10"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);
