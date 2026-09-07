<script setup lang="ts">
// React UnderlineTabs 와 동일 스펙 — 언더라인 탭 (지원자 관리 / 채용 캘린더)
export interface UnderlineTabItem {
  value: string
  label: string
}
defineProps<{ items: UnderlineTabItem[]; modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div role="tablist" class="flex items-end gap-6 border-b border-border-gray">
    <button
      v-for="it in items"
      :key="it.value"
      type="button"
      role="tab"
      :aria-selected="it.value === modelValue"
      class="-mb-px pb-3 bg-transparent border-0 border-b cursor-pointer text-[15px] leading-[18px] transition-colors"
      :class="it.value === modelValue ? 'border-gray900 text-gray900 font-bold' : 'border-transparent text-gray600 font-normal hover:text-gray800'"
      @click="emit('update:modelValue', it.value)"
    >
      {{ it.label }}
    </button>
  </div>
</template>
