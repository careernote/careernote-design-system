<script setup lang="ts">
// 카테고리 필터 알약 버튼 (active = sky 채움) — career-pencil /make/job 승격
// click/mouseenter 등 리스너는 fallthrough 로 루트 button 에 그대로 바인딩된다.
withDefaults(defineProps<{ active?: boolean }>(), { active: false })
</script>

<template>
  <button
    type="button"
    class="rounded-full border px-[14px] py-[8px] text-[14px] font-semibold transition-colors"
    :class="active ? 'border-sky bg-sky text-white' : 'border-neutral-200 bg-white text-gray-700 hover:border-sky/50'"
  >
    <slot />
  </button>
</template>
