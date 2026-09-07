<script setup lang="ts">
// [업데이트] chip — 인재풀 카드 전용. 30일 이내 purple soft, 그 외 black soft
import Chip from './Chip.vue'

defineProps<{ daysAgo: number }>()
</script>

<template>
  <Chip size="M" variant="soft" :color="daysAgo <= 30 ? 'purple' : 'black'" class="font-normal">{{ daysAgo }}일 전 업데이트</Chip>
</template>
