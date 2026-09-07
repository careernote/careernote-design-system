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
  /** 프로필 전체 한줄 요약 — 없으면 미표출 */
  aiSummary?: string;
  careers: CareerEntry[];
  education?: EducationEntry;
  /** 대표 활동 1개 */
  experience?: ExperienceEntry;
  onExperienceClick?: (exp: ExperienceEntry) => void;
  /** 프로필 우측 끝 (북마크 등) */
  aside?: React.ReactNode;
  /** 카드 맨 아래 (상태 배지·지원 이력 등 소비처 부가 정보) */
  footer?: React.ReactNode;
  /** 카드 클릭 (상세 열기) */
  onClick?: () => void;
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
  aside,
  footer,
  onClick,
  className = '',
}: TalentpoolCardProps) {
  return (
    <div
      onClick={onClick}
      className={`w-full flex flex-col gap-4 p-5 bg-white100 border border-border_gray rounded-xlarge shadow-wide-light ${
        onClick ? 'cursor-pointer transition-colors hover:border-gray400' : ''
      } ${className}`.trim()}
    >
      <div className="flex flex-col gap-4">
        <CandidateProfile
          name={name}
          imageUrl={imageUrl}
          careerLabel={careerLabel}
          job={job}
          badge={<UpdatedChip daysAgo={updatedDaysAgo} />}
          aside={aside}
        />
        <hr className="border-0 border-t border-border_gray" />
      </div>
      <div className="flex flex-col gap-[17px]">
        <CandidateHistory aiSummary={aiSummary} careers={careers} education={education} />
        {experience && (
          <ExperienceItem {...experience} onClick={onExperienceClick ? () => onExperienceClick(experience) : undefined} />
        )}
        {footer}
      </div>
    </div>
  );
}

export default TalentpoolCard;
