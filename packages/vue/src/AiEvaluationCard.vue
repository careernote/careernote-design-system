<script setup lang="ts">
// React AiEvaluationCard 와 동일 스펙 — AI 지원자 평가 카드
withDefaults(defineProps<{ title?: string; fitLabel: string; items: string[] }>(), { title: 'AI 지원자 평가' })
</script>

<template>
  <div class="flex flex-col rounded-large border border-sky overflow-hidden">
    <div class="flex items-center justify-between gap-3 px-4 py-3 bg-sky text-white100">
      <span class="text-body2 font-medium">{{ title }}</span>
      <span class="text-body2 font-medium">직무 적합도 <b class="font-bold">{{ fitLabel }}</b></span>
    </div>
    <ul class="flex flex-col gap-4 px-5 pt-5 pb-6 bg-white100">
      <li v-for="(t, i) in items" :key="i" class="flex items-start gap-2">
        <span class="shrink-0 w-1 h-1 mt-2 rounded-full bg-gray900" />
        <span class="text-body2 leading-5 font-medium text-gray800">{{ t }}</span>
      </li>
    </ul>
  </div>
</template>
