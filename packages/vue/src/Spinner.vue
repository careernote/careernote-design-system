<script setup lang="ts">
// 로딩 스피너 — career-pencil Spinner 승격본.
// accent/track 은 동적 style 바인딩이라 hex prop 기본값 사용 (정본: brand.sky / border.border_gray)
withDefaults(
  defineProps<{
    size?: number
    border?: number
    label?: string
    accent?: string
    track?: string
  }>(),
  { size: 32, border: 3, label: '', accent: '#00A3FF', track: '#E9EBF1' },
)
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3">
    <div
      class="animate-spin rounded-full"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${border}px`,
        borderStyle: 'solid',
        borderColor: track,
        borderTopColor: accent,
      }"
    />
    <p v-if="label" class="text-sm font-medium text-gray700">{{ label }}</p>
  </div>
</template>
