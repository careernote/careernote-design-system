import React from 'react';

// AI 지원자 평가 카드 (평가 모달 1-1) — sky 테두리, sky 헤더(제목 + 적합도), 3줄 내외 불릿
interface AiEvaluationCardProps {
  title?: string;
  /** 예: "높음" — "직무 적합도 {fitLabel}" 로 표출 */
  fitLabel: string;
  items: string[];
  className?: string;
}

export function AiEvaluationCard({ title = 'AI 지원자 평가', fitLabel, items, className = '' }: AiEvaluationCardProps) {
  return (
    <div className={`flex flex-col rounded-large border border-sky overflow-hidden ${className}`.trim()}>
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-sky text-white100">
        <span className="text-body2 font-medium">{title}</span>
        <span className="text-body2 font-medium">
          직무 적합도 <b className="font-bold">{fitLabel}</b>
        </span>
      </div>
      <ul className="flex flex-col gap-4 px-5 pt-5 pb-6 bg-white100">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="shrink-0 w-1 h-1 mt-2 rounded-full bg-gray900" />
            <span className="text-body2 leading-5 font-medium text-gray800">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AiEvaluationCard;
