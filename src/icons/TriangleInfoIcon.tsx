import React from "react";
import { BaseIconProps } from "../display";

export const TriangleInfoIcon: React.FC<BaseIconProps> = ({
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
        aria-label={ariaLabel || "TriangleInfo"}
        data-testid={testId}
    >
        <path
            d="M9.99984 7.49999V10.8333M9.99984 14.1667H10.0082M8.84592 3.24309C9.22467 2.58879 9.41405 2.2613 9.66125 2.15176C9.87675 2.05592 10.1229 2.05592 10.3384 2.15176C10.5855 2.2613 10.7749 2.58878 11.1537 3.24309L18.0077 15.0819C18.3879 15.7386 18.578 16.0669 18.5499 16.3364C18.5254 16.5714 18.4022 16.785 18.2112 16.924C18.0003 17.0833 17.6127 17.0833 16.8372 17.0833H3.16227C2.38696 17.0833 1.99931 17.0833 1.78843 16.924C1.59734 16.785 1.47417 16.5714 1.44966 16.3364C1.42157 16.0669 1.61165 15.7386 1.99182 15.0819L5.41886 9.16251L8.84592 3.24309Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);