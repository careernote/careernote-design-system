<script setup lang="ts">
// React Chip 과 동일 스펙 (v4 토큰 하이픈 표기)
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'S' | 'M' | 'L' | 'XL'
    color?: 'black' | 'basic' | 'sky' | 'red' | 'blue' | 'green' | 'purple'
    variant?: 'solid' | 'soft'
  }>(),
  { size: 'M', color: 'basic', variant: 'solid' },
)

const sizeStyles = {
  S: 'py-[2px] px-[4px] text-xs font-normal gap-[2px] leading-4',
  M: 'py-[4px] px-[8px] text-xs font-medium gap-[4px] leading-4',
  L: 'py-[4px] px-[8px] text-sm font-medium gap-[4px] leading-[18px]',
  XL: 'py-[8px] px-[12px] text-sm font-medium gap-[4px] leading-[18px]',
}

const colorStyles = {
  solid: {
    black: 'bg-gray800 text-white',
    basic: 'bg-gray900 text-white',
    sky: 'bg-sky text-white',
    red: 'bg-red text-white',
    blue: 'bg-blue200 text-white',
    green: 'bg-green100 text-white',
    purple: 'bg-[#7B5CFA] text-white',
  },
  soft: {
    black: 'bg-bg-gray1 text-gray700',
    basic: 'bg-white border border-gray500 text-gray700',
    sky: 'bg-sky-bg text-sky',
    red: 'bg-red10 text-red',
    blue: 'bg-blue10 text-blue100',
    green: 'bg-green10 text-green100',
    purple: 'bg-[#F3EFFF] text-[#7B5CFA]',
  },
} as const

const classes = computed(
  () =>
    `inline-flex justify-center items-center rounded-xsmall ${sizeStyles[props.size]} ${colorStyles[props.variant][props.color]}`,
)
</script>

<template>
  <div :class="classes"><slot /></div>
</template>
