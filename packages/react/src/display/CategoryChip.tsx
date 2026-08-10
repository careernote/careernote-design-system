import React from 'react';

interface CategoryChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/**
 * 카테고리 필터 알약 버튼 (active = sky 채움) — Vue CategoryChip 과 동일 스펙.
 * 사용처: 직업 선택 플로우 카테고리 탭 (career-pencil /make/job, web DesiredJobsSelector 패턴).
 */
export const CategoryChip: React.FC<CategoryChipProps> = ({ active = false, children, ...rest }) => (
  <button
    type="button"
    className={`rounded-full border px-[14px] py-[8px] text-[14px] font-semibold transition-colors ${
      active
        ? 'border-sky bg-sky text-white'
        : 'border-neutral-200 bg-white text-gray-700 hover:border-sky/50'
    }`}
    {...rest}
  >
    {children}
  </button>
);

export default CategoryChip;
