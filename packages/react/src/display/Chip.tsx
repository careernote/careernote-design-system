interface Props {
  size?: 'S' | 'M' | 'L' | 'XL';
  color?: 'black' | 'sky' | 'red' | 'blue' | 'green' | 'purple' | 'basic';
  variant?: 'solid' | 'soft';
  className?: string;
}

const sizeStyles = {
  S: 'py-0.5 px-1 text-xs font-normal gap-0.5 leading-4',
  M: 'py-1 px-2 text-xs font-medium gap-1 leading-4',
  L: 'py-1 px-2 text-sm font-medium gap-1 leading-[18px]',
  XL: 'py-2 px-3 text-sm font-medium gap-1 leading-[18px]',
};

const colorStyles = {
  solid: {
    black: 'bg-gray800 text-white',
    basic: 'bg-gray900 text-white',
    sky: 'bg-sky text-white',
    red: 'bg-red text-white',
    blue: 'bg-blue200 text-white',
    green: 'bg-green100 text-white',
    purple: 'bg-[#B100ED] text-white',
  },
  soft: {
    black: 'bg-bg_gray1 text-gray700',
    basic: 'bg-white border border-gray500 text-gray700',
    sky: 'bg-sky_bg text-sky',
    red: 'bg-red10 text-red',
    blue: 'bg-blue10 text-blue100',
    green: 'bg-green10 text-green100',
    purple: 'bg-[#F9E7FF] text-[#B100ED]',
  },
};

const Chip = ({
  children,
  size = 'S',
  color = 'black',
  variant = 'solid',
  className = '',
}: React.PropsWithChildren<Props>) => {
  return (
    <div
      className={`
        inline-flex justify-center items-center rounded-xsmall
        ${sizeStyles[size]}
        ${colorStyles[variant][color]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Chip;
