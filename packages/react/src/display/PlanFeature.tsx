import React from 'react';

interface PlanFeatureProps {
  emoji: string;
  title: string;
  description: string;
  layout?: 'column' | 'row';
}

/**
 * 요금제 카드 안 기능 항목 (이모지 원 + 제목 + 설명) — Vue PlanFeature 와 동일 스펙.
 * layout 'column' = 이모지 위 (Basic), 'row' = 이모지 옆 (Fit, 모바일 축소 타이포)
 */
export const PlanFeature: React.FC<PlanFeatureProps> = ({ emoji, title, description, layout = 'column' }) => (
  <div
    className={
      layout === 'row'
        ? 'flex items-center gap-[16px] mobile:items-start mobile:gap-[12px]'
        : 'flex flex-col items-start gap-[12px]'
    }
  >
    <div className="relative h-[40px] w-[40px] shrink-0 rounded-full bg-bg_gray2">
      <span className="absolute inset-0 flex items-center justify-center text-[16px] leading-none">{emoji}</span>
    </div>
    <div
      className={
        layout === 'row'
          ? 'flex min-w-0 flex-1 flex-col gap-[8px] mobile:gap-[4px]'
          : 'flex min-w-0 flex-col gap-[8px]'
      }
    >
      <span
        className={`text-[16px] font-semibold leading-[20px] text-gray800 ${
          layout === 'row' ? 'mobile:text-[14px] mobile:leading-[18px]' : ''
        }`}
      >
        {title}
      </span>
      <span
        className={`text-[14px] font-normal leading-[18px] text-gray700 ${
          layout === 'row' ? 'mobile:text-[13px] mobile:leading-[17px]' : ''
        }`}
      >
        {description}
      </span>
    </div>
  </div>
);

export default PlanFeature;
