<script setup lang="ts">
// React <Icon name> 과 동일 API 의 Vue 구현 (자동 생성 SVG 맵 기반)
import { computed } from 'vue'
import { ICON_SVGS, ICON_NAME_MAP } from './icon-svgs.generated'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    color?: string
  }>(),
  { size: 'md', color: 'currentColor' },
)

const SIZE_MAP = { xs: 16, sm: 18, md: 20, lg: 24, xl: 30 } as const

// React Icon 의 색상 별칭과 동일
const COLOR_MAP: Record<string, string> = {
  skyblue: '#00A3FF',
  gray800: '#4B4D57',
  black: '#000000',
  white: '#FFFFFF',
}

const resolvedColor = computed(() => COLOR_MAP[props.color] ?? props.color)

const px = computed(() =>
  typeof props.size === 'number' ? props.size : SIZE_MAP[props.size],
)

const numberValue = computed(() => {
  const m = props.name.match(/^number_([1-9])$/)
  return m ? m[1] : null
})

const svg = computed(() => {
  const componentName = ICON_NAME_MAP[props.name]
  return componentName ? ICON_SVGS[componentName] : undefined
})
</script>

<template>
  <div
    v-if="numberValue"
    class="flex items-center justify-center rounded-full text-white font-semibold text-sm"
    :style="{ width: `${px}px`, height: `${px}px`, backgroundColor: resolvedColor === 'currentColor' ? '#00A3FF' : resolvedColor }"
  >
    {{ numberValue }}
  </div>
  <svg
    v-else-if="svg"
    :width="px"
    :height="px"
    :viewBox="svg.viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ color: resolvedColor }"
    v-html="svg.body"
  />
</template>
