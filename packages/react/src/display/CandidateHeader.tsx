import React from 'react';
import { ProfileHero } from './ProfileHero';
import { CandidateIntro, type ContactEntry } from './CandidateIntro';

// 상세페이지 프로필 헤더 — ProfileHero + CandidateIntro 가로 조립
export interface CandidateHeaderData {
  name: string;
  role: string;
  imageUrl?: string;
  slogan?: string;
  introduction?: string;
  contacts?: ContactEntry[];
}

interface CandidateHeaderProps extends CandidateHeaderData {
  onEdit?: () => void;
  className?: string;
}

export function CandidateHeader({ name, role, imageUrl, onEdit, slogan, introduction, contacts, className = '' }: CandidateHeaderProps) {
  return (
    <div className={`flex items-stretch gap-5 ${className}`.trim()}>
      <ProfileHero name={name} role={role} imageUrl={imageUrl} onEdit={onEdit} />
      <CandidateIntro slogan={slogan} introduction={introduction} contacts={contacts} />
    </div>
  );
}

export default CandidateHeader;
