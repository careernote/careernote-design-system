import React from 'react';
import { CandidateProfile, UpdatedChip } from './CandidateProfile';
import { CandidateHistory, type EducationEntry } from './CandidateHistory';
import { ExperienceItem, type ExperienceEntry } from './ExperienceItem';
import type { CareerEntry } from './CareerTooltip';

// 인재풀 카드 (Figma "Talentpool_card") — 지원 상태 없음, 업데이트 칩, 대표 활동 1개, 메모 없음
interface TalentpoolCardProps {
  name: string;
  imageUrl?: string;
  careerLabel: string;
  job: string;
  /** 마지막 프로필 업데이트로부터 경과 일수 — 30일 이내 purple, 이후 black */
  updatedDaysAgo: number;
  /** 프로필 전체 한줄 요약 */
  aiSummary: string;
  careers: CareerEntry[];
  education?: EducationEntry;
  /** 대표 활동 1개 */
  experience?: ExperienceEntry;
  onExperienceClick?: (exp: ExperienceEntry) => void;
  className?: string;
}

export function TalentpoolCard({
  name,
  imageUrl,
  careerLabel,
  job,
  updatedDaysAgo,
  aiSummary,
  careers,
  education,
  experience,
  onExperienceClick,
  className = '',
}: TalentpoolCardProps) {
  return (
    <div
      className={`w-[500px] max-w-full flex flex-col gap-4 p-5 bg-white100 border border-border_gray rounded-xlarge shadow-wide-light ${className}`.trim()}
    >
      <div className="flex flex-col gap-4">
        <CandidateProfile
          name={name}
          imageUrl={imageUrl}
          careerLabel={careerLabel}
          job={job}
          badge={<UpdatedChip daysAgo={updatedDaysAgo} />}
        />
        <hr className="border-0 border-t border-border_gray" />
      </div>
      <div className="flex flex-col gap-[17px]">
        <CandidateHistory aiSummary={aiSummary} careers={careers} education={education} />
        {experience && (
          <ExperienceItem {...experience} onClick={onExperienceClick ? () => onExperienceClick(experience) : undefined} />
        )}
      </div>
    </div>
  );
}

export default TalentpoolCard;
