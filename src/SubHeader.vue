<script setup lang="ts">
// 포트폴리오 생성 퍼널 상단 스텝 헤더 — career-pencil Web_SubHeader 승격본.
// (React SubHeader 는 careernote-web 계정 퍼널용 별개 스펙 — 통일은 디자인 결정 대기)
import { computed } from 'vue'

export type SubHeaderStep = {
  id: string | number
  label: string
  status: 'editing' | 'waiting' | 'complete'
  number: number
}

const props = withDefaults(
  defineProps<{
    currentStep?: number
    steps?: SubHeaderStep[]
    showExit?: boolean
    exitLabel?: string
  }>(),
  { showExit: true, exitLabel: '나가기' },
)

const emit = defineEmits<{ (e: 'exit'): void }>()

const DEFAULT_LABELS = ['프로필 및 활동 작성', '포트폴리오 유형 선택', '템플릿 선택']

const renderedSteps = computed<SubHeaderStep[]>(() => {
  if (props.steps && props.steps.length > 0) return props.steps
  const current = props.currentStep ?? 1
  return DEFAULT_LABELS.map((label, i) => {
    const number = i + 1
    const status: SubHeaderStep['status'] =
      number < current ? 'complete' : number === current ? 'editing' : 'waiting'
    return { id: number, label, status, number }
  })
})

const activeStep = computed<SubHeaderStep>(
  () => renderedSteps.value.find((s) => s.status === 'editing') ?? renderedSteps.value[0],
)

function isAdvanced(status: SubHeaderStep['status']) {
  return status === 'complete' || status === 'editing'
}
</script>

<template>
  <div class="relative flex h-[64px] w-full shrink-0 items-center bg-light-sky">
    <!-- 데스크톱: 나가기 버튼 좌측 + 3-step progressBar 가운데 -->
    <button
      v-if="showExit"
      type="button"
      class="absolute left-[52px] top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-[6px] border border-gray400 bg-white px-6 py-[14px] text-sm font-semibold leading-[18px] text-gray800 transition-colors hover:bg-bg-gray2 active:bg-bg-pressed md:inline-flex"
      @click="emit('exit')"
    >
      {{ exitLabel }}
    </button>

    <div class="mx-auto hidden md:block">
      <div class="flex items-center gap-[28px]">
        <div
          v-for="(step, index) in renderedSteps"
          :key="step.id"
          class="flex items-center gap-[28px]"
        >
          <div class="flex items-center gap-[8px]">
            <div v-if="step.status === 'complete'" class="w-[18px] h-[18px] relative">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M13.86 5.145L7.5 11.505L4.14 8.145L3 9.285L7.5 13.785L15 6.285L13.86 5.145Z"
                  class="fill-sky"
                />
              </svg>
            </div>
            <div
              v-else
              class="w-[18px] h-[18px] rounded-full flex items-center justify-center"
              :class="step.status === 'editing' ? 'bg-sky' : 'bg-gray800'"
            >
              <p class="text-[12px] font-semibold leading-normal text-white">{{ step.number }}</p>
            </div>
            <p
              class="text-[16px] font-semibold leading-[20px] whitespace-nowrap"
              :class="step.status === 'waiting' ? 'text-black/80' : 'text-sky'"
            >
              {{ step.label }}
            </p>
          </div>

          <div v-if="index < renderedSteps.length - 1" class="w-[48px] h-0 relative">
            <svg class="absolute top-0 left-0" width="48" height="2" viewBox="0 0 48 2" fill="none">
              <path
                d="M0 1H48"
                :class="isAdvanced(step.status) ? 'stroke-sky' : 'stroke-gray800'"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="2 8"
                stroke-dashoffset="5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 모바일: X 아이콘(좌) + 현재 단계만 가운데 -->
    <div class="flex w-full items-center px-[12px] md:hidden">
      <button
        v-if="showExit"
        type="button"
        class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-bg-gray2 active:bg-bg-pressed"
        :aria-label="exitLabel"
        @click="emit('exit')"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 5L15 15M15 5L5 15" class="stroke-gray800" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <div class="flex flex-1 items-center justify-center">
        <div class="flex items-center gap-[4px]">
          <div v-if="activeStep.status === 'complete'" class="w-[16px] h-[16px] relative">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d="M13.86 5.145L7.5 11.505L4.14 8.145L3 9.285L7.5 13.785L15 6.285L13.86 5.145Z"
                class="fill-sky"
              />
            </svg>
          </div>
          <div
            v-else
            class="w-[16px] h-[16px] rounded-full flex items-center justify-center"
            :class="activeStep.status === 'editing' ? 'bg-sky' : 'bg-gray800'"
          >
            <p class="text-[10px] font-semibold leading-normal text-white">{{ activeStep.number }}</p>
          </div>
          <p
            class="text-[13px] font-semibold leading-[16px] whitespace-nowrap"
            :class="activeStep.status === 'waiting' ? 'text-black/80' : 'text-sky'"
          >
            {{ activeStep.label }}
          </p>
        </div>
      </div>

      <div class="h-9 w-9 shrink-0" aria-hidden="true" />
    </div>
  </div>
</template>
