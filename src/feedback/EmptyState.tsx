import React from 'react';
import Icon from '../display/Icon';
import type { IconName } from '../icons';

// 빈 상태(목록·표·패널에 보여 줄 데이터가 없을 때) — Vue EmptyState 와 같은 스펙.
// md: 화면·목록 영역용(아이콘 + 제목 + 설명 + 행동 버튼), sm: 패널·팝오버 안 한 줄용(글자만).
// 아이콘은 iconName(회색 원 + 라인 아이콘, 화면 내용에 맞춰 고른다)이 기본, 그림이 필요하면 icon 에 주소·노드를 넣는다.
export interface EmptyStateProps {
  /** "~없어요" 한 문장(해요체) */
  title: React.ReactNode;
  /** 다음에 할 일 안내 — 한 문장(해요체) */
  description?: React.ReactNode;
  /** 라인 아이콘 이름 — 연회색 원(md 64px·sm 40px) 안에 그린다. 공고=file, 인재=user2, 검색 0건=search 처럼 화면 내용에 맞춘다 */
  iconName?: IconName;
  /** iconName 대신 그림 — 문자열이면 72px(sm 40px) 정사각 img, 노드면 그대로 */
  icon?: React.ReactNode | string;
  /** 행동 버튼 등 */
  action?: React.ReactNode;
  size?: 'md' | 'sm';
  className?: string;
}

const SIZE = {
  md: { box: 'gap-4 px-6 py-16', circle: 'h-16 w-16', glyph: 28, icon: 72, title: 'text-body1 font-semibold text-gray800', desc: 'text-body2 text-gray600' },
  sm: { box: 'gap-2 px-4 py-6', circle: 'h-10 w-10', glyph: 20, icon: 40, title: 'text-body2 font-medium text-gray600', desc: 'text-detail text-gray500' },
} as const;

export function EmptyState({ title, description, iconName, icon, action, size = 'md', className = '' }: EmptyStateProps) {
  const s = SIZE[size];
  return (
    <div className={`flex w-full flex-col items-center justify-center text-center ${s.box} ${className}`.trim()} role="status">
      {iconName ? (
        <span className={`flex shrink-0 items-center justify-center rounded-full bg-bg_gray2 text-gray600 ${s.circle}`}>
          <Icon name={iconName} size={s.glyph} />
        </span>
      ) : (
        icon &&
        (typeof icon === 'string' ? (
          <img src={icon} alt="" width={s.icon} height={s.icon} className="select-none" draggable={false} />
        ) : (
          icon
        ))
      )}
      <div className="flex flex-col items-center gap-1">
        <p className={`m-0 font-pretendard ${s.title}`}>{title}</p>
        {description && <p className={`m-0 font-pretendard ${s.desc}`}>{description}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

export default EmptyState;
