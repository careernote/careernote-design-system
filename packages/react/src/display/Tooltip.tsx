import React from 'react';

interface TooltipProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  position?: 'top' | 'bottom';
  className?: string;
}

export default function Tooltip({
  text,
  backgroundColor = '#222222',
  textColor = '#ffffff',
  position = 'top',
  className = '',
}: TooltipProps) {
  const isTop = position === 'top';

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 ${
        isTop ? '-top-[38px]' : '-bottom-[38px]'
      } flex flex-col items-center z-10 ${className}`}
    >
      {/* 툴팁 컨텐츠 */}
      <div
        className="px-3 py-2 rounded-[6px] flex gap-1 items-center justify-center"
        style={{ backgroundColor }}
      >
        <p
          className="text-body2 font-medium leading-[18px] whitespace-nowrap"
          style={{ color: textColor }}
        >
          {text}
        </p>
      </div>

      {/* 화살표 */}
      <div className={`flex items-center justify-center ${isTop ? 'rotate-180' : ''}`}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 0L10 10H0L5 0Z" fill={backgroundColor} />
        </svg>
      </div>
    </div>
  );
}
