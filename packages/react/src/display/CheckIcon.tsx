import React from 'react';

interface CheckIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({ size = 18, color = '#222222', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M15 4.5L6.75 12.75L3 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
