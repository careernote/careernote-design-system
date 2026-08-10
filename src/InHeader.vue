<script setup lang="ts">
// React InHeader 동일 스펙 (플로우 상단 타이틀/설명)
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ title: string; description?: string; type?: 'default' | 'plain' }>(),
  { type: 'default' },
)

const titleClasses = computed(() =>
  props.type === 'default'
    ? 'text-title2 font-semibold text-sky'
    : 'text-subtitle1 font-semibold text-gray800',
)
</script>

<template>
  <div class="flex flex-col items-center gap-2 py-5">
    <div class="text-center" :class="titleClasses">{{ title }}</div>
    <div v-if="description" class="text-center text-body1 font-medium text-gray700">{{ description }}</div>
  </div>
</template>
