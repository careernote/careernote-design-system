<script setup lang="ts">
// React Information 동일 스펙 (이모지 안내 박스)
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ type?: 'positive' | 'negative' | 'normal'; title?: string; subtext?: string; isMobile?: boolean }>(),
  { type: 'normal', isMobile: false },
)

const emoji = computed(() => ({ positive: '😀', negative: '🚨', normal: '💡' })[props.type])
const bg = computed(() => ({ positive: 'bg-sky-bg', negative: 'bg-red10', normal: 'bg-bg-gray1' })[props.type])
const titleColor = computed(() => ({ positive: 'text-sky', negative: 'text-red', normal: 'text-gray900' })[props.type])
const subColor = computed(() => ({ positive: 'text-sky', negative: 'text-red', normal: 'text-gray700' })[props.type])
</script>

<template>
  <div
    class="flex p-5 flex-col justify-center items-start gap-2 rounded-large"
    :class="[isMobile ? 'w-[335px]' : 'w-[727px]', bg]"
  >
    <div class="w-full flex items-center gap-2 self-stretch">
      <span :class="isMobile ? 'text-body2 font-semibold' : 'text-subtitle3 font-medium'">{{ emoji }}</span>
      <span v-if="title" class="flex flex-1" :class="[titleColor, isMobile ? 'text-body2 font-semibold' : 'text-body1 font-medium']">{{ title }}</span>
    </div>
    <span v-if="subtext" class="flex flex-1" :class="[subColor, isMobile ? 'text-body2 font-semibold' : 'text-body2 font-medium']">{{ subtext }}</span>
  </div>
</template>
