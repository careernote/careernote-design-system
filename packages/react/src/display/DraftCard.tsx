import React from 'react';
import Button from '../buttons/Button';
import Chip from './Chip';

export interface DraftCardProps {
  /** 비어 있으면 "(제목 없음)" */
  title?: string;
  /** "2026. 10. 22. 오후 4:58 임시저장" 처럼 완성된 문장 */
  savedAtText: string;
  /** 저장한 단계(1-based)와 전체 단계 수 */
  step: number;
  stepCount: number;
  /** 단계 바 옆 보조 문구(예: "팀 · 복지까지 입력") */
  stepLabel?: string;
  chipLabel?: string;
  actionLabel?: string;
  onAction: () => void;
  deleteLabel?: string;
  onDelete?: () => void;
  className?: string;
}

/**
 * 작성 중(임시저장) 카드 — 공고 현황 목록 첫 칸에 공고 카드와 같은 크기로 놓는다(ATS, 2026-10-22 C안).
 * 점선 테두리 + "작성 중" 칩 + 단계 진행 바 + 이어서 만들기 / 삭제.
 */
export function DraftCard({
  title,
  savedAtText,
  step,
  stepCount,
  stepLabel,
  chipLabel = '작성 중',
  actionLabel = '이어서 만들기',
  onAction,
  deleteLabel = '삭제',
  onDelete,
  className = '',
}: DraftCardProps) {
  const bars = Array.from({ length: Math.max(1, stepCount) }, (_, i) => i < step);
  return (
    <div
      className={`flex min-h-[180px] flex-col justify-between gap-5 rounded-[16px] border-[1.5px] border-dashed border-gray400 bg-white100 px-8 py-6 ${className}`}
      data-testid="draft-card"
    >
      <div className="flex items-start gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="m-0 truncate text-xl font-semibold leading-6 text-gray800" title={title}>
            {title || '(제목 없음)'}
          </p>
          <p className="m-0 text-base font-normal leading-5 text-gray700">{savedAtText}</p>
        </div>
        <div className="ml-auto shrink-0">
          <Chip size="M" color="basic" variant="soft">
            {chipLabel}
          </Chip>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-detail text-gray700" aria-label={`${step} / ${stepCount} 단계`}>
        {bars.map((on, i) => (
          <i key={i} className={`block h-1 w-10 rounded-full ${on ? 'bg-sky' : 'bg-gray400'}`} />
        ))}
        <span className="ml-1.5">
          {step} / {stepCount}
          {stepLabel ? ` · ${stepLabel}` : ''}
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <Button size="sm" color="sky" onClick={onAction}>
          {actionLabel}
        </Button>
        {onDelete && (
          <Button size="sm" color="white" onClick={onDelete}>
            {deleteLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export default DraftCard;
