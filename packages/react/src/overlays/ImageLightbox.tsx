import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../display/Icon';

// 이미지 라이트박스 — 썸네일 클릭 시 원본을 뷰포트 크기로. ESC·배경 클릭 닫기, ←/→ 이동
interface ImageLightboxProps {
  images: string[];
  /** 열 이미지 인덱스. null 이면 닫힘 */
  index: number | null;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export function ImageLightbox({ images, index, onClose, onIndexChange }: ImageLightboxProps) {
  const [current, setCurrent] = useState(index ?? 0);
  useEffect(() => {
    if (index !== null) setCurrent(index);
  }, [index]);

  const go = useCallback(
    (delta: number) => {
      if (images.length === 0) return;
      const next = (current + delta + images.length) % images.length;
      setCurrent(next);
      onIndexChange?.(next);
    },
    [current, images.length, onIndexChange],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [index, go, onClose]);

  if (index === null || images.length === 0 || typeof document === 'undefined') return null;
  const src = images[current] ?? images[0];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="이미지 보기"
      className="fixed inset-0 z-[10000002] flex items-center justify-center bg-black80"
      onClick={onClose}
    >
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute top-4 right-4 p-2 rounded-medium text-white100 hover:bg-white20">
        <Icon name="close" size={24} color="white" />
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="이전 이미지"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white20 text-white100 hover:bg-white50"
          >
            <Icon name="arrow-left" size={24} color="white" />
          </button>
          <button
            type="button"
            aria-label="다음 이미지"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white20 text-white100 hover:bg-white50"
          >
            <Icon name="arrow-right" size={24} color="white" />
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-body2 text-white100">
            {current + 1} / {images.length}
          </span>
        </>
      )}
      <img src={src} alt="" onClick={(e) => e.stopPropagation()} className="max-w-[92vw] max-h-[90vh] object-contain rounded-medium" />
    </div>,
    document.body,
  );
}

export default ImageLightbox;
