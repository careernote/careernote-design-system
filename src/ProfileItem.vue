<script setup lang="ts">
// React ProfileItem 과 동일 스펙 — 수상·자격증·외국어 항목 카드
defineProps<{ title: string; sub: string; date?: string }>()
</script>

<template>
  <div class="flex items-end gap-3 px-6 py-3 rounded-large bg-bg-gray1">
    <div class="min-w-0 flex-1 flex flex-col justify-center gap-1">
      <span class="text-body2 font-medium text-gray900 truncate">{{ title }}</span>
      <div class="flex items-center gap-3">
        <span class="min-w-0 flex-1 text-body2 text-gray700 truncate">{{ sub }}</span>
        <span v-if="date" class="shrink-0 text-body2 text-gray600">{{ date }}</span>
      </div>
    </div>
  </div>
</template>
