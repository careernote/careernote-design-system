import React from 'react';

export interface StarValues {
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
}

/** STAR 팔레트·순서 정본 — Vue StarGrid 와 동일 값 유지 */
export const STAR_DISPLAY = [
  { key: 'situation', letter: 'S', color: '#00A3FF' },
  { key: 'task', letter: 'T', color: '#7C5CFC' },
  { key: 'action', letter: 'A', color: '#22A565' },
  { key: 'result', letter: 'R', color: '#F2912B' },
] as const;

/**
 * STAR(상황·과제·행동·결과) 2×2 요약 그리드 — 활동 카드 본문용.
 * 채워진 칸만 렌더. 칸이 하나도 없으면 null (소비자가 폴백 처리).
 */
export const StarGrid: React.FC<{ star?: StarValues | null }> = ({ star }) => {
  if (!star) return null;
  const filled = STAR_DISPLAY.filter(({ key }) => (star[key] ?? '').trim().length > 0);
  if (filled.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-[14px]">
      {filled.map(({ key, letter, color }) => (
        <div key={key} className="flex min-w-0 items-center gap-[14px] rounded-[8px] bg-bg_gray1 p-[10px]">
          <span
            className="flex size-[18px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold leading-none text-white"
            style={{ backgroundColor: color }}
          >
            {/* Pretendard 정적 빌드는 잉크가 0.39px 위 — 실측 보정 (pencil Variable 빌드는 −0.3) */}
            <span className="relative top-[0.4px]">{letter}</span>
          </span>
          <p className="line-clamp-2 text-[13px] font-normal leading-[17px] text-gray700">{(star[key] ?? '').trim()}</p>
        </div>
      ))}
    </div>
  );
};

export default StarGrid;
