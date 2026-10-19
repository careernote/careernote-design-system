import React, { Fragment, useState } from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { ImageLightbox } from '../overlays/ImageLightbox';

// 활동 피드 카드 (Figma 업데이트_2025 "인재피드" talent_pool_component) — 활동 1건 = 카드 1장.
// 갤러리(높이 269) → 프로필 한 줄 → AI 1줄 제목 → 2줄 요약 → 성과(왼쪽 선) → 등록일
export interface ActivityFeedCardProps {
  name: string;
  /** 프로필 이미지 — 없으면 이름 뒤 2글자 */
  imageUrl?: string;
  /** 예: "프런트 엔드" */
  job?: string;
  /** 예: "6년차" */
  careerLabel?: string;
  /** 1줄 제목 (AI 헤드라인, 없으면 활동명) — 넘치면 말줄임 */
  headline: string;
  /** true 면 제목·요약·성과 자리에 같은 틀의 스켈레톤 (AI 생성 중) — 성과는 숨긴다 */
  headlineLoading?: boolean;
  /** 2줄 요약 — 넘치면 말줄임 */
  summary?: string;
  /** STAR 의 R(성과) — 없으면 블록 미표출. 4줄 말줄임 */
  result?: string;
  /** 하단 날짜 표기 (예: "2026.05.24") */
  date?: string;
  /** 활동 이미지 (isMain 우선). 0장 = 대체 아이콘, 1~2장 = 가로, 3장 이상 = 큰 1장 + 작은 2장 (+N) */
  images?: string[];
  /** 이미지 0장일 때 어두운 박스 가운데 90px 로 띄울 아이콘 — @careernote/assets/placeholder/*.png 를 소비자가 넣는다 */
  placeholderImage?: string;
  /** 프로필 줄 오른쪽 끝 (북마크 등) */
  aside?: React.ReactNode;
  onClick?: () => void;
  /** 이미지 클릭 — 미지정 시 내장 라이트박스 */
  onImageClick?: (index: number) => void;
  /** false 면 사진을 눌러도 확대하지 않는다(라이트박스·onImageClick 없음) — 사진 클릭도 카드 onClick 으로 간다. 기본 true */
  imageZoom?: boolean;
  className?: string;
}

const GALLERY_H = 'h-[269px]';
const BAR = 'rounded-xsmall bg-gray400 animate-pulse';

// 직무 "PD·연출" — 가운뎃점을 따로 떼어 좌우 4px 띄운다
function jobParts(job: string) {
  return job.split('·').map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span className="mx-1">·</span>}
      {part.trim()}
    </Fragment>
  ));
}

// 스켈레톤 한 줄 — 실제 글과 같은 <p>·글꼴 클래스로 줄 상자를 만든다(보이지 않는 글자 1개).
// 소비처 전역 CSS 가 p 줄 높이를 바꿔도(예: p { line-height: 1.19 }) 실제 글과 똑같이 따라가 높이가 맞는다
function SkeletonLine({ text, width, label }: { text: string; width: string; label?: string }) {
  return (
    <p className={`relative m-0 ${text}`} aria-label={label} aria-hidden={label ? undefined : true}>
      <span className="invisible">가</span>
      <span className="absolute inset-0 flex items-center">
        <span className={`${BAR} h-[0.75em] ${width}`} />
      </span>
    </p>
  );
}

// 설명·성과 본문 줄 높이 20px(디자인 기준)
const BODY = 'text-body2 leading-[20px]';

// onClick 이 없으면(imageZoom=false) 눌러도 아무 일 없는 그림 — 클릭이 카드 onClick 으로 그대로 올라간다
function Thumb({ src, onClick, className = '' }: { src: string; onClick?: () => void; className?: string }) {
  // 피드는 카드가 수백 장 — 화면 근처에서만 받고, 디코딩은 메인 스레드 밖에서
  const img = <img src={src} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />;
  // 안쪽 1px 선(black10) — 흰 사진도 배경과 구분된다. 사진 위에 얹는 ::after 라 클릭은 막지 않는다
  const box =
    'relative min-w-0 rounded-[7px] bg-gray800 overflow-hidden after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-inset after:ring-black10 after:pointer-events-none';
  if (!onClick) return <div className={`${box} ${className}`.trim()}>{img}</div>;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`${box} border-0 p-0 cursor-zoom-in transition-opacity hover:opacity-90 ${className}`.trim()}
    >
      {img}
    </button>
  );
}

