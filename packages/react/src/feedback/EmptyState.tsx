import React from 'react';

// 빈 상태(목록·표·패널에 보여 줄 데이터가 없을 때) — Vue EmptyState 와 같은 스펙.
// md: 화면·목록 영역용(그림 72px + 제목 + 설명 + 행동 버튼), sm: 패널·팝오버 안 한 줄용(글자만).
// 그림은 @careernote/assets/placeholder/*.png 등을 소비자가 넣는다(패키지 간 의존 없이 단일 소스).
export interface EmptyStateProps {
  /** "~없어요" 한 문장(해요체) */
  title: React.ReactNode;
  /** 다음에 할 일 안내 — 한 문장(해요체) */
  description?: React.ReactNode;
  /** 이미지 주소 또는 노드 — 문자열이면 72px(sm 은 40px) 정사각 img 로 그린다 */
  icon?: React.ReactNode | string;
  /** 행동 버튼 등 */
  action?: React.ReactNode;
  size?: 'md' | 'sm';
  className?: string;
}

const SIZE = {
  md: { box: 'gap-4 px-6 py-16', icon: 72, title: 'text-body1 font-semibold text-gray800', desc: 'text-body2 text-gray600' },
  sm: { box: 'gap-2 px-4 py-6', icon: 40, title: 'text-body2 font-medium text-gray600', desc: 'text-detail text-gray500' },
} as const;

export function EmptyState({ title, description, icon, action, size = 'md', className = '' }: EmptyStateProps) {
  const s = SIZE[size];
  return (
    <div className={`flex w-full flex-col items-center justify-center text-center ${s.box} ${className}`.trim()} role="status">
      {icon &&
        (typeof icon === 'string' ? (
          <img src={icon} alt="" width={s.icon} height={s.icon} className="select-none" draggable={false} />
        ) : (
          icon
        ))}
      <div className="flex flex-col items-center gap-1">
        <p className={`m-0 font-pretendard ${s.title}`}>{title}</p>
        {description && <p className={`m-0 font-pretendard ${s.desc}`}>{description}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

export default EmptyState;
