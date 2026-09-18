import React from 'react';
import { BaseIconProps } from '../display/Icon';

// 칸반(칼럼) 보기 — Figma selectBttn2 #9218:13804
export const ViewKanbanIcon: React.FC<BaseIconProps> = ({
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
    aria-label={ariaLabel || 'ViewKanban'}
    data-testid={testId}
  >
    <rect x="1.3" y="1.5" width="4.4" height="15" rx="1" fill={color} />
    <rect x="6.8" y="1.5" width="4.4" height="15" rx="1" fill={color} />
    <rect x="12.3" y="1.5" width="4.4" height="15" rx="1" fill={color} />
  </svg>
);
