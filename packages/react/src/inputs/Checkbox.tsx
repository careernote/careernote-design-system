// 선택 체크박스 — 활동 선택 오버레이 스펙 승격본 (24px, rounded-8, 선택 시 sky). Vue Checkbox와 동일 스펙.
// number를 주면 체크 대신 선택 순번을 표시한다. onChange를 주면 클릭 토글까지 자체 처리한다(role=checkbox).
interface CheckboxProps {
  checked?: boolean;
  /** 선택 순번 표시 (다중 선택 UI) */
  number?: number | null;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  'data-testid'?: string;
}

export function Checkbox({
  checked = false,
  number = null,
  disabled = false,
  onChange,
  className = '',
  'data-testid': testId,
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      data-testid={testId}
      onClick={() => onChange?.(!checked)}
      className={`flex size-6 shrink-0 items-center justify-center rounded-lg border transition-colors ${
        checked ? 'border-sky bg-sky' : 'border-gray400 bg-white'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
    >
      {checked && number != null ? (
        <span className="text-[13px] font-bold leading-none text-white">{number}</span>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.5 8.5L6.5 11.5L12.5 5"
            className={checked ? 'stroke-white' : 'stroke-gray500'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default Checkbox;
