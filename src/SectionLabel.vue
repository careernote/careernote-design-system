<script setup lang="ts">
// React SectionLabel 과 동일 스펙 — 섹션 라벨 (아이콘 + 16 semibold)
import Icon from './icons/Icon.vue'
defineProps<{ icon?: string }>()
</script>

<template>
  <div class="flex items-center gap-2 text-gray800">
    <Icon v-if="icon" :name="icon" :size="20" color="gray800" />
    <span class="text-body1 font-semibold"><slot /></span>
    <!-- 라벨 줄 오른쪽 버튼 자리(편집 등). 인쇄에서는 숨긴다 — React action 과 같다 -->
    <div v-if="$slots.action" class="ml-auto flex items-center print:hidden"><slot name="action" /></div>
  </div>
</template>
