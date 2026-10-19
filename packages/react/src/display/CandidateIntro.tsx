import React from 'react';
import { ContactItem, type ContactType } from './ContactItem';

// 상세페이지 상단 소개 블록 (Figma "introdution" + contact_wrap) — 슬로건 + 자기소개 + 연락처
export interface ContactEntry {
  type: ContactType;
  value: string;
  href?: string;
}

interface CandidateIntroProps {
  slogan?: string;
  introduction?: string;
  contacts?: ContactEntry[];
  /** 슬로건·자기소개가 둘 다 없을 때 문구 */
  emptyText?: string;
  className?: string;
}

export function CandidateIntro({ slogan, introduction, contacts = [], emptyText = '아직 자기소개가 생성되지 않았습니다.', className = '' }: CandidateIntroProps) {
  return (
    <div className={`min-w-0 flex-1 flex flex-col justify-between gap-5 ${className}`.trim()}>
      <div className="flex flex-col gap-2">
        {slogan && <p className="text-subtitle3 font-medium text-gray900">{slogan}</p>}
        {introduction && <p className="text-body2 leading-5 text-gray800 whitespace-pre-line">{introduction}</p>}
        {!slogan && !introduction && emptyText && <p className="text-subtitle3 leading-[26px] font-semibold text-gray600">{emptyText}</p>}
      </div>
      {contacts.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          {contacts.map((c) => (
            <ContactItem key={c.type + c.value} {...c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidateIntro;
