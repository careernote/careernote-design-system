<script setup lang="ts">
// React ActivityDetail 과 동일 스펙 — 활동 상세 (이미지 · 제목/기간 · 스킬 · 본문 3줄+더보기 · Result · 동료 코멘트)
import { ref } from 'vue'
import Chip from './Chip.vue'
import Icon from './icons/Icon.vue'
export interface ActivityComment { role: string; text: string }
withDefaults(
  defineProps<{ title: string; period?: string; images?: string[]; skills?: string[]; body?: string; result?: string; comments?: ActivityComment[] }>(),
  { images: () => [], skills: () => [], comments: () => [] },
)
const expanded = ref(false)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-if="images.length" class="flex gap-3 overflow-x-auto">
      <div v-for="(src, i) in images" :key="i" class="shrink-0 w-[122px] h-32 rounded-[7px] bg-gray800 overflow-hidden flex items-center justify-center">
        <img v-if="src" :src="src" alt="" class="w-full h-full object-cover" />
        <Icon v-else name="nonImage" :size="14" color="white" />
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="min-w-0 flex-1 text-body1 font-semibold text-gray900 truncate">{{ title }}</span>
      <span v-if="period" class="shrink-0 text-body2 text-gray600">{{ period }}</span>
    </div>
    <div v-if="skills.length" class="flex flex-wrap items-center gap-1.5">
      <Chip v-for="s in skills" :key="s" size="L" variant="soft" color="basic" class="font-normal">{{ s }}</Chip>
    </div>
    <div v-if="body" class="flex flex-col gap-1">
      <p class="text-body2 text-gray700 whitespace-pre-line" :class="expanded ? '' : 'line-clamp-3'">{{ body }}</p>
      <button v-if="!expanded" type="button" class="self-start text-body2 text-gray700 underline" @click="expanded = true">더보기</button>
    </div>
    <div v-if="result" class="px-4 py-3 rounded-xlarge bg-bg-gray1">
      <p class="text-body2 leading-5 text-gray800">{{ result }}</p>
    </div>
    <div v-if="comments.length" class="flex items-start gap-3 px-5 py-4 rounded-xlarge bg-bg-gray2">
      <Chip size="S" variant="solid" color="sky" class="shrink-0 mt-0.5">동료 코멘트</Chip>
      <div class="min-w-0 flex-1 flex flex-col gap-2">
        <div v-for="(c, i) in comments" :key="i" class="flex items-start gap-3">
          <span class="shrink-0 text-body2 leading-5 font-medium text-sky">{{ c.role }}</span>
          <span class="min-w-0 flex-1 text-body2 leading-5 text-gray900">{{ c.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
