import React from 'react';

interface ButtonRoundProps {
  selected?: boolean;
  size?: 'small' | 'big';
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const sizeStyles = {
  small: 'px-4 py-2 text-body2 font-medium',
  big: 'px-5 py-4 text-body1 font-medium',
};

const ButtonRound = ({
  selected = false,
  size = 'small',
  leftIcon,
  rightIcon,
  onClick,
  children,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}: React.PropsWithChildren<ButtonRoundProps>) => {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid={testId}
      className={`
        flex items-center gap-2.5 rounded-[16px] whitespace-nowrap transition-colors
        ${sizeStyles[size]}
        ${
          disabled
            ? 'bg-bg_gray2 text-[#999] cursor-not-allowed'
            : selected
              ? 'bg-gray900 text-white'
              : 'bg-bg_gray2 text-gray900 hover:bg-border_gray'
        }
        ${className}
      `}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
};

export default ButtonRound;
