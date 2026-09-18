<script setup lang="ts">
// React SegmentedControl 과 동일 스펙 — selectBttn(라벨형) / selectBttn2(아이콘형, 선택 항목만 라벨 노출)
import { computed } from 'vue'
import Icon from './icons/Icon.vue'

export interface SegmentItem {
  value: string
  label: string
  /** 아이콘형(selectBttn2)에서 항목 왼쪽에 놓을 아이콘 */
  icon?: string
}

const props = withDefaults(
  defineProps<{ items: SegmentItem[]; modelValue: string; labelMode?: 'always' | 'selected' }>(),
  { labelMode: 'always' },
)
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const iconMode = computed(() => props.items.some((it) => it.icon))
const showLabel = (it: SegmentItem) => props.labelMode === 'always' || it.value === props.modelValue
</script>

<template>
  <div role="radiogroup" class="inline-flex items-center p-1 bg-white100 border border-border-gray rounded-medium">
    <button
      v-for="it in items"
      :key="it.value"
      type="button"
      role="radio"
      :aria-checked="it.value === modelValue"
      :aria-label="showLabel(it) ? undefined : it.label"
      class="inline-flex items-center justify-center gap-1 rounded-medium border-0 cursor-pointer text-body2 leading-[18px] transition-colors"
      :class="[
        iconMode ? 'p-2 font-semibold' : 'px-4 py-3 font-medium',
        it.value === modelValue ? 'bg-gray900 text-white100 shadow-wide-light' : 'bg-transparent text-gray700 hover:bg-bg-gray1',
      ]"
      @click="emit('update:modelValue', it.value)"
    >
      <Icon v-if="it.icon" :name="it.icon" :size="18" />
      <span v-if="showLabel(it)">{{ it.label }}</span>
    </button>
  </div>
</template>
