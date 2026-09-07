import React from 'react';

// 프로필 요약 카드 (Figma "profile-summary") — 활동 유형 특징 3가지 + 세부 설명
export interface SummaryItem {
  title: string;
  description?: string;
}

interface ProfileSummaryProps {
  title?: string;
  items: SummaryItem[];
  /** gray: bg_gray2 배경(상세페이지) / white: 흰 배경(평가 모달 안) */
  variant?: 'gray' | 'white';
  className?: string;
}

export function ProfileSummary({ title = '프로필 요약', items, variant = 'gray', className = '' }: ProfileSummaryProps) {
  return (
    <div className={`flex flex-col gap-4 px-5 pt-5 pb-6 rounded-xlarge ${variant === 'gray' ? 'bg-bg_gray2' : 'bg-white100'} ${className}`.trim()}>
      <span className="text-body2 font-semibold text-sky">{title}</span>
      <ul className="flex flex-col gap-4">
        {items.map((it, i) => (
          <li key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="shrink-0 w-1 h-1 rounded-full bg-gray900" />
              <span className="text-body2 font-medium text-gray900">{it.title}</span>
            </div>
            {it.description && <p className="pl-3 text-detail leading-[17px] text-gray700">{it.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileSummary;
