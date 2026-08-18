/**
 * careernote-web ResponsiveModal 승격본 — 소스 정본.
 * 모바일 drawer 는 vaul 사용 (소비자 peer dependency).
 */
import { useState, useEffect, type ReactNode } from 'react';
import { Drawer } from 'vaul';

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** PC 모달 패널에 적용할 추가 클래스 */
  pcClassName?: string;
  /** 테스트용 식별자 */
  'data-testid'?: string;
  /** 외부 클릭 시 닫기 여부 (기본: true) */
  closeOnOutsideClick?: boolean;
  /** 오버레이(배경 딤) 숨기기 (기본: false) */
  hideOverlay?: boolean;
  /** 모바일 Drawer에서 스크롤 영역 밖 하단에 고정 렌더링할 푸터 */
  mobileFixedFooter?: ReactNode;
  /** children 내부에 sticky footer가 있을 때 drawer의 하단 패딩 제거 */
  noMobileBottomPadding?: boolean;
}

/**
 * ResponsiveModal - PC/모바일 반응형 모달
 *
 * - PC(>850px): 센터 모달 (fade + scale 애니메이션)
 * - 모바일(<=850px): vaul Drawer (slide up/down + 드래그 닫기)
 */
export function ResponsiveModal({
  isOpen,
  onClose,
  children,
  pcClassName = 'max-w-[600px]',
  'data-testid': testId,
  closeOnOutsideClick = true,
  hideOverlay = false,
  mobileFixedFooter,
  noMobileBottomPadding = false,
}: ResponsiveModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 850);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [isOpen]);

  // 모달 열릴 때 배경 스크롤 차단 — html(documentElement)만 잠근다.
  // body까지 overflow:hidden을 걸면 body가 스크롤 컨테이너가 되면서 position:sticky 요소(사이드바 등)가
  // 스크롤 원위치로 튀는 버그가 생긴다. html만 잠가도 스크롤 차단과 스크롤 위치 보존은 동일하게 동작한다.
  // 클래식 스크롤바 환경에서는 스크롤바가 사라진 폭만큼 body padding-right로 보정해 레이아웃 밀림을 막는다.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevPad = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      html.style.overflow = prevHtml;
      body.style.paddingRight = prevPad;
    };
  }, [isOpen]);

  // 모바일: vaul Drawer
  if (isMobile) {
    return (
      <Drawer.Root
        open={isOpen}
        onOpenChange={(open) => { if (!open && closeOnOutsideClick) onClose(); }}
        dismissible={closeOnOutsideClick}
      >
        <Drawer.Portal>
          <Drawer.Overlay className={`fixed inset-0 z-[10000001] overflow-hidden overscroll-contain ${hideOverlay ? '' : 'bg-black/50'}`} />
          <Drawer.Content
            className="fixed bottom-0 left-0 right-0 z-[10000001] outline-none"
            aria-describedby={undefined}
            data-testid={testId}
          >
            <Drawer.Title className="sr-only">모달</Drawer.Title>
            <div className="bg-white rounded-t-[16px] max-h-[90dvh] flex flex-col">
              {/* 드래그 핸들 */}
              <Drawer.Handle className="mt-2 mb-1 !bg-gray400 !w-9 !h-1" />
              {/* 콘텐츠 */}
              <div className={`flex-1 overflow-y-auto px-5 pt-4 ${mobileFixedFooter || noMobileBottomPadding ? '' : 'pb-[max(20px,env(safe-area-inset-bottom))]'}`}>
                {children}
              </div>
              {/* 하단 고정 푸터 */}
              {mobileFixedFooter && (
                <div className="shrink-0 bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))]">
                  {mobileFixedFooter}
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  // PC: 센터 모달
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[10000001] overflow-hidden overscroll-contain animate-[rm-fade-in_200ms_ease-out] ${hideOverlay ? '' : 'bg-black/50'}`}
      onClick={(e) => { if (closeOnOutsideClick && e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`relative w-full mx-5 bg-white rounded-[12px] shadow-[inset_0_0_0_1px_theme(colors.border_gray)] flex flex-col animate-[rm-scale-in_200ms_ease-out] ${pcClassName}`}
        data-testid={testId}
      >
        {children}
      </div>
      <style>{`
        @keyframes rm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes rm-scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

export default ResponsiveModal;
