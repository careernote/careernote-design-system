import React from 'react';

// 사이드바 메뉴 등에서 쓰는 상태 배지 (careernote-web SidebarNavItem 인라인 span 이관)
export type BadgeVariant = 'Soon' | 'New' | 'Beta';

interface BadgeProps {
  variant: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  Soon: 'bg-green10 text-green100',
  New: 'bg-blue200 text-white',
  Beta: 'bg-gray900 text-white',
};

export function Badge({ variant, children, className = '', 'data-testid': testId }: BadgeProps) {
  return (
    <span
      data-testid={testId}
      className={`text-xs leading-4 font-normal rounded w-10 text-center py-0.5 shrink-0 ${variantStyles[variant]} ${className}`.trim()}
    >
      {children ?? variant}
    </span>
  );
}

export default Badge;
