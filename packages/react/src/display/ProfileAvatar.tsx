import React from 'react';

// 지원자·인재풀 프로필 아바타 — 이미지가 있으면 표출, 없으면 이름 뒤 2글자 (Figma "채용/인재풀 카드 컴포넌트" 1-1)
interface ProfileAvatarProps {
  name: string;
  imageUrl?: string;
  /** px. 기본 60 */
  size?: number;
  className?: string;
}

export function ProfileAvatar({ name, imageUrl, size = 60, className = '' }: ProfileAvatarProps) {
  const initials = name.trim().slice(-2);
  return (
    <div
      className={`shrink-0 flex items-center justify-center overflow-hidden rounded-large bg-bg_gray1 border border-border_gray ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-subtitle2 font-semibold text-gray600">{initials}</span>
      )}
    </div>
  );
}

export default ProfileAvatar;
