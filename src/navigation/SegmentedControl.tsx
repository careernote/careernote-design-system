import React from 'react';
import Icon from '../display/Icon';
import type { IconName } from '../icons';

// 세그먼트 컨트롤 — Figma "selectBttn"(라벨형) / "selectBttn2"(아이콘형, 선택 항목만 라벨 노출).
// 선택 항목은 gray900 + wide-light 그림자.
export interface SegmentItem<T extends string = string> {
  value: T;
  label: string;
  /** 아이콘형(selectBttn2)에서 항목 왼쪽에 놓을 아이콘 */
  icon?: IconName;
}

interface SegmentedControlProps<T extends string> {
  items: SegmentItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** selected 면 선택한 항목에서만 라벨을 보여준다(아이콘형). 기본은 항상 노출 */
  labelMode?: 'always' | 'selected';
  className?: string;
}

export function SegmentedControl<T extends string>({
  items,
  value,
  onChange,
  labelMode = 'always',
  className = '',
}: SegmentedControlProps<T>) {
  const iconMode = items.some((it) => it.icon);
  return (
    <div role="radiogroup" className={`inline-flex items-center p-1 bg-white100 border border-border_gray rounded-medium ${className}`.trim()}>
      {items.map((it) => {
        const active = it.value === value;
        const showLabel = labelMode === 'always' || active;
        return (
          <button
            key={it.value}
            type="button"
            role="radio"
            aria-checked={active}
            // 라벨을 감추는 모드에서는 스크린리더가 읽을 이름이 없어진다
            aria-label={showLabel ? undefined : it.label}
            onClick={() => onChange(it.value)}
            className={`inline-flex items-center justify-center rounded-medium border-0 cursor-pointer text-body2 leading-[18px] transition-colors ${
              iconMode ? 'p-2 font-semibold' : 'px-4 py-3 font-medium'
            } ${active ? 'bg-gray900 text-white100 shadow-wide-light' : 'bg-transparent text-gray700 hover:bg-bg_gray1'}`}
          >
            {it.icon && <Icon name={it.icon} size={18} />}
            {/* 라벨이 0fr↔1fr 로 늘었다 줄어든다 — width:auto 는 전환이 안 되므로 grid 트랙을 애니메이션한다 */}
            <span
              className={`grid overflow-hidden transition-[grid-template-columns] duration-200 ease-in-out ${
                showLabel ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'
              }`}
            >
              <span className="min-w-0 overflow-hidden whitespace-nowrap">
                {/* 아이콘과의 간격도 접혀야 해서 여백을 클리핑되는 안쪽에 둔다 */}
                <span className={it.icon ? 'pl-1' : undefined}>{it.label}</span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
