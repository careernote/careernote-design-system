import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { CareerTooltip, type CareerEntry } from './CareerTooltip';

// 카드 본문 — AI 요약 레포트 + 최근 경력(2개 이상이면 드롭다운) + 최종 학력 (Figma 1-3, 1-4)
export interface EducationEntry {
  school: string;
  /** 학사 / 석사 … */
  degree?: string;
  major?: string;
  /** 예: "16.03 ~ 21.02" */
  period?: string;
  /** 졸업 / 재학 / 휴학 … */
  status?: string;
}

interface CandidateHistoryProps {
  /** 없으면 AI 요약 블록 미표출 */
  aiSummary?: string;
  /** 최신순. 첫 항목이 표출되고 2개 이상이면 arrow → 전체 툴팁 */
  careers: CareerEntry[];
  education?: EducationEntry;
  className?: string;
}

/** AI 요약 — 접힌 상태는 정확히 3줄 높이(3lh)라 카드끼리 줄이 맞는다. 넘치면 더보기/접기 */
const SUMMARY_FADE: React.CSSProperties = { maskImage: 'linear-gradient(to right, transparent, black 24px)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 24px)' };
function SummaryBox({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || expanded) return;
    // line-clamp 가 걸린 요소는 scrollHeight 가 잘린 높이로 나온다 — 잠깐 clamp 를 풀고 전체 높이를 잰다(같은 프레임이라 깜빡임 없음)
    const measure = () => {
      const clamped = el.clientHeight;
      const { height, display } = el.style;
      el.style.height = 'auto';
      el.style.display = 'block';
      const full = el.scrollHeight;
      el.style.height = height;
      el.style.display = display;
      setOverflow(full > clamped + 1);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, [text, expanded]);

  const toggleable = overflow || expanded;
  const toggle = () => setExpanded((v) => !v);

  return (
    // 더보기/접기가 있으면 박스 어디를 눌러도 토글. 카드 onClick(상세 열기)으로 전파 방지, 드래그로 텍스트 선택 중이면 무시
    <div
      className={`relative p-3 rounded-small bg-bg_gray1 ${toggleable ? 'cursor-pointer' : ''}`}
      onClick={
        toggleable
          ? (e) => {
              e.stopPropagation();
              if (window.getSelection()?.toString()) return;
              toggle();
            }
          : undefined
      }
    >
      {/* 높이는 3lh(현재 줄 높이 × 3) — 테마의 줄 높이가 달라도 4번째 줄이 비치지 않는다 */}
      <p
        ref={ref}
        className={`text-body2 text-gray800 whitespace-pre-line ${expanded ? '' : 'line-clamp-3 overflow-hidden'}`}
        style={expanded ? undefined : { height: '3lh' }}
      >
        {text}
      </p>
      {toggleable && (
        <button
          type="button"
          aria-expanded={expanded}
          // 접힌 상태는 3번째 줄 끝에 겹쳐 둬 박스 높이가 카드마다 같다. 펼치면 본문 아래로
          className={`border-0 p-0 text-detail font-medium text-gray600 hover:text-gray900 ${
            expanded ? 'mt-1 ml-auto block bg-transparent' : 'absolute right-3 bottom-3 bg-bg_gray1 pl-6'
          }`}
          style={expanded ? undefined : SUMMARY_FADE}
          onClick={(e) => {
            e.stopPropagation(); // 박스 onClick 과 이중 토글 방지
            toggle();
          }}
        >
          {expanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
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
      {aiSummary && (
        <div className="flex flex-col gap-1.5">
          <span className="text-detail font-medium text-gray700">AI 요약 레포트</span>
          <SummaryBox text={aiSummary} />
        </div>
      )}

      {latest && (
        <div ref={wrapRef} className="relative flex items-center gap-4">
          <span className="shrink-0 text-body2 font-medium text-gray700">경력</span>
          <div className="min-w-0 flex-1 flex items-center gap-1">
            <span className="shrink-0 max-w-[60%] text-body2 font-semibold text-gray900 truncate">{latest.company}</span>
            <span className="min-w-0 text-body2 text-gray700 truncate">{latest.role}</span>
            <span className="shrink-0 text-detail text-gray600">{latest.period}</span>
          </div>
          {hasMore && (
            <button
              type="button"
              aria-label="경력 전체 보기"
              aria-expanded={open}
              onClick={(e) => {
                e.stopPropagation(); // 카드 onClick(상세 열기)으로 전파 방지
                setOpen((v) => !v);
              }}
              className={`shrink-0 flex items-center justify-center w-[18px] h-[18px] text-gray800 transition-transform ${open ? 'rotate-180' : ''}`}
            >
              <Icon name="arrow-down" size={18} />
            </button>
          )}
          {open && (
            <div className="absolute inset-x-0 top-full mt-1 z-10" onClick={(e) => e.stopPropagation()}>
              <CareerTooltip careers={careers} />
            </div>
          )}
        </div>
      )}

      {education && (
        <div className="flex items-center gap-4">
          <span className="shrink-0 text-body2 font-medium text-gray700">학력</span>
          <div className="min-w-0 flex-1 flex items-center gap-1">
            <span className="shrink-0 max-w-[60%] text-body2 font-semibold text-gray900 truncate">{education.school}</span>
            {education.degree && <span className="shrink-0 whitespace-nowrap text-body2 text-gray700">{education.degree}</span>}
            {education.major && <span className="min-w-0 text-body2 text-gray700 truncate">{education.major}</span>}
            {education.period && <span className="shrink-0 text-detail text-gray600">{education.period}</span>}
            {education.status && <span className="shrink-0 text-detail text-gray600">{education.status}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateHistory;
