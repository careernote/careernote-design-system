import React from 'react';
import Chip from './Chip';
import { SectionLabel } from './SectionLabel';
import { SectionEditButton } from './SectionEditButton';

// 스킬 섹션 (Figma 상세페이지 1-5) — 숙련도 미표출
interface SkillSectionProps {
  label?: string;
  skills: string[];
  /** 주면 라벨 줄에 편집 버튼 */
  onEdit?: () => void;
  className?: string;
}

export function SkillSection({ label = '스킬', skills, onEdit, className = '' }: SkillSectionProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`.trim()}>
      <SectionLabel icon="hash" action={onEdit && <SectionEditButton label={label} onClick={onEdit} />}>
        {label}
      </SectionLabel>
      <div className="flex flex-wrap items-center gap-2">
        {skills.map((s, i) => (
          <Chip key={i} size="XL" variant="soft" color="basic">
            {s}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default SkillSection;
