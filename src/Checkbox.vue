<script setup lang="ts">
// 선택 체크박스 — 활동 선택 오버레이 스펙 승격본 (24px, rounded-8, 선택 시 sky). React Checkbox와 동일 스펙.
// number 를 주면 체크 대신 선택 순번을 표시한다. change 이벤트로 클릭 토글까지 자체 처리한다(role=checkbox).
withDefaults(
  defineProps<{
    checked?: boolean
    /** 선택 순번 표시 (다중 선택 UI) */
    number?: number | null
    disabled?: boolean
  }>(),
  { checked: false, number: null, disabled: false },
)

const emit = defineEmits<{ (e: 'change', checked: boolean): void }>()
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="checked"
    :disabled="disabled"
    class="flex size-[24px] shrink-0 items-center justify-center rounded-[8px] border transition-colors"
    :class="[
      checked ? 'border-sky bg-sky' : 'border-gray400 bg-white',
      disabled ? 'cursor-not-allowed opacity-50' : '',
    ]"
    @click="emit('change', !checked)"
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
  </button>
</template>
