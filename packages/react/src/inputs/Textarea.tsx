import React, { useState, useEffect } from 'react';

type TextAreaState = 'normal' | 'filled' | 'only_view' | 'error' | 'focused' | 'generated';

interface TextAreaProps {
  label?: string;
  sublabel?: string;
  placeholder?: string;
  disabled?: boolean;
  essential?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  errorMessage?: string;
  state?: TextAreaState;
  size?: 'medium' | 'large';
  // 기본 폭은 289px 고정 — 카드/모달처럼 컨테이너를 꽉 채워야 할 때만 켠다
  fullWidth?: boolean;
  'data-testid'?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  sublabel,
  placeholder = '',
  disabled = false,
  essential = false,
  value: controlledValue,
  onChange,
  errorMessage,
  state: propState,
  size = 'medium',
  fullWidth = false,
  'data-testid': testId,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [internalState, setInternalState] = useState<TextAreaState>('normal');

  const inputId = `textarea-${Math.random().toString(36).substring(2, 9)}`;

  // Handle controlled/uncontrolled component
  const currentValue = controlledValue !== undefined ? controlledValue : inputValue;
  const isControlled = controlledValue !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInputValue(newValue);
    }

    onChange?.(newValue);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // State management logic
  useEffect(() => {
    if (propState !== undefined) {
      setInternalState(propState);
    } else {
      // Auto-determine state
      if (currentValue && currentValue.length > 0) {
        setInternalState('filled');
      } else {
        setInternalState('normal');
      }
    }
  }, [propState, currentValue]);

  const getInputClasses = (): string => {
    const baseClasses = `w-full ${size === 'large' ? 'h-[200px]' : 'h-[120px]'} min-h-[100px] p-[16px] rounded-[6px] font-pretendard text-body2 font-regular resize-none outline-none`;

    if (disabled) {
      return `${baseClasses} border border-gray400 bg-gray100 text-gray500 cursor-not-allowed`;
    }

    if (internalState === 'error') {
      return `${baseClasses} border border-red bg-white text-gray800 placeholder:text-gray600`;
    }

    if (isFocused && internalState !== 'generated' && internalState !== 'only_view') {
      return `${baseClasses} border border-sky bg-white text-gray800 placeholder:text-gray600`;
    }

    switch (internalState) {
      case 'normal':
        return `${baseClasses} border border-gray400 bg-white text-gray600 placeholder:text-gray600`;
      case 'filled':
        return `${baseClasses} border border-gray400 bg-white text-gray800 placeholder:text-gray600`;
      case 'only_view':
        return `${baseClasses} border border-gray400 bg-gray100 text-gray800 cursor-default`;
      case 'generated':
        return `${baseClasses} bg-white text-sky placeholder:text-gray600 border-none cursor-default`;
      case 'focused':
        return `${baseClasses} border border-sky bg-white text-gray800 placeholder:text-gray600`;
      default:
        return `${baseClasses} border border-gray400 bg-white text-gray600 placeholder:text-gray600`;
    }
  };

  const isInteractionDisabled = internalState === 'only_view' || disabled;

  return (
    <div className={`${fullWidth ? 'w-full' : 'w-[289px]'} flex flex-col items-start gap-[12px]`}>
      {(label || sublabel) && (
        <div className="w-full h-auto flex flex-col items-start gap-[4px] self-stretch">
          {label && (
            <label
              htmlFor={!isInteractionDisabled ? inputId : undefined}
              className="w-auto h-auto text-body1 font-semibold text-gray900 font-pretendard"
            >
              {label}
              {essential && <span className="text-sky"> *</span>}
            </label>
          )}
          {sublabel && (
            <span className="text-body2 font-regular text-gray700 font-pretendard">
              {sublabel}
            </span>
          )}
        </div>
      )}
      <div className="w-full flex flex-col items-start gap-[8px] self-stretch">
        {internalState === 'generated' ? (
          <div
            className={`w-[289px] ${size === 'large' ? 'h-[204px]' : 'h-[124px]'} rounded-[6px] p-[2px] bg-gradient-to-b from-[#4095FF] to-[#08E3C9]`}
          >
            <textarea
              id={inputId}
              placeholder={placeholder}
              disabled={isInteractionDisabled}
              value={currentValue}
              onChange={handleChange}
              onFocus={!isInteractionDisabled ? handleFocus : undefined}
              onBlur={!isInteractionDisabled ? handleBlur : undefined}
              className={getInputClasses()}
              aria-invalid={false}
              readOnly={false}
            />
          </div>
        ) : (
          <textarea
            id={inputId}
            placeholder={placeholder}
            disabled={isInteractionDisabled}
            value={currentValue}
            onChange={handleChange}
            onFocus={!isInteractionDisabled ? handleFocus : undefined}
            onBlur={!isInteractionDisabled ? handleBlur : undefined}
            className={getInputClasses()}
            aria-invalid={internalState === 'error'}
            aria-describedby={internalState === 'error' && errorMessage ? `${inputId}-error` : undefined}
            readOnly={internalState === 'only_view'}
            data-testid={testId}
          />
        )}
        {internalState === 'error' && errorMessage && (
          <p
            id={`${inputId}-error`}
            className="text-detail font-regular leading-[16px] text-red font-pretendard"
          >
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;