import React from "react";
import { BaseIconProps } from "../display";

export const ClockIcon: React.FC<BaseIconProps> = ({
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
        aria-label={ariaLabel || 'Clock'}
        data-testid={testId}
    >
        <path
            transform="scale(0.8333333)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2.8143C6.92689 2.8143 2.8143 6.92689 2.8143 12C2.8143 17.0731 6.92689 21.1857 12 21.1857C17.0731 21.1857 21.1857 17.0731 21.1857 12C21.1857 6.92689 17.0731 2.8143 12 2.8143ZM1.18573 12C1.18573 6.02745 6.02745 1.18573 12 1.18573C17.9726 1.18573 22.8143 6.02745 22.8143 12C22.8143 17.9726 17.9726 22.8143 12 22.8143C6.02745 22.8143 1.18573 17.9726 1.18573 12ZM12 5.18573C12.4497 5.18573 12.8143 5.5503 12.8143 6.00002V11.4968L16.3642 13.2717C16.7664 13.4728 16.9295 13.9619 16.7283 14.3642C16.5272 14.7664 16.0381 14.9295 15.6359 14.7283L11.6359 12.7283C11.36 12.5904 11.1857 12.3084 11.1857 12V6.00002C11.1857 5.5503 11.5503 5.18573 12 5.18573Z"
            fill="#B3B9CA"
        />

    </svg>
)