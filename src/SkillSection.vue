<script setup lang="ts">
// React SkillSection 과 동일 스펙 — 스킬 섹션 (숙련도 미표출)
import Chip from './Chip.vue'
import SectionLabel from './SectionLabel.vue'
import SectionEditButton from './SectionEditButton.vue'
// editable: 라벨 줄에 편집 버튼 — React onEdit 과 같다
withDefaults(defineProps<{ label?: string; skills: string[]; editable?: boolean }>(), { label: '스킬', editable: false })
const emit = defineEmits<{ (e: 'edit'): void }>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <SectionLabel icon="hash">
      {{ label }}
      <template v-if="editable" #action><SectionEditButton :label="label" @click="emit('edit')" /></template>
    </SectionLabel>
    <div class="flex flex-wrap items-center gap-2">
      <Chip v-for="(s, i) in skills" :key="i" size="XL" variant="soft" color="basic">{{ s }}</Chip>
    </div>
  </div>
</template>
