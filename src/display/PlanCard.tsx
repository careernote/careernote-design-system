import React from 'react';

interface PlanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}

/**
 * 요금제/옵션 선택 카드 셸 — Vue PlanCard 와 동일 스펙.
 * 선택 시 border 2px(sky) + padding 1px 보정. 폭은 className 으로 지정.
 */
export const PlanCard: React.FC<PlanCardProps> = ({ selected = false, className = '', children, ...rest }) => (
  <div
    className={`relative flex h-[386px] shrink-0 cursor-pointer flex-col justify-between gap-[60px] rounded-[20px] bg-white shadow-[0_2px_28px_rgba(0,0,0,0.04)] transition-transform duration-150 ease-out active:scale-[0.985] mobile:h-auto mobile:w-full mobile:gap-[24px] ${
      selected
        ? 'border-[2px] border-sky px-[15px] pb-[27px] pt-[39px] mobile:px-[19px] mobile:pt-[23px] mobile:pb-[23px]'
        : 'border border-border_gray px-[16px] pb-[28px] pt-[40px] mobile:px-[20px] mobile:pt-[24px] mobile:pb-[24px]'
    } ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export default PlanCard;
