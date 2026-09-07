import React from 'react';
import Chip from './Chip';
import { ProfileAvatar } from './ProfileAvatar';

// 카드 상단 프로필 블록 — 아바타 + 이름 + 칩 + "경력 N년 · 직무" (Figma 1-1)
export type FitnessLevel = 'high' | 'normal' | 'low';

export const FITNESS_LABEL: Record<FitnessLevel, string> = {
  high: '적합도 높음',
  normal: '적합도 보통',
  low: '적합도 낮음',
};

const FITNESS_COLOR: Record<FitnessLevel, 'blue' | 'green' | 'amber'> = {
  high: 'blue',
  normal: 'green',
  low: 'amber',
};

/** [적합도] chip — 공고 지원자 카드 전용. 높음 blue / 보통 green / 낮음 amber(yellow) */
export function FitnessChip({ level, muted = false }: { level?: FitnessLevel; muted?: boolean }) {
  // level 미지정 = 검토 전 (basic)
  return (
    <Chip size="M" variant="soft" color={muted || !level ? 'basic' : FITNESS_COLOR[level]} className="font-normal">
      {level ? FITNESS_LABEL[level] : '검토 전'}
    </Chip>
  );
}

/** [업데이트] chip — 인재풀 카드 전용. 30일 이내 purple soft, 그 외 black soft */
export function UpdatedChip({ daysAgo }: { daysAgo: number }) {
  return (
    <Chip size="M" variant="soft" color={daysAgo <= 30 ? 'purple' : 'black'} className="font-normal">
      {daysAgo}일 전 업데이트
    </Chip>
  );
}

interface CandidateProfileProps {
  name: string;
  imageUrl?: string;
  /** 예: "경력 8년" */
  careerLabel: string;
  /** 예: "프론트엔드" */
  job: string;
  /** 이름 오른쪽 칩 (FitnessChip / UpdatedChip) */
  badge?: React.ReactNode;
  /** 우측 끝 영역 (지원 상태 칩·지원일 등) */
  aside?: React.ReactNode;
  className?: string;
}

export function CandidateProfile({ name, imageUrl, careerLabel, job, badge, aside, className = '' }: CandidateProfileProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`.trim()}>
      <ProfileAvatar name={name} imageUrl={imageUrl} />
      <div className="min-w-0 flex-1 flex flex-col justify-center gap-1">
        <div className="flex items-center gap-2">
          <span className="text-body1 font-semibold text-gray900 truncate">{name}</span>
          {badge}
        </div>
        <div className="flex items-center gap-2 text-body2 text-gray700">
          <span>{careerLabel}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-gray700" />
          <span>{job}</span>
        </div>
      </div>
      {aside}
    </div>
  );
}

export default CandidateProfile;
