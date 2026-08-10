import React from 'react';

// 활동(경험) 카드 껍데기 — careernote-web ExperienceItem 의 시각 셸 이관.
// 좌측 미디어 칸(240px) + 우측 콘텐츠 칸, 모바일에서 상하 스택.
// 기능(업로드·선택·콜백)은 소비자가 media/children/…Props 로 주입 — 이 컴포넌트는 레이아웃만 담당.
interface ActivityCardProps {
  /** 좌측(모바일: 상단) 미디어 칸 내용. 없으면 콘텐츠 단일 칼럼 */
  media?: React.ReactNode;
  /** 우측 콘텐츠 칸 내용 */
  children: React.ReactNode;
  /** 선택 상태 — 테두리 sky */
  selected?: boolean;
  /** 그리드 밖에 두는 형제 노드 (숨김 파일 input 등) */
  before?: React.ReactNode;
  /** 미디어 칸 div 에 전달할 속성 (onClick·추가 클래스 등) */
  mediaProps?: React.HTMLAttributes<HTMLDivElement>;
  /** 콘텐츠 칸 div 에 전달할 속성 */
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
  'data-testid'?: string;
}

export function ActivityCard({
  media,
  children,
  selected = false,
  before,
  mediaProps,
  contentProps,
  className = '',
  'data-testid': testId,
}: ActivityCardProps) {
  const { className: mediaClassName = '', ...mediaRest } = mediaProps ?? {};
  const { className: contentClassName = '', ...contentRest } = contentProps ?? {};
  return (
    <div
      data-testid={testId}
      className={`relative bg-white100 rounded-large transition-all overflow-hidden border ${
        selected ? 'border-sky' : 'border-border_gray'
      } shadow-[0px_2px_28px_0px_rgba(0,0,0,0.04)] ${
        media !== undefined ? 'grid grid-cols-[240px_1fr] items-stretch mobile:grid-cols-1' : ''
      } ${className}`.trim()}
    >
      {before}
      {media !== undefined && (
        <div
          {...mediaRest}
          className={`relative w-full h-full bg-bg_gray1 border-r border-border_gray mobile:h-[180px] mobile:border-r-0 mobile:border-b overflow-hidden flex items-center justify-center ${mediaClassName}`.trim()}
        >
          {media}
        </div>
      )}
      <div
        {...contentRest}
        className={`min-w-0 flex flex-col gap-2 py-4 px-5 mobile:py-3 mobile:pl-3 mobile:pr-4 ${contentClassName}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}

export default ActivityCard;
