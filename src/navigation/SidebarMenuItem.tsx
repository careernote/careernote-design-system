import React from 'react';
import Icon from '../display/Icon';
import type { IconName } from '../icons';

// ATS 사이드바 메뉴 항목 (Figma "menu-item" — type Default/mini × state Default/selected, hover = selected 룩)
// children 을 주면 하위 mini 항목 그룹으로 아래에 들여쓰기 렌더
interface SidebarMenuItemProps {
  label: string;
  /** default 타입 좌측 아이콘 (iconMap 키) */
  icon?: IconName;
  /** mini: 아이콘 없는 하위 항목 — selected 시 좌측 1px sky 바 */
  variant?: 'default' | 'mini';
  selected?: boolean;
  onClick?: () => void;
  /** 하위 mini 항목들 */
  children?: React.ReactNode;
  className?: string;
}

export function SidebarMenuItem({
  label,
  icon,
  variant = 'default',
  selected = false,
  onClick,
  children,
  className = '',
}: SidebarMenuItemProps) {
  const isMini = variant === 'mini';
  const item = isMini ? (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? 'page' : undefined}
      className={`group/mini w-full flex items-center gap-3 rounded-medium py-2 text-left transition-colors ${
        selected ? 'pl-3 pr-3 text-white100' : 'px-6 text-gray600 hover:pl-3 hover:pr-3 hover:text-white100'
      } ${className}`.trim()}
    >
      <span className={`self-stretch w-px bg-sky ${selected ? '' : 'hidden group-hover/mini:block'}`} />
      <span className="min-w-0 flex-1 text-body2 truncate">{label}</span>
    </button>
  ) : (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? 'page' : undefined}
      className={`w-full flex items-center gap-3 rounded-medium px-4 py-3 text-left transition-colors hover:bg-bg_dark_selected hover:text-white100 ${
        selected ? 'bg-bg_dark_selected text-white100' : 'text-gray600'
      } ${className}`.trim()}
    >
      {icon && <Icon name={icon} size={20} color={selected ? '#00A3FF' : 'currentColor'} />}
      <span className="min-w-0 flex-1 text-body2 font-medium truncate">{label}</span>
    </button>
  );

  if (!children) return item;
  return (
    <div className="flex flex-col gap-1">
      {item}
      <div className="flex flex-col gap-1 px-6">{children}</div>
    </div>
  );
}

export default SidebarMenuItem;
