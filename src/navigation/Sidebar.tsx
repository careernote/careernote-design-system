import React from 'react';

// ATS 사이드바 셸 (Figma "sidebar" — 240px, gray900, 상단 로고 + 메뉴 / 하단 계정)
// 로고는 @careernote/assets 의 careernote-logo-on-dark.png 를 소비자가 slot 으로 넣는다 (패키지 간 자산 의존 없음)
interface SidebarProps {
  /** 상단 로고 노드 (200×36 권장) */
  logo?: React.ReactNode;
  /** 메뉴 항목들 — SidebarMenuItem */
  children: React.ReactNode;
  /** 하단 고정 영역 — SidebarAccount */
  footer?: React.ReactNode;
  className?: string;
}

export function Sidebar({ logo, children, footer, className = '' }: SidebarProps) {
  return (
    <aside className={`w-60 shrink-0 flex flex-col justify-between px-4 py-6 bg-gray900 ${className}`.trim()}>
      <div className="flex flex-col gap-8">
        {logo && <div className="h-9 flex items-center">{logo}</div>}
        <nav className="flex flex-col gap-2">{children}</nav>
      </div>
      {footer}
    </aside>
  );
}

export default Sidebar;
