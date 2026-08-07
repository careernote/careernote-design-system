import React from "react";
import { BaseIconProps } from "../display";

export const Tax2Icon: React.FC<BaseIconProps> = ({
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
        aria-label={ariaLabel || "Tax2"}
    >
        <path
            transform="scale(0.8333333)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.99999 5.14288C2.05322 5.14288 1.28571 5.9104 1.28571 6.85717V17.1429C1.28571 18.0897 2.05322 18.8572 2.99999 18.8572H21C21.9468 18.8572 22.7143 18.0897 22.7143 17.1429V6.85717C22.7143 5.9104 21.9468 5.14288 21 5.14288H2.99999ZM18.2396 15.156H19.7242L17.8228 12.1777L19.6131 9.40236H18.1999L17.1281 11.2721L16.0841 9.40236H14.6233L16.4136 12.2245L14.532 15.156H15.9531L17.1281 13.1965L18.2396 15.156ZM12.571 13.9733H10.4155L10.0106 15.156H8.73235L10.8204 9.40236H12.2018L14.2739 15.156H12.9481L12.571 13.9733ZM12.2296 12.9818L11.4992 10.7178L10.7449 12.9818H12.2296ZM9.03007 10.4211V9.40229H4.29034V10.4211H6.04888V15.1559H7.27946V10.4211H9.03007Z"
            fill={color}
        />
    </svg>
)