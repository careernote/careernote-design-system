import React, { Fragment } from 'react';
import ProgressBarItem from './ProgressBarItem';

interface ProgressBarProps {
  /** 단계 라벨 — 순서대로. 최대 9단계(number_n 아이콘 범위) */
  steps: string[];
  /** 현재 단계 (1-based). current 이전은 complete, current 는 editing, 이후는 waiting */
  current: number;
  className?: string;
}

/**
 * 단계 진행바 — ProgressBarItem + 점선 커넥터. (Figma 업데이트_2025 progressBar)
 * 사업자 ATS "채용 만들기" 마법사 상단바가 첫 소비처. 커넥터 색은 지난 구간 sky / 남은 구간 gray800.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ steps, current, className = '' }) => (
  <div className={`inline-flex items-center gap-7 ${className}`.trim()}>
    {steps.map((label, idx) => {
      const n = idx + 1;
      const status = current > n ? 'complete' : current === n ? 'editing' : 'waiting';
      const last = idx === steps.length - 1;
      return (
        <Fragment key={label}>
          <ProgressBarItem status={status} text={label} number={n} />
          {!last && (
            <i
              aria-hidden
              className={`h-0 w-12 shrink-0 border-t-2 border-dashed ${current > n ? 'border-sky' : 'border-gray800'}`}
            />
          )}
        </Fragment>
      );
    })}
  </div>
);

export default ProgressBar;
