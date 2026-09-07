import React from 'react';
import { SectionLabel } from './SectionLabel';
import { ProfileItem } from './ProfileItem';
import type { IconName } from '../icons';

// 수상경력·자격증·외국어 섹션 — SectionLabel + ProfileItem 2열 그리드
export interface ProfileItemEntry {
  title: string;
  sub: string;
  date?: string;
}

interface ProfileItemSectionProps {
  icon: IconName;
  label: string;
  items: ProfileItemEntry[];
  className?: string;
}

export function ProfileItemSection({ icon, label, items, className = '' }: ProfileItemSectionProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`.trim()}>
      <SectionLabel icon={icon}>{label}</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        {items.map((it, i) => (
          <ProfileItem key={i} {...it} />
        ))}
      </div>
    </div>
  );
}

export default ProfileItemSection;
