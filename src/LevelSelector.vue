<script setup lang="ts">
// React LevelSelector 와 동일 스펙 — 5단계 비중 선택기 (하/중하/중/중상/상)
withDefaults(defineProps<{ modelValue: number; labels?: readonly string[]; disabled?: boolean }>(), {
  labels: () => ['하', '중하', '중', '중상', '상'],
  disabled: false,
})
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()
</script>

<template>
  <div role="radiogroup" class="flex w-full h-[34px] overflow-hidden rounded-large border border-border-gray bg-white100">
    <button
      v-for="(label, i) in labels"
      :key="label"
      type="button"
      role="radio"
      :aria-checked="i + 1 === modelValue"
      :disabled="disabled"
      class="flex-1 border-0 p-0 cursor-pointer text-body2 font-medium leading-[18px] transition-colors disabled:cursor-default"
      :class="i + 1 <= modelValue ? ['bg-sky text-white70', i + 1 === modelValue ? 'opacity-80' : ''] : 'bg-transparent text-gray600 hover:bg-bg-gray1'"
      @click="emit('update:modelValue', i + 1)"
    >
      {{ label }}
    </button>
  </div>
</template>
