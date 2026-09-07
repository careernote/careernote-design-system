<script setup lang="ts">
// React CandidateProfile 과 동일 스펙 — 아바타 + 이름 + 칩(slot badge) + 경력·직무 + 우측(slot aside)
import ProfileAvatar from './ProfileAvatar.vue'

defineProps<{ name: string; imageUrl?: string; careerLabel: string; job: string }>()
</script>

<template>
  <div class="flex items-center gap-2.5">
    <ProfileAvatar :name="name" :image-url="imageUrl" />
    <div class="min-w-0 flex-1 flex flex-col justify-center gap-1">
      <div class="flex items-center gap-2">
        <span class="text-body1 font-semibold text-gray900 truncate">{{ name }}</span>
        <slot name="badge" />
      </div>
      <div class="flex items-center gap-2 text-body2 text-gray700">
        <span>{{ careerLabel }}</span>
        <span class="w-0.5 h-0.5 rounded-full bg-gray700" />
        <span>{{ job }}</span>
      </div>
    </div>
    <slot name="aside" />
  </div>
</template>
