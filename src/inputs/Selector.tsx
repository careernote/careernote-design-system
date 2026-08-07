import React, { useState, useEffect, useRef } from 'react';
import Icon from '../display/Icon';

type OptionItem = string | { label: string; value: string };

interface SelectorProps {
  label?: string;
  sublabel?: string;
  placeholder?: string;
  disabled?: boolean;
  essential?: boolean;
  lefticon?: string;
  value?: string;
  options?: OptionItem[];
  onChange?: (value: string) => void;
  errorMessage?: string;
  size?: 'medium' | 'large';
  className?: string;
  'data-testid'?: string;
}

function getOptionValue(opt: OptionItem): string {
  return typeof opt === 'string' ? opt : opt.value;
}

function getOptionLabel(opt: OptionItem): string {
  return typeof opt === 'string' ? opt : opt.label;
}

function findLabelByValue(options: OptionItem[], value: string): string {
  const found = options.find((opt) => getOptionValue(opt) === value);
  return found ? getOptionLabel(found) : value;
}

const Selector: React.FC<SelectorProps> = ({
  label,
  sublabel,
  placeholder = '',
  disabled = false,
  essential = false,
  lefticon,
  options,
  value,
  onChange,
  errorMessage: externalErrorMessage,
  size = 'medium',
  className,
  'data-testid': testId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const [internalState, setInternalState] = useState<'normal' | 'filled' | 'error' | 'disabled'>('normal');
  const [internalError, setInternalError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectorId = useRef(`selector-${Math.random().toString(36).substr(2, 9)}`).current;

  const validateSelection = (val: string) => {
    if (essential && !val) {
      setInternalError('옵션을 선택하세요');
      setInternalState('error');
    } else {
      setInternalError('');
      setInternalState(val ? 'filled' : 'normal');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
      setIsFocused(false);
      validateSelection(selectedValue);
    }
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    validateSelection(optionValue);
    onChange?.(optionValue);
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (disabled) {
      setInternalState('disabled');
      setInternalError('');
    } else if (externalErrorMessage) {
      setInternalState('error');
      setInternalError(externalErrorMessage);
    } else {
      validateSelection(selectedValue);
    }
  }, [disabled, essential, selectedValue, externalErrorMessage]);

  const effectiveErrorMessage = externalErrorMessage || internalError;

  const displayLabel = selectedValue && options
    ? findLabelByValue(options, selectedValue)
    : '';

  const getContainerClasses = () => {
    if (size === 'large') return 'p-[16px]';
    return 'px-[16px] py-[12px]';
  };

  const getSelectorClasses = () => {
    const heightClass = size === 'medium' ? 'h-[42px]' : 'h-[50px]';
    const baseClasses = `w-full ${heightClass} flex items-center gap-[8px] rounded-small border outline-none cursor-pointer ${getContainerClasses()}`;

    if (internalState === 'disabled') {
      return `${baseClasses} border-gray400 bg-bg_gray1 text-gray600 cursor-not-allowed`;
    } else if (internalState === 'error') {
      return `${baseClasses} border-red bg-white text-gray800`;
    } else if (isFocused || isOpen) {
      return `${baseClasses} border-sky bg-white text-gray800`;
    } else {
      return `${baseClasses} border-gray400 bg-white ${selectedValue ? 'text-gray800' : 'text-gray600'}`;
    }
  };

  const getTextClasses = () => {
    if (internalState === 'disabled') return 'text-gray500';
    if (internalState === 'filled') return 'text-gray800 font-semibold';
    return 'text-gray600 font-medium';
  };

  return (
    <div className={`w-full h-auto flex flex-col items-start gap-[12px] ${className ?? ''}`}>
      {/* Label */}
      {(label || sublabel) && (
        <div className="w-full h-auto flex flex-col items-start gap-[4px] self-stretch">
          {label && (
            <label
              htmlFor={internalState !== 'disabled' ? selectorId : undefined}
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
      {/* Wrap */}
      <div
        ref={containerRef}
        className="w-full h-auto flex flex-col items-start gap-[8px] self-stretch relative"
        onBlur={handleBlur}
        onFocus={handleFocus}
      >
        <div
          id={selectorId}
          className={getSelectorClasses()}
          onClick={handleToggle}
          tabIndex={internalState === 'disabled' ? -1 : 0}
          aria-expanded={isOpen}
          aria-disabled={internalState === 'disabled'}
          aria-invalid={internalState === 'error'}
          aria-describedby={internalState === 'error' && effectiveErrorMessage ? `${selectorId}-error` : undefined}
          aria-label={displayLabel || placeholder}
          data-testid={testId}
        >
          {lefticon && (
            <Icon
              name={lefticon}
              className="w-[18px] h-[18px] flex-shrink-0"
            />
          )}
          <span className={`flex-1 text-body2 truncate font-medium font-pretendard ${getTextClasses()}`}>
            {displayLabel || placeholder}
          </span>
          <Icon
            name="arrow-down"
            className="w-[18px] h-[18px] flex-shrink-0"
          />
        </div>
        {isOpen && options && (
          <ul className="absolute w-full mt-[8px] p-[6px] bg-white rounded-[12px] shadow-[0px_2px_28px_0px_rgba(0,0,0,0.08)] max-h-[240px] overflow-y-auto z-[1000] top-[100%] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {options.map((option) => {
              const optValue = getOptionValue(option);
              const optLabel = getOptionLabel(option);
              return (
                <li
                  key={optValue}
                  className={`px-[16px] py-[10px] text-[14px] font-medium text-[#4B4D57] rounded-[8px] cursor-pointer transition-colors truncate ${
                    optValue === selectedValue ? 'bg-[#F6F7F8] font-semibold text-[#222]' : 'hover:bg-[#F6F7F8]'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(optValue);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {optLabel}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {/* Error Message */}
      {internalState === 'error' && effectiveErrorMessage && (
        <p
          id={`${selectorId}-error`}
          className="text-detail font-regular leading-[16px] text-red font-pretendard"
        >
          {effectiveErrorMessage}
        </p>
      )}
    </div>
  );
};

export default Selector;
