import React from 'react';

// 필터 칩 그룹 (Figma 공고 상세 — 전체 / 접수 / 인터뷰 …). 선택 gray900 solid, 비선택 white + border_gray. 단일 선택
export interface FilterChipItem<T extends string = string> {
  value: T;
  label: string;
  count?: number;
}

interface FilterChipsProps<T extends string> {
  items: FilterChipItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function FilterChips<T extends string>({ items, value, onChange, className = '' }: FilterChipsProps<T>) {
  return (
    <div role="radiogroup" className={`flex flex-wrap items-center gap-1 ${className}`.trim()}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(it.value)}
            className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border cursor-pointer text-detail leading-[15px] transition-colors ${
              active
                ? 'bg-gray900 border-gray900 text-white100 font-semibold'
                : 'bg-white100 border-border_gray text-gray800 font-medium hover:border-gray500'
            }`}
          >
            {it.label}
            {it.count !== undefined && <span className={active ? 'text-gray500' : 'text-gray600'}>{it.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default FilterChips;
