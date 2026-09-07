<script setup lang="ts">
// React PillTabs 와 동일 스펙 — 알약형 탭 (인재 피드 / 인재풀 전환)
export interface PillTabItem {
  value: string
  label: string
  count?: number
}

defineProps<{ items: PillTabItem[]; modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div role="tablist" class="flex items-center gap-2">
    <button
      v-for="it in items"
      :key="it.value"
      type="button"
      role="tab"
      :aria-selected="it.value === modelValue"
      class="inline-flex items-center gap-1.5 h-10 px-4 rounded-2xl border-0 cursor-pointer text-subtitle2 font-bold transition-colors"
      :class="it.value === modelValue ? 'bg-gray900 text-white100' : 'bg-border-gray text-gray900 hover:bg-gray300'"
      @click="emit('update:modelValue', it.value)"
    >
      {{ it.label }}
      <span v-if="it.count !== undefined" class="text-body2 font-semibold" :class="it.value === modelValue ? 'text-gray500' : 'text-gray700'">{{ it.count }}</span>
    </button>
  </div>
</template>
