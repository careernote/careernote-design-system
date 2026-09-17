import React from 'react';

interface PanelProps {
  /** 내부 여백 — md: 20px, lg: 40/44px(폼 패널) */
  padding?: 'none' | 'md' | 'lg';
  /** 그림자 세기 — light: shadow/wide/light, soft: shadow/wide/soft */
  shadow?: 'light' | 'soft';
  /** 테두리(border_gray) 표시 — 카드형(목록)은 true, 폼 패널은 false */
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const paddingStyles = {
  none: '',
  md: 'p-5',
  lg: 'px-11 py-10',
};

const shadowStyles = {
  light: 'shadow-wide-light',
  soft: 'shadow-wide-soft',
};

/**
 * 흰 배경 서피스 카드 — radius 16 + shadow/wide 토큰. (Figma 업데이트_2025 Form panel · 공고 카드)
 * 목록 카드처럼 테두리가 필요하면 bordered, 폼 패널처럼 그림자만 쓰면 기본값.
 */
export const Panel: React.FC<PanelProps> = ({
  padding = 'md',
  shadow = 'light',
  bordered = false,
  className = '',
  children,
}) => (
  <div
    className={`bg-white100 rounded-xlarge ${shadowStyles[shadow]} ${paddingStyles[padding]} ${
      bordered ? 'border border-border_gray' : ''
    } ${className}`.trim()}
  >
    {children}
  </div>
);

export default Panel;
