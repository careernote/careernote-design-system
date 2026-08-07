import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const CheckIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Check'}
    data-testid={testId}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.6061 5.39393C20.9409 5.72867 20.9409 6.27138 20.6061 6.60612L9.60612 17.6061C9.27138 17.9409 8.72867 17.9409 8.39394 17.6061L3.39393 12.6061C3.0592 12.2714 3.0592 11.7287 3.39393 11.3939C3.72867 11.0592 4.27138 11.0592 4.60612 11.3939L9.00003 15.7878L19.3939 5.39393C19.7287 5.0592 20.2714 5.0592 20.6061 5.39393Z"
      fill={color}
    />
  </svg>
);
