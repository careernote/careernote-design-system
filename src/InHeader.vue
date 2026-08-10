<script setup lang="ts">
// React InHeader 동일 스펙 (플로우 상단 타이틀/설명, tablet/mobile 반응형 포함)
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    type?: 'default' | 'mini'
    className?: string
    titleClassName?: string
    descriptionClassName?: string
  }>(),
  { type: 'default' },
)

const titleClasses = computed(() => {
  const desktop =
    props.type === 'default'
      ? 'text-title2 font-semibold text-sky'
      : 'text-subtitle1 font-semibold text-gray800'
  const mobile =
    'tablet:text-subtitle3 tablet:font-semibold' + (props.type === 'default' ? ' tablet:text-sky' : '')
  return `text-center ${desktop} ${mobile}`
})

const descClasses = 'text-center text-body1 font-medium text-gray700 tablet:text-body2 tablet:font-regular'
</script>

<template>
  <div class="flex flex-col items-center gap-2 py-5 tablet:gap-1 mobile:py-4" :class="className">
    <div :class="titleClassName ?? titleClasses">{{ title }}</div>
    <div v-if="description" :class="descriptionClassName ?? descClasses">{{ description }}</div>
  </div>
</template>
