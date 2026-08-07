import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const ArrowLeft2Icon: React.FC<BaseIconProps> = ({
  size = 28,
  color = '#B3B9CA',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={ariaLabel}
    data-testid={testId}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.3031 6.36358C12.6545 6.71505 12.6545 7.2849 12.3031 7.63637L6.83945 13.1H23.3333C23.8304 13.1 24.2333 13.5029 24.2333 14C24.2333 14.497 23.8304 14.9 23.3333 14.9H6.83945L12.3031 20.3636C12.6545 20.7151 12.6545 21.2849 12.3031 21.6364C11.9516 21.9878 11.3817 21.9878 11.0303 21.6364L4.03027 14.6364C3.67879 14.2849 3.67879 13.7151 4.03027 13.3636L11.0303 6.36358C11.3817 6.01211 11.9516 6.01211 12.3031 6.36358Z"
      fill={color}
    />
  </svg>
);
