import React, { useState } from 'react';
import Chip from './Chip';
import { ProfileAvatar } from './ProfileAvatar';
import { UpdatedChip } from './CandidateProfile';
import { ImageLightbox } from '../overlays/ImageLightbox';

// 인재 피드 카드 (Figma "03 인재풀" 피드 탭) — 프로필 + 대표 활동 갤러리 + 제목/설명 + 성과 박스
export interface FeedCardProps {
  name: string;
  imageUrl?: string;
  /** 예: "경력 8년" */
  careerLabel: string;
  /** 예: "프론트엔드" */
  job: string;
  /** 마지막 프로필 업데이트로부터 경과 일수 — 30일 이내 purple, 이후 black */
  updatedDaysAgo: number;
  /** 대표 활동 제목 */
  title: string;
  /** 대표 활동 설명 — 3줄 말줄임 */
  description?: string;
  /** STAR 성과 — 있으면 하늘색 박스 */
  result?: string;
  /** 활동 이미지 (isMain 우선). 0장이면 갤러리 미표출, 1~2장 가로 배치, 3장 이상 큰 1장 + 작은 2장 */
  images?: string[];
  /** 프로필 우측 끝 (북마크 등) */
  aside?: React.ReactNode;
  /** 카드 클릭 (상세 열기) */
  onClick?: () => void;
  /** 이미지 클릭 — 미지정 시 내장 라이트박스 */
  onImageClick?: (index: number) => void;
  className?: string;
}

function Thumb({ src, onClick, className = '' }: { src: string; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`relative min-w-0 rounded-[7px] bg-gray800 overflow-hidden border-0 p-0 cursor-zoom-in transition-opacity hover:opacity-90 ${className}`.trim()}
    >
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
    </button>
  );
}

function FeedGallery({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  const more = images.length - 3;
  if (images.length === 0) return null;
  if (images.length === 1) return <Thumb src={images[0]} onClick={() => onOpen(0)} className="w-full aspect-[388/201]" />;
  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {images.map((src, i) => (
          <Thumb key={i} src={src} onClick={() => onOpen(i)} className="aspect-[4/3]" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[1fr_122px] gap-3">
      <Thumb src={images[0]} onClick={() => onOpen(0)} className="aspect-[257/269]" />
      <div className="flex flex-col gap-3">
        <Thumb src={images[1]} onClick={() => onOpen(1)} className="flex-1 min-h-0" />
        <div className="relative flex-1 min-h-0 flex">
          <Thumb src={images[2]} onClick={() => onOpen(2)} className="flex-1" />
          {more > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export function FeedCard({
  name,
  imageUrl,
  careerLabel,
  job,
  updatedDaysAgo,
  title,
  description,
  result,
  images = [],
  aside,
  onClick,
  onImageClick,
  className = '',
}: FeedCardProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = (i: number) => (onImageClick ? onImageClick(i) : setLightbox(i));
  return (
    <div
      onClick={onClick}
      className={`w-full flex flex-col gap-3 px-4 py-3 bg-white100 rounded-xlarge border border-transparent ${
        onClick ? 'cursor-pointer transition-all hover:border-border_gray hover:shadow-wide-light' : ''
      } ${className}`.trim()}
    >
      <div className="flex items-center gap-2.5">
        <ProfileAvatar name={name} imageUrl={imageUrl} />
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <span className="text-body1 font-semibold text-gray900 truncate">{name}</span>
          <div className="flex flex-wrap items-center gap-1">
            <Chip size="M" variant="soft" color="basic" className="font-normal">{careerLabel}</Chip>
            <Chip size="M" variant="soft" color="basic" className="font-normal">{job}</Chip>
            <UpdatedChip daysAgo={updatedDaysAgo} />
          </div>
        </div>
        {aside}
      </div>

      <FeedGallery images={images} onOpen={open} />

      <p className="text-body1 font-semibold text-gray900 truncate">{title}</p>
      {description && <p className="text-body2 text-gray700 line-clamp-3 whitespace-pre-line">{description}</p>}
      {result && (
        <div className="px-4 py-3 rounded-xlarge bg-sky_bg">
          <p className="text-body2 text-gray800 line-clamp-4">{result}</p>
        </div>
      )}

      {!onImageClick && <ImageLightbox images={images} index={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

export default FeedCard;
