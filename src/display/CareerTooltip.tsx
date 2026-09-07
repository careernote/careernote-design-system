import React from 'react';

// 경력 전체 목록 오버레이 (Figma "tooltip" — 경력 2개 이상일 때 arrow 클릭 시 하단 표출)
// 폭은 부모(카드 본문) 100%. 회사명·직무는 말줄임, 기간은 항상 보이도록 shrink-0
export interface CareerEntry {
  company: string;
  role: string;
  /** 예: "24.12 ~ 현재" */
  period: string;
}

interface CareerTooltipProps {
  careers: CareerEntry[];
  className?: string;
}

export function CareerTooltip({ careers, className = '' }: CareerTooltipProps) {
  return (
    <div
      className={`w-full flex flex-col gap-3 px-5 py-4 bg-white100 border border-border_gray rounded-large shadow-normal-soft ${className}`.trim()}
    >
      {careers.map((c, i) => (
        <div key={i} className="flex items-center gap-1 min-w-0">
          <span className="text-body2 font-semibold text-gray900 truncate" title={c.company}>{c.company}</span>
          <span className="text-body2 text-gray700 truncate" title={c.role}>{c.role}</span>
          <span className="shrink-0 text-detail text-gray600">{c.period}</span>
        </div>
      ))}
    </div>
  );
}

export default CareerTooltip;
