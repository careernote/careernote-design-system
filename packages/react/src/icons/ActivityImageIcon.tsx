import React from 'react';

interface ActivityImageIconProps {
  width?: number;
  height?: number;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export const ActivityImageIcon: React.FC<ActivityImageIconProps> = ({
  width = 48,
  height = 38,
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={ariaLabel || 'Activity Image'}
    data-testid={testId}
  >
    <g clipPath="url(#clip0_activity_img)">
      <rect width="47.5876" height="37.9581" rx="4.25489" fill="#ECEFF1" />
      <circle cx="13.9962" cy="11.3092" r="5.3746" fill="#FFC107" />
      <path
        d="M32.3983 14.4687C33.7842 13.1405 35.9706 13.1405 37.3566 14.4687L57.0937 33.3836C59.4251 35.6178 57.8436 39.5536 54.6146 39.5536H15.1402C11.9112 39.5536 10.3298 35.6178 12.6611 33.3836L32.3983 14.4687Z"
        fill="#388E3C"
      />
      <path
        d="M13.4849 21.4816C15.3039 19.7384 18.1736 19.7384 19.9926 21.4816L36.9431 37.726C40.003 40.6584 37.9274 45.8241 33.6893 45.8241H-0.211769C-4.44989 45.8241 -6.52551 40.6584 -3.46565 37.726L13.4849 21.4816Z"
        fill="#4CAF50"
      />
    </g>
    <defs>
      <clipPath id="clip0_activity_img">
        <rect width="47.5876" height="37.9581" rx="4.25489" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
