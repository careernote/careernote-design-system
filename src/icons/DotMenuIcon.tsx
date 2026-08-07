import React from "react";
import { BaseIconProps } from "../display";

export const DotMenuIcon: React.FC<BaseIconProps> = ({
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
        aria-label={ariaLabel || "DotMenu"}
        data-testid={testId}
    >
        <path
            transform="scale(0.8333333)"
            d="M10.6286 5.22854C10.6286 4.47113 11.2426 3.85712 12 3.85712C12.7574 3.85712 13.3714 4.47113 13.3714 5.22854C13.3714 5.98596 12.7574 6.59997 12 6.59997C11.2426 6.59997 10.6286 5.98596 10.6286 5.22854Z"
            fill={color}
        />
        <path
            transform="scale(0.8333333)"
            d="M10.6286 12.0193C10.6286 11.2619 11.2426 10.6479 12 10.6479C12.7574 10.6479 13.3714 11.2619 13.3714 12.0193C13.3714 12.7767 12.7574 13.3908 12 13.3908C11.2426 13.3908 10.6286 12.7767 10.6286 12.0193Z"
            fill={color}
        />
        <path
            transform="scale(0.8333333)"
            d="M10.6286 18.8101C10.6286 18.0527 11.2426 17.4387 12 17.4387C12.7574 17.4387 13.3714 18.0527 13.3714 18.8101C13.3714 19.5675 12.7574 20.1815 12 20.1815C11.2426 20.1815 10.6286 19.5675 10.6286 18.8101Z"
            fill={color}
        />

    </svg>
)