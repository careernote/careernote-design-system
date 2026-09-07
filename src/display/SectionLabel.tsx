import React from 'react';
import Icon from './Icon';
import type { IconName } from '../icons';

// 상세페이지 섹션 라벨 (Figma "label") — 아이콘 20 + 16 semibold gray800
interface SectionLabelProps {
  icon?: IconName;
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ icon, children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 text-gray800 ${className}`.trim()}>
      {icon && <Icon name={icon} size={20} color="gray800" />}
      <span className="text-body1 font-semibold">{children}</span>
    </div>
  );
}

export default SectionLabel;
