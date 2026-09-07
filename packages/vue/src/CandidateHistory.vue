<script setup lang="ts">
// React CandidateHistory 와 동일 스펙 — AI 요약 + 최근 경력(2개 이상이면 드롭다운 툴팁) + 최종 학력
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Icon from './icons/Icon.vue'
import CareerTooltip from './CareerTooltip.vue'
import type { CareerEntry } from './CareerTooltip.vue'
import type { EducationEntry } from './candidate-types'

const props = defineProps<{ aiSummary?: string; careers: CareerEntry[]; education?: EducationEntry }>()

const open = ref(false)
const wrapRef = ref<HTMLElement | null>(null)
const latest = computed(() => props.careers[0])
const hasMore = computed(() => props.careers.length >= 2)

const onDown = (e: MouseEvent) => {
  if (!wrapRef.value?.contains(e.target as Node)) open.value = false
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}
watch(open, (v) => {
  if (v) {
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
  } else {
    document.removeEventListener('mousedown', onDown)
    document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDown)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-if="aiSummary" class="flex flex-col gap-1.5">
      <span class="text-detail font-medium text-gray700">AI 요약 레포트</span>
      <div class="p-3 rounded-small bg-bg-gray1">
        <p class="text-body2 text-gray800 whitespace-pre-line">{{ aiSummary }}</p>
      </div>
    </div>

    <div v-if="latest" ref="wrapRef" class="relative flex items-center gap-4">
      <span class="shrink-0 text-body2 font-medium text-gray700">경력</span>
      <div class="min-w-0 flex-1 flex items-center gap-1">
        <span class="text-body2 font-semibold text-gray900 truncate">{{ latest.company }}</span>
        <span class="text-body2 text-gray700 truncate">{{ latest.role }}</span>
        <span class="shrink-0 text-detail text-gray600">{{ latest.period }}</span>
      </div>
      <button
        v-if="hasMore"
        type="button"
        aria-label="경력 전체 보기"
        :aria-expanded="open"
        class="shrink-0 flex items-center justify-center w-[18px] h-[18px] text-gray800 transition-transform"
        :class="open ? 'rotate-180' : ''"
        @click.stop="open = !open"
      >
        <Icon name="arrow-down" :size="18" />
      </button>
      <div v-if="open" class="absolute inset-x-0 top-full mt-1 z-10" @click.stop><CareerTooltip :careers="careers" /></div>
    </div>

    <div v-if="education" class="flex items-center gap-4">
      <span class="shrink-0 text-body2 font-medium text-gray700">학력</span>
      <div class="min-w-0 flex-1 flex items-center gap-1">
        <span class="text-body2 font-semibold text-gray900 truncate">{{ education.school }}</span>
        <span v-if="education.degree" class="text-body2 text-gray700">{{ education.degree }}</span>
        <span v-if="education.major" class="text-body2 text-gray700 truncate">{{ education.major }}</span>
        <span v-if="education.period" class="shrink-0 text-detail text-gray600">{{ education.period }}</span>
        <span v-if="education.status" class="shrink-0 text-detail text-gray600">{{ education.status }}</span>
      </div>
    </div>
  </div>
</template>
