
import React from "react";
import { BaseIconProps } from "../display";

export const HomeSolidIcon: React.FC<BaseIconProps> = ({
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
        aria-label={ariaLabel || "HomeSolid"}
        data-testid={testId}
    >
        <path
            transform="scale(0.8333333)"
            d="M21.3685 22.2857H14.6861C14.2056 22.2857 13.8126 21.8916 13.8126 21.4099V17.2496C13.8126 16.1986 12.9827 15.3665 11.9345 15.3665C10.8863 15.3665 10.0564 16.1986 10.0564 17.2496V21.4099C10.0564 21.8916 9.66332 22.2857 9.18289 22.2857H2.5878C2.10736 22.2857 1.71428 21.8916 1.71428 21.4099V10.1991C1.71428 9.41079 2.10736 8.66632 2.71883 8.2284L11.4977 1.87852C11.8035 1.65955 12.1965 1.65955 12.5023 1.87852L21.2812 8.2284C21.8926 8.66632 22.2857 9.41079 22.2857 10.1991V21.4537C22.242 21.8916 21.8489 22.2857 21.3685 22.2857Z"
            fill={color}
        />
    </svg>
)