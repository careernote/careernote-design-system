import React from 'react';

const DropdownItems = ({
  items,
  onClick,
}: {
  items: {
    id: number;
    name: string;
  }[];
  onClick: (item: { id: number; name: string }) => void;
}) => {
  return (
    <div className="w-full h-[210px] overflow-y-auto absolute top-[50px] z-100 border border-black border-opacity-10 rounded-[9px] cursor-pointer">
      {items.map((item, index) => {
        const isFirstItem = index === 0;
        const isLastItem = items.length - 1 === index;
        return (
          <div
            key={index}
            className={`text-black text-[14px] leading-[16.8px] font-medium flex items-center pl-[13px] w-[100%] h-[44px] hover:bg-gray-100  rounded-[0px_0px_0px_0px] ${!isFirstItem && 'rounded-[0]'}  bg-white ${!isLastItem && ' border-b border-black border-opacity-10'}`}
            onClick={() => onClick(item)}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};
export default DropdownItems;
