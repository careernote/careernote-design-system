<script setup lang="ts">
// React CandidateHeader 와 동일 스펙 — ProfileHero + CandidateIntro
import ProfileHero from './ProfileHero.vue'
import CandidateIntro from './CandidateIntro.vue'
import type { ContactEntry } from './CandidateIntro.vue'
export interface CandidateHeaderData { name: string; role: string; imageUrl?: string; slogan?: string; introduction?: string; contacts?: ContactEntry[] }
withDefaults(defineProps<CandidateHeaderData & { editable?: boolean }>(), { editable: false })
const emit = defineEmits<{ (e: 'edit'): void }>()
</script>

<template>
  <div class="flex items-stretch gap-5">
    <ProfileHero :name="name" :role="role" :image-url="imageUrl" :editable="editable" @edit="emit('edit')" />
    <CandidateIntro :slogan="slogan" :introduction="introduction" :contacts="contacts" />
  </div>
</template>
