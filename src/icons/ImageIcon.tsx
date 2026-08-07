import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const ImageIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Image'}
    data-testid={testId}
  >
    <path
      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
      stroke={color}
      transform="scale(0.8333333)"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      transform="scale(0.8333333)"
      strokeLinejoin="round"
    />
    <path d="M21 15L16 10L5 21" transform="scale(0.8333333)" stroke={color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
