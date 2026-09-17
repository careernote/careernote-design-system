import React from 'react';

interface CategoryChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  /** solid: active 가 sky 채움(기본) · soft: active 가 sky_bg + sky 테두리(ATS 폼 선택지) */
  variant?: 'solid' | 'soft';
  /** md: 14px 알약(기본) · sm: 11px 높이 32 알약(폼 선택지) */
  size?: 'sm' | 'md';
}

const sizeStyles = {
  sm: 'h-8 px-3 text-[11px]',
  md: 'px-3.5 py-2 text-[14px]',
};

const variantStyles = {
  solid: {
    on: 'border-sky bg-sky text-white100 font-semibold',
    off: 'border-border_gray bg-white100 text-gray700 font-semibold hover:border-sky60',
  },
  soft: {
    on: 'border-sky bg-sky_bg text-sky font-bold',
    off: 'border-border_gray bg-white100 text-gray600 font-medium hover:border-sky60 hover:text-sky',
  },
};

/**
 * 카테고리·선택지 알약 버튼 — Vue CategoryChip 과 동일 스펙.
 * 사용처: 직업 선택 플로우 카테고리 탭(solid), ATS 채용 만들기 고용형태·경력 선택지(soft).
 */
export const CategoryChip: React.FC<CategoryChipProps> = ({
  active = false,
  variant = 'solid',
  size = 'md',
  className = '',
  children,
  ...rest
}) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center rounded-full border transition-colors ${sizeStyles[size]} ${
      variantStyles[variant][active ? 'on' : 'off']
    } ${className}`.trim()}
    {...rest}
  >
    {children}
  </button>
);

export default CategoryChip;
