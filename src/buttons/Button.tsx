import React from 'react';

interface Props {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'sm' | 'md' | 'lg';
  // Responsive size applied at the project's tablet breakpoint (<= 780px)
  mobileSize?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'black' | 'sky' | 'red' | 'transparent';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'data-testid'?: string;
  draggable?: boolean;
}

const sizeStyles = {
  sm: 'px-16 py-8 text-body2 font-medium rounded-small',
  md: 'px-24 py-14 text-body2 font-semibold rounded-small',
  lg: 'px-28 py-16 text-body1 font-bold rounded-medium',
};

const colorStyles = {
  white: `
    relative bg-white100 text-gray800 border border-gray400
    hover:before:opacity-[.05]
    focus:before:opacity-[.08] focus:outline-none
    active:before:opacity-[.12] active:before:duration-100  
    data-[dragged=true]:before:opacity-[.16]
    disabled:bg-white100 disabled:text-border_gray disabled:cursor-not-allowed disabled:pointer-events-none
    disabled:hover:before:opacity-0 !important
    disabled:focus:before:opacity-0 !important
    disabled:active:before:opacity-0 !important
    before:absolute before:inset-0 before:bg-gray900 before:opacity-0 before:transition-opacity before:duration-150 before:-webkit-transition-opacity before:will-change-opacity before:pointer-events-none before:rounded-[inherit]
    &:not([data-dragged=true]):not(:active):before:opacity-0 !important
    `,
  black: `
    relative bg-gray900 text-white100
    hover:before:opacity-[.1]
    focus:before:opacity-[.2] focus:outline-none
    active:before:opacity-[.3] active:before:duration-100
    data-[dragged=true]:before:opacity-[.4]
    disabled:bg-gray600 disabled:text-border_gray disabled:cursor-not-allowed disabled:pointer-events-none
    disabled:hover:before:opacity-0 !important
    disabled:focus:before:opacity-0 !important
    disabled:active:before:opacity-0 !important
    before:absolute before:inset-0 before:bg-white100 before:opacity-0 before:transition-opacity before:duration-150 before:-webkit-transition-opacity before:will-change-opacity before:pointer-events-none before:rounded-[inherit]
    &:not([data-dragged=true]):not(:active):before:opacity-0 !important
  `,
  sky: `
      relative bg-sky text-white100
      hover:before:opacity-[.08]
      focus:before:opacity-[.16] focus:outline-none
      active:before:opacity-[.20] active:before:duration-100
      data-[dragged=true]:before:opacity-[.24]
      disabled:bg-border_gray disabled:text-white100 disabled:cursor-not-allowed disabled:pointer-events-none
      disabled:hover:before:opacity-0 !important
      disabled:focus:before:opacity-0 !important
      disabled:active:before:opacity-0 !important
      before:absolute before:inset-0 before:bg-gray900 before:opacity-0 before:transition-opacity before:duration-150 before:-webkit-transition-opacity before:will-change-opacity before:pointer-events-none before:rounded-[inherit]
      &:not([data-dragged=true]):not(:active):before:opacity-0 !important
    `,
  red: `
      relative bg-red text-white100
      hover:before:opacity-[.08]
      focus:before:opacity-[.16] focus:outline-none
      active:before:opacity-[.20] active:before:duration-100
      data-[dragged=true]:before:opacity-[.24]
      disabled:bg-border_gray disabled:text-white100 disabled:cursor-not-allowed disabled:pointer-events-none
      disabled:hover:before:opacity-0 !important
      disabled:focus:before:opacity-0 !important
      disabled:active:before:opacity-0 !important
      before:absolute before:inset-0 before:bg-gray900 before:opacity-0 before:transition-opacity before:duration-150 before:-webkit-transition-opacity before:will-change-opacity before:pointer-events-none before:rounded-[inherit]
      &:not([data-dragged=true]):not(:active):before:opacity-0 !important
    `,
  transparent: `
      relative bg-transparent text-[#FFFFFF] border border-[#DEE0E6]
      hover:before:opacity-[.05]
      focus:before:opacity-[.08] focus:outline-none
      active:before:opacity-[.12] active:before:duration-100
      data-[dragged=true]:before:opacity-[.16]
      disabled:bg-transparent disabled:text-border_gray disabled:border-border_gray disabled:cursor-not-allowed disabled:pointer-events-none
      disabled:hover:before:opacity-0 !important
      disabled:focus:before:opacity-0 !important
      disabled:active:before:opacity-0 !important
      before:absolute before:inset-0 before:bg-gray900 before:opacity-0 before:transition-opacity before:duration-150 before:-webkit-transition-opacity before:will-change-opacity before:pointer-events-none before:rounded-[inherit]
      &:not([data-dragged=true]):not(:active):before:opacity-0 !important
    `,
};

const Button = ({
  leftIcon,
  rightIcon,
  onClick,
  children,
  size = 'sm',
  mobileSize,
  color = 'white',
  disabled = false,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
  'data-testid': testId,
  draggable = false,
}: React.PropsWithChildren<Props>) => {
  const [isDragged, setIsDragged] = React.useState(false);

  // Convert a space-separated class string to tablet: prefixed classes
  const toTabletPrefixed = (classes: string): string =>
    classes
      .split(' ')
      .filter(Boolean)
      .map(token => `tablet:${token}`)
      .join(' ');

  return (
    <button
      type={type}
      onClick={e => {
        if (disabled) return;
        onClick(e);
      }}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid={testId}
      data-dragged={isDragged}
      draggable={disabled ? false : draggable}
      onDragStart={e => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        draggable && setIsDragged(true);
      }}
      onDragEnd={() => draggable && setIsDragged(false)}
      className={`
        relative flex items-center justify-center gap-8 transition-all duration-150 ease-in-out whitespace-nowrap
        ${sizeStyles[size]}
        ${mobileSize ? toTabletPrefixed(sizeStyles[mobileSize]) : ''}
        ${typeof colorStyles[color] === 'string' ? colorStyles[color] : colorStyles[color]}
        ${className}
      `}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;
