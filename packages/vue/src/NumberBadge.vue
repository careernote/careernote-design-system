<script setup lang="ts">
// React NumberBadge 동일 스펙 (빨간 테두리 숫자 배지)
withDefaults(defineProps<{ number: number; size?: number }>(), { size: 22 })
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center justify-center rounded-full border border-red bg-white100 text-detail font-bold text-red"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    {{ number }}
  </span>
</template>
