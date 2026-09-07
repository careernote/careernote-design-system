<script setup lang="ts">
// [적합도] chip — 공고 지원자 카드 전용. 높음 blue / 보통 green / 낮음 amber. level 미지정 = 검토 전 (basic)
import Chip from './Chip.vue'
import { FITNESS_COLOR, FITNESS_LABEL, type FitnessLevel } from './candidate-types'

withDefaults(defineProps<{ level?: FitnessLevel; muted?: boolean }>(), { level: undefined, muted: false })
</script>

<template>
  <Chip size="M" variant="soft" :color="muted || !level ? 'basic' : FITNESS_COLOR[level]" class="font-normal">{{ level ? FITNESS_LABEL[level] : '검토 전' }}</Chip>
</template>
