import React from 'react';
import { ContactItem, type ContactType } from './ContactItem';

// 상세페이지 상단 소개 블록 (Figma "introdution" + contact_wrap) — 슬로건 + 자기소개 + 연락처
export interface ContactEntry {
  type: ContactType;
  value: string;
  href?: string;
}

interface CandidateIntroProps {
  slogan: string;
  introduction: string;
  contacts?: ContactEntry[];
  className?: string;
}

export function CandidateIntro({ slogan, introduction, contacts = [], className = '' }: CandidateIntroProps) {
  return (
    <div className={`min-w-0 flex-1 flex flex-col justify-between gap-5 ${className}`.trim()}>
      <div className="flex flex-col gap-2">
        <p className="text-subtitle3 font-medium text-gray900">{slogan}</p>
        <p className="text-body2 leading-5 text-gray800 whitespace-pre-line">{introduction}</p>
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
