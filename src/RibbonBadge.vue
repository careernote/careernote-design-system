<script setup lang="ts">
// 책갈피(리본) 배지 — 카드 우상단에 살짝 걸치는 강조 배지. career-pencil /make/options 승격.
// 모양(클립패스·배경·그림자·위치)만 제공, 내용(텍스트/아이콘)은 슬롯.
// 부모는 relative 여야 한다.
</script>

<template>
  <div
    class="absolute -right-[10px] top-[20px] inline-flex items-center gap-[4px] bg-gray900 py-[8px] pl-[24px] pr-[12px] shadow-[0_2px_16px_rgba(0,0,0,0.12)] mobile:-right-[6px] mobile:top-[16px] mobile:gap-[2px] mobile:py-[5px] mobile:pl-[18px] mobile:pr-[10px]"
    style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)"
  >
    <slot />
  </div>
</template>
