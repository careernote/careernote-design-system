import React, { useState } from 'react';
import Chip from './Chip';
import Icon from './Icon';

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
  className?: string;
}

export function ActivityDetail({ title, period, images = [], skills = [], body, result, comments = [], className = '' }: ActivityDetailProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`flex flex-col gap-3 ${className}`.trim()}>
      {images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((src, i) => (
            <div key={i} className="shrink-0 w-[122px] h-32 rounded-[7px] bg-gray800 overflow-hidden flex items-center justify-center">
              {src ? <img src={src} alt="" className="w-full h-full object-cover" /> : <Icon name="nonImage" size={14} color="white" />}
            </div>
          ))}
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
