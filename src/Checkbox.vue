<script setup lang="ts">
// 선택 체크박스 — 활동 선택 오버레이 스펙 승격본 (24px, rounded-8, 선택 시 sky).
// number 를 주면 체크 대신 선택 순번을 표시한다.
withDefaults(
  defineProps<{
    checked?: boolean
    /** 선택 순번 표시 (다중 선택 UI) */
    number?: number | null
  }>(),
  { checked: false, number: null },
)
</script>

<template>
  <span
    class="flex size-[24px] items-center justify-center rounded-[8px] border"
    :class="checked ? 'border-sky bg-sky' : 'border-gray400 bg-white'"
  >
    <span v-if="checked && number != null" class="text-[13px] font-bold leading-none text-white">{{ number }}</span>
    <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8.5L6.5 11.5L12.5 5"
        :class="checked ? 'stroke-white' : 'stroke-gray500'"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>
