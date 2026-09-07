// 채용/인재풀 카드 공용 타입·상수 (React CandidateProfile / CandidateHistory 와 동일)
export type FitnessLevel = 'high' | 'normal' | 'low'

export const FITNESS_LABEL: Record<FitnessLevel, string> = {
  high: '적합도 높음',
  normal: '적합도 보통',
  low: '적합도 낮음',
}

export const FITNESS_COLOR: Record<FitnessLevel, 'blue' | 'green' | 'amber'> = {
  high: 'blue',
  normal: 'green',
  low: 'amber',
}

export interface EducationEntry {
  school: string
  degree: string
  major: string
  period: string
  status: string
}
