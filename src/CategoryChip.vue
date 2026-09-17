<script setup lang="ts">
// 카테고리·선택지 알약 버튼 — React CategoryChip 과 동일 스펙.
// solid: active 가 sky 채움(career-pencil /make/job) · soft: active 가 sky_bg + sky 테두리(ATS 폼 선택지)
// click/mouseenter 등 리스너는 fallthrough 로 루트 button 에 그대로 바인딩된다.
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    active?: boolean
    variant?: 'solid' | 'soft'
    size?: 'sm' | 'md'
  }>(),
  { active: false, variant: 'solid', size: 'md' },
)

const sizeClass = computed(() => (props.size === 'sm' ? 'h-8 px-3 text-[11px]' : 'px-3.5 py-2 text-[14px]'))
const stateClass = computed(() => {
  if (props.variant === 'soft') {
    return props.active
      ? 'border-sky bg-sky-bg text-sky font-bold'
      : 'border-border-gray bg-white100 text-gray600 font-medium hover:border-sky60 hover:text-sky'
  }
  return props.active
    ? 'border-sky bg-sky text-white100 font-semibold'
    : 'border-border-gray bg-white100 text-gray700 font-semibold hover:border-sky60'
})
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center rounded-full border transition-colors"
    :class="[sizeClass, stateClass]"
  >
    <slot />
  </button>
</template>
