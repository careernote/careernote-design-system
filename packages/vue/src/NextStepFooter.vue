<script setup lang="ts">
// 포트폴리오 생성 퍼널 공통 하단 푸터 — career-pencil Web_NextStepFooter 승격본 (Figma 6794-43915).
// 상단 페이드 그라데이션(light_sky), Sub(이전)/Main(다음) flex-1 버튼.
withDefaults(
  defineProps<{
    mainLabel?: string
    mainDisabled?: boolean
    showSub?: boolean
    subLabel?: string
    subDisabled?: boolean
  }>(),
  { mainLabel: '다음', mainDisabled: false, showSub: true, subLabel: '이전', subDisabled: false },
)

const emit = defineEmits<{ (e: 'sub'): void; (e: 'main'): void }>()
</script>

<template>
  <div
    class="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex w-full flex-col items-stretch px-[16px] pt-[24px] pb-[16px] md:px-[20px] md:pt-[40px] md:pb-[24px]"
    style="background: linear-gradient(180deg, rgba(250, 253, 255, 0) 0%, rgba(250, 253, 255, 1) 33%)"
  >
    <div class="pointer-events-auto mx-auto flex w-full max-w-[924px] items-center justify-center gap-[8px] md:gap-[12px]">
      <button
        v-if="showSub"
        type="button"
        :disabled="subDisabled"
        class="inline-flex flex-1 items-center justify-center rounded-[8px] border border-gray400 bg-white px-[20px] py-[14px] text-[14px] font-semibold leading-[18px] text-gray800 transition-colors hover:bg-bg-gray2 active:bg-bg-pressed disabled:cursor-not-allowed disabled:opacity-50 md:px-[28px] md:py-[16px] md:text-[16px] md:leading-[20px]"
        @click="emit('sub')"
      >
        {{ subLabel }}
      </button>
      <button
        type="button"
        :disabled="mainDisabled"
        class="inline-flex flex-1 items-center justify-center rounded-[8px] bg-sky px-[20px] py-[14px] text-[14px] font-bold leading-[18px] text-white transition-colors hover:bg-sky-dark active:bg-sky-pressed disabled:cursor-not-allowed disabled:opacity-50 md:px-[28px] md:py-[16px] md:text-[16px] md:leading-[20px]"
        @click="emit('main')"
      >
        <slot name="main-label">{{ mainLabel }}</slot>
      </button>
    </div>
  </div>
</template>
