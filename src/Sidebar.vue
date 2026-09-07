<script setup lang="ts">
// React Sidebar 와 동일 스펙 — ATS 사이드바 셸 (240px, gray900). 로고·메뉴·footer 는 slot
import { useSlots } from 'vue'
const slots = useSlots()
</script>

<template>
  <aside class="w-60 shrink-0 flex flex-col justify-between px-4 py-6 bg-gray900">
    <div class="flex flex-col gap-8">
      <div v-if="slots.logo" class="h-9 flex items-center"><slot name="logo" /></div>
      <nav class="flex flex-col gap-2"><slot /></nav>
    </div>
    <slot name="footer" />
  </aside>
</template>
