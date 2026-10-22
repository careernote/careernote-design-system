<script setup lang="ts">
// 작성 중(임시저장) 카드 — React DraftCard 동일 스펙. 공고 현황 목록 첫 칸에 공고 카드와 같은 크기로(ATS, 2026-10-22 C안)
import { computed } from 'vue'
import Button from './Button.vue'
import Chip from './Chip.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    /** "2026. 10. 22. 오후 4:58 임시저장" 처럼 완성된 문장 */
    savedAtText: string
    /** 저장한 단계(1-based)와 전체 단계 수 */
    step: number
    stepCount: number
    stepLabel?: string
    chipLabel?: string
    actionLabel?: string
    deleteLabel?: string
    /** false 면 삭제 버튼을 숨긴다 */
    deletable?: boolean
  }>(),
  { chipLabel: '작성 중', actionLabel: '이어서 만들기', deleteLabel: '삭제', deletable: true },
)
const emit = defineEmits<{ (e: 'action'): void; (e: 'delete'): void }>()
const bars = computed(() => Array.from({ length: Math.max(1, props.stepCount) }, (_, i) => i < props.step))
</script>

<template>
  <div class="flex min-h-[180px] flex-col justify-between gap-5 rounded-[16px] border-[1.5px] border-dashed border-gray400 bg-white px-8 py-6">
    <div class="flex items-start gap-4">
      <div class="flex min-w-0 flex-col gap-1">
        <p class="m-0 truncate text-xl font-semibold leading-6 text-gray800" :title="title">{{ title || '(제목 없음)' }}</p>
        <p class="m-0 text-base font-normal leading-5 text-gray700">{{ savedAtText }}</p>
      </div>
      <div class="ml-auto shrink-0"><Chip size="M" color="basic" variant="soft">{{ chipLabel }}</Chip></div>
    </div>
    <div class="flex items-center gap-1.5 text-detail text-gray700" :aria-label="`${step} / ${stepCount} 단계`">
      <i v-for="(on, i) in bars" :key="i" class="block h-1 w-10 rounded-full" :class="on ? 'bg-sky' : 'bg-gray400'" />
      <span class="ml-1.5">{{ step }} / {{ stepCount }}<template v-if="stepLabel"> · {{ stepLabel }}</template></span>
    </div>
    <div class="flex items-center gap-2.5">
      <Button size="sm" color="sky" @click="emit('action')">{{ actionLabel }}</Button>
      <Button v-if="deletable" size="sm" color="white" @click="emit('delete')">{{ deleteLabel }}</Button>
    </div>
  </div>
</template>
