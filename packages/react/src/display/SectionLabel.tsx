import React from 'react';
import Icon from './Icon';
import type { IconName } from '../icons';

// 상세페이지 섹션 라벨 (Figma "label") — 아이콘 20 + 16 semibold gray800
interface SectionLabelProps {
  icon?: IconName;
  children: React.ReactNode;
  /** 라벨 줄 오른쪽 버튼 자리(편집 등). 인쇄에서는 숨긴다 */
  action?: React.ReactNode;
  className?: string;
}

export function SectionLabel({ icon, children, action, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 text-gray800 ${className}`.trim()}>
      {icon && <Icon name={icon} size={20} color="gray800" />}
      <span className="text-body1 font-semibold">{children}</span>
      {action && <div className="ml-auto flex items-center print:hidden">{action}</div>}
    </div>
  );
}

export default SectionLabel;
