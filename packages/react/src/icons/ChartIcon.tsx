import React from "react";
import { BaseIconProps } from "../display/Icon";

export const ChartIcon: React.FC<BaseIconProps> = ({
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
        aria-label={ariaLabel || "Chart"}
        data-testid={testId}
    >
        <path 
            d="M4.16667 16.6667V13.3333C4.16667 12.8731 4.53976 12.5 5 12.5C5.46024 12.5 5.83333 12.8731 5.83333 13.3333V16.6667C5.83333 17.1269 5.46024 17.5 5 17.5C4.53976 17.5 4.16667 17.1269 4.16667 16.6667ZM9.16667 16.6667V8.33333C9.16667 7.87310 9.53976 7.5 10 7.5C10.4602 7.5 10.8333 7.87310 10.8333 8.33333V16.6667C10.8333 17.1269 10.4602 17.5 10 17.5C9.53976 17.5 9.16667 17.1269 9.16667 16.6667ZM14.1667 16.6667V3.33333C14.1667 2.87310 14.5398 2.5 15 2.5C15.4602 2.5 15.8333 2.87310 15.8333 3.33333V16.6667C15.8333 17.1269 15.4602 17.5 15 17.5C14.5398 17.5 14.1667 17.1269 14.1667 16.6667Z" 
            fill={color}
        />
    </svg>
);