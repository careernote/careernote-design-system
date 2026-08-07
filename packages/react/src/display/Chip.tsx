interface Props {
  size?: 'S' | 'M' | 'L' | 'XL';
  color?: 'black' | 'sky' | 'red' | 'blue' | 'green' | 'purple' | 'basic';
  variant?: 'solid' | 'soft';
  className?: string;
}

const sizeStyles = {
  S: 'py-[2px] px-[4px] text-xs font-normal gap-[2px] leading-4',
  M: 'py-[4px] px-[8px] text-xs font-medium gap-[4px] leading-4',
  L: 'py-[4px] px-[8px] text-sm font-medium gap-[4px] leading-[18px]',
  XL: 'py-[8px] px-[12px] text-sm font-medium gap-[4px] leading-[18px]',
};

const colorStyles = {
  solid: {
    black: 'bg-[#4B4D57] text-white',
    basic: 'bg-[#222222] text-white',
    sky: 'bg-[#00A3FF] text-white',
    red: 'bg-[#F10000] text-white',
    blue: 'bg-[#0267FF] text-white',
    green: 'bg-[#03C75A] text-white',
    purple: 'bg-[#B100ED] text-white',
  },
  soft: {
    black: 'bg-[#F8F8F8] text-[#727180]',
    basic: 'bg-white border border-[#C3C3CD] text-[#727180]',
    sky: 'bg-[#EDF8FF] text-[#00A3FF]',
    red: 'bg-[#FFF0F0] text-[#F10000]',
    blue: 'bg-[#EFF3FF] text-[#2F65FF]',
    green: 'bg-[#ECFBEE] text-[#03C75A]',
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
