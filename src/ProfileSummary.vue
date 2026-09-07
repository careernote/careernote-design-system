<script setup lang="ts">
// React ProfileSummary 와 동일 스펙 — 프로필 요약 카드
export interface SummaryItem { title: string; description?: string }
withDefaults(defineProps<{ title?: string; items: SummaryItem[]; variant?: 'gray' | 'white' }>(), { title: '프로필 요약', variant: 'gray' })
</script>

<template>
  <div class="flex flex-col gap-4 px-5 pt-5 pb-6 rounded-xlarge" :class="variant === 'gray' ? 'bg-bg-gray2' : 'bg-white100'">
    <span class="text-body2 font-semibold text-sky">{{ title }}</span>
    <ul class="flex flex-col gap-4">
      <li v-for="(it, i) in items" :key="i" class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <span class="shrink-0 w-1 h-1 rounded-full bg-gray900" />
          <span class="text-body2 font-medium text-gray900">{{ it.title }}</span>
        </div>
        <p v-if="it.description" class="pl-3 text-detail leading-[17px] text-gray700">{{ it.description }}</p>
      </li>
    </ul>
  </div>
</template>
