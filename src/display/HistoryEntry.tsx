import React from 'react';
import Icon from './Icon';

// 경력/학력 엔트리 (Figma "experience-entry") — 로고 칸 + 기업명/학교명 · 기간 · 직무/학과, 아래에 활동 상세(children)
interface HistoryEntryProps {
  type?: 'career' | 'education';
  /** 기업명 / 학교명 */
  name: string;
  /** 직무 / 학과 */
  role?: string;
  /** 예: "2024. 05 - 2026. 01 · 1년 9월" */
  period?: string;
  logoUrl?: string;
  /** ActivityDetail 목록 — 항목 사이 구분선 자동 */
  children?: React.ReactNode;
  className?: string;
}

export function HistoryEntry({ type = 'career', name, role, period, logoUrl, children, className = '' }: HistoryEntryProps) {
  const items = React.Children.toArray(children);
  return (
    <div className={`flex items-start gap-4 ${className}`.trim()}>
      <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-medium bg-bg_gray1 border border-border_gray overflow-hidden">
        {logoUrl ? (
          <img src={logoUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <Icon name={type === 'career' ? 'company' : 'graduation_hat'} size={24} color="#727180" />
        )}
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3">
            <span className="text-subtitle3 font-bold text-gray900 truncate">{name}</span>
            {period && <span className="shrink-0 text-body2 text-gray600">{period}</span>}
          </div>
          {role && <span className="text-body1 font-medium text-gray700">{role}</span>}
        </div>
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {i > 0 && <hr className="border-0 border-t border-border_gray" />}
            {child}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default HistoryEntry;
