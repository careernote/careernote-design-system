<script setup lang="ts">
// React SegmentedControl 과 동일 스펙 — 세그먼트 컨트롤 (카드 / 칸반보드 / 표)
export interface SegmentItem {
  value: string
  label: string
}
defineProps<{ items: SegmentItem[]; modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div role="radiogroup" class="inline-flex items-center p-1 bg-white100 border border-border-gray rounded-medium">
    <button
      v-for="it in items"
      :key="it.value"
      type="button"
      role="radio"
      :aria-checked="it.value === modelValue"
      class="px-4 py-3 rounded-medium border-0 cursor-pointer text-body2 font-medium leading-[18px] transition-colors"
      :class="it.value === modelValue ? 'bg-gray900 text-white100 shadow-wide-light' : 'bg-transparent text-gray700 hover:bg-bg-gray1'"
      @click="emit('update:modelValue', it.value)"
    >
      {{ it.label }}
    </button>
  </div>
</template>
