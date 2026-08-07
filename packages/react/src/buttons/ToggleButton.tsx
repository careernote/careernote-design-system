import React from 'react';

interface ToggleButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const sizeStyles = {
  sm: {
    track: 'w-8 h-[18px]',
    thumb: 'w-3.5 h-3.5',
    thumbOn: 'left-4',
    thumbOff: 'left-0.5',
  },
  md: {
    track: 'w-[38px] h-5',
    thumb: 'w-4 h-4',
    thumbOn: 'left-5',
    thumbOff: 'left-0.5',
  },
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
}) => {
  const styles = sizeStyles[size];

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative
        ${styles.track}
        rounded-full
        transition-colors
        duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-sky
        focus-visible:ring-offset-2
        ${checked ? 'bg-sky' : 'bg-gray400'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span
        className={`
          absolute
          top-0.5
          ${styles.thumb}
          bg-white
          rounded-full
          shadow-md
          transition-[left]
          duration-200
          ${checked ? styles.thumbOn : styles.thumbOff}
        `}
      />
    </button>
  );
};

export default ToggleButton;
