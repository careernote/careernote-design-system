<script setup lang="ts">
// React ProgressBarItem 동일 스펙 (스텝 아이콘 + 라벨)
import Icon from './icons/Icon.vue'

withDefaults(defineProps<{ status: 'complete' | 'waiting' | 'editing'; text: string; number?: number }>(), {
  number: 1,
})
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <Icon v-if="status === 'complete'" name="check" size="sm" color="skyblue" />
    <Icon v-else :name="`number_${number}`" size="sm" :color="status === 'editing' ? 'skyblue' : 'gray800'" />
    <span class="text-body1 font-semibold" :class="status === 'waiting' ? 'text-gray800' : 'text-sky'">{{ text }}</span>
  </div>
</template>
