import React from 'react';

// 언더라인 탭 (Figma 공고 상세 — 지원자 관리 / 채용 캘린더). 선택 gray900 bold + 하단 1px, 비선택 gray600
export interface UnderlineTabItem<T extends string = string> {
  value: T;
  label: string;
}

interface UnderlineTabsProps<T extends string> {
  items: UnderlineTabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function UnderlineTabs<T extends string>({ items, value, onChange, className = '' }: UnderlineTabsProps<T>) {
  return (
    <div role="tablist" className={`flex items-end gap-6 border-b border-border_gray ${className}`.trim()}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            className={`-mb-px pb-3 bg-transparent border-0 border-b cursor-pointer text-[15px] leading-[18px] transition-colors ${
              active ? 'border-gray900 text-gray900 font-bold' : 'border-transparent text-gray600 font-normal hover:text-gray800'
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

export default UnderlineTabs;
