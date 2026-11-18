import React, { useCallback, useEffect, useState } from 'react';
import { ResponsiveModal } from './ResponsiveModal';
import Icon from '../display/Icon';

// 템플릿 전체 페이지 미리보기 — 페이지가 세로로 이어진 preview.png 한 장을 페이지별로 잘라 넘겨 본다.
// 왼쪽 페이지 목록 · 위 'n / N' 과 이전·다음·닫기 · 가운데 크게. ← → Esc 키. 모바일은 목록 없이 아래 이전·다음.
// 자르기는 CSS(넘침 숨김 + 음수 margin-top)라 canvas 가 필요 없다 — 다른 출처 이미지(CORS 미허용 S3)도 된다.

/** 페이지 수 — 이미지 높이 = 페이지 높이 × n + 간격 × (n-1) (career-pencil TemplatePreviewModal 과 같은 계산) */
export function templatePageCount(naturalHeight: number, pageHeight = 720, pageGap = 100): number {
  return Math.max(1, Math.round((naturalHeight + pageGap) / (pageHeight + pageGap)));
}

interface TemplatePagesPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  /** 페이지가 세로로 이어진 미리보기 이미지 */
  imageUrl: string | null;
  /** 원본 이미지 기준 한 페이지 높이·페이지 사이 간격(px) */
  pageHeight?: number;
  pageGap?: number;
  /** 대화상자 이름(스크린리더) */
  'aria-label'?: string;
  'data-testid'?: string;
}

function Page({ url, width, y, pageHeight }: { url: string; width: number; y: number; pageHeight: number }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${width} / ${pageHeight}` }}>
      <img src={url} alt="" draggable={false} className="block w-full max-w-none" style={{ marginTop: `-${(y / width) * 100}%` }} />
    </div>
  );
}

export function TemplatePagesPreview({
  isOpen,
  onClose,
  imageUrl,
  pageHeight = 720,
  pageGap = 100,
  'aria-label': ariaLabel = '템플릿 미리보기',
  'data-testid': testId,
}: TemplatePagesPreviewProps) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [failed, setFailed] = useState(false);
  const [index, setIndex] = useState(0);

  // 이미지 크기만 읽는다(픽셀은 읽지 않아 CORS 와 무관)
  useEffect(() => {
    if (!isOpen || !imageUrl) return;
    setSize(null);
    setFailed(false);
    setIndex(0);
    const img = new Image();
    img.onload = () => setSize({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => setFailed(true);
    img.src = imageUrl;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isOpen, imageUrl]);

  const count = size ? templatePageCount(size.h, pageHeight, pageGap) : 0;
  const go = useCallback((i: number) => setIndex(Math.min(Math.max(i, 0), Math.max(count - 1, 0))), [count]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, index, go]);

  // 고른 페이지가 목록에서 보이게
  useEffect(() => {
    document.querySelector(`[data-template-page="${index}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const ready = !!(imageUrl && size && !failed);
  const nav = 'grid h-7 w-7 place-items-center rounded-small text-gray800 hover:bg-bg_gray1 disabled:opacity-30 disabled:hover:bg-transparent';

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} pcClassName="!max-w-none !w-[min(1000px,92vw)] !h-[min(640px,86vh)] !p-0 overflow-hidden" aria-label={ariaLabel} data-testid={testId}>
      <div className="flex h-full min-h-0 w-full mobile:h-[78vh]">
        <aside className="w-[100px] shrink-0 overflow-y-auto border-r border-border_gray2 bg-bg_gray1 px-2 py-4 mobile:hidden">
          <div className="mx-1 mb-2.5 text-[11px] font-semibold tracking-[0.5px] text-gray700">PAGES</div>
          {ready &&
            Array.from({ length: count }, (_, k) => (
              <button
                key={k}
                type="button"
                data-template-page={k}
                onClick={() => go(k)}
                className={`mb-2 block w-full rounded-medium border-2 bg-white100 p-1 ${k === index ? 'border-sky' : 'border-transparent'}`}
                aria-label={`${k + 1}페이지`}
                aria-current={k === index}
              >
                <div className="overflow-hidden rounded-xsmall border border-border_gray">
                  <Page url={imageUrl} width={size.w} y={k * (pageHeight + pageGap)} pageHeight={pageHeight} />
                </div>
                <div className={`mt-1 text-center text-[11px] ${k === index ? 'text-sky' : 'text-gray700'}`}>{String(k + 1).padStart(2, '0')}</div>
              </button>
            ))}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border_gray2 px-4 py-3">
            <span className="text-[13px] text-gray800" data-testid="template-pages-count">
              {ready ? `${index + 1} / ${count}` : ''}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" className={`${nav} mobile:hidden`} disabled={!ready || index === 0} onClick={() => go(index - 1)} aria-label="이전 페이지">
                <Icon name="arrow2" size={16} className="rotate-180" />
              </button>
              <button type="button" className={`${nav} mobile:hidden`} disabled={!ready || index >= count - 1} onClick={() => go(index + 1)} aria-label="다음 페이지">
                <Icon name="arrow2" size={16} />
              </button>
              <span className="mx-1.5 h-4 w-px bg-border_gray mobile:hidden" />
              <button type="button" className={nav} onClick={onClose} aria-label="닫기" data-testid="template-pages-close">
                <Icon name="close" size={18} />
              </button>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center bg-bg_gray3 p-8 mobile:p-4">
            {failed || !imageUrl ? (
              <p className="text-body2 text-gray700">미리보기를 불러오지 못했어요.</p>
            ) : !ready ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-border_gray border-t-sky" aria-label="불러오는 중" />
            ) : (
              <div className="w-full max-w-[720px] overflow-hidden rounded-xsmall bg-white100 shadow-wide-light" data-testid="template-pages-stage">
                <Page url={imageUrl} width={size.w} y={index * (pageHeight + pageGap)} pageHeight={pageHeight} />
              </div>
            )}
          </div>
          {ready && count > 1 && (
            <div className="hidden gap-2 px-4 pb-3 mobile:flex">
              <button type="button" className="flex-1 rounded-medium border border-gray400 bg-white100 py-3 text-body2 font-semibold text-gray800 disabled:opacity-40" disabled={index === 0} onClick={() => go(index - 1)}>
                이전
              </button>
              <button type="button" className="flex-1 rounded-medium border border-gray400 bg-white100 py-3 text-body2 font-semibold text-gray800 disabled:opacity-40" disabled={index >= count - 1} onClick={() => go(index + 1)}>
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </ResponsiveModal>
  );
}

export default TemplatePagesPreview;
