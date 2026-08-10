import React from 'react';

interface InHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string; // optional override
  descriptionClassName?: string; // optional override
  type?: 'default' | 'mini';
}

/**
 * InHeader
 * - Renders a title and description stacked vertically
 * - Spacing between title and description: desktop 8px, mobile 4px
 */
const InHeader: React.FC<InHeaderProps> = ({
  title,
  description,
  className = '',
  titleClassName,
  descriptionClassName,
  type = 'default',
}) => {
  // Typography by type/breakpoint
  const titleDesktop =
    type === 'default'
      ? 'text-title2 font-semibold text-sky'
      : 'text-subtitle1 font-semibold text-gray800';
  const titleMobile = 'tablet:text-subtitle3 tablet:font-semibold ' + (type === 'default' ? 'tablet:text-sky' : '');

  const descDesktop = 'text-body1 font-medium text-gray700';
  const descMobile = 'tablet:text-body2 tablet:font-regular';

  return (
    <div
      className={`flex flex-col items-center gap-2 py-5 tablet:gap-1 mobile:py-4 ${className}`}
    >
      <div className={titleClassName ?? `text-center ${titleDesktop} ${titleMobile}`}>{title}</div>
      {description && (
        <div className={descriptionClassName ?? `text-center ${descDesktop} ${descMobile}`}>{description}</div>
      )}
    </div>
  );
};

export default InHeader;
