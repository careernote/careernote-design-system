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
