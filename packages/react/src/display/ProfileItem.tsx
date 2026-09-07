import React from 'react';

// 수상·자격증·외국어 항목 카드 (Figma "profile_item") — bg_gray1, 제목 + 부제 + 날짜(옵션)
interface ProfileItemProps {
  title: string;
  sub: string;
  date?: string;
  className?: string;
}

export function ProfileItem({ title, sub, date, className = '' }: ProfileItemProps) {
  return (
    <div className={`flex items-end gap-3 px-6 py-3 rounded-large bg-bg_gray1 ${className}`.trim()}>
      <div className="min-w-0 flex-1 flex flex-col justify-center gap-1">
        <span className="text-body2 font-medium text-gray900 truncate">{title}</span>
        <div className="flex items-center gap-3">
          <span className="min-w-0 flex-1 text-body2 text-gray700 truncate">{sub}</span>
          {date && <span className="shrink-0 text-body2 text-gray600">{date}</span>}
        </div>
      </div>
    </div>
  );
}

export default ProfileItem;
