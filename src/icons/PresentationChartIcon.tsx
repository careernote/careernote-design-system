import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const PresentationChartIcon: React.FC<BaseIconProps> = ({
  size = 32,
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
    aria-label={ariaLabel || 'Presentation Chart'}
    data-testid={testId}
  >
    <path
      d="M15.9993 21.3333V28M15.9993 21.3333L23.9993 28M15.9993 21.3333L7.99935 28M27.9993 4V14.9333C27.9993 17.1735 27.9993 18.2936 27.5634 19.1493C27.1799 19.9019 26.568 20.5139 25.8153 20.8974C24.9597 21.3333 23.8396 21.3333 21.5993 21.3333H10.3993C8.15914 21.3333 7.03903 21.3333 6.18339 20.8974C5.43074 20.5139 4.81882 19.9019 4.43532 19.1493C3.99935 18.2936 3.99935 17.1735 3.99935 14.9333V4M10.666 12V16M15.9993 9.33333V16M21.3327 14.6667V16M29.3327 4H2.66602"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
