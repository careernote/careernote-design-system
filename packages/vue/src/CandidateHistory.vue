<script setup lang="ts">
// React CandidateHistory 와 동일 스펙 — AI 요약 + 최근 경력(2개 이상이면 드롭다운 툴팁) + 최종 학력
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Icon from './icons/Icon.vue'
import CareerTooltip from './CareerTooltip.vue'
import type { CareerEntry } from './CareerTooltip.vue'
import type { EducationEntry } from './candidate-types'

const props = defineProps<{ aiSummary?: string; careers: CareerEntry[]; education?: EducationEntry }>()

const open = ref(false)
// AI 요약 — 접힌 상태는 정확히 3줄 높이(3lh)라 카드끼리 줄이 맞는다. 넘치면 더보기/접기 (React SummaryBox 와 동일)
const summaryRef = ref<HTMLElement | null>(null)
const summaryExpanded = ref(false)
const summaryOverflow = ref(false)
let summaryObserver: ResizeObserver | null = null
// line-clamp 가 걸린 요소는 scrollHeight 가 잘린 높이로 나온다 — 잠깐 clamp 를 풀고 전체 높이를 잰다
function measureSummary() {
  const el = summaryRef.value
  if (!el || summaryExpanded.value) return
  const clamped = el.clientHeight
  const { height, display } = el.style
  el.style.height = 'auto'
  el.style.display = 'block'
  const full = el.scrollHeight
  el.style.height = height
  el.style.display = display
  summaryOverflow.value = full > clamped + 1
}
watch(
  () => [props.aiSummary, summaryExpanded.value, summaryRef.value] as const,
  async () => {
    await nextTick()
    measureSummary()
    summaryObserver?.disconnect()
    if (summaryRef.value && typeof ResizeObserver !== 'undefined') {
      summaryObserver = new ResizeObserver(measureSummary)
      summaryObserver.observe(summaryRef.value)
    }
  },
  { immediate: true },
)
onBeforeUnmount(() => summaryObserver?.disconnect())
const summaryToggleable = computed(() => summaryOverflow.value || summaryExpanded.value)
function onSummaryBoxClick(e: MouseEvent) {
  if (!summaryToggleable.value) return
  e.stopPropagation()
  if (window.getSelection()?.toString()) return
  summaryExpanded.value = !summaryExpanded.value
}
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
      <!-- 더보기/접기가 있으면 박스 어디를 눌러도 토글. 카드 click 전파 방지, 드래그로 텍스트 선택 중이면 무시 -->
      <div
        class="relative p-3 rounded-small bg-bg-gray1"
        :class="summaryToggleable ? 'cursor-pointer' : ''"
        @click="onSummaryBoxClick"
      >
        <p
          ref="summaryRef"
          class="text-body2 text-gray800 whitespace-pre-line"
          :class="summaryExpanded ? '' : 'line-clamp-3 overflow-hidden'"
          :style="summaryExpanded ? undefined : { height: '3lh' }"
        >{{ aiSummary }}</p>
        <button
          v-if="summaryToggleable"
          type="button"
          :aria-expanded="summaryExpanded"
          class="border-0 p-0 text-detail font-medium text-gray600 hover:text-gray900"
          :class="summaryExpanded ? 'mt-1 ml-auto block bg-transparent' : 'absolute right-3 bottom-3 bg-bg-gray1 pl-6'"
          :style="summaryExpanded ? undefined : { maskImage: 'linear-gradient(to right, transparent, black 24px)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 24px)' }"
          @click.stop="summaryExpanded = !summaryExpanded"
        >{{ summaryExpanded ? '접기' : '더보기' }}</button>
      </div>
    </div>

    <div v-if="latest" ref="wrapRef" class="relative flex items-center gap-4">
      <span class="shrink-0 text-body2 font-medium text-gray700">경력</span>
      <div class="min-w-0 flex-1 flex items-center gap-1">
        <span class="shrink-0 max-w-[60%] text-body2 font-semibold text-gray900 truncate">{{ latest.company }}</span>
        <span class="min-w-0 text-body2 text-gray700 truncate">{{ latest.role }}</span>
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
        <span class="shrink-0 max-w-[60%] text-body2 font-semibold text-gray900 truncate">{{ education.school }}</span>
        <span v-if="education.degree" class="shrink-0 whitespace-nowrap text-body2 text-gray700">{{ education.degree }}</span>
        <span v-if="education.major" class="min-w-0 text-body2 text-gray700 truncate">{{ education.major }}</span>
        <span v-if="education.period" class="shrink-0 text-detail text-gray600">{{ education.period }}</span>
        <span v-if="education.status" class="shrink-0 text-detail text-gray600">{{ education.status }}</span>
      </div>
    </div>
  </div>
</template>
