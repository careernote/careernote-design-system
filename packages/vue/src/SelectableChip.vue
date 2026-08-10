<script setup lang="ts">
// 별(대표 지정) + ✕(제거) 선택 칩 — 직업 선택 플로우 승격본.
// pencil Web_JobView · web DesiredJobsChipsPanel 이 중복 구현하던 패턴의 단일 소스.
withDefaults(
  defineProps<{
    representative?: boolean
    /** 별 버튼 title (대표/대표로 지정) */
    starTitle?: string
  }>(),
  { representative: false, starTitle: '' },
)

const emit = defineEmits<{ (e: 'star'): void; (e: 'remove'): void }>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border text-[12px] font-semibold"
    :class="representative ? 'border-sky bg-sky-selected text-sky' : 'border-neutral-200 bg-white text-gray-800'"
  >
    <button
      type="button"
      class="flex items-center gap-[6px] pl-[10px] pr-[6px] py-[6px] rounded-full hover:opacity-80"
      :title="starTitle"
      @click="emit('star')"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        :class="representative ? 'fill-sky stroke-sky' : 'fill-transparent stroke-gray600'"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span><slot /></span>
    </button>
    <button
      type="button"
      class="flex items-center pl-[2px] pr-[10px] py-[6px] text-gray600 hover:text-gray-700"
      aria-label="제거"
      @click="emit('remove')"
    >
      ✕
    </button>
  </span>
</template>
