import React from "react";
import { BaseIconProps } from "../display";

export const RefreshIcon: React.FC<BaseIconProps> = ({
    size = 20,
    color = 'currentColor',
    className = '',
    'aria-label': ariaLabel,
    'data-testid': testId,
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        className={className}
        aria-label={ariaLabel || 'Refresh'}
        data-testid={testId}
    >
        <path
            transform="scale(0.8333333)"
            d="M8.54661 19.7674C10.9457 20.8318 13.8032 20.774 16.2502 19.3612C20.3157 17.014 21.7086 11.8155 19.3614 7.75002L19.1114 7.317M4.63851 16.2501C2.2913 12.1846 3.68424 6.98613 7.74972 4.63892C10.1967 3.22615 13.0542 3.16835 15.4533 4.23271M2.49341 16.3338L5.22546 17.0658L5.95751 14.3338M18.0426 9.66584L18.7747 6.93379L21.5067 7.66584"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)