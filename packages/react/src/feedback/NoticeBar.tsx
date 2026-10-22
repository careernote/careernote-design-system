import React from 'react';
import Button from '../buttons/Button';
import Icon from '../display/Icon';

export interface NoticeBarProps {
  /** 본문 — 굵게 강조할 부분은 <b> 로 감싼다 */
  message: React.ReactNode;
  /** 본문 뒤 작은 회색 보조 정보(저장 시각 등) */
  detail?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** 오른쪽 끝 밑줄 텍스트(닫기·삭제) */
  dismissLabel?: string;
  onDismiss?: () => void;
  className?: string;
}

/**
 * 목록 위 한 줄 안내 + 행동 버튼. 하늘색 테두리·연한 바탕, 왼쪽 info 아이콘(ATS 공고 현황 "작성 중인 공고가 있어요" 배너 승격, 2026-10-22).
 * 한 줄을 넘는 본문은 말줄임.
 */
export function NoticeBar({ message, detail, actionLabel, onAction, dismissLabel, onDismiss, className = '' }: NoticeBarProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-[16px] border border-sky/30 bg-sky/5 px-5 py-3.5 ${className}`}
      role="status"
    >
      {/* 색은 currentColor 로 — fill 속성에 토큰 변수를 넣으면 Tailwind 3 소비처(카탈로그)에서 안 보인다 */}
      <span className="flex shrink-0 text-sky">
        <Icon name="info" size={18} />
      </span>
      <p className="m-0 min-w-0 flex-1 truncate text-body2 text-gray800">
        {message}
        {detail && <span className="ml-2 text-detail text-gray600">{detail}</span>}
      </p>
      {actionLabel && onAction && (
        <Button size="sm" color="sky" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
      {dismissLabel && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-detail text-gray600 underline underline-offset-[3px] hover:text-gray800"
        >
          {dismissLabel}
        </button>
      )}
    </div>
  );
}

export default NoticeBar;