function Gallery({ images, placeholderImage, onOpen }: { images: string[]; placeholderImage?: string; onOpen?: (i: number) => void }) {
  const at = (i: number) => (onOpen ? () => onOpen(i) : undefined);
  if (images.length === 0) {
    return (
      <div className={`${GALLERY_H} w-full rounded-[7px] bg-gray800 flex items-center justify-center`}>
        {placeholderImage && <img src={placeholderImage} alt="" loading="lazy" decoding="async" className="w-[90px] h-[90px] object-contain" />}
      </div>
    );
  }
  if (images.length === 1) return <Thumb src={images[0]} onClick={at(0)} className={`${GALLERY_H} w-full`} />;
  if (images.length === 2) {
    return (
      <div className={`${GALLERY_H} grid grid-cols-2 gap-3`}>
        {images.map((src, i) => (
          <Thumb key={i} src={src} onClick={at(i)} />
        ))}
      </div>
    );
  }
  const more = images.length - 3;
  return (
    <div className={`${GALLERY_H} grid grid-cols-[1fr_122px] gap-3`}>
      <Thumb src={images[0]} onClick={at(0)} />
      <div className="flex flex-col gap-3 min-h-0">
        <Thumb src={images[1]} onClick={at(1)} className="flex-1 min-h-0" />
        <div className="relative flex-1 min-h-0 flex">
          <Thumb src={images[2]} onClick={at(2)} className="flex-1" />
          {more > 0 &&
            (onOpen ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(3);
                }}
                className="absolute inset-0 rounded-[7px] bg-black60 border-0 p-0 cursor-zoom-in flex items-center justify-center text-subtitle3 font-semibold text-white100"
              >
                +{more}
              </button>
            ) : (
              <div className="absolute inset-0 rounded-[7px] bg-black60 flex items-center justify-center text-subtitle3 font-semibold text-white100">
                +{more}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function ActivityFeedCard({
  name,
  imageUrl,
  job,
  careerLabel,
  headline,
  headlineLoading = false,
  summary,
  result,
  date,
  images = [],
  placeholderImage,
  aside,
  onClick,
  onImageClick,
  imageZoom = true,
  className = '',
}: ActivityFeedCardProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = (i: number) => (onImageClick ? onImageClick(i) : setLightbox(i));
  return (
    <div onClick={onClick} className={`group w-full flex flex-col gap-3 ${onClick ? 'cursor-pointer' : ''} ${className}`.trim()}>
      <Gallery images={images} placeholderImage={placeholderImage} onOpen={imageZoom ? open : undefined} />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ProfileAvatar name={name} imageUrl={imageUrl} size={28} />
          <div className="min-w-0 flex-1 flex items-center gap-1 text-body2 truncate">
            <span className="font-medium text-gray900">{name}</span>
            {job && <span className="text-gray700 truncate">{jobParts(job)}</span>}
            {careerLabel && <span className="shrink-0 text-gray700">{careerLabel}</span>}
          </div>
          {aside}
        </div>

        {headlineLoading ? (
          // 실제 카드와 같은 틀 — 제목 1줄 · 요약 2줄 · 성과(왼쪽 선) 2줄. 줄 높이를 맞춰 글이 들어와도 카드가 덜컹이지 않는다
          <>
            <SkeletonLine text="text-subtitle3 font-semibold" width="w-4/5" label="AI 제목 생성 중" />
            <div>
              <SkeletonLine text={BODY} width="w-full" />
              <SkeletonLine text={BODY} width="w-3/5" />
            </div>
            <div className="pl-3 border-l border-gray400">
              <SkeletonLine text={BODY} width="w-full" />
              <SkeletonLine text={BODY} width="w-2/3" />
            </div>
          </>
        ) : (
          <>
            <p className={`text-subtitle3 font-semibold text-gray900 truncate ${onClick ? 'group-hover:underline underline-offset-2' : ''}`.trim()}>
              {headline}
            </p>
            {summary && <p className={`${BODY} text-gray700 line-clamp-2 whitespace-pre-line`}>{summary}</p>}
          </>
        )}

        {!headlineLoading && result && (
          <div className="pl-3 border-l border-gray900">
            <p className={`${BODY} text-gray900 line-clamp-4`}>{result}</p>
          </div>
        )}
      </div>

      {date && <span className="text-body2 text-gray700">{date}</span>}

      {imageZoom && !onImageClick && <ImageLightbox images={images} index={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

export default ActivityFeedCard;
