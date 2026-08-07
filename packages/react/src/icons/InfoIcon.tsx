import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const InfoIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Info'}
    data-testid={testId}
  >
    <path
    d="M10 2.85714C6.05517 2.85714 2.85714 6.05517 2.85714 10C2.85714 13.9448 6.05517 17.1429 10 17.1429C13.9448 17.1429 17.1429 13.9448 17.1429 10C17.1429 6.05517 13.9448 2.85714 10 2.85714ZM1.42857 10C1.42857 5.26613 5.26613 1.42857 10 1.42857C14.7339 1.42857 18.5714 5.26613 18.5714 10C18.5714 14.7339 14.7339 18.5714 10 18.5714C5.26613 18.5714 1.42857 14.7339 1.42857 10ZM9.28571 6.85714C9.28571 6.38375 9.66946 6 10.1429 6H10.1513C10.6247 6 11.0084 6.38375 11.0084 6.85714C11.0084 7.33053 10.6247 7.71429 10.1513 7.71429H10.1429C9.66946 7.71429 9.28571 7.33053 9.28571 6.85714ZM10 9.28571C10.4734 9.28571 10.8571 9.66946 10.8571 10.1429V13.1429C10.8571 13.6163 10.4734 14 10 14C9.52661 14 9.14286 13.6163 9.14286 13.1429V10.1429C9.14286 9.66946 9.52661 9.28571 10 9.28571Z"
    fill={color}
    strokeWidth="1.67"
    strokeLinecap="round"
    strokeLinejoin="round"
    />
  </svg>
);