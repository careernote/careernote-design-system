import React from 'react';
import { CloseIcon } from '../icons';

interface ModalHeaderProps {
  title: string;
  description?: string;
  /** 있으면 우측에 닫기 버튼 렌더 */
  onClose?: () => void;
  closeTestId?: string;
  className?: string;
}

/**
 * 대형 다이얼로그 상단 헤더 — 제목(22px bold) + 설명 + 선택적 닫기 버튼.
 * 사용처: JobChangeModal, DesiredJobsRequiredModal 등 948px 다이얼로그.
 * onClose 유무에 따라 기존 두 마크업(flex/block)을 그대로 재현해 픽셀 무변화.
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  description,
  onClose,
  closeTestId,
  className = '',
}) => {
  const heading = (
    <>
      <h2 className="text-[22px] leading-[1.4] font-bold text-gray900 font-pretendard mobile:text-[18px]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-body2 font-regular text-gray700 font-pretendard">{description}</p>
      )}
    </>
  );

  if (!onClose) {
    return (
      <div className={`flex-shrink-0 px-7 pt-8 pb-4 mobile:px-5 mobile:pt-6 ${className}`}>
        {heading}
      </div>
    );
  }

  return (
    <div
      className={`flex-shrink-0 flex items-start justify-between px-7 pt-8 pb-4 mobile:px-5 mobile:pt-6 ${className}`}
    >
      <div className="min-w-0">{heading}</div>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        data-testid={closeTestId}
        className="flex-shrink-0 ml-3 flex items-center justify-center w-8 h-8 rounded-[8px] hover:bg-bg_gray2"
      >
        <CloseIcon size={20} color="#4B4D57" />
      </button>
    </div>
  );
};

export default ModalHeader;
