const CircleNumber = ({ number }: { number: number }) => {
  return (
    <div className="w-5 h-5 py-2.5 bg-sky rounded-[500px] justify-center items-center gap-2.5 inline-flex">
      <p className="text-white text-xs font-bold font-['Pretendard'] leading-3">{number}</p>
    </div>
  );
};

export default CircleNumber;
