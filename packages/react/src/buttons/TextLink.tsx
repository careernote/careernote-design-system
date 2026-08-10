import React from 'react';

/** 밑줄 텍스트 링크 버튼 — Vue TextLink 와 동일 스펙 */
export const TextLink: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => (
  <button type="button" className="font-semibold text-sky underline underline-offset-2" {...rest}>
    {children}
  </button>
);

export default TextLink;
