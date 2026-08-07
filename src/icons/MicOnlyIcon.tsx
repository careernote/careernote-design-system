import React from 'react';
import { BaseIconProps } from '../display';

export const MicOnlyIcon: React.FC<BaseIconProps> = ({
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
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-label={ariaLabel || 'Mic only'}
    data-testid={testId}
  >
    <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" stroke={color} strokeWidth={1.5} />
    <path d="M19 11a7 7 0 0 1-14 0M12 18v3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);
