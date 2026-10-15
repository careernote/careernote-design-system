import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { CareerTooltip, type CareerEntry } from './CareerTooltip';

// 카드 본문 — AI 요약(레포트 문단 또는 세 줄 bullet) + 최근 경력(2개 이상이면 드롭다운) + 최종 학력 + 스킬 (Figma 1-3, 1-4, Talentpool_card)
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
  /** AI 세 줄 요약 — 주면 aiSummary 대신 라벨 없는 bullet 박스로 그린다 (Figma Talentpool_card) */
  summaryLines?: string[];
  /** 최신순. 첫 항목이 표출되고 2개 이상이면 arrow → 전체 툴팁 */
  careers: CareerEntry[];
  education?: EducationEntry;
  /** 스킬 줄 — 앞 SKILLS_SHOWN 개를 쉼표로, 나머지는 "+ N". 없거나 비면 미표출 */
  skills?: string[];
  /** 경력·학력이 없어도 줄을 남기고 "-" 로 표시 (인재풀 카드 — 카드끼리 줄 높이를 맞춘다) */
  showEmpty?: boolean;
  className?: string;
}

/** 값이 없는 줄 — "경력  -" */
function EmptyRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="shrink-0 text-body2 font-medium text-gray700">{label}</span>
      <span className="text-body2 text-gray600">-</span>
    </div>
  );
}

/** 스킬 줄에 이름으로 보여 주는 개수 */
export const SKILLS_SHOWN = 5;

/** AI 세 줄 요약 — bg_gray2 박스 · 4px 점 + 한 줄씩(넘치면 말줄임) */
function SummaryBullets({ lines }: { lines: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-1 rounded-small bg-bg_gray2 py-3 pl-4 pr-3">
      {lines.map((line, i) => (
        <li key={i} className="flex items-center gap-3 text-body2 text-gray900">
          <span className="h-1 w-1 shrink-0 rounded-full bg-gray900" aria-hidden />
          <span className="min-w-0 truncate">{line}</span>
        </li>
      ))}
    </ul>
  );
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

export function CandidateHistory({ aiSummary, summaryLines, careers, education, skills, showEmpty = false, className = '' }: CandidateHistoryProps) {
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
      {summaryLines?.length ? (
        <SummaryBullets lines={summaryLines} />
      ) : aiSummary ? (
        <div className="flex flex-col gap-1.5">
          <span className="text-detail font-medium text-gray700">AI 요약 레포트</span>
          <SummaryBox text={aiSummary} />
        </div>
      ) : null}

      {latest ? (
        <div ref={wrapRef} className="relative flex items-center gap-4">
          <span className="shrink-0 text-body2 font-medium text-gray700">경력</span>
          <div className="min-w-0 flex-1 flex items-center gap-1">
            <span className="min-w-0 max-w-[60%] text-body2 font-semibold text-gray900 truncate">{latest.company}</span>
            <span className="min-w-0 shrink-[4] text-body2 text-gray700 truncate">{latest.role}</span>
            <span className="shrink-0 whitespace-nowrap text-detail text-gray600">{latest.period}</span>
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
      ) : showEmpty ? (
        <EmptyRow label="경력" />
      ) : null}

      {education ? (
        <div className="flex items-center gap-4">
          <span className="shrink-0 text-body2 font-medium text-gray700">학력</span>
          <div className="min-w-0 flex-1 flex items-center gap-1">
            <span className="min-w-0 max-w-[60%] text-body2 font-semibold text-gray900 truncate">{education.school}</span>
            {education.degree && <span className="shrink-0 whitespace-nowrap text-body2 text-gray700">{education.degree}</span>}
            {education.major && <span className="min-w-0 shrink-[4] text-body2 text-gray700 truncate">{education.major}</span>}
            {education.period && <span className="shrink-0 whitespace-nowrap text-detail text-gray600">{education.period}</span>}
            {education.status && <span className="shrink-0 whitespace-nowrap text-detail text-gray600">{education.status}</span>}
          </div>
        </div>
      ) : showEmpty ? (
        <EmptyRow label="학력" />
      ) : null}

      {skills && skills.length > 0 && (
        <div className="flex items-center gap-4">
          <span className="shrink-0 text-body2 font-medium text-gray700">스킬</span>
          <div className="min-w-0 flex-1 flex items-center gap-1">
            <span className="min-w-0 truncate text-body2 font-medium text-gray800">{skills.slice(0, SKILLS_SHOWN).join(', ')}</span>
            {skills.length > SKILLS_SHOWN && (
              <span className="shrink-0 whitespace-nowrap text-body2 text-gray600">+ {skills.length - SKILLS_SHOWN}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateHistory;
