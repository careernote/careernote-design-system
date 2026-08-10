<script setup lang="ts">
// React ButtonRound 동일 스펙 (알약형 탭 버튼)
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ selected?: boolean; size?: 'small' | 'big'; disabled?: boolean }>(),
  { selected: false, size: 'small', disabled: false },
)
const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const sizeStyles = { small: 'px-4 py-2 text-body2 font-medium', big: 'px-5 py-4 text-body1 font-medium' }

const classes = computed(
  () =>
    `flex items-center gap-2.5 rounded-xlarge whitespace-nowrap transition-colors ${sizeStyles[props.size]} ${
      props.disabled
        ? 'bg-bg-gray2 text-[#999] cursor-not-allowed'
        : props.selected
          ? 'bg-gray900 text-white'
          : 'bg-bg-gray2 text-gray900 hover:bg-border-gray'
    }`,
)
</script>

<template>
  <button type="button" :disabled="disabled" :class="classes" @click="!disabled && emit('click', $event)">
    <slot name="left-icon" />
    <span><slot /></span>
    <slot name="right-icon" />
  </button>
</template>
