import React from 'react';
import Icon from './Icon';

// 카드 안 대표 활동 한 줄 (Figma "experience" — Default / hover)
export interface ExperienceEntry {
  title: string;
  /** 소속·기관명 — 없으면 줄 미표출 */
  org?: string;
  imageUrl?: string;
}

interface ExperienceItemProps extends ExperienceEntry {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

export function ExperienceItem({ title, org, imageUrl, onClick, className = '' }: ExperienceItemProps) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-3 text-left bg-white100 border border-border_gray rounded-large transition-all ${
        onClick ? 'hover:border-sky hover:shadow-normal-soft' : ''
      } ${className}`.trim()}
    >
      <div className="shrink-0 w-12 h-[50px] rounded-[7px] bg-gray800 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <Icon name="nonImage" size={14} color="white" />
        )}
      </div>
      <div className="min-w-0 flex flex-col gap-1">
        <p className="text-body1 font-semibold text-gray900 truncate">{title}</p>
        {org && <p className="text-body2 font-medium text-gray700 truncate">{org}</p>}
      </div>
    </Tag>
  );
}

export default ExperienceItem;
