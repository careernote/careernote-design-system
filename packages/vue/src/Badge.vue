<script setup lang="ts">
// React Badge 와 동일 스펙 (Soon/New/Beta 상태 배지)
import { computed } from 'vue'

const props = defineProps<{ variant: 'Soon' | 'New' | 'Beta' }>()

const variantStyles = {
  Soon: 'bg-green10 text-green100',
  New: 'bg-blue200 text-white',
  Beta: 'bg-gray900 text-white',
}

const classes = computed(
  () => `text-xs leading-4 font-normal rounded w-10 text-center py-0.5 shrink-0 inline-block ${variantStyles[props.variant]}`,
)
</script>

<template>
  <span :class="classes"><slot>{{ variant }}</slot></span>
</template>
