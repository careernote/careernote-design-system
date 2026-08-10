import React from 'react';

interface SelectableChipProps {
  representative?: boolean;
  starTitle?: string;
  onStar?: () => void;
  onRemove?: () => void;
  children: React.ReactNode;
}

/**
 * 별(대표 지정) + ✕(제거) 선택 칩 — Vue SelectableChip 과 동일 스펙.
 * web DesiredJobsChipsPanel · pencil 직업 선택이 공유하던 패턴의 단일 소스.
 */
export const SelectableChip: React.FC<SelectableChipProps> = ({
  representative = false,
  starTitle,
  onStar,
  onRemove,
  children,
}) => (
  <span
    className={`inline-flex items-center rounded-full border text-[12px] font-semibold ${
      representative ? 'border-sky bg-sky_selected text-sky' : 'border-neutral-200 bg-white text-gray-800'
    }`}
  >
    <button
      type="button"
      className="flex items-center gap-[6px] pl-[10px] pr-[6px] py-[6px] rounded-full hover:opacity-80"
      title={starTitle}
      onClick={onStar}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={representative ? '#00A3FF' : 'transparent'}
        stroke={representative ? '#00A3FF' : '#9E9EAA'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span>{children}</span>
    </button>
    <button
      type="button"
      className="flex items-center pl-[2px] pr-[10px] py-[6px] text-gray600 hover:text-gray-700"
      aria-label="제거"
      onClick={onRemove}
    >
      ✕
    </button>
  </span>
);

export default SelectableChip;
