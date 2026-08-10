<script setup lang="ts">
// React IconButton 과 동일 스펙 (아이콘 전용 사각/고스트 버튼)
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ variant?: 'outline' | 'ghost'; disabled?: boolean; ariaLabel: string }>(),
  { variant: 'outline', disabled: false },
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const variantStyles = {
  outline: 'p-1.5 rounded-lg border border-border-gray hover:bg-bg-gray2',
  ghost: 'p-1 rounded-xsmall hover:bg-bg-gray1',
}

const classes = computed(
  () =>
    `inline-flex items-center justify-center text-gray800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${variantStyles[props.variant]}`,
)
</script>

<template>
  <button type="button" :disabled="disabled" :aria-label="ariaLabel" :class="classes" @click="emit('click', $event)">
    <slot />
  </button>
</template>
