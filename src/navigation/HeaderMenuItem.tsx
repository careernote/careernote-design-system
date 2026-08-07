import React from 'react';
import Chip from '../display/Chip';

interface HeaderMenuItemProps {
  label: string;
  isActive?: boolean;
  showNew?: boolean;
  className?: string;
}

const HeaderMenuItem: React.FC<HeaderMenuItemProps> = ({
  label,
  isActive = false,
  showNew = false,
  className = '',
}) => {
  return (
    <div className={`relative inline-flex h-full flex-col items-center justify-center group ${className}`}>
      <div className="inline-flex items-center gap-[4px]">
        <p className="text-body1 font-semibold whitespace-nowrap">{label}</p>
        {showNew && (
          <>
            {/* PC: NEW */}
            <Chip size="S" color="sky" variant="solid" className="tablet:hidden">
              NEW
            </Chip>
            {/* Mobile: N */}
            <Chip size="S" color="sky" variant="solid" className="hidden tablet:inline-flex">
              N
            </Chip>
          </>
        )}
      </div>
      <div
        className={`absolute left-[-20px] right-[-20px] tablet:left-[-8px] tablet:right-[-8px] bottom-[-1px] h-[3px] bg-sky rounded-full pointer-events-none transition-opacity duration-150 ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />
    </div>
  );
};

export default HeaderMenuItem;
