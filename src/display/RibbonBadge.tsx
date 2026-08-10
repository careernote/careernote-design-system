import React from 'react';

/**
 * 책갈피(리본) 배지 — 카드 우상단에 살짝 걸치는 강조 배지. Vue RibbonBadge 와 동일 스펙.
 * 모양만 제공, 내용은 children. 부모는 relative 여야 한다.
 */
export const RibbonBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="absolute -right-[10px] top-[20px] inline-flex items-center gap-[4px] bg-gray900 py-[8px] pl-[24px] pr-[12px] shadow-[0_2px_16px_rgba(0,0,0,0.12)] mobile:-right-[6px] mobile:top-[16px] mobile:gap-[2px] mobile:py-[5px] mobile:pl-[18px] mobile:pr-[10px]"
    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)' }}
  >
    {children}
  </div>
);

export default RibbonBadge;
