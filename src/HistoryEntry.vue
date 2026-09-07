<script setup lang="ts">
// React HistoryEntry 와 동일 스펙 — 경력/학력 엔트리. default slot 의 ActivityDetail 사이에 구분선은 소비자가 <hr> 로 넣거나 divider 슬롯 없이 gap 으로 처리
import Icon from './icons/Icon.vue'
withDefaults(defineProps<{ type?: 'career' | 'education'; name: string; role?: string; period?: string; logoUrl?: string }>(), { type: 'career' })
</script>

<template>
  <div class="flex items-start gap-4">
    <div class="shrink-0 w-12 h-12 flex items-center justify-center rounded-medium bg-bg-gray1 border border-border-gray overflow-hidden">
      <img v-if="logoUrl" :src="logoUrl" alt="" class="w-full h-full object-cover" />
      <Icon v-else :name="type === 'career' ? 'company' : 'graduation_hat'" :size="24" color="#727180" />
    </div>
    <div class="min-w-0 flex-1 flex flex-col gap-6 [&>hr]:border-0 [&>hr]:border-t [&>hr]:border-border-gray">
      <div class="flex flex-col gap-1">
        <div class="flex items-center justify-between gap-3">
          <span class="text-subtitle3 font-bold text-gray900 truncate">{{ name }}</span>
          <span v-if="period" class="shrink-0 text-body2 text-gray600">{{ period }}</span>
        </div>
        <span v-if="role" class="text-body1 font-medium text-gray700">{{ role }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>
