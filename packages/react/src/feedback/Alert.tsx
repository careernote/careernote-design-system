import React from 'react';
import Button from '../buttons/Button';

interface AlertProps {
  type?: 'release' | 'confirm' | 'delete';
  title?: string;
  subtitle?: string;
  onCancel?: () => void;
  onAction?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type = 'confirm',
  title,
  subtitle,
  onCancel,
  onAction,
}) => {
  const actionButtonMap: Record<string, { label: string; color: 'sky' | 'black' | 'red' }> = {
    release: { label: '발행', color: 'sky' },
    confirm: { label: '확인', color: 'black' },
    delete: { label: '삭제', color: 'red' },
  };

  return (
    <div className="w-[400px] min-w-[300px] max-w-[400px] p-6 flex flex-col items-start gap-10 rounded-medium bg-white shadow-normal-normal">
      <div className="w-full flex flex-col items-start gap-3 self-stretch">
        {title && (
          <p className="self-stretch text-gray900 text-body1 font-semibold font-pretendard">
            {title}
          </p>
        )}
        {subtitle && (
          <p className="self-stretch text-gray700 text-body2 font-regular font-pretendard">
            {subtitle}
          </p>
        )}
      </div>
      <div className="w-full h-[46px] flex justify-end gap-3 items-center self-stretch">
        <Button size="md" onClick={onCancel || (() => {})}>
          취소
        </Button>
        <Button
          size="md"
          color={actionButtonMap[type].color}
          onClick={onAction || (() => {})}
        >
          {actionButtonMap[type].label}
        </Button>
      </div>
    </div>
  );
};

export default Alert;