<script setup lang="ts">
// React ExperienceItem 과 동일 스펙 — 카드 안 대표 활동 한 줄 (Default / hover)
import { computed } from 'vue'
import Icon from './icons/Icon.vue'

export interface ExperienceEntry {
  title: string
  org: string
  imageUrl?: string
}

const props = defineProps<{ title: string; org: string; imageUrl?: string; clickable?: boolean }>()
const emit = defineEmits<{ (e: 'click'): void }>()

const classes = computed(
  () =>
    `w-full flex items-center gap-4 p-3 text-left bg-white100 border border-border-gray rounded-large transition-all ${
      props.clickable ? 'hover:border-sky hover:shadow-normal-soft' : ''
    }`,
)
</script>

<template>
  <component :is="clickable ? 'button' : 'div'" :type="clickable ? 'button' : undefined" :class="classes" @click="emit('click')">
    <div class="shrink-0 w-12 h-[50px] rounded-[7px] bg-gray800 overflow-hidden flex items-center justify-center">
      <img v-if="imageUrl" :src="imageUrl" alt="" class="w-full h-full object-cover" />
      <Icon v-else name="nonImage" :size="14" color="white" />
    </div>
    <div class="min-w-0 flex flex-col gap-1">
      <p class="text-body1 font-semibold text-gray900 truncate">{{ title }}</p>
      <p class="text-body2 font-medium text-gray700 truncate">{{ org }}</p>
    </div>
  </component>
</template>
