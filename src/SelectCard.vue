<script setup lang="ts">
// 체크서클 선택 카드 (+선택적 대표 배지) — career-pencil /make/job 승격
// 라벨 색: representative → sky, selected → gray-900, 기본 → gray-800
// click 리스너는 fallthrough 로 루트에 바인딩 (버튼 클릭이 버블링되어 도달)
withDefaults(
  defineProps<{
    selected?: boolean
    representative?: boolean
    title?: string
    badgeLabel?: string
  }>(),
  { selected: false, representative: false, badgeLabel: '대표' },
)
</script>

<template>
  <div class="relative overflow-hidden rounded-[12px]">
    <span
      v-if="representative"
      class="pointer-events-none absolute top-0 left-0 z-10 inline-flex items-center justify-center bg-sky px-[22px] py-[1px] text-[12px] font-bold text-white"
      :style="{ borderRadius: '12px 0 24px 0' }"
    >
      {{ badgeLabel }}
    </span>
    <button
      type="button"
      :title="title"
      class="flex min-h-[56px] w-full items-center justify-between gap-[8px] rounded-[12px] border px-[12px] py-[16px] sm:px-[16px] text-left transition-colors"
      :class="selected ? 'border-sky bg-sky-selected' : 'border-neutral-200 bg-white hover:border-sky/50'"
    >
      <span
        class="truncate text-[13px] sm:text-[14px] font-semibold"
        :class="representative ? 'text-sky' : selected ? 'text-gray-900' : 'text-gray-800'"
      >
        <slot />
      </span>
      <span
        v-if="selected"
        class="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-sky"
      >
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path d="M1 4.5L4.5 8L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span v-else class="h-[20px] w-[20px] flex-shrink-0 rounded-full border border-neutral-200" />
    </button>
  </div>
</template>
