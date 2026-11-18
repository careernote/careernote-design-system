import React from 'react';
import { SectionLabel } from './SectionLabel';
import { ProfileItem } from './ProfileItem';
import { SectionEditButton } from './SectionEditButton';
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
  /** 주면 라벨 줄에 편집 버튼 */
  onEdit?: () => void;
  className?: string;
}

export function ProfileItemSection({ icon, label, items, onEdit, className = '' }: ProfileItemSectionProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`.trim()}>
      <SectionLabel icon={icon} action={onEdit && <SectionEditButton label={label} onClick={onEdit} />}>
        {label}
      </SectionLabel>
      <div className="grid grid-cols-2 mobile:grid-cols-1 gap-2">
        {items.map((it, i) => (
          <ProfileItem key={i} {...it} />
        ))}
      </div>
    </div>
  );
}

export default ProfileItemSection;
