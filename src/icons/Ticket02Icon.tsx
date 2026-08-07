import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const Ticket02Icon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Ticket'}
    data-testid={testId}
  >
    <path
      d="M6.6665 6.66665V5.83331M6.6665 10.4166V9.58331M6.6665 14.1666V13.3333M5.6665 16.6666H14.3332C15.7333 16.6666 16.4334 16.6666 16.9681 16.3942C17.4386 16.1545 17.821 15.772 18.0607 15.3016C18.3332 14.7668 18.3332 14.0668 18.3332 12.6666V7.33331C18.3332 5.93318 18.3332 5.23312 18.0607 4.69834C17.821 4.22793 17.4386 3.84548 16.9681 3.6058C16.4334 3.33331 15.7333 3.33331 14.3332 3.33331H5.6665C4.26637 3.33331 3.56631 3.33331 3.03153 3.6058C2.56112 3.84548 2.17867 4.22793 1.93899 4.69834C1.6665 5.23312 1.6665 5.93318 1.6665 7.33331V12.6666C1.6665 14.0668 1.6665 14.7668 1.93899 15.3016C2.17867 15.772 2.56112 16.1545 3.03153 16.3942C3.56631 16.6666 4.26637 16.6666 5.6665 16.6666Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


