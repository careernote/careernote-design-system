import React from 'react';
import { BaseIconProps } from '../display';

export const ArrowUpRightIcon: React.FC<BaseIconProps> = ({
  size = 18,
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    className={className}
    aria-label={ariaLabel || 'Arrow up right'}
    data-testid={testId}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.25003 5.89289C4.89499 5.89289 4.60718 5.60507 4.60718 5.25003C4.60718 4.89499 4.89499 4.60718 5.25003 4.60718H12.75C13.1051 4.60718 13.3929 4.89499 13.3929 5.25003V12.75C13.3929 13.105 13.1051 13.3929 12.75 13.3929C12.395 13.3929 12.1072 13.105 12.1072 12.75V6.80202L5.7046 13.2046C5.45355 13.4556 5.04652 13.4556 4.79547 13.2046C4.54441 12.9535 4.54441 12.5465 4.79547 12.2954L11.198 5.89289H5.25003Z"
      fill={color}
    />
  </svg>
);
