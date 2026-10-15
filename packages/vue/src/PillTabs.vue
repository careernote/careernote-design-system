<script setup lang="ts">
// React PillTabs 와 동일 스펙 — 알약형 탭 (Figma 업데이트_2025 9492:20768, 인재피드 / 인재풀 전환)
// 높이 44 · 둥근 끝 · border-gray 1px. 선택 gray900 + 흰 글씨, 비선택 bg-gray1 + gray900 글씨.
// [아이콘 18 · 라벨 Body1 bold · 개수 Body1 regular] 간격 4
import Icon from './icons/Icon.vue'

export interface PillTabItem {
  value: string
  label: string
  /** 라벨 왼쪽 18px 아이콘 (예: user2) — 글자색을 따른다 */
  icon?: string
  count?: number
}

defineProps<{ items: PillTabItem[]; modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div role="tablist" class="flex items-center gap-2">
    <!-- Figma 안쪽 선 기준 패딩 12/24/12/20 — CSS 선은 바깥에 더해지므로 1px 씩 뺀다 -->
    <button
      v-for="it in items"
      :key="it.value"
      type="button"
      role="tab"
      :aria-selected="it.value === modelValue"
      class="inline-flex items-center gap-1 h-11 py-[11px] pl-[19px] pr-[23px] rounded-full border border-border-gray cursor-pointer text-body1 font-bold transition-colors"
      :class="it.value === modelValue ? 'bg-gray900 text-white100' : 'bg-bg-gray1 text-gray900 hover:bg-border-gray'"
      @click="emit('update:modelValue', it.value)"
    >
      <Icon v-if="it.icon" :name="it.icon" :size="18" />
      {{ it.label }}
      <span v-if="it.count !== undefined" class="font-normal">{{ it.count }}</span>
    </button>
  </div>
</template>
