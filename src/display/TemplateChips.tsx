import React from 'react';
import Chip from './Chip';

interface TemplateChipsProps {
  template: {
    isFree?: boolean;
    isBuy?: boolean;
    canUse?: boolean;
    price?: number;
  };
  className?: string;
}

export const TemplateChips: React.FC<TemplateChipsProps> = ({ template, className = '' }) => {
  // 텍스트에서 "가능"과 "불가능"에 색상을 적용하는 함수
  const renderColoredText = (text: string) => {
    if (text.includes('불가능')) {
      const parts = text.split('불가능');
      return (
        <>
          {parts[0]}
          <span className="text-red">&nbsp;불가능</span>
          {parts[1]}
        </>
      );
    } else if (text.includes('가능')) {
      const parts = text.split('가능');
      return (
        <>
          {parts[0]}
          <span className="text-sky">&nbsp;가능</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };
  const getMainChip = () => {
    if (template.isFree) {
      return (
        <Chip size="XL" color="sky" variant="solid" className="w-auto h-auto flex px-2 py-1 rounded-small justify-center items-center gap-1 text-body2 font-medium">
          Free
        </Chip>
      );
    } else {
      return (
        <Chip size="XL" color="purple" variant="solid" className="w-auto h-auto flex px-2 py-1 rounded-small justify-center items-center gap-1 text-body2 font-medium">
          <img src="/icon/left_icon.svg" alt="check" width={18} height={18} />
          Pro
        </Chip>
      );
    }
  };

  const getFeatureChips = () => {
    if (template.isFree) {
      const freeFeatures = ['단일 레이아웃', '개별 요소 편집 불가능'];

      return freeFeatures.map((feature, index) => (
        <div
          key={index}
          className="w-auto h-auto flex items-center justify-center px-3 py-2 gap-1 rounded-small border border-gray500 bg-white100 text-body2 font-medium text-gray700"
        >
          {renderColoredText(feature)}
        </div>
      ));
    } else {
      const proFeatures = ['영구 이용', '다양한 레이아웃', '개별 요소 편집 가능'];

      return proFeatures.map((feature, index) => (
        <div
          key={index}
          className="w-auto h-auto flex items-center justify-center px-3 py-2 gap-1 rounded-small border border-gray500 bg-white100 text-body2 font-medium text-gray700"
        >
          {renderColoredText(feature)}
        </div>
      ));
    }
  };

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {getMainChip()}
      {getFeatureChips()}
    </div>
  );
};
