import React from "react";
import { BaseIconProps } from "../display";

export const CheckBadge2Icon: React.FC<BaseIconProps> = ({
    size = 20,
    color = "currentColor",
    className = "",
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
        aria-label={ariaLabel || "CheckBadge2"}
        data-testid={testId}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.4092 8.46417L9.45084 12.4192C9.33334 12.5367 9.175 12.6025 9.00917 12.6025C8.84334 12.6025 8.68417 12.5367 8.56667 12.4192L6.59084 10.4417C6.34667 10.1975 6.34667 9.80167 6.59084 9.5575C6.83584 9.31334 7.23167 9.315 7.475 9.5575L9.00917 11.0933L12.525 7.58C12.7692 7.33584 13.165 7.33667 13.4092 7.58C13.6533 7.82417 13.6533 8.22 13.4092 8.46417ZM10 1.875C4.00167 1.875 1.875 4.00167 1.875 10C1.875 15.9983 4.00167 18.125 10 18.125C15.9983 18.125 18.125 15.9983 18.125 10C18.125 4.00167 15.9983 1.875 10 1.875Z"
            fill={color}
        />
    </svg>
);