import React from 'react';
import Icon from './Icon';

// 상세페이지 프로필 이미지 카드 (Figma "profile") — 172×180, 하단 이름/직무 오버레이 + 우상단 편집 버튼
interface ProfileHeroProps {
  name: string;
  /** 예: "백엔드 개발자" */
  role: string;
  imageUrl?: string;
  onEdit?: () => void;
  className?: string;
}

export function ProfileHero({ name, role, imageUrl, onEdit, className = '' }: ProfileHeroProps) {
  return (
    <div className={`relative shrink-0 w-[172px] h-[180px] rounded-large overflow-hidden bg-gray800 ${className}`.trim()}>
      {imageUrl && <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover" />}
      {onEdit && (
        <button
          type="button"
          aria-label="프로필 편집"
          onClick={onEdit}
          className="absolute top-3 right-3 p-2 rounded-medium bg-black50 text-white100"
        >
          <Icon name="edit" size={20} color="white" />
        </button>
      )}
      <div className="absolute inset-x-0 bottom-0 flex flex-col p-4 pt-8 bg-gradient-to-t from-black60 to-transparent">
        <span className="text-subtitle2 font-semibold text-white100 truncate">{name}</span>
        <span className="text-body2 leading-5 text-white100 truncate">{role}</span>
      </div>
    </div>
  );
}

export default ProfileHero;
