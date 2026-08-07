import React from "react";
import { BaseIconProps } from "../display";

export const CloseCircleIcon: React.FC<BaseIconProps> = ({
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
        aria-label={ariaLabel || "CloseCircle"}
        data-testid={testId}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 17.8571C14.3394 17.8571 17.8571 14.3394 17.8571 10C17.8571 5.66061 14.3394 2.14286 10 2.14286C5.66063 2.14286 2.1429 5.66061 2.1429 10C2.1429 14.3394 5.66063 17.8571 10 17.8571ZM12.9584 7.03565C13.2035 7.26024 13.2035 7.65934 12.9584 7.8839L10.7922 10.0001L12.9584 12.1162C13.2035 12.3407 13.2035 12.7398 12.9584 12.9644C12.7133 13.189 12.2992 13.189 12.0541 12.9644L9.88792 10.8483L8.09527 12.613C7.85019 12.8511 7.43610 12.8511 7.19100 12.613C6.94591 12.3752 6.94591 11.9611 7.19100 11.7232L8.98367 10.0001L7.19101 8.27693C6.94592 8.03907 6.94592 7.62491 7.19101 7.38699C7.43611 7.14907 7.85020 7.14907 8.09529 7.38699L9.88792 9.10844L12.0541 7.03565C12.2992 6.81107 12.7133 6.81107 12.9584 7.03565Z"
            fill={color}
        />
    </svg>
);