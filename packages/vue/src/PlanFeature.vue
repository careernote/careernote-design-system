<script setup lang="ts">
// 요금제 카드 안 기능 항목 (이모지 원 + 제목 + 설명) — career-pencil /make/options 승격.
// layout 'column' = 이모지 위/텍스트 아래 (Basic), 'row' = 이모지 옆 (Fit, 모바일 축소 타이포 포함)
withDefaults(
  defineProps<{
    emoji: string
    title: string
    description: string
    layout?: 'column' | 'row'
  }>(),
  { layout: 'column' },
)
</script>

<template>
  <div
    :class="
      layout === 'row'
        ? 'flex items-center gap-[16px] mobile:items-start mobile:gap-[12px]'
        : 'flex flex-col items-start gap-[12px]'
    "
  >
    <div class="relative h-[40px] w-[40px] shrink-0 rounded-full bg-bg-gray2">
      <span class="absolute inset-0 flex items-center justify-center text-[16px] leading-none">{{ emoji }}</span>
    </div>
    <div
      :class="
        layout === 'row'
          ? 'flex min-w-0 flex-1 flex-col gap-[8px] mobile:gap-[4px]'
          : 'flex min-w-0 flex-col gap-[8px]'
      "
    >
      <span
        class="text-[16px] font-semibold leading-[20px] text-gray800"
        :class="layout === 'row' ? 'mobile:text-[14px] mobile:leading-[18px]' : ''"
      >
        {{ title }}
      </span>
      <span
        class="text-[14px] font-normal leading-[18px] text-gray700"
        :class="layout === 'row' ? 'mobile:text-[13px] mobile:leading-[17px]' : ''"
      >
        {{ description }}
      </span>
    </div>
  </div>
</template>
