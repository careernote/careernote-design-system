<script setup lang="ts">
// React Button 과 동일 스펙 (Tailwind v4 소비자용 — 토큰 클래스 하이픈 표기)
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    color?: 'white' | 'black' | 'sky' | 'red'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { size: 'sm', color: 'white', disabled: false, type: 'button' },
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const sizeStyles = {
  sm: 'px-4 py-2 text-body2 font-medium rounded-small',
  md: 'px-6 py-3.5 text-body2 font-semibold rounded-small',
  lg: 'px-7 py-4 text-body1 font-bold rounded-medium',
}

const overlay =
  'before:absolute before:inset-0 before:bg-gray900 before:opacity-0 before:transition-opacity before:duration-150 before:pointer-events-none before:rounded-[inherit]'

const colorStyles = {
  white: `relative bg-white100 text-gray800 border border-gray400 hover:before:opacity-[.05] active:before:opacity-[.12] disabled:bg-white100 disabled:text-border-gray ${overlay}`,
  black: `relative bg-gray900 text-white100 hover:before:opacity-[.1] active:before:opacity-[.3] disabled:bg-gray600 disabled:text-border-gray before:absolute before:inset-0 before:bg-white100 before:opacity-0 before:transition-opacity before:duration-150 before:pointer-events-none before:rounded-[inherit]`,
  sky: `relative bg-sky text-white100 hover:before:opacity-[.08] active:before:opacity-[.20] disabled:bg-sky60 disabled:text-white100 ${overlay}`,
  red: `relative bg-red text-white100 hover:before:opacity-[.08] active:before:opacity-[.20] disabled:bg-border-gray disabled:text-white100 ${overlay}`,
}

const classes = computed(
  () =>
    `relative flex items-center justify-center gap-2 transition-all duration-150 ease-in-out whitespace-nowrap disabled:cursor-not-allowed disabled:pointer-events-none ${sizeStyles[props.size]} ${colorStyles[props.color]}`,
)
</script>

<template>
  <button :type="type" :disabled="disabled" :class="classes" @click="emit('click', $event)">
    <slot name="left-icon" />
    <slot />
    <slot name="right-icon" />
  </button>
</template>
