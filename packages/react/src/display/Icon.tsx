import React from 'react';
import { iconMap, IconName } from '../icons';

export interface IconProps {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export interface BaseIconProps {
  size?: number;
  color?: string;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
  flipY?: boolean;
}

const sizeMap = {
  xs: 16, // xsmall
  sm: 18, // small
  md: 20, // medium
  lg: 24, // large
  xl: 30, // xlarge
};

const colorMap: Record<string, string> = {
  skyblue: '#00A3FF',
  gray800: '#4B4D57',
  black: '#000000',
  white: '#FFFFFF',
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => {
  const iconSize = typeof size === 'number' ? size : sizeMap[size as keyof typeof sizeMap];
  const IconComponent = iconMap[name];

  // Tailwind 색상 클래스를 실제 색상 값으로 변환
  const resolvedColor = colorMap[color] || color;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={iconSize}
      color={resolvedColor}
      className={className}
      aria-label={ariaLabel}
      data-testid={testId}
    />
  );
};

export default Icon;
