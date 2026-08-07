import React from 'react';
import { BaseIconProps } from '../display/Icon';

const NumberGlyph: React.FC<BaseIconProps & { value: number }> = ({
  value,
  size = 18,
  color = '#00A3FF',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-semibold text-sm ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      {value}
    </div>
  );
};

export const Number1Icon: React.FC<BaseIconProps> = props => <NumberGlyph value={1} {...props} />;
export const Number2Icon: React.FC<BaseIconProps> = props => <NumberGlyph value={2} {...props} />;
export const Number3Icon: React.FC<BaseIconProps> = props => <NumberGlyph value={3} {...props} />;
export const Number4Icon: React.FC<BaseIconProps> = props => <NumberGlyph value={4} {...props} />;
export const Number5Icon: React.FC<BaseIconProps> = props => <NumberGlyph value={5} {...props} />;
export const Number6Icon: React.FC<BaseIconProps> = props => <NumberGlyph value={6} {...props} />;
export const Number7Icon: React.FC<BaseIconProps> = props => <NumberGlyph value={7} {...props} />;
export const Number8Icon: React.FC<BaseIconProps> = props => <NumberGlyph value={8} {...props} />;
export const Number9Icon: React.FC<BaseIconProps> = props => <NumberGlyph value={9} {...props} />;
