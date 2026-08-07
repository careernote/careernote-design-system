import React from 'react';

// 목록형 편집 UI 의 "추가하기" 점선 버튼 (careernote-web 편집 모달 5곳 인라인 마크업 이관).
// 대시 시인성 보강: 1.5px + gray500 (기존 1px gray400 이 너무 얇고 연해 안 보이는 문제)
interface AddDashedButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  /** 모서리 반경 — 기본 large(12px), 컴팩트 목록은 small(6px) */
  radius?: 'small' | 'large';
  className?: string;
  'data-testid'?: string;
}

export function AddDashedButton({
  onClick,
  children = '추가하기 +',
  radius = 'large',
  className = '',
  'data-testid': testId,
}: AddDashedButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={`w-full flex items-center justify-center gap-2 border-[1.5px] border-dashed border-gray500 py-4 text-body2 font-medium text-gray600 transition-colors hover:border-sky hover:text-sky ${
        radius === 'large' ? 'rounded-large' : 'rounded-small py-3.5'
      } ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default AddDashedButton;
