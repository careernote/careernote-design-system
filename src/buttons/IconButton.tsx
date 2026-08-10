import React from 'react';

// 아이콘 전용 정사각 버튼 (careernote-web ExperienceItem 수정/삭제 등 반복 패턴 이관)
// 기본형: 테두리 사각 (p-1.5 rounded-lg border) / ghost: 테두리 없는 hover 배경형
interface IconButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?: 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
  'aria-label': string;
  'data-testid'?: string;
}

const variantStyles = {
  outline: 'p-1.5 rounded-lg border border-border_gray hover:bg-bg_gray2',
  ghost: 'p-1 rounded-xsmall hover:bg-bg_gray1',
};

export function IconButton({
  onClick,
  children,
  variant = 'outline',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid={testId}
      className={`inline-flex items-center justify-center text-gray800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default IconButton;
