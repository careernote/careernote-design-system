<script setup lang="ts">
// React ProgressBar 동일 스펙 — ProgressBarItem + 점선 커넥터 (Figma 업데이트_2025 progressBar)
// 소비처: 사업자 ATS "채용 만들기" 마법사 상단바. 커넥터는 지난 구간 sky / 남은 구간 gray800.
import ProgressBarItem from './ProgressBarItem.vue'

withDefaults(
  defineProps<{
    /** 단계 라벨 — 순서대로. 최대 9단계(number_n 아이콘 범위) */
    steps: string[]
    /** 현재 단계 (1-based) */
    current: number
  }>(),
  { current: 1 },
)

function statusOf(current: number, n: number) {
  if (current > n) return 'complete' as const
  if (current === n) return 'editing' as const
  return 'waiting' as const
}
</script>

<template>
  <div class="inline-flex items-center gap-7">
    <template v-for="(label, idx) in steps" :key="label">
      <ProgressBarItem :status="statusOf(current, idx + 1)" :text="label" :number="idx + 1" />
      <i
        v-if="idx !== steps.length - 1"
        aria-hidden="true"
        class="h-0 w-12 shrink-0 border-t-2 border-dashed"
        :class="current > idx + 1 ? 'border-sky' : 'border-gray800'"
      />
    </template>
  </div>
</template>
