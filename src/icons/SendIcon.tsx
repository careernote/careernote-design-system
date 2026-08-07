import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const SendIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'Send'}
    data-testid={testId}
  >
    <path
      transform="scale(0.8333333)"
      fill={color}
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M11.4545 4.45452C11.7558 4.15326 12.2442 4.15326 12.5455 4.45452L19.5455 11.4545C19.8468 11.7558 19.8468 12.2442 19.5455 12.5455C19.2442 12.8467 18.7558 12.8467 18.4545 12.5455L12.7714 6.8624V19C12.7714 19.4261 12.4261 19.7714 12 19.7714C11.574 19.7714 11.2286 19.4261 11.2286 19V6.8624L5.54549 12.5455C5.24423 12.8467 4.75578 12.8467 4.45452 12.5455C4.15326 12.2442 4.15326 11.7558 4.45452 11.4545L11.4545 4.45452Z"
    />
  </svg>
);
