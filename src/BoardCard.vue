<script setup lang="ts">
// React BoardCard 와 동일 스펙 — 칸반보드 카드 (Default/불합격 × hover)
import { computed } from 'vue'
import ProfileAvatar from './ProfileAvatar.vue'
import FitnessChip from './FitnessChip.vue'
import type { FitnessLevel } from './candidate-types'

const props = withDefaults(
  defineProps<{ name: string; imageUrl?: string; careerLabel: string; fitness?: FitnessLevel; rejected?: boolean; clickable?: boolean }>(),
  { rejected: false, clickable: false },
)
const emit = defineEmits<{ (e: 'click'): void }>()

const classes = computed(
  () =>
    `w-[285px] max-w-full flex items-center gap-2.5 p-3 text-left rounded-large border transition-all hover:shadow-normal-soft ${
      props.rejected ? 'bg-bg-gray1 border-border-gray' : 'bg-white100 border-gray400 hover:border-sky'
    }`,
)
</script>

<template>
  <component :is="clickable ? 'button' : 'div'" :type="clickable ? 'button' : undefined" :class="classes" @click="emit('click')">
    <ProfileAvatar :name="name" :image-url="imageUrl" />
    <div class="min-w-0 flex-1 flex flex-col justify-center gap-1">
      <div class="flex items-center gap-1">
        <span class="text-body1 font-semibold truncate" :class="rejected ? 'text-gray600' : 'text-gray900'">{{ name }}</span>
        <span v-if="rejected" class="shrink-0 text-body2 font-medium text-gray500">불합격</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-body2" :class="rejected ? 'text-gray600' : 'text-gray700'">{{ careerLabel }}</span>
        <FitnessChip :level="fitness" :muted="rejected" />
      </div>
    </div>
  </component>
</template>
