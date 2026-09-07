<script setup lang="ts">
// React SidebarAccount 와 동일 스펙 — 사이드바 하단 계정 블록
withDefaults(defineProps<{ name: string; email: string; clickable?: boolean }>(), { clickable: false })
const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <component
    :is="clickable ? 'button' : 'div'"
    :type="clickable ? 'button' : undefined"
    class="w-full flex items-center gap-2.5 px-4 py-3 rounded-large bg-black60 text-left"
    @click="emit('click')"
  >
    <div class="min-w-0 flex-1 flex flex-col gap-0.5">
      <span class="text-body2 font-semibold text-white100 truncate">{{ name }}</span>
      <span class="text-detail text-gray600 truncate">{{ email }}</span>
    </div>
  </component>
</template>
