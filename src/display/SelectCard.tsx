import React from 'react';

interface SelectCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  representative?: boolean;
  badgeLabel?: string;
}

/**
 * 체크서클 선택 카드 (+선택적 대표 배지) — Vue SelectCard 와 동일 스펙.
 * 라벨 색: representative → sky, selected → gray-900, 기본 → gray-800.
 */
export const SelectCard: React.FC<SelectCardProps> = ({
  selected = false,
  representative = false,
  badgeLabel = '대표',
  children,
  ...rest
}) => (
  <div className="relative overflow-hidden rounded-[12px]">
    {representative && (
      <span
        className="pointer-events-none absolute top-0 left-0 z-10 inline-flex items-center justify-center bg-sky px-[22px] py-[1px] text-[12px] font-bold text-white"
        style={{ borderRadius: '12px 0 24px 0' }}
      >
        {badgeLabel}
      </span>
    )}
    <button
      type="button"
      className={`flex min-h-[56px] w-full items-center justify-between gap-[8px] rounded-[12px] border px-[12px] py-[16px] sm:px-[16px] text-left transition-colors ${
        selected ? 'border-sky bg-sky_selected' : 'border-neutral-200 bg-white hover:border-sky/50'
      }`}
      {...rest}
    >
      <span
        className={`truncate text-[13px] sm:text-[14px] font-semibold ${
          representative ? 'text-sky' : selected ? 'text-gray-900' : 'text-gray-800'
        }`}
      >
        {children}
      </span>
      {selected ? (
        <span className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-sky">
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : (
        <span className="h-[20px] w-[20px] flex-shrink-0 rounded-full border border-neutral-200" />
      )}
    </button>
  </div>
);

export default SelectCard;
