import React from 'react';
import DropdownItems from './DropdownItems';
import ArrowIcon from '../icons-extra/ArrowIcon';

const Selector = ({
  value,
  items,
  onClickSelector,
  onClickRenderItems,
  isVisible,
}: {
  value: string;
  items: {
    id: number;
    name: string;
  }[];
  onClickSelector: () => void;
  onClickRenderItems: (item: { id: number; name: string }) => void;
  isVisible: boolean;
}) => {
  return (
    <div className="relative flex flex-col justify-center items-center cursor-pointer">
      <div
        className="flex items-center px-[13px] w-[289px] tablet:w-[125px] h-[44px] border border-black border-opacity-10 rounded-[6px]"
        onClick={onClickSelector}
      >
        <div className="text-[14px] leading-[16.8px] text-black  font-medium flex items-center justify-between w-full">
          {value}
          <ArrowIcon className="text-black" />
        </div>
      </div>
      {isVisible && <DropdownItems items={items} onClick={onClickRenderItems} />}
    </div>
  );
};
export default Selector;
