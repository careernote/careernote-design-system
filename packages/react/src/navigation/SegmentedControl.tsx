import React from 'react';

// 세그먼트 컨트롤 (Figma "selectBttn" — 카드 / 칸반보드 / 표 뷰 전환). 선택 항목 gray900 + wide-light 그림자
export interface SegmentItem<T extends string = string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  items: SegmentItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({ items, value, onChange, className = '' }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" className={`inline-flex items-center p-1 bg-white100 border border-border_gray rounded-medium ${className}`.trim()}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(it.value)}
            className={`px-4 py-3 rounded-medium border-0 cursor-pointer text-body2 font-medium leading-[18px] transition-colors ${
              active ? 'bg-gray900 text-white100 shadow-wide-light' : 'bg-transparent text-gray700 hover:bg-bg_gray1'
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
