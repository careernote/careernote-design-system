<script setup lang="ts">
// React ProfileItemSection 과 동일 스펙 — SectionLabel + ProfileItem 2열
import SectionLabel from './SectionLabel.vue'
import ProfileItem from './ProfileItem.vue'
import SectionEditButton from './SectionEditButton.vue'
export interface ProfileItemEntry { title: string; sub: string; date?: string }
// editable: 라벨 줄에 편집 버튼 — React onEdit 과 같다
withDefaults(defineProps<{ icon: string; label: string; items: ProfileItemEntry[]; editable?: boolean }>(), { editable: false })
const emit = defineEmits<{ (e: 'edit'): void }>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <SectionLabel :icon="icon">
      {{ label }}
      <template v-if="editable" #action><SectionEditButton :label="label" @click="emit('edit')" /></template>
    </SectionLabel>
    <div class="grid grid-cols-2 mobile:grid-cols-1 gap-2">
      <ProfileItem v-for="(it, i) in items" :key="i" v-bind="it" />
    </div>
  </div>
</template>
