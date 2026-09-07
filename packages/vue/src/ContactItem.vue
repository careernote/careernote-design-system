<script setup lang="ts">
// React ContactItem 과 동일 스펙 — 연락처 한 줄
import Icon from './icons/Icon.vue'
export type ContactType = 'phone' | 'email' | 'website'
const CONTACT_ICON = { phone: 'phone', email: 'mail', website: 'globe' } as const
defineProps<{ type: ContactType; value: string; href?: string }>()
</script>

<template>
  <component :is="href ? 'a' : 'div'" :href="href" class="inline-flex items-center gap-2 text-gray800">
    <Icon :name="CONTACT_ICON[type]" :size="18" color="gray800" />
    <span class="text-body2 leading-5">{{ value }}</span>
  </component>
</template>
