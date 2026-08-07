import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const MenuIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Menu'}
    data-testid={testId}
  >
    <path d="M2.5 10H17.5" stroke={color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 5H17.5" stroke={color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 15H17.5" stroke={color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
