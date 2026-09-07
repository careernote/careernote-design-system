<script setup lang="ts">
// React SectionLabel 과 동일 스펙 — 섹션 라벨 (아이콘 + 16 semibold)
import Icon from './icons/Icon.vue'
defineProps<{ icon?: string }>()
</script>

<template>
  <div class="flex items-center gap-2 text-gray800">
    <Icon v-if="icon" :name="icon" :size="20" color="gray800" />
    <span class="text-body1 font-semibold"><slot /></span>
  </div>
</template>
