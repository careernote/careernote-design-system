import React from 'react';
import Button from '../buttons/Button';
import Icon from './Icon';

// 상세페이지 상단 첨부파일/포트폴리오 버튼 줄 (Figma 상세페이지 1-1) — 공고 지원자 상세에만 표출
export interface AttachmentEntry {
  /** file: 이력서 / clip: 첨부파일 / star: 커리어노트 포트폴리오 */
  kind: 'file' | 'clip' | 'star';
  label: string;
  onClick: () => void;
}

interface AttachmentBarProps {
  items: AttachmentEntry[];
  className?: string;
}

export function AttachmentBar({ items, className = '' }: AttachmentBarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`.trim()}>
      {items.map((it, i) => (
        <Button key={i} size="sm" color="white" leftIcon={<Icon name={it.kind} size={18} />} onClick={it.onClick}>
          {it.label}
        </Button>
      ))}
    </div>
  );
}

export default AttachmentBar;
