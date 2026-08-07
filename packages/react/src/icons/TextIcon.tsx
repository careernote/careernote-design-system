import React from 'react';
import { BaseIconProps } from '../display/Icon';

export const TextIcon: React.FC<BaseIconProps> = ({
  size = 20,
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={ariaLabel || 'Text'}
    data-testid={testId}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.60547 4.50223C1.60547 4.14719 1.89329 3.85938 2.24833 3.85938H15.7483C16.1034 3.85938 16.3912 4.14719 16.3912 4.50223C16.3912 4.85727 16.1034 5.14508 15.7483 5.14508H2.24833C1.89329 5.14508 1.60547 4.85727 1.60547 4.50223ZM1.60547 9.00221C1.60547 8.64717 1.89329 8.35936 2.24833 8.35936H15.7483C16.1034 8.35936 16.3912 8.64717 16.3912 9.00221C16.3912 9.35725 16.1034 9.64507 15.7483 9.64507H2.24833C1.89329 9.64507 1.60547 9.35725 1.60547 9.00221ZM1.60547 13.5022C1.60547 13.1472 1.89329 12.8593 2.24833 12.8593H11.2483C11.6034 12.8593 11.8912 13.1472 11.8912 13.5022C11.8912 13.8572 11.6034 14.1451 11.2483 14.1451H2.24833C1.89329 14.1451 1.60547 13.8572 1.60547 13.5022Z"
      fill={color}
    />
  </svg>
);
