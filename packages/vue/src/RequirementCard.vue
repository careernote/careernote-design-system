<script setup lang="ts">
// React RequirementCard 와 동일 스펙 — 자격요건/우대조건 카드
import Icon from './icons/Icon.vue'
export interface RequirementItem { text: string; status?: 'met' | 'unmet' | 'none' }
defineProps<{ title: string; items: RequirementItem[] }>()
</script>

<template>
  <div class="flex flex-col gap-4 px-5 pt-5 pb-6 rounded-xlarge border border-border-gray bg-white100">
    <span class="text-body2 font-semibold text-gray900">{{ title }}</span>
    <ul class="flex flex-col gap-3">
      <li v-for="(it, i) in items" :key="i" class="flex items-center gap-3">
        <Icon v-if="it.status === 'met'" name="check" :size="20" color="#03C75A" />
        <Icon v-else-if="it.status === 'unmet'" name="close" :size="20" color="#F10000" />
        <span class="text-body2 text-gray800">{{ it.text }}</span>
      </li>
    </ul>
  </div>
</template>
