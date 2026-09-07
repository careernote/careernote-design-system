<script setup lang="ts">
// [적합도] chip — 공고 지원자 카드 전용. 높음 blue / 보통 green / 낮음 amber
import Chip from './Chip.vue'
import { FITNESS_COLOR, FITNESS_LABEL, type FitnessLevel } from './candidate-types'

withDefaults(defineProps<{ level: FitnessLevel; muted?: boolean }>(), { muted: false })
</script>

<template>
  <Chip size="M" variant="soft" :color="muted ? 'basic' : FITNESS_COLOR[level]" class="font-normal">{{ FITNESS_LABEL[level] }}</Chip>
</template>
