<script setup lang="ts">
// React CandidateIntro 와 동일 스펙 — 슬로건 + 자기소개 + 연락처
import ContactItem from './ContactItem.vue'
import type { ContactType } from './ContactItem.vue'
export interface ContactEntry { type: ContactType; value: string; href?: string }
withDefaults(
  defineProps<{
    slogan?: string
    introduction?: string
    contacts?: ContactEntry[]
    /** 슬로건·자기소개가 둘 다 없을 때 문구 */
    emptyText?: string
  }>(),
  { contacts: () => [], emptyText: '아직 자기소개가 생성되지 않았습니다.' },
)
</script>

<template>
  <div class="min-w-0 flex-1 flex flex-col justify-between gap-5">
    <div class="flex flex-col gap-2">
      <p v-if="slogan" class="text-subtitle3 font-medium text-gray900">{{ slogan }}</p>
      <p v-if="introduction" class="text-body2 leading-5 text-gray800 whitespace-pre-line">{{ introduction }}</p>
      <p v-if="!slogan && !introduction && emptyText" class="text-subtitle3 leading-[26px] font-semibold text-gray600">{{ emptyText }}</p>
    </div>
    <div v-if="contacts.length" class="flex flex-wrap items-center gap-3">
      <ContactItem v-for="c in contacts" :key="c.type + c.value" v-bind="c" />
    </div>
  </div>
</template>
