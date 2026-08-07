import React from 'react';
import Icon from '../display/Icon';

type Status = 'complete' | 'waiting' | 'editing';

interface ProgressBarItemProps {
  status: Status; // complete | waiting | editing
  text: string;
  number?: number; // 1~9 숫자 지정
  className?: string;
}

const ProgressBarItem: React.FC<ProgressBarItemProps> = ({ status, text, number = 1, className = '' }) => {
  const renderIcon = () => {
    switch (status) {
      case 'complete':
        return <Icon name="check" size="sm" color="skyblue" />;
      case 'editing':
        return <Icon name={`number_${number}` as any} size="sm" color="skyblue" />;
      case 'waiting':
      default:
        return <Icon name={`number_${number}` as any} size="sm" color="gray800" />;
    }
  };

  const textClass = status === 'waiting' ? 'text-gray800' : 'text-sky';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {renderIcon()}
      <span className={`text-body1 font-semibold ${textClass}`}>{text}</span>
    </div>
  );
};

export default ProgressBarItem;
