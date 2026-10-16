import React, { useEffect, useRef } from 'react';

// 커리어노트 로고 로딩 로티 — Vue LottieLoadingLogo 와 같은 스펙. 화면·버튼 안 "불러오는 중"의 기본 표시.
// 자산은 @careernote/assets/lottie/LoadingLogo.json 을 소비자가 import 해 주입한다(패키지 간 의존 없이 단일 소스). peer: lottie-web.
// lottie-web 은 불러오는 순간 document 를 건드려서, Next 서버 렌더에서 깨지지 않게 브라우저에서만(useEffect 안) 동적으로 불러온다.
export interface LottieLoadingLogoProps {
  animationData: object;
  /** 한 변 px (기본 48) — 로고는 정사각 안에 비율을 지켜 들어간다 */
  size?: number;
  className?: string;
}

export function LottieLoadingLogo({ animationData, size = 48, className = '' }: LottieLoadingLogoProps) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let anim: { destroy: () => void } | null = null;
    let cancelled = false;
    void import('lottie-web').then(({ default: lottie }) => {
      if (cancelled || !container.current) return;
      anim = lottie.loadAnimation({ container: container.current, renderer: 'svg', loop: true, autoplay: true, animationData });
    });
    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [animationData]);
  return (
    <div
      ref={container}
      className={`shrink-0 ${className}`.trim()}
      style={{ width: size, height: size }}
      role="status"
      aria-label="불러오는 중"
    />
  );
}

export default LottieLoadingLogo;
