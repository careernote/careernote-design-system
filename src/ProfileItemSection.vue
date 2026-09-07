<script setup lang="ts">
// React ProfileItemSection 과 동일 스펙 — SectionLabel + ProfileItem 2열
import SectionLabel from './SectionLabel.vue'
import ProfileItem from './ProfileItem.vue'
export interface ProfileItemEntry { title: string; sub: string; date?: string }
defineProps<{ icon: string; label: string; items: ProfileItemEntry[] }>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <SectionLabel :icon="icon">{{ label }}</SectionLabel>
    <div class="grid grid-cols-2 gap-2">
      <ProfileItem v-for="(it, i) in items" :key="i" v-bind="it" />
    </div>
  </div>
</template>
