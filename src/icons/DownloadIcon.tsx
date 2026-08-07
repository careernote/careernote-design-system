import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const DownloadIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Download'}
    data-testid={testId}
  >
    <path
      d="M10 1.82C10.37 1.82 10.68 2.13 10.68 2.5V12.53L14.52 8.69C14.79 8.42 15.21 8.42 15.48 8.69C15.75 8.95 15.75 9.38 15.48 9.65L10.48 14.65C10.21 14.91 9.79 14.91 9.52 14.65L4.52 9.65C4.25 9.38 4.25 8.95 4.52 8.69C4.79 8.42 5.21 8.42 5.48 8.69L9.32 12.53V2.5C9.32 2.13 9.63 1.82 10 1.82ZM1.82 17.5C1.82 17.13 2.13 16.82 2.5 16.82H17.5C17.87 16.82 18.18 17.13 18.18 17.5C18.18 17.87 17.87 18.18 17.5 18.18H2.5C2.13 18.18 1.82 17.87 1.82 17.5Z"
      fill={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);