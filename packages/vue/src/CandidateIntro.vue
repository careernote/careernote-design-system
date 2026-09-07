<script setup lang="ts">
// React CandidateIntro 와 동일 스펙 — 슬로건 + 자기소개 + 연락처
import ContactItem from './ContactItem.vue'
import type { ContactType } from './ContactItem.vue'
export interface ContactEntry { type: ContactType; value: string; href?: string }
withDefaults(defineProps<{ slogan?: string; introduction?: string; contacts?: ContactEntry[] }>(), { contacts: () => [] })
</script>

<template>
  <div class="min-w-0 flex-1 flex flex-col justify-between gap-5">
    <div class="flex flex-col gap-2">
      <p v-if="slogan" class="text-subtitle3 font-medium text-gray900">{{ slogan }}</p>
      <p v-if="introduction" class="text-body2 leading-5 text-gray800 whitespace-pre-line">{{ introduction }}</p>
    </div>
    <div v-if="contacts.length" class="flex flex-wrap items-center gap-3">
      <ContactItem v-for="c in contacts" :key="c.type + c.value" v-bind="c" />
    </div>
  </div>
</template>
