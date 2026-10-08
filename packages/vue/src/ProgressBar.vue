<script setup lang="ts">
// React ProgressBar 동일 스펙 — ProgressBarItem + 점선 커넥터 (Figma 업데이트_2025 progressBar)
// 소비처: 사업자 ATS "채용 만들기" 마법사 상단바. 커넥터는 둥근 점선 — 완료·작성 중 단계 뒤는 sky / 남은 구간 gray800.
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
      <!-- 둥근 점선(2 8) — SubHeader 스텝과 같은 모양. 진행한 단계(완료·작성 중) 뒤 구간은 sky -->
      <svg
        v-if="idx !== steps.length - 1"
        aria-hidden="true"
        class="shrink-0"
        width="48"
        height="2"
        viewBox="0 0 48 2"
        fill="none"
      >
        <path
          d="M0 1H48"
          :class="current >= idx + 1 ? 'stroke-sky' : 'stroke-gray800'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="2 8"
          stroke-dashoffset="5"
        />
      </svg>
    </template>
  </div>
</template>
