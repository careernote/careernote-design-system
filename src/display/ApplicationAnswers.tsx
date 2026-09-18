import React from 'react';
import Icon from './Icon';

// 지원자가 지원서에 써 넣은 답변 묶음 (공고 지원자 상세 — 프로필 헤더 아래).
// 담당자가 만든 항목 순서 그대로 보여준다. 첨부파일은 상단 바가 아니라 해당 항목 자리에 놓는다.
export interface AnswerFile {
  name: string;
  /** 미지정이면 클릭할 수 없는 안내용 칩으로만 보인다(업로드 준비 전 데이터) */
  url?: string;
}

export interface AnswerEntry {
  label: string;
  /** short: 한 줄 답변 / long: 장문 답변 / choice: 선택지 답변 / file: 첨부파일 */
  kind: 'short' | 'long' | 'choice' | 'file';
  text?: string;
  choices?: string[];
  files?: AnswerFile[];
}

interface ApplicationAnswersProps {
  items: AnswerEntry[];
  /** 파일 칩 클릭 — 미지정이면 새 창으로 연다(PDF·이미지는 브라우저가 바로 띄운다) */
  onFileClick?: (file: AnswerFile) => void;
  className?: string;
}

const EMPTY = '작성하지 않았습니다.';

export function ApplicationAnswers({ items, onFileClick, className = '' }: ApplicationAnswersProps) {
  if (!items.length) return null;

  const openFile = (file: AnswerFile) => {
    if (onFileClick) return onFileClick(file);
    if (file.url) window.open(file.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`.trim()}>
      {items.map((it, i) => {
        const files = it.files ?? [];
        const choices = it.choices ?? [];
        const empty =
          it.kind === 'file' ? files.length === 0 : it.kind === 'choice' ? choices.length === 0 : !it.text?.trim();
        return (
          <div key={i} className="flex flex-col gap-2">
            <span className="text-body1 font-semibold text-gray900">{it.label}</span>
            {empty ? (
              <span className="text-body2 text-gray600">{EMPTY}</span>
            ) : it.kind === 'file' ? (
              <div className="flex flex-wrap items-center gap-2">
                {files.map((f, j) => {
                  const Tag = f.url ? 'button' : 'span';
                  return (
                    <Tag
                      key={j}
                      type={f.url ? 'button' : undefined}
                      onClick={f.url ? () => openFile(f) : undefined}
                      className={`inline-flex max-w-full items-center gap-1.5 rounded-small border border-gray400 bg-white100 px-3 py-2 text-body2 text-gray800 ${
                        f.url ? 'cursor-pointer transition-colors hover:border-sky hover:text-sky' : 'text-gray600'
                      }`}
                    >
                      <Icon name="clip" size={18} />
                      <span className="truncate">{f.name}</span>
                    </Tag>
                  );
                })}
              </div>
            ) : it.kind === 'choice' ? (
              <span className="text-body2 text-gray700">{choices.join(', ')}</span>
            ) : (
              <p className={`text-body2 text-gray700 ${it.kind === 'long' ? 'whitespace-pre-wrap leading-[1.7]' : ''}`}>
                {it.text}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ApplicationAnswers;
