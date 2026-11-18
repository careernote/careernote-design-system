<script setup lang="ts">
// React HistoryEntry 와 동일 스펙 — 경력/학력 엔트리. default slot 의 ActivityDetail 사이에 구분선은 소비자가 <hr> 로 넣거나 divider 슬롯 없이 gap 으로 처리
import Icon from './icons/Icon.vue'
/** 로고가 없을 때 아이콘 — 경력 회사 · 학력 학사모 · 기타 활동(etc) 전구 */
const TYPE_ICON = { career: 'company', education: 'graduation_hat', etc: 'bulb' } as const
withDefaults(defineProps<{ type?: 'career' | 'education' | 'etc'; name: string; role?: string; period?: string; logoUrl?: string }>(), { type: 'career' })
</script>

<template>
  <div class="flex items-start gap-4">
    <div class="shrink-0 w-12 h-12 mobile:hidden flex items-center justify-center rounded-medium bg-bg-gray1 border border-border-gray overflow-hidden">
      <img v-if="logoUrl" :src="logoUrl" alt="" class="w-full h-full object-cover" />
      <Icon v-else :name="TYPE_ICON[type]" :size="24" color="#727180" />
    </div>
    <div class="min-w-0 flex-1 flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <div class="flex items-center justify-between gap-3 mobile:flex-col mobile:items-start mobile:gap-0.5">
          <span class="text-subtitle3 font-bold text-gray900 truncate mobile:whitespace-normal">{{ name }}</span>
          <span v-if="period" class="shrink-0 text-body2 text-gray600">{{ period }}</span>
        </div>
        <span v-if="role" class="text-body1 font-medium text-gray700">{{ role }}</span>
      </div>
      <!-- 활동은 회사명보다 한 단계 더 들여 쓴다(pl-4) — React 와 같다. 경력기술서 PDF 도 같은 값 -->
      <div v-if="$slots.default" class="flex flex-col gap-6 pl-4 [&>hr]:border-0 [&>hr]:border-t [&>hr]:border-border-gray">
        <slot />
      </div>
    </div>
  </div>
</template>
