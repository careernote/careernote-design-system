<script setup lang="ts">
// STAR(상황·과제·행동·결과) 2×2 요약 그리드 — 활동 카드 본문용.
// 팔레트·순서 정본: STAR_DISPLAY (React 패키지와 동일 값 유지).
// 채워진 칸만 렌더. 칸이 하나도 없으면 아무것도 그리지 않는다 (소비자가 v-if 로 폴백 처리).
import { computed } from 'vue'

export interface StarValues {
  situation?: string
  task?: string
  action?: string
  result?: string
}

const STAR_DISPLAY = [
  { key: 'situation', letter: 'S', color: '#00A3FF' },
  { key: 'task', letter: 'T', color: '#7C5CFC' },
  { key: 'action', letter: 'A', color: '#22A565' },
  { key: 'result', letter: 'R', color: '#F2912B' },
] as const

const props = defineProps<{ star?: StarValues | null }>()

const filled = computed(() => {
  const s = props.star
  if (!s) return []
  return STAR_DISPLAY.filter(({ key }) => (s[key] ?? '').trim().length > 0).map(({ key, letter, color }) => ({
    letter,
    color,
    text: (s[key] ?? '').trim(),
  }))
})

defineExpose({ filledCount: computed(() => filled.value.length) })
</script>

<template>
  <div v-if="filled.length > 0" class="grid grid-cols-2 gap-[14px]">
    <div
      v-for="(st, i) in filled"
      :key="i"
      class="flex min-w-0 items-center gap-[14px] rounded-[8px] bg-bg-gray1 p-[10px]"
    >
      <span
        class="flex size-[18px] shrink-0 items-center justify-center rounded-full font-['Pretendard_Variable',Pretendard,sans-serif] text-[11px] font-bold leading-none text-white"
        :style="{ backgroundColor: st.color }"
      >
        <!-- Pretendard Variable 빌드는 잉크가 0.28px 아래 — 실측 보정 (careernote-web 정적 빌드는 +0.4) -->
        <span class="relative top-[-0.3px]">{{ st.letter }}</span>
      </span>
      <p class="line-clamp-2 text-[13px] font-normal leading-[17px] text-gray700">{{ st.text }}</p>
    </div>
  </div>
</template>
