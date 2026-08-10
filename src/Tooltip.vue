<script setup lang="ts">
// React Tooltip 동일 스펙 (absolute 말풍선 + 화살표)
withDefaults(
  defineProps<{ text: string; backgroundColor?: string; textColor?: string; position?: 'top' | 'bottom' }>(),
  { backgroundColor: '#222222', textColor: '#ffffff', position: 'top' },
)
</script>

<template>
  <div
    class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
    :class="position === 'top' ? '-top-[38px]' : '-bottom-[38px]'"
  >
    <div class="px-3 py-2 rounded-small flex gap-1 items-center justify-center" :style="{ backgroundColor }">
      <p class="text-body2 font-medium leading-[18px] whitespace-nowrap" :style="{ color: textColor }">{{ text }}</p>
    </div>
    <div class="flex items-center justify-center" :class="position === 'top' ? 'rotate-180' : ''">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L10 10H0L5 0Z" :fill="backgroundColor" />
      </svg>
    </div>
  </div>
</template>
