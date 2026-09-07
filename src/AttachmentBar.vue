<script setup lang="ts">
// React AttachmentBar 와 동일 스펙 — 첨부파일/포트폴리오 버튼 줄
import Button from './Button.vue'
import Icon from './icons/Icon.vue'
export interface AttachmentEntry { kind: 'file' | 'clip' | 'star'; label: string }
defineProps<{ items: AttachmentEntry[] }>()
const emit = defineEmits<{ (e: 'click', item: AttachmentEntry, index: number): void }>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button v-for="(it, i) in items" :key="i" size="sm" color="white" @click="emit('click', it, i)">
      <template #left-icon><Icon :name="it.kind" :size="18" /></template>
      {{ it.label }}
    </Button>
  </div>
</template>
