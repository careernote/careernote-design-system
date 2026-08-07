import React, { useState, useEffect } from 'react';
import Icon from '../display/Icon';

type IconName = 'search' | 'clear' | 'eye';
type TextInputState = 'normal' | 'filled' | 'only_view' | 'error';

interface TextInputProps {
  label?: string;
  sublabel?: string;
  placeholder?: string;
  disabled?: boolean;
  essential?: boolean;
  lefticon?: IconName;
  righticon?: IconName;
  /** controlled 모드: 전달 시 내부 state 대신 이 값을 표시 */
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  errorMessage?: string;
  state?: TextInputState;
  size?: 'medium' | 'large';
  /** 기본 고정폭(w-[289px]) 대신 w-full */
  fullWidth?: boolean;
  /** 루트 래퍼에 추가할 클래스 */
  className?: string;
  'data-testid'?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  sublabel,
  placeholder = '',
  disabled = false,
  essential = false,
  lefticon,
  righticon,
  value,
  type = 'text',
  onChange,
  onKeyDown,
  maxLength,
  errorMessage,
  state: propState,
  size = 'medium',
  fullWidth = false,
  className = '',
  'data-testid': testId,
}) => {
  const [inputValue, setInputValue] = useState('');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : inputValue;
  const [isFocused, setIsFocused] = useState(false);
  const [internalState, setInternalState] = useState<TextInputState>('normal');

  // Generate a unique inputId, using label if provided, otherwise a generic fallback
  const inputId = label ? `text-input-${label.replace(/\s/g, '-')}` : `text-input-${Math.random().toString(36).substring(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!isControlled) setInputValue(next);
    onChange?.(next);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (propState !== undefined) {
      setInternalState(propState);
    } else {
      if (!isFocused) {
        setInternalState(currentValue ? 'filled' : 'normal');
      }
    }
  }, [propState, isFocused, currentValue]);

  const getInputClasses = (): string => {
    const baseClasses = `w-full h-auto flex items-center gap-2 self-stretch border rounded-small ${getContainerClasses()}`;

    if (disabled) {
      return `${baseClasses} border-gray400 bg-bg_gray1 text-gray500 text-body2 font-regular placeholder:text-gray500 cursor-not-allowed`;
    }

    if (isFocused && internalState !== 'only_view' && internalState !== 'error') {
      return `${baseClasses} border-sky bg-white100 text-gray800 text-body2 font-regular placeholder:text-gray600`;
    }

    switch (internalState) {
      case 'normal':
        return `${baseClasses} border-gray400 bg-white100 text-gray600 text-body2 font-regular placeholder:text-gray600`;
      case 'filled':
        return `${baseClasses} border-gray400 bg-white100 text-gray800 text-body2 font-regular placeholder:text-gray600`;
      case 'only_view':
        return `${baseClasses} border-gray400 bg-bg_gray1 text-gray800 text-body2 font-regular cursor-default`;
      case 'error':
        return `${baseClasses} border-red bg-white100 text-gray800 text-body2 font-regular placeholder:text-gray600`;
      default:
        return `${baseClasses} border-gray400 bg-white100 text-gray600 text-body2 font-regular placeholder:text-gray600`;
    }
  };

  const getContainerClasses = () => {
    if (size === 'large') {
      return `p-4`;
    }
    return `px-4 py-3.5`;
  };

  const isInteractionDisabled = internalState === 'only_view' || disabled;

  return (
    <div className={`${fullWidth ? 'w-full' : 'w-[289px]'} h-auto flex flex-col items-start gap-3 ${className}`.trim()}>
      {(label || sublabel) && (
        <div className="w-full h-auto flex flex-col items-start gap-1 self-stretch">
          {label && (
            <label
              htmlFor={!isInteractionDisabled ? inputId : undefined}
              className="text-body1 font-semibold text-gray900 font-pretendard"
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

      <div className="w-full h-auto flex flex-col items-start gap-2 self-stretch">
        <div className={getInputClasses()}>
          {lefticon && (
            <Icon
              name={lefticon}
              className='flex-shrink-0 w-[18px] h-[18px]'
            />
          )}
          <input
            id={inputId}
            type={type}
            data-testid={testId}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={isInteractionDisabled}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            onFocus={!isInteractionDisabled ? handleFocus : undefined}
            onBlur={!isInteractionDisabled ? handleBlur : undefined}
            className="w-full h-auto max-h-[18px] flex-1 outline-none bg-transparent"
            aria-invalid={internalState === 'error'}
            aria-describedby={internalState === 'error' && errorMessage ? `${inputId}-error` : undefined}
            readOnly={internalState === 'only_view'}
          />
          {righticon && (
            <Icon
              name={righticon}
              className='flex-shrink-0 w-[18px] h-[18px]'
            />
          )}
        </div>

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

export default TextInput;