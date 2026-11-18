import React from 'react';
import Icon from './Icon';
import { IconButton } from '../buttons/IconButton';

// 상세페이지 섹션 라벨 오른쪽 편집 버튼 — SkillSection·ProfileItemSection 공용(활동 수정 버튼과 같은 모양)
export function SectionEditButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <IconButton variant="ghost" aria-label={`${label} 편집`} onClick={onClick} data-testid="profile-section-edit">
      <Icon name="edit" size={18} />
    </IconButton>
  );
}
