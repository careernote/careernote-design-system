import React from 'react';

// 상세페이지 경력·학력 나열 — 헤더 아래에서 회사·학교를 한눈에(이름 · 직무/전공 ··· 기간). 아래 HistoryEntry 는 활동까지 펼친 상세
export interface OverviewRow {
  /** 회사·학교 이름 */
  name: string;
  /** 직무 / 전공·학위·상태 */
  sub?: string;
  /** 예: "2022. 03 - 현재 (4년 8개월)" */
  period?: string;
}

export interface OverviewGroup {
  /** 예: '경력' · '학력' */
  label: string;
  rows: OverviewRow[];
}

interface CareerOverviewProps {
  groups: OverviewGroup[];
  className?: string;
}

export function CareerOverview({ groups, className = '' }: CareerOverviewProps) {
  const shown = groups.filter((g) => g.rows.length > 0);
  if (!shown.length) return null;
  return (
    <div className={`flex flex-col gap-4 ${className}`.trim()}>
      {shown.map((g) => (
        <div key={g.label} className="flex gap-4">
          <span className="shrink-0 w-10 text-body2 font-semibold text-gray900">{g.label}</span>
          <ul className="m-0 p-0 list-none min-w-0 flex-1 flex flex-col gap-2">
            {g.rows.map((r, i) => (
              <li key={i} className="min-w-0 flex items-baseline justify-between gap-4">
                <span className="min-w-0 truncate text-body2" title={[r.name, r.sub].filter(Boolean).join(' ')}>
                  <span className="font-medium text-gray900">{r.name}</span>
                  {r.sub && <span className="text-gray700"> {r.sub}</span>}
                </span>
                {r.period && <span className="shrink-0 text-body2 text-gray600 tabular-nums">{r.period}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CareerOverview;
