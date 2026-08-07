import React from "react";
import { BaseIconProps } from "../display";

export const StarIcon: React.FC<BaseIconProps> = ({
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
        aria-label={ariaLabel || "Star"}
        data-testid={testId}
    >
        <path
            d="M9.25217 2.35396C9.55750 1.73318 10.4425 1.73318 10.7478 2.35396L12.6392 6.19992C12.7602 6.44605 12.9946 6.61687 13.2660 6.65667L17.5020 7.27814C18.1842 7.37824 18.4567 8.21646 17.9636 8.69850L14.8958 11.6977C14.7001 11.8890 14.6108 12.1642 14.6569 12.4339L15.3802 16.6668C15.4966 17.3480 14.7809 17.8667 14.1698 17.5441L10.3890 15.5484C10.1456 15.4199 9.85444 15.4199 9.61100 15.5484L5.83020 17.5441C5.21908 17.8667 4.50337 17.3480 4.61972 16.6668L5.34305 12.4339C5.38915 12.1642 5.29987 11.8890 5.10418 11.6977L2.03641 8.69850C1.54330 8.21646 1.81574 7.37824 2.49799 7.27814L6.73401 6.65667C7.00538 6.61686 7.23980 6.44605 7.36084 6.19992L9.25217 2.35396Z"
            fill={color}
        />
    </svg>
);