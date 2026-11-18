import React from 'react';
import { ApplicationAnswers, type AnswerEntry, type AnswerFile } from './ApplicationAnswers';
import { AttachmentBar, type AttachmentEntry } from './AttachmentBar';
import { CandidateHeader, type CandidateHeaderData } from './CandidateHeader';
import { ProfileSummary, type SummaryItem } from './ProfileSummary';
import { CareerOverview, type OverviewGroup } from './CareerOverview';
import { HistoryEntry } from './HistoryEntry';
import { ActivityDetail, type ActivityComment } from './ActivityDetail';
import { SkillSection } from './SkillSection';
import { ProfileItemSection, type ProfileItemEntry } from './ProfileItemSection';
import Icon from './Icon';
import { IconButton } from '../buttons/IconButton';

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
  /** etc = 기타 활동(전구 아이콘) */
  type?: 'career' | 'education' | 'etc';
  name: string;
  role?: string;
  period?: string;
  logoUrl?: string;
  activities?: ActivityData[];
}

interface CandidateDetailProps {
  /** 공고 지원자 상세에만 */
  attachments?: AttachmentEntry[];
  /** 공고 지원자 상세에만 — 지원서에 써 넣은 답변. 프로필 헤더 바로 아래에 놓인다 */
  answers?: AnswerEntry[];
  onAnswerFileClick?: (file: AnswerFile) => void;
  header: CandidateHeaderData;
  onEditProfile?: () => void;
  /** 인재풀 상세에만 */
  summary?: SummaryItem[];
  /** 기본 '프로필 요약' (인재풀 상세는 '프로필 세줄 요약') */
  summaryTitle?: string;
  /** 경력·학력 나열 — 요약 아래·활동 상세 위 (예: [{ label: '경력', rows }, { label: '학력', rows }]) */
  overview?: OverviewGroup[];
  /** 경력 → 학력 순 */
  histories?: HistoryData[];
  skills?: string[];
  awards?: ProfileItemEntry[];
  certifications?: ProfileItemEntry[];
  languages?: ProfileItemEntry[];
  /** 활동 블록에 붙일 id 접두 — 평가 모달의 Fit 활동 클릭 시 스크롤 타깃 (`${prefix}${activity.id}`) */
  activityIdPrefix?: string;
  /** 활동 수정 — 주면 활동 제목 줄에 수정 버튼(id 있는 활동만). 본인 프로필 화면용 */
  onEditActivity?: (activityId: string) => void;
  /** 활동 삭제 — 주면 활동 제목 줄에 삭제 버튼(id 있는 활동만) */
  onDeleteActivity?: (activityId: string) => void;
  /** 스킬·수상·자격증·외국어 편집 — 주면 섹션 라벨에 편집 버튼, 비어 있어도 섹션을 보여 준다(빈 섹션은 인쇄에서 숨김) */
  onEditSkills?: () => void;
  onEditAwards?: () => void;
  onEditCertifications?: () => void;
  onEditLanguages?: () => void;
  /** true 면 활동 본문을 모두 펼친다(더보기 없음) — 인쇄용 */
  expandAll?: boolean;
  className?: string;
}

const Divider = ({ className = '' }: { className?: string }) => <hr className={`border-0 border-t border-border_gray ${className}`.trim()} />;

export function CandidateDetail({
  attachments,
  answers,
  onAnswerFileClick,
  header,
  onEditProfile,
  summary,
  summaryTitle,
  overview,
  histories = [],
  skills,
  awards,
  certifications,
  languages,
  activityIdPrefix = 'activity-',
  onEditActivity,
  onDeleteActivity,
  onEditSkills,
  onEditAwards,
  onEditCertifications,
  onEditLanguages,
  expandAll = false,
  className = '',
}: CandidateDetailProps) {
  const activityActions = (a: ActivityData) =>
    a.id && (onEditActivity || onDeleteActivity) ? (
      <>
        {onEditActivity && (
          <IconButton variant="ghost" aria-label={`${a.title} 수정`} onClick={() => onEditActivity(a.id!)} data-testid="candidate-activity-edit">
            <Icon name="edit" size={18} />
          </IconButton>
        )}
        {onDeleteActivity && (
          <IconButton variant="ghost" aria-label={`${a.title} 삭제`} onClick={() => onDeleteActivity(a.id!)} data-testid="candidate-activity-delete">
            <Icon name="delete" size={18} />
          </IconButton>
        )}
      </>
    ) : undefined;
  // 내용이 있거나 편집할 수 있으면 섹션을 그린다. 편집용으로만 보이는 빈 섹션은 인쇄에서 뺀다
  const show = (items: unknown[] | undefined, onEdit?: () => void) => !!items?.length || !!onEdit;
  const printClass = (items: unknown[] | undefined) => (items?.length ? '' : 'print:hidden');
  const hasBottom =
    show(skills, onEditSkills) || show(awards, onEditAwards) || show(certifications, onEditCertifications) || show(languages, onEditLanguages);
  const bottomPrintClass = skills?.length || awards?.length || certifications?.length || languages?.length ? '' : 'print:hidden';
  return (
    <div className={`w-[940px] max-w-full flex flex-col gap-7 px-8 pt-8 pb-10 mobile:gap-6 mobile:px-5 mobile:pt-6 mobile:pb-8 bg-white100 rounded-xlarge ${className}`.trim()}>
      {attachments && attachments.length > 0 && <AttachmentBar items={attachments} />}
      <CandidateHeader {...header} onEdit={onEditProfile} />
      <Divider />
      {answers && answers.length > 0 && (
        <>
          <ApplicationAnswers items={answers} onFileClick={onAnswerFileClick} />
          <Divider />
        </>
      )}
      {summary && summary.length > 0 && <ProfileSummary title={summaryTitle} items={summary} />}
      {overview?.some((g) => g.rows.length > 0) && (
        <>
          <CareerOverview groups={overview} />
          {histories.length > 0 && <Divider />}
        </>
      )}
      {histories.map((h, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Divider />}
          <HistoryEntry type={h.type} name={h.name} role={h.role} period={h.period} logoUrl={h.logoUrl}>
            {h.activities?.map((a, j) => (
              <div key={a.id ?? j} id={a.id ? `${activityIdPrefix}${a.id}` : undefined}>
                <ActivityDetail {...a} expanded={expandAll} actions={activityActions(a)} />
              </div>
            ))}
          </HistoryEntry>
        </React.Fragment>
      ))}
      {hasBottom && (
        <>
          <Divider className={bottomPrintClass} />
          <div className={`flex flex-col gap-10 ${bottomPrintClass}`.trim()}>
            {show(skills, onEditSkills) && <SkillSection skills={skills ?? []} onEdit={onEditSkills} className={printClass(skills)} />}
            {show(awards, onEditAwards) && (
              <ProfileItemSection icon="trophy" label="수상경력 및 수료" items={awards ?? []} onEdit={onEditAwards} className={printClass(awards)} />
            )}
            {show(certifications, onEditCertifications) && (
              <ProfileItemSection icon="certification" label="자격증" items={certifications ?? []} onEdit={onEditCertifications} className={printClass(certifications)} />
            )}
            {show(languages, onEditLanguages) && (
              <ProfileItemSection icon="translate" label="외국어" items={languages ?? []} onEdit={onEditLanguages} className={printClass(languages)} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CandidateDetail;
