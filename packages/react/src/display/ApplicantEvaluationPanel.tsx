import React from 'react';
import { AiEvaluationCard } from './AiEvaluationCard';
import { ProfileSummary, type SummaryItem } from './ProfileSummary';
import { FitActivityItem } from './FitActivityItem';
import { RequirementCard, type RequirementItem } from './RequirementCard';

// 지원자평가 모달 본문 (Figma "지원자평가 모달") — 모달 껍데기(Modal/ResponsiveModal)는 소비자가 감싼다
export interface FitActivity {
  id: string;
  title: string;
  org: string;
  imageUrl?: string;
}

interface ApplicantEvaluationPanelProps {
  fitLabel: string;
  evaluation: string[];
  /** 프로필 요약 — 공고 지원자 상세일 때만 */
  summary?: SummaryItem[];
  /** 공고와 가장 밀접한 활동 상위 3개 (기준 미달 시 1~2개) */
  fitActivities?: FitActivity[];
  onFitActivityClick?: (activity: FitActivity) => void;
  /** 자격요건: 충족/미충족 */
  requirements?: RequirementItem[];
  /** 우대조건: 충족한 항목만 */
  preferences?: RequirementItem[];
  className?: string;
}

export function ApplicantEvaluationPanel({
  fitLabel,
  evaluation,
  summary,
  fitActivities = [],
  onFitActivityClick,
  requirements = [],
  preferences = [],
  className = '',
}: ApplicantEvaluationPanelProps) {
  const met = requirements.filter((r) => r.status !== 'unmet');
  const unmet = requirements.filter((r) => r.status === 'unmet');
  return (
    <div className={`w-[601px] max-w-full flex flex-col gap-5 px-5 py-6 bg-white100 rounded-xlarge ${className}`.trim()}>
      <AiEvaluationCard fitLabel={fitLabel} items={evaluation} />
      {summary && <ProfileSummary items={summary} />}
      {fitActivities.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-body1 font-semibold text-gray900">
            주요업무와의 <span className="text-sky">Fit 되는 활동</span> 확인하기
          </span>
          <div className="flex flex-col">
            {fitActivities.map((a, i) => (
              <React.Fragment key={a.id}>
                {i > 0 && <hr className="border-0 border-t border-border_gray" />}
                <FitActivityItem title={a.title} org={a.org} imageUrl={a.imageUrl} onClick={onFitActivityClick ? () => onFitActivityClick(a) : undefined} />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      {(requirements.length > 0 || preferences.length > 0) && (
        <div className="flex flex-col gap-3">
          {met.length > 0 && <RequirementCard title="✅  자격요건을 충족했어요." items={met.map((r) => ({ ...r, status: 'met' as const }))} />}
          {unmet.length > 0 && <RequirementCard title="🚨  자격요건 확인이 필요해요" items={unmet} />}
          {preferences.length > 0 && <RequirementCard title="👍  우대 조건을 충족했어요." items={preferences.map((p) => ({ ...p, status: 'none' as const }))} />}
        </div>
      )}
    </div>
  );
}

export default ApplicantEvaluationPanel;
