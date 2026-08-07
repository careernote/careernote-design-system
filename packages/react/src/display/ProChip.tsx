import React, { useState } from 'react';
import Chip from './Chip';

interface ProChipProps {
  price?: number;
  showPriceOnMobile?: boolean;
  className?: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProChip: React.FC<ProChipProps> = ({
  price,
  showPriceOnMobile = false,
  className = ' ',
  isHovered: externalIsHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [internalIsHovered, setInternalIsHovered] = useState(false);

  // 외부에서 hover 상태를 제어하거나 내부 상태 사용
  const isHovered = externalIsHovered !== undefined ? externalIsHovered : internalIsHovered;

  const formatPrice = (price: number) => {
    return `${Number(price).toLocaleString('ko-KR')} 원`;
  };

  const getDisplayText = () => {
    return <span className="transition-all duration-200">Pro</span>;
  };

  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter();
    } else {
      setInternalIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave();
    } else {
      setInternalIsHovered(false);
    }
  };

  return (
    <div className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Chip
        size="L"
        color="purple"
        variant="solid"
        className={className}
      >
        <img src="/icon/left_icon.svg" alt="check" width={18} height={18} />
        {getDisplayText()}
      </Chip>
    </div>
  );
};