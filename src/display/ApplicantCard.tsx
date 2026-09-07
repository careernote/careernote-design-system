import React from 'react';
import Chip from './Chip';
import Icon from './Icon';
import { CandidateProfile, FitnessChip, type FitnessLevel } from './CandidateProfile';
import { CandidateHistory, type EducationEntry } from './CandidateHistory';
import { ExperienceItem, type ExperienceEntry } from './ExperienceItem';
import type { CareerEntry } from './CareerTooltip';

// 공고 채용 지원자 카드 (Figma "applicant_card")
interface ApplicantCardProps {
  name: string;
  imageUrl?: string;
  careerLabel: string;
  job: string;
  /** 미지정 = 검토 전 */
  fitness?: FitnessLevel;
  /** 채용 프로세스 단계명 (예: "접수") */
  status: string;
  /** 단계 색상 — 프로세스 단계 색을 따른다. CSS color */
  statusColor?: string;
  /** 단계 칩 클릭 → 이동할 단계 선택 드롭다운은 소비자가 연결 */
  onStatusClick?: () => void;
  /** 최초 지원일 (예: "24.03.15") */
  appliedAt: string;
  aiSummary?: string;
  careers: CareerEntry[];
  education?: EducationEntry;
  /** 공고에 가장 적합한 활동 최대 2개 */
  experiences?: ExperienceEntry[];
  onExperienceClick?: (exp: ExperienceEntry, index: number) => void;
  memo?: string;
  /** 카드 클릭 (상세 열기) — 단계 칩·활동 클릭은 전파되지 않는다 */
  onClick?: () => void;
  className?: string;
}

export function ApplicantCard({
  name,
  imageUrl,
  careerLabel,
  job,
  fitness,
  status,
  statusColor = '#03C75A',
  onStatusClick,
  appliedAt,
  aiSummary,
  careers,
  education,
  experiences = [],
  onExperienceClick,
  memo,
  onClick,
  className = '',
}: ApplicantCardProps) {
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
          badge={<FitnessChip level={fitness} />}
          aside={
            <div className="shrink-0 flex flex-col items-end justify-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusClick?.();
                }}
                aria-label={`지원 상태: ${status}`}
              >
                <Chip size="XL" variant="soft" color="basic" className="gap-1">
                  <span style={{ color: statusColor }}>{status}</span>
                  <Icon name="arrow-down" size={18} color="gray800" />
                </Chip>
              </button>
              <div className="flex items-center gap-1 text-gray600">
                <Icon name="clock" size={14} />
                <span className="text-detail">{appliedAt} 지원</span>
              </div>
            </div>
          }
        />
        <hr className="border-0 border-t border-border_gray" />
      </div>

      <div className="flex flex-col gap-[17px]">
        <CandidateHistory aiSummary={aiSummary} careers={careers} education={education} />
        {experiences.length > 0 && (
          <div className="flex flex-col gap-2">
            {experiences.slice(0, 2).map((exp, i) => (
              <ExperienceItem
                key={i}
                {...exp}
                onClick={
                  onExperienceClick
                    ? (e) => {
                        e.stopPropagation();
                        onExperienceClick(exp, i);
                      }
                    : undefined
                }
              />
            ))}
          </div>
        )}
        {memo !== undefined && (
          <div className="flex items-center gap-4 h-5">
            <span className="shrink-0 text-body2 font-medium text-gray700">메모</span>
            <span className="min-w-0 flex-1 text-body2 text-sky truncate">{memo}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicantCard;
