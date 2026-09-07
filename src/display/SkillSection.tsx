import React from 'react';
import Chip from './Chip';
import { SectionLabel } from './SectionLabel';

// 스킬 섹션 (Figma 상세페이지 1-5) — 숙련도 미표출
interface SkillSectionProps {
  label?: string;
  skills: string[];
  className?: string;
}

export function SkillSection({ label = '스킬', skills, className = '' }: SkillSectionProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`.trim()}>
      <SectionLabel icon="hash">{label}</SectionLabel>
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
