<script setup lang="ts">
// React FilterChips 와 동일 스펙 — 단일 선택 필터 칩 그룹
export interface FilterChipItem {
  value: string
  label: string
  count?: number
}
defineProps<{ items: FilterChipItem[]; modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div role="radiogroup" class="flex flex-wrap items-center gap-1">
    <button
      v-for="it in items"
      :key="it.value"
      type="button"
      role="radio"
      :aria-checked="it.value === modelValue"
      class="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border cursor-pointer text-detail leading-[15px] transition-colors"
      :class="it.value === modelValue ? 'bg-gray900 border-gray900 text-white100 font-semibold' : 'bg-white100 border-border-gray text-gray800 font-medium hover:border-gray500'"
      @click="emit('update:modelValue', it.value)"
    >
      {{ it.label }}
      <span v-if="it.count !== undefined" :class="it.value === modelValue ? 'text-gray500' : 'text-gray600'">{{ it.count }}</span>
    </button>
  </div>
</template>
