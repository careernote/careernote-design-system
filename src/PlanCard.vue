<script setup lang="ts">
// 요금제/옵션 선택 카드 셸 — career-pencil /make/options 승격.
// 선택 시 border 2px(sky) + padding 1px 보정으로 콘텐츠 흔들림 방지.
// 폭(w-[300px] 등)은 소비자가 class 로 지정 (fallthrough 병합), 클릭도 fallthrough.
withDefaults(defineProps<{ selected?: boolean }>(), { selected: false })
</script>

<template>
  <div
    class="relative flex h-[386px] shrink-0 cursor-pointer flex-col justify-between gap-[60px] rounded-[20px] bg-white shadow-[0_2px_28px_rgba(0,0,0,0.04)] transition-transform duration-150 ease-out active:scale-[0.985] mobile:h-auto mobile:w-full mobile:gap-[24px]"
    :class="
      selected
        ? 'border-[2px] border-sky px-[15px] pb-[27px] pt-[39px] mobile:px-[19px] mobile:pt-[23px] mobile:pb-[23px]'
        : 'border border-border-gray px-[16px] pb-[28px] pt-[40px] mobile:px-[20px] mobile:pt-[24px] mobile:pb-[24px]'
    "
  >
    <slot />
  </div>
</template>
