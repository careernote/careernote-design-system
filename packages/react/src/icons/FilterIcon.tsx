import React from "react";
import { BaseIconProps } from "../display";

export const FilterIcon: React.FC<BaseIconProps> = ({
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
        data-testid={testId}
        aria-label={ariaLabel || "Filter"}
    >
        <path
            transform="scale(0.8333333)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.18573 6.00002C2.18573 5.5503 2.5503 5.18573 3.00002 5.18573H21C21.4497 5.18573 21.8143 5.5503 21.8143 6.00002C21.8143 6.44973 21.4497 6.8143 21 6.8143H3.00002C2.5503 6.8143 2.18573 6.44973 2.18573 6.00002ZM5.18573 12C5.18573 11.5503 5.5503 11.1857 6.00002 11.1857H18C18.4497 11.1857 18.8143 11.5503 18.8143 12C18.8143 12.4497 18.4497 12.8143 18 12.8143H6.00002C5.5503 12.8143 5.18573 12.4497 5.18573 12ZM8.18573 18C8.18573 17.5503 8.5503 17.1857 9.00002 17.1857H15C15.4497 17.1857 15.8143 17.5503 15.8143 18C15.8143 18.4497 15.4497 18.8143 15 18.8143H9.00002C8.5503 18.8143 8.18573 18.4497 8.18573 18Z"
            fill={color}
        />

    </svg>
)