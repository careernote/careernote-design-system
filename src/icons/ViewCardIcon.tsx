import React from 'react';
import { BaseIconProps } from '../display/Icon';

// 카드(그리드) 보기 — Figma selectBttn2 #9218:13797
export const ViewCardIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'ViewCard'}
    data-testid={testId}
  >
    <rect x="1.385" y="1.385" width="6.923" height="6.923" rx="1" fill={color} />
    <rect x="1.385" y="9.692" width="6.923" height="6.923" rx="1" fill={color} />
    <rect x="9.692" y="1.385" width="6.923" height="6.923" rx="1" fill={color} />
    <rect x="9.692" y="9.692" width="6.923" height="6.923" rx="1" fill={color} />
  </svg>
);
