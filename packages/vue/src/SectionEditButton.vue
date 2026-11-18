<script setup lang="ts">
// React SectionEditButton 과 동일 스펙 — 상세페이지 섹션 라벨 오른쪽 편집 버튼
import IconButton from './IconButton.vue'
import Icon from './icons/Icon.vue'
defineProps<{ label: string }>()
const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <IconButton variant="ghost" :aria-label="`${label} 편집`" data-testid="profile-section-edit" @click="emit('click')"><Icon name="edit" :size="18" /></IconButton>
</template>
