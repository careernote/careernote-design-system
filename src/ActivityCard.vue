<script setup lang="ts">
// React ActivityCard 와 동일 스펙 — 활동 카드 껍데기 (미디어 칸 + 콘텐츠 칸, 모바일 스택)
import { computed, useSlots } from 'vue'

const props = withDefaults(defineProps<{ selected?: boolean }>(), { selected: false })
const slots = useSlots()
const hasMedia = computed(() => !!slots.media)

const outer = computed(
  () =>
    `relative bg-white100 rounded-large transition-all overflow-hidden border ${
      props.selected ? 'border-sky' : 'border-border-gray'
    } shadow-[0px_2px_28px_0px_rgba(0,0,0,0.04)] ${
      hasMedia.value ? 'grid grid-cols-[240px_1fr] items-stretch mobile:grid-cols-1' : ''
    }`,
)
</script>

<template>
  <div :class="outer">
    <slot name="before" />
    <div
      v-if="hasMedia"
      class="relative w-full h-full bg-bg-gray1 border-r border-border-gray mobile:h-[180px] mobile:border-r-0 mobile:border-b overflow-hidden flex items-center justify-center"
    >
      <slot name="media" />
    </div>
    <div class="min-w-0 flex flex-col gap-2 py-4 px-5 mobile:py-3 mobile:pl-3 mobile:pr-4">
      <slot />
    </div>
  </div>
</template>
