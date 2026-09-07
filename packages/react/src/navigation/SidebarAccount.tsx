import React from 'react';

// 사이드바 하단 계정 블록 (Figma sidebar 하단 — 회사명 + 이메일)
interface SidebarAccountProps {
  name: string;
  email: string;
  onClick?: () => void;
  className?: string;
}

export function SidebarAccount({ name, email, onClick, className = '' }: SidebarAccountProps) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-large bg-black60 text-left ${className}`.trim()}
    >
      <div className="min-w-0 flex-1 flex flex-col gap-0.5">
        <span className="text-body2 font-semibold text-white100 truncate">{name}</span>
        <span className="text-detail text-gray600 truncate">{email}</span>
      </div>
    </Tag>
  );
}

export default SidebarAccount;
