// STAR 팔레트·순서 정본 — React 패키지 STAR_DISPLAY 와 동일 값 유지.
// 소비자(폼·오버레이·패널)가 카드와 같은 색을 쓰도록 export 한다.
export interface StarValues {
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
}

export const STAR_DISPLAY = [
  { key: 'situation', letter: 'S', color: '#00A3FF' },
  { key: 'task', letter: 'T', color: '#7C5CFC' },
  { key: 'action', letter: 'A', color: '#22A565' },
  { key: 'result', letter: 'R', color: '#F2912B' },
] as const;
