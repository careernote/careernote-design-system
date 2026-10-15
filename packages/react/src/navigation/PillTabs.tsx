import React from 'react';
import Icon from '../display/Icon';
import type { IconName } from '../icons';

// 알약형 탭 (Figma 업데이트_2025 9492:20768 — 인재피드 / 인재풀 전환).
// 높이 44 · 둥근 끝 · border_gray 1px. 선택 gray900 + 흰 글씨, 비선택 bg_gray1 + gray900 글씨.
// [아이콘 18 · 라벨 Body1 bold · 개수 Body1 regular] 간격 4
export interface PillTabItem<T extends string = string> {
  value: T;
  label: string;
  /** 라벨 왼쪽 18px 아이콘 (예: user2) — 글자색을 따른다 */
  icon?: IconName;
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
            // Figma 안쪽 선 기준 패딩 12/24/12/20 — CSS 선은 바깥에 더해지므로 1px 씩 뺀다
            className={`inline-flex items-center gap-1 h-11 py-[11px] pl-[19px] pr-[23px] rounded-full border border-border_gray cursor-pointer text-body1 font-bold transition-colors ${
              active ? 'bg-gray900 text-white100' : 'bg-bg_gray1 text-gray900 hover:bg-border_gray'
            }`}
          >
            {it.icon && <Icon name={it.icon} size={18} />}
            {it.label}
            {it.count !== undefined && <span className="font-normal">{it.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default PillTabs;
