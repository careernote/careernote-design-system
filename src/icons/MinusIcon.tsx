import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const MinusIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Minus'}
    data-testid={testId}
  >
    <path d="M4.16667 10H15.8333" stroke={color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
