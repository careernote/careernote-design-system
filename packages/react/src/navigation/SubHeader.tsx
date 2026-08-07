import React from 'react';
import ProgressBarItem from './ProgressBarItem';
import Button from '../buttons/Button';
import Icon from '../display/Icon';
import Chip from '../display/Chip';

interface ProgressStep {
  id: string;
  label: string;
  status: 'complete' | 'waiting' | 'editing';
  number?: number;
}

interface SubHeaderProps {
  steps: ProgressStep[];
  onStop?: () => void;
  depth?: 1 | 2;
  className?: string;
  depth2Text?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ steps, onStop, depth = 1, className = '', depth2Text = 'text' }) => {
  return (
    <div className={`w-full bg-white border-b border-gray200 relative ${className}`}>
      {depth === 1 && onStop && (
        <div className="absolute left-[52px] top-1/2 -translate-y-1/2 tablet:hidden z-10">
          <Button
            color="white"
            size="md"
            mobileSize="sm"
            onClick={onStop}
            className="text-gray800 border border-gray300 hover:bg-gray50"
          >
            나가기
          </Button>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto px-0 tablet:px-5 py-4">
        <div className="h-[60px]">
          {depth === 1 ? (
            // depth 1: 데스크톱 중앙, 모바일은 좌우 20px 여백 + 버튼과 한 줄 배치
            <>
              {/* Desktop view */}
              <div className="absolute inset-0 flex items-center justify-center tablet:hidden">
                <div className="flex items-center">
                  {steps.map((step, index) => {
                    const strokeColorToken = step.status === 'editing' ? 'skyblue' : 'gray800';
                    const tokenToHex: Record<string, string> = {
                      skyblue: '#00A3FF',
                      gray800: '#4B4D57',
                      gray700: '#6B7280',
                    };
                    const strokeColor = tokenToHex[strokeColorToken];
                    return (
                      <React.Fragment key={step.id}>
                        {index > 0 && (
                          <svg
                            className="mx-7"
                            width="48"
                            height="2"
                            viewBox="0 0 48 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 1 H48"
                              stroke={strokeColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeDasharray="2 8"
                              strokeDashoffset="5"
                            />
                          </svg>
                        )}
                        <div className="flex items-center">
                          <ProgressBarItem status={step.status} text={step.label} number={step.number} />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Mobile view */}
              <div className="hidden tablet:flex absolute left-5 right-5 top-1/2 -translate-y-1/2 items-center">
                {onStop && (
                  <Button
                    color="white"
                    size="md"
                    mobileSize="sm"
                    onClick={onStop}
                    className="text-gray800 border border-gray300 hover:bg-gray50"
                  >
                    나가기
                  </Button>
                )}
                <div className="flex-1" />
                {(() => {
                  const s = steps.find(step => step.status === 'editing') || steps[0];
                  return <ProgressBarItem status={s.status} text={s.label} number={s.number} />;
                })()}
              </div>
            </>
          ) : (
            // depth 2 레이아웃
            <>
              {/* 좌측: 52px 여백 후 아이콘 + 이전으로 (모바일 sm, 텍스트 숨김) */}
              <div className="absolute left-[52px] top-1/2 -translate-y-1/2 flex items-center tablet:left-5">
                <span className="desktop:inline tablet:hidden">
                  <Icon name="arrow-left-2" size="lg" color="#6B7280" />
                </span>
                <span className="hidden tablet:inline">
                  <Icon name="arrow-left-2" size="sm" color="#6B7280" />
                </span>
                <span className="ml-3 text-body1 font-semibold text-gray700 whitespace-nowrap tablet:hidden">
                  이전으로
                </span>
              </div>

              {/* 가운데: Black Soft 버튼 + 2px 여백 + text (모바일 S) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <span className="desktop:inline tablet:hidden">
                    <Chip color="black" size="L" variant="soft">
                      생성 대기
                    </Chip>
                  </span>
                  <span className="hidden tablet:inline">
                    <Chip color="black" size="S" variant="soft">
                      생성 대기
                    </Chip>
                  </span>
                  <span className="text-subtitle3 font-medium text-gray800 tablet:text-body2 tablet:font-semibold">
                    {depth2Text}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
