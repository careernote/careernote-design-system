import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const UserIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'User'}
    data-testid={testId}
  >
    <path
      d="M10.0003 12.5C7.35855 12.5 5.00928 13.7755 3.51361 15.755C3.19171 16.181 3.03075 16.394 3.03601 16.6819C3.04009 16.9044 3.17975 17.1849 3.35475 17.3222C3.58128 17.5 3.89518 17.5 4.52298 17.5H15.4776C16.1054 17.5 16.4193 17.5 16.6458 17.3222C16.8208 17.1849 16.9605 16.9044 16.9646 16.6819C16.9698 16.394 16.8089 16.181 16.487 15.755C14.9913 13.7755 12.642 12.5 10.0003 12.5Z"
      fill={color}
    />
    <path
      d="M10.0003 10C11.9713 10 13.5003 8.47107 13.5003 6.5C13.5003 4.52893 11.9713 3 10.0003 3C8.02921 3 6.50028 4.52893 6.50028 6.5C6.50028 8.47107 8.02921 10 10.0003 10Z"
      fill={color}
    />
  </svg>
);
