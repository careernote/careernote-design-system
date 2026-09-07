import React from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { FitnessChip, type FitnessLevel } from './CandidateProfile';

// 칸반보드 카드 (Figma "board_card" — type Default/불합격 × state Default/hover)
interface BoardCardProps {
  name: string;
  imageUrl?: string;
  /** 예: "경력 8년" */
  careerLabel: string;
  fitness: FitnessLevel;
  /** 불합격 — 회색 배경, 이름 흐림, "불합격" 라벨, 적합도 칩 basic */
  rejected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function BoardCard({ name, imageUrl, careerLabel, fitness, rejected = false, onClick, className = '' }: BoardCardProps) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`w-[285px] max-w-full flex items-center gap-2.5 p-3 text-left rounded-large border transition-all hover:shadow-normal-soft ${
        rejected
          ? 'bg-bg_gray1 border-border_gray'
          : 'bg-white100 border-gray400 hover:border-sky'
      } ${className}`.trim()}
    >
      <ProfileAvatar name={name} imageUrl={imageUrl} />
      <div className="min-w-0 flex-1 flex flex-col justify-center gap-1">
        <div className="flex items-center gap-1">
          <span className={`text-body1 font-semibold truncate ${rejected ? 'text-gray600' : 'text-gray900'}`}>{name}</span>
          {rejected && <span className="shrink-0 text-body2 font-medium text-gray500">불합격</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-body2 ${rejected ? 'text-gray600' : 'text-gray700'}`}>{careerLabel}</span>
          <FitnessChip level={fitness} muted={rejected} />
        </div>
      </div>
    </Tag>
  );
}

export default BoardCard;
