import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { CareerTooltip, type CareerEntry } from './CareerTooltip';

// 카드 본문 — AI 요약 레포트 + 최근 경력(2개 이상이면 드롭다운) + 최종 학력 (Figma 1-3, 1-4)
export interface EducationEntry {
  school: string;
  /** 학사 / 석사 … */
  degree: string;
  major: string;
  /** 예: "16.03 ~ 21.02" */
  period: string;
  /** 졸업 / 재학 / 휴학 … */
  status: string;
}

interface CandidateHistoryProps {
  aiSummary: string;
  /** 최신순. 첫 항목이 표출되고 2개 이상이면 arrow → 전체 툴팁 */
  careers: CareerEntry[];
  education?: EducationEntry;
  className?: string;
}

export function CandidateHistory({ aiSummary, careers, education, className = '' }: CandidateHistoryProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const latest = careers[0];
  const hasMore = careers.length >= 2;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`flex flex-col gap-3 ${className}`.trim()}>
      <div className="flex flex-col gap-1.5">
        <span className="text-detail font-medium text-gray700">AI 요약 레포트</span>
        <div className="p-3 rounded-small bg-bg_gray1">
          <p className="text-body2 text-gray800">{aiSummary}</p>
        </div>
      </div>

      {latest && (
        <div ref={wrapRef} className="relative flex items-center gap-4">
          <span className="shrink-0 text-body2 font-medium text-gray700">경력</span>
          <div className="min-w-0 flex-1 flex items-center gap-1">
            <span className="text-body2 font-medium text-gray800 truncate">{latest.company}</span>
            <span className="text-body2 font-medium text-gray700 truncate">{latest.role}</span>
            <span className="shrink-0 text-detail text-gray600">{latest.period}</span>
          </div>
          {hasMore && (
            <button
              type="button"
              aria-label="경력 전체 보기"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`shrink-0 flex items-center justify-center w-[18px] h-[18px] text-gray800 transition-transform ${open ? 'rotate-180' : ''}`}
            >
              <Icon name="arrow-down" size={18} />
            </button>
          )}
          {open && <CareerTooltip careers={careers} className="absolute right-0 top-full mt-1 z-10" />}
        </div>
      )}

      {education && (
        <div className="flex items-center gap-4">
          <span className="shrink-0 text-body2 font-medium text-gray700">학력</span>
          <div className="min-w-0 flex-1 flex items-center gap-1">
            <span className="text-body2 font-medium text-gray800 truncate">{education.school}</span>
            <span className="text-body2 font-medium text-gray800">{education.degree}</span>
            <span className="text-body2 font-medium text-gray700 truncate">{education.major}</span>
            <span className="shrink-0 text-detail text-gray600">{education.period}</span>
            <span className="shrink-0 text-detail text-gray600">{education.status}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateHistory;
