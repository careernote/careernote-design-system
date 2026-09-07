import React from 'react';

// 알약형 탭 (Figma "03 인재풀" — 인재 피드 / 인재풀 전환). 선택 gray900 solid, 비선택 border_gray soft
export interface PillTabItem<T extends string = string> {
  value: T;
  label: string;
  /** 라벨 옆 개수 */
  count?: number;
}

interface PillTabsProps<T extends string> {
  items: PillTabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function PillTabs<T extends string>({ items, value, onChange, className = '' }: PillTabsProps<T>) {
  return (
    <div role="tablist" className={`flex items-center gap-2 ${className}`.trim()}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            className={`inline-flex items-center gap-1.5 h-10 px-4 rounded-2xl border-0 cursor-pointer text-subtitle2 font-bold transition-colors ${
              active ? 'bg-gray900 text-white100' : 'bg-border_gray text-gray900 hover:bg-gray300'
            }`}
          >
            {it.label}
            {it.count !== undefined && (
              <span className={`text-body2 font-semibold ${active ? 'text-gray500' : 'text-gray700'}`}>{it.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default PillTabs;
