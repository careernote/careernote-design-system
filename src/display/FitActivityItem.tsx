import React from 'react';
import Icon from './Icon';

// 주요업무와 Fit 되는 활동 항목 (평가 모달 1-3) — 썸네일 54×57 + 제목/소속, hover 시 우측 arrow2, 클릭 시 좌측 활동으로 스크롤
interface FitActivityItemProps {
  title: string;
  org: string;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
}

export function FitActivityItem({ title, org, imageUrl, onClick, className = '' }: FitActivityItemProps) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`group w-full flex items-center gap-4 py-1.5 text-left rounded-medium transition-colors ${onClick ? 'hover:bg-bg_gray2 hover:px-2' : ''} ${className}`.trim()}
    >
      <div className="shrink-0 w-[54px] h-[57px] rounded-[7px] bg-gray800 overflow-hidden flex items-center justify-center">
        {imageUrl ? <img src={imageUrl} alt="" className="w-full h-full object-cover" /> : <Icon name="nonImage" size={14} color="white" />}
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-1">
        <span className="text-body1 font-semibold text-gray900 truncate">{title}</span>
        <span className="text-body2 font-medium text-gray700 truncate">{org}</span>
      </div>
      {onClick && (
        <span className="shrink-0 mr-2 text-sky opacity-0 transition-opacity group-hover:opacity-100">
          <Icon name="arrow2" size={22} color="#00A3FF" />
        </span>
      )}
    </Tag>
  );
}

export default FitActivityItem;
