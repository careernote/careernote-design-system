import React, { useEffect, useRef } from 'react';

// 진행중 점 3개 로티 — Vue LottieLoadingDots(career-pencil 승격본)와 같은 스펙.
// 자산은 @careernote/assets/lottie/LoadingDots.json 을 소비자가 import 해 주입한다(패키지 간 의존 없이 단일 소스). peer: lottie-web.
// lottie-web 은 불러오는 순간 document 를 건드려서, Next 서버 렌더에서 깨지지 않게 브라우저에서만(useEffect 안) 동적으로 불러온다.
export interface LottieLoadingDotsProps {
  animationData: object;
  className?: string;
}

export function LottieLoadingDots({ animationData, className = '' }: LottieLoadingDotsProps) {
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
    <div className={`flex h-[16px] w-[60px] items-center justify-center ${className}`.trim()} role="status" aria-label="불러오는 중">
      <div ref={container} style={{ width: 60, height: 16, transform: 'scale(7)', transformOrigin: 'center' }} />
    </div>
  );
}

export default LottieLoadingDots;
