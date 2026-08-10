import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  /** 바깥 클릭/ESC 시 호출. 생략하면 바깥 클릭/ESC 는 아무 동작 없음 (기존 소비처 동작 유지) */
  onDismiss?: () => void;
  /** 대기 중 두 버튼 비활성화 */
  isLoading?: boolean;
}

/**
 * 확인/취소 2버튼 확인 모달 — careernote-web ConfirmModal 승격본 (radix 직결, shadcn 의존 제거).
 * peer: @radix-ui/react-alert-dialog. 애니메이션(animate-in 등)은 tailwindcss-animate
 * 플러그인이 있는 소비자에서만 동작하고 없으면 무동작(안전).
 */
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onDismiss,
  isLoading = false,
}) => {
  const handleDismiss = onDismiss && !isLoading ? onDismiss : undefined;
  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={(open) => { if (!open) handleDismiss?.(); }}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay
          className="fixed inset-0 z-[70] bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          onClick={handleDismiss}
        />
        <AlertDialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[70] grid w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] p-6 bg-white100 rounded-medium shadow-normal-normal gap-10 overflow-y-auto mobile:w-[90%] focus:outline-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="flex flex-col gap-3 items-start w-full">
            <AlertDialogPrimitive.Title className="text-[16px] font-semibold leading-[20px] text-gray900 w-full">
              {title}
            </AlertDialogPrimitive.Title>
            <AlertDialogPrimitive.Description className="text-[14px] font-normal leading-[18px] text-gray700 w-full whitespace-pre-line">
              {description}
            </AlertDialogPrimitive.Description>
          </div>
          <div className="flex gap-3 h-[46px] items-center justify-end w-full">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="bg-white100 border border-gray500 px-6 py-3.5 rounded-small text-[14px] font-semibold text-gray800 leading-[18px] hover:bg-bg_gray1 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-gray900 px-6 py-3.5 rounded-small text-[14px] font-semibold text-white100 leading-[18px] hover:bg-gray800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {confirmText}
            </button>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default ConfirmModal;
