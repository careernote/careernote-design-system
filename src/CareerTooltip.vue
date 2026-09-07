<script setup lang="ts">
// React CareerTooltip 과 동일 스펙 — 경력 전체 목록 오버레이
export interface CareerEntry {
  company: string
  role: string
  period: string
}

defineProps<{ careers: CareerEntry[] }>()
</script>

<template>
  <div class="w-[299px] flex flex-col gap-3 px-5 py-4 bg-white100 border border-border-gray rounded-large shadow-normal-soft">
    <div v-for="(c, i) in careers" :key="i" class="flex items-center gap-1">
      <span class="text-body2 font-medium text-gray800">{{ c.company }}</span>
      <span class="text-body2 font-medium text-gray700">{{ c.role }}</span>
      <span class="text-detail text-gray600">{{ c.period }}</span>
    </div>
  </div>
</template>
