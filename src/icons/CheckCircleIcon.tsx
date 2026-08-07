import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const CheckCircleIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'CheckCircle'}
    data-testid={testId}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 17.8571C14.3394 17.8571 17.8571 14.3394 17.8571 10C17.8571 5.66061 14.3394 2.14286 10 2.14286C5.66063 2.14286 2.14286 5.66061 2.14286 10C2.14286 14.3394 5.66063 17.8571 10 17.8571ZM14.0303 8.03033C14.3232 7.73744 14.3232 7.26256 14.0303 6.96967C13.7374 6.67678 13.2626 6.67678 12.9697 6.96967L8.75 11.1893L7.03033 9.46967C6.73744 9.17678 6.26256 9.17678 5.96967 9.46967C5.67678 9.76256 5.67678 10.2374 5.96967 10.5303L8.21967 12.7803C8.51256 13.0732 8.98744 13.0732 9.28033 12.7803L14.0303 8.03033Z"
      fill={color}
    />
  </svg>
);
