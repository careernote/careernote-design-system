<script setup lang="ts">
// 밑줄 텍스트 링크 버튼 — "직접 입력하기"·"다른 직업 보기" 류 승격본.
// 리스너는 fallthrough 로 루트 button 에 바인딩.
</script>

<template>
  <button type="button" class="font-semibold text-sky underline underline-offset-2">
    <slot />
  </button>
</template>
