// 면접 빈 상태용 그레이스케일 마이크 일러스트 — CardIndexDivider(포트폴리오 빈 상태)와 같은 톤
const MicIllustrationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      <rect x="36" y="10" width="28" height="48" rx="14" fill="url(#paint0_linear_mic)" />
      <path d="M42 22h16M42 30h16M42 38h16" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path
        d="M26 44v2c0 13.255 10.745 24 24 24s24-10.745 24-24v-2"
        stroke="url(#paint1_linear_mic)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M50 70v12" stroke="#BEBEBE" strokeWidth="6" strokeLinecap="round" />
      <rect x="34" y="84" width="32" height="6" rx="3" fill="url(#paint2_linear_mic)" />
      <defs>
        <linearGradient id="paint0_linear_mic" x1="50" y1="10" x2="50" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8E8E8" />
          <stop offset="1" stopColor="#C2C2C2" />
        </linearGradient>
        <linearGradient id="paint1_linear_mic" x1="50" y1="44" x2="50" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D8D8D8" />
          <stop offset="1" stopColor="#B4B4B4" />
        </linearGradient>
        <linearGradient id="paint2_linear_mic" x1="50" y1="84" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D8D8D8" />
          <stop offset="1" stopColor="#BEBEBE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MicIllustrationIcon;
