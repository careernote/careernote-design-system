<script setup lang="ts">
// React Panel 동일 스펙 — 흰 서피스 카드(radius 16 + shadow/wide 토큰).
// Figma 업데이트_2025 Form panel · 공고 카드. 테두리가 필요한 목록 카드는 bordered.
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    padding?: 'none' | 'md' | 'lg'
    shadow?: 'light' | 'soft'
    bordered?: boolean
  }>(),
  { padding: 'md', shadow: 'light', bordered: false },
)

const paddingClass = computed(() => ({ none: '', md: 'p-5', lg: 'px-11 py-10' })[props.padding])
const shadowClass = computed(() => (props.shadow === 'soft' ? 'shadow-wide-soft' : 'shadow-wide-light'))
</script>

<template>
  <div
    class="bg-white100 rounded-xlarge"
    :class="[shadowClass, paddingClass, bordered ? 'border border-border-gray' : '']"
  >
    <slot />
  </div>
</template>
