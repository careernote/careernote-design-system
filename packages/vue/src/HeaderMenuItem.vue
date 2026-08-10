<script setup lang="ts">
// React HeaderMenuItem 동일 스펙 (헤더 내비 항목 + NEW 칩 + 활성 언더라인)
import Chip from './Chip.vue'

withDefaults(defineProps<{ label: string; isActive?: boolean; showNew?: boolean }>(), {
  isActive: false,
  showNew: false,
})
</script>

<template>
  <div class="relative inline-flex h-full flex-col items-center justify-center group">
    <div class="inline-flex items-center gap-1">
      <p class="text-body1 font-semibold whitespace-nowrap">{{ label }}</p>
      <Chip v-if="showNew" size="S" color="sky" variant="solid">NEW</Chip>
    </div>
    <div
      class="absolute left-[-20px] right-[-20px] bottom-[-1px] h-[3px] bg-sky rounded-full pointer-events-none transition-opacity duration-150"
      :class="isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
    />
  </div>
</template>
