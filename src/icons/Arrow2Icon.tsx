import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const Arrow2Icon: React.FC<BaseIconProps> = ({
  size = 22,
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => (
  <svg
    width={size}
    height={(size * 16) / 22}
    viewBox="0 0 22 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={ariaLabel || 'Arrow right 2'}
    data-testid={testId}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.6978 0.363213C13.0493 0.0117414 13.6192 0.0117414 13.9706 0.363213L20.9706 7.36321C21.3221 7.71468 21.3221 8.28453 20.9706 8.63601L13.9706 15.636C13.6192 15.9875 13.0493 15.9875 12.6978 15.636C12.3464 15.2845 12.3464 14.7147 12.6978 14.3632L18.1615 8.89961H1.66758C1.17052 8.89961 0.767578 8.49667 0.767578 7.99961C0.767578 7.50255 1.17052 7.09961 1.66758 7.09961H18.1615L12.6978 1.63601C12.3464 1.28453 12.3464 0.714685 12.6978 0.363213Z"
      fill={color}
    />
  </svg>
);
