<script setup lang="ts">
// React FitActivityItem 과 동일 스펙 — Fit 되는 활동 항목 (hover 시 arrow2)
import Icon from './icons/Icon.vue'
withDefaults(defineProps<{ title: string; org: string; imageUrl?: string; clickable?: boolean }>(), { clickable: false })
const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <component
    :is="clickable ? 'button' : 'div'"
    :type="clickable ? 'button' : undefined"
    class="group w-full flex items-center gap-4 py-1.5 text-left rounded-medium transition-colors"
    :class="clickable ? 'hover:bg-bg-gray2 hover:px-2' : ''"
    @click="emit('click')"
  >
    <div class="shrink-0 w-[54px] h-[57px] rounded-[7px] bg-gray800 overflow-hidden flex items-center justify-center">
      <img v-if="imageUrl" :src="imageUrl" alt="" class="w-full h-full object-cover" />
      <Icon v-else name="nonImage" :size="14" color="white" />
    </div>
    <div class="min-w-0 flex-1 flex flex-col gap-1">
      <span class="text-body1 font-semibold text-gray900 truncate">{{ title }}</span>
      <span class="text-body2 font-medium text-gray700 truncate">{{ org }}</span>
    </div>
    <span v-if="clickable" class="shrink-0 mr-2 text-sky opacity-0 transition-opacity group-hover:opacity-100">
      <Icon name="arrow2" :size="22" color="#00A3FF" />
    </span>
  </component>
</template>
