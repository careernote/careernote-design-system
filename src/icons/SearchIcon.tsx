import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const SearchIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Search'}
    data-testid={testId}
  >
    <path
      transform="scale(0.8333333)"
      fillRule="evenodd" 
      clipRule="evenodd" 
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 3.85717C7.0551 3.85717 3.85714 7.05513 3.85714 11C3.85714 14.9449 7.0551 18.1429 11 18.1429C12.9285 18.1429 14.6784 17.3786 15.9636 16.1365C15.9878 16.1042 16.0146 16.0733 16.0439 16.0439C16.0733 16.0146 16.1042 15.9878 16.1365 15.9636C17.3786 14.6785 18.1429 12.9285 18.1429 11C18.1429 7.05513 14.9449 3.85717 11 3.85717ZM17.8398 16.6277C19.1002 15.0975 19.8571 13.1372 19.8571 11C19.8571 6.10836 15.8917 2.14288 11 2.14288C6.10833 2.14288 2.14285 6.10836 2.14285 11C2.14285 15.8917 6.10833 19.8572 11 19.8572C13.1372 19.8572 15.0975 19.1002 16.6276 17.8398L20.3939 21.6061C20.7286 21.9409 21.2714 21.9409 21.6061 21.6061C21.9408 21.2714 21.9408 20.7287 21.6061 20.3939L17.8398 16.6277Z" 
      fill={color}
    />
  </svg>
);