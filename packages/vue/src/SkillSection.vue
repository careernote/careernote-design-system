<script setup lang="ts">
// React SkillSection 과 동일 스펙 — 스킬 섹션 (숙련도 미표출)
import Chip from './Chip.vue'
import SectionLabel from './SectionLabel.vue'
withDefaults(defineProps<{ label?: string; skills: string[] }>(), { label: '스킬' })
</script>

<template>
  <div class="flex flex-col gap-4">
    <SectionLabel icon="hash">{{ label }}</SectionLabel>
    <div class="flex flex-wrap items-center gap-2">
      <Chip v-for="(s, i) in skills" :key="i" size="XL" variant="soft" color="basic">{{ s }}</Chip>
    </div>
  </div>
</template>
