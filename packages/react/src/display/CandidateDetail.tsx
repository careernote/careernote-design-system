import React from 'react';
import { AttachmentBar, type AttachmentEntry } from './AttachmentBar';
import { CandidateHeader, type CandidateHeaderData } from './CandidateHeader';
import { ProfileSummary, type SummaryItem } from './ProfileSummary';
import { HistoryEntry } from './HistoryEntry';
import { ActivityDetail, type ActivityComment } from './ActivityDetail';
import { SkillSection } from './SkillSection';
import { ProfileItemSection, type ProfileItemEntry } from './ProfileItemSection';

// 지원자/인재 상세페이지 조립체 (Figma "상세페이지") — 데이터만 넘기면 섹션 순서·구분선·간격을 여기서 맞춘다.
// 세부 커스텀이 필요하면 아래 부품(AttachmentBar·CandidateHeader·ProfileSummary·HistoryEntry·ActivityDetail·SkillSection·ProfileItemSection)을 직접 조립한다.
export interface ActivityData {
  id?: string;
  title: string;
  period?: string;
  images?: string[];
  skills?: string[];
  body?: string;
  result?: string;
  comments?: ActivityComment[];
}

export interface HistoryData {
  type?: 'career' | 'education';
  name: string;
  role?: string;
  period?: string;
  logoUrl?: string;
  activities?: ActivityData[];
}

interface CandidateDetailProps {
  /** 공고 지원자 상세에만 */
  attachments?: AttachmentEntry[];
  header: CandidateHeaderData;
  onEditProfile?: () => void;
  /** 인재풀 상세에만 */
  summary?: SummaryItem[];
  /** 기본 '프로필 요약' (인재풀 상세는 '프로필 세줄 요약') */
  summaryTitle?: string;
  /** 경력 → 학력 순 */
  histories?: HistoryData[];
  skills?: string[];
  awards?: ProfileItemEntry[];
  certifications?: ProfileItemEntry[];
  languages?: ProfileItemEntry[];
  /** 활동 블록에 붙일 id 접두 — 평가 모달의 Fit 활동 클릭 시 스크롤 타깃 (`${prefix}${activity.id}`) */
  activityIdPrefix?: string;
  className?: string;
}

const Divider = () => <hr className="border-0 border-t border-border_gray" />;

export function CandidateDetail({
  attachments,
  header,
  onEditProfile,
  summary,
  summaryTitle,
  histories = [],
  skills,
  awards,
  certifications,
  languages,
  activityIdPrefix = 'activity-',
  className = '',
}: CandidateDetailProps) {
  const hasBottom = !!(skills?.length || awards?.length || certifications?.length || languages?.length);
  return (
    <div className={`w-[940px] max-w-full flex flex-col gap-7 px-8 pt-8 pb-10 bg-white100 rounded-xlarge ${className}`.trim()}>
      {attachments && attachments.length > 0 && <AttachmentBar items={attachments} />}
      <CandidateHeader {...header} onEdit={onEditProfile} />
      <Divider />
      {summary && summary.length > 0 && <ProfileSummary title={summaryTitle} items={summary} />}
      {histories.map((h, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Divider />}
          <HistoryEntry type={h.type} name={h.name} role={h.role} period={h.period} logoUrl={h.logoUrl}>
            {h.activities?.map((a, j) => (
              <div key={a.id ?? j} id={a.id ? `${activityIdPrefix}${a.id}` : undefined}>
                <ActivityDetail {...a} />
              </div>
            ))}
          </HistoryEntry>
        </React.Fragment>
      ))}
      {hasBottom && (
        <>
          <Divider />
          <div className="flex flex-col gap-10">
            {skills && skills.length > 0 && <SkillSection skills={skills} />}
            {awards && awards.length > 0 && <ProfileItemSection icon="trophy" label="수상경력 및 수료" items={awards} />}
            {certifications && certifications.length > 0 && <ProfileItemSection icon="certification" label="자격증" items={certifications} />}
            {languages && languages.length > 0 && <ProfileItemSection icon="translate" label="외국어" items={languages} />}
          </div>
        </>
      )}
    </div>
  );
}

export default CandidateDetail;
