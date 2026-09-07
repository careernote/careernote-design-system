import React from 'react';

// 5단계 비중 선택기 (Figma "평가 기준" 모달 — 하/중하/중/중상/상). 선택 단계까지 sky 로 채우고 마지막 칸은 80% 투명
export const LEVEL_LABELS = ['하', '중하', '중', '중상', '상'] as const;

interface LevelSelectorProps {
  /** 1~5 */
  value: number;
  onChange: (value: number) => void;
  labels?: readonly string[];
  disabled?: boolean;
  className?: string;
}

export function LevelSelector({ value, onChange, labels = LEVEL_LABELS, disabled = false, className = '' }: LevelSelectorProps) {
  return (
    <div
      role="radiogroup"
      className={`flex w-full h-[34px] overflow-hidden rounded-large border border-border_gray bg-white100 ${className}`.trim()}
    >
      {labels.map((label, i) => {
        const level = i + 1;
        const filled = level <= value;
        const last = level === value;
        return (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={last}
            disabled={disabled}
            onClick={() => onChange(level)}
            className={`flex-1 border-0 p-0 cursor-pointer text-body2 font-medium leading-[18px] transition-colors disabled:cursor-default ${
              filled ? `bg-sky text-white70 ${last ? 'opacity-80' : ''}` : 'bg-transparent text-gray600 hover:bg-bg_gray1'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default LevelSelector;
