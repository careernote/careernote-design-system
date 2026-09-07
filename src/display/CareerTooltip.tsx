import React from 'react';

// 경력 전체 목록 오버레이 (Figma "tooltip" — 경력 2개 이상일 때 arrow 클릭 시 하단 표출)
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
      className={`w-[299px] flex flex-col gap-3 px-5 py-4 bg-white100 border border-border_gray rounded-large shadow-normal-soft ${className}`.trim()}
    >
      {careers.map((c, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="text-body2 font-medium text-gray800">{c.company}</span>
          <span className="text-body2 font-medium text-gray700">{c.role}</span>
          <span className="text-detail text-gray600">{c.period}</span>
        </div>
      ))}
    </div>
  );
}

export default CareerTooltip;
