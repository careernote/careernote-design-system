import React, { useState } from 'react';
import Chip from './Chip';
import Icon from './Icon';
import { ImageLightbox } from '../overlays/ImageLightbox';

// 활동 상세 (Figma "container" 컴포넌트) — 이미지 슬롯 · 제목/기간 · 스킬 칩 · 본문(3줄 말줄임+더보기, 다시 접기 없음) · Result · 동료 코멘트
export interface ActivityComment {
  /** 직무 (이름은 표시하지 않음) */
  role: string;
  text: string;
}

interface ActivityDetailProps {
  title: string;
  /** 예: "2024. 05 - 2026. 01" */
  period?: string;
  /** 대표사진이 첫 번째. 없으면 영역 미표출 */
  images?: string[];
  skills?: string[];
  /** STAR 방식이 아닌 원문 텍스트 */
  body?: string;
  /** STAR 의 Result. 없으면 미표출 */
  result?: string;
  comments?: ActivityComment[];
  /** 썸네일 클릭 — 기본은 내장 라이트박스로 원본 보기 */
  onImageClick?: (index: number) => void;
  className?: string;
}

export function ActivityDetail({ title, period, images = [], skills = [], body, result, comments = [], onImageClick, className = '' }: ActivityDetailProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <div className={`flex flex-col gap-3 ${className}`.trim()}>
      {images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              aria-label={`활동 이미지 ${i + 1} 크게 보기`}
              disabled={!src}
              onClick={(e) => {
                e.stopPropagation();
                if (onImageClick) onImageClick(i);
                else setLightbox(i);
              }}
              className={`shrink-0 h-32 rounded-[7px] bg-gray800 overflow-hidden flex items-center justify-center border-0 p-0 cursor-zoom-in disabled:cursor-default transition-opacity hover:opacity-90 ${
                src ? '' : 'w-[122px]'
              }`}
            >
              {/* 비율 유지: 높이 128 고정, 너비는 이미지 비율(가로 사진은 최대 240px) — 잘라내지 않는다 */}
              {src ? <img src={src} alt="" className="h-full w-auto min-w-[122px] max-w-[240px] object-cover" /> : <Icon name="nonImage" size={14} color="white" />}
            </button>
          ))}
          {!onImageClick && <ImageLightbox images={images.filter(Boolean)} index={lightbox} onClose={() => setLightbox(null)} />}
        </div>
      )}
      <div className="flex items-center gap-3">
        <span className="min-w-0 flex-1 text-body1 font-semibold text-gray900 truncate">{title}</span>
        {period && <span className="shrink-0 text-body2 text-gray600">{period}</span>}
      </div>
      {skills.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {skills.map((s) => (
            <Chip key={s} size="L" variant="soft" color="basic" className="font-normal">
              {s}
            </Chip>
          ))}
        </div>
      )}
      {body && (
        <div className="flex flex-col gap-1">
          <p className={`text-body2 text-gray700 whitespace-pre-line ${expanded ? '' : 'line-clamp-3'}`}>{body}</p>
          {!expanded && (
            <button type="button" onClick={() => setExpanded(true)} className="self-start text-body2 text-gray700 underline">
              더보기
            </button>
          )}
        </div>
      )}
      {result && (
        <div className="px-4 py-3 rounded-xlarge bg-bg_gray1">
          <p className="text-body2 leading-5 text-gray800">{result}</p>
        </div>
      )}
      {comments.length > 0 && (
        <div className="flex items-start gap-3 px-5 py-4 rounded-xlarge bg-bg_gray2">
          <Chip size="S" variant="solid" color="sky" className="shrink-0 mt-0.5">
            동료 코멘트
          </Chip>
          <div className="min-w-0 flex-1 flex flex-col gap-2">
            {comments.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 text-body2 leading-5 font-medium text-sky">{c.role}</span>
                <span className="min-w-0 flex-1 text-body2 leading-5 text-gray900">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityDetail;
