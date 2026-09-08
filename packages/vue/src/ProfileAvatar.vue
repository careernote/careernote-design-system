<script setup lang="ts">
// React ProfileAvatar 와 동일 스펙 — 이미지 없으면 이름 뒤 2글자
import { computed } from 'vue'

const props = withDefaults(defineProps<{ name: string; imageUrl?: string; size?: number }>(), { size: 60 })
const initials = computed(() => props.name.trim().slice(-2))
// 글자 크기는 아바타 크기에 비례 (60px 기본 → 20px)
const fontSize = computed(() => `${Math.round(props.size / 3)}px`)
</script>

<template>
  <div
    class="shrink-0 flex items-center justify-center overflow-hidden rounded-large bg-bg-gray1 border border-border-gray"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <img v-if="imageUrl" :src="imageUrl" :alt="name" class="w-full h-full object-cover" />
    <span v-else class="font-semibold text-gray600 leading-none" :style="{ fontSize }">{{ initials }}</span>
  </div>
</template>
