import React from 'react';
import Icon from './Icon';

// 자격요건/우대조건 카드 (평가 모달 1-4, 1-5) — border 카드, 이모지 제목, 항목별 충족(✓ green)/미충족(✕ red)/표시 없음
export interface RequirementItem {
  text: string;
  status?: 'met' | 'unmet' | 'none';
}

interface RequirementCardProps {
  /** 이모지 포함 (예: "✅  자격요건을 충족했어요.") */
  title: string;
  items: RequirementItem[];
  className?: string;
}

export function RequirementCard({ title, items, className = '' }: RequirementCardProps) {
  return (
    <div className={`flex flex-col gap-4 px-5 pt-5 pb-6 rounded-xlarge border border-border_gray bg-white100 ${className}`.trim()}>
      <span className="text-body2 font-semibold text-gray900">{title}</span>
      <ul className="flex flex-col gap-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-3">
            {it.status === 'met' && <Icon name="check" size={20} color="#03C75A" />}
            {it.status === 'unmet' && <Icon name="close" size={20} color="#F10000" />}
            <span className="text-body2 text-gray800">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequirementCard;
