import React from "react";
import Button from "../buttons/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  description?: string;
  showTextArea?: boolean;
  textAreaValue?: string;
  textAreaPlaceholder?: string;
  onTextAreaChange?: (value: string) => void;
  primaryButton: {
    label: string;
    onClick: () => void;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
  size?: 'default' | 'expanded';
  isMobile?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  showTextArea,
  textAreaValue = "",
  textAreaPlaceholder = "Text",
  onTextAreaChange,
  primaryButton,
  secondaryButton,
  size = 'default',
  isMobile = false
}) => {
  if (!isOpen) return null;

  const getModalClasses = () => {
      if (isMobile) {
          return size === 'expanded' 
              ? 'w-[335px] max-w-[335px] p-[32px] flex flex-col justify-center items-start gap-[20px] border border-[#F0F1F6] rounded-[10px] bg-white shadow-[0_0_15px_0_rgba(167,167,167,0.10)]' 
              : 'w-[335px] max-w-[335px] p-[32px] flex flex-col justify-center items-start gap-[20px] border border-[#F0F1F6] rounded-[10px] bg-white shadow-[0_0_15px_0_rgba(167,167,167,0.10)]';
      }
      
      return size === 'expanded' 
          ? 'flex flex-col justify-center items-start w-[550px] px-[28px] py-[32px] gap-[28px] rounded-[10px] border border-[#F0F1F6] bg-white shadow-[0_0_15px_0_rgba(167,167,167,0.10)]' 
          : 'flex flex-col justify-center items-start w-[400px] min-w-[300px] max-w-[400px] px-[28px] py-[32px] gap-[28px] rounded-[10px] border border-[#F0F1F6] bg-white shadow-[0_0_15px_0_rgba(167,167,167,0.10)]';
  };

  const getTitleText = () => {
    if (isMobile) {
        return "w-full self-stretch text-gray900 text-center font-pretendard text-body1 font-semibold";
    }
    
    return "w-full self-stretch text-gray900 text-center font-pretendard text-subtitle2 font-semibold";
  };

  const getDescriptionText = () => {
    if (isMobile) {
       return size === "default"
        ? "w-full self-stretch text-gray800 text-center font-pretendard text-body2 font-regular"
        : "w-full self-stretch text-gray800 font-pretendard text-body2 font-regular"
    }
    
    return size === "default"
    ? "self-stretch text-gray800 text-center font-pretendard text-body1 font-regular"
    : "self-stretch text-gray800 font-pretendard text-body1 font-regular"
  };

  const getTextAreaClasses = () => {
    if(isMobile) {
        return "w-full h-[120px] flex min-h-[100px] p-[16px] items-center gap-[8px] self-stretch rounded-small border border-gray400 bg-white outline-sky"
    }
    return "w-full h-[200px] flex min-h-[100px] p-[16px] items-center gap-[8px] self-stretch rounded-small border border-gray400 bg-white outline-sky"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={getModalClasses()}>
          {title && <p className={getTitleText()}>{title}</p>}
          
          <div className="w-full flex flex-col items-start gap-[4px] self-stretch">
              {size === 'expanded' && <p className="w-full text-body2 font-semibold text-gray800">{subtitle || 'Default Subtitle'}</p>}
              {description && <p className={getDescriptionText()}>{description}</p>}
          </div>
          
          {size === 'expanded' && showTextArea !== false && (
              <textarea
                value={textAreaValue}
                className={getTextAreaClasses()}
                onChange={(e) => onTextAreaChange?.(e.target.value)}
                placeholder={textAreaPlaceholder}
              />
          )}
          
          <div className="w-full flex items-center gap-[8px] self-stretch">
                <Button
                    disabled={false}
                    onClick={primaryButton.onClick}
                    className="flex px-[24px] py-[14px] justify-center items-center gap-[8px] flex-1 rounded-small border border-gray400 bg-white100"
                >
                    {primaryButton.label}
                </Button>
              {secondaryButton && (
                <Button
                    disabled={false}
                    color="sky"
                    onClick={secondaryButton.onClick}
                    className="flex px-[24px] py-[14px] justify-center items-center gap-[8px] flex-1 rounded-small border border-gray400 bg-sky"
                >
                    {secondaryButton.label}
                </Button>
              )}
          </div>
      </div>
    </div>
  );
};