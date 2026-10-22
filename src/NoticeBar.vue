<script setup lang="ts">
// 목록 위 한 줄 안내 + 행동 버튼 — React NoticeBar 동일 스펙 (ATS 공고 현황 "작성 중인 공고가 있어요" 배너 승격, 2026-10-22)
import Button from './Button.vue'
import Icon from './icons/Icon.vue'

withDefaults(
  defineProps<{
    /** 본문 뒤 작은 회색 보조 정보(저장 시각 등) */
    detail?: string
    actionLabel?: string
    /** 오른쪽 끝 밑줄 텍스트(닫기·삭제) */
    dismissLabel?: string
  }>(),
  {},
)
const emit = defineEmits<{ (e: 'action'): void; (e: 'dismiss'): void }>()
</script>

<template>
  <div class="flex items-center gap-3 rounded-[16px] border border-sky/30 bg-sky/5 px-5 py-3.5" role="status">
    <span class="flex shrink-0 text-sky"><Icon name="info" :size="18" /></span>
    <p class="m-0 min-w-0 flex-1 truncate text-body2 text-gray800">
      <!-- 본문: 굵게 강조할 부분은 <b> 로 -->
      <slot />
      <span v-if="detail" class="ml-2 text-detail text-gray600">{{ detail }}</span>
    </p>
    <Button v-if="actionLabel" size="sm" color="sky" @click="emit('action')">{{ actionLabel }}</Button>
    <button
      v-if="dismissLabel"
      type="button"
      class="text-detail text-gray600 underline underline-offset-[3px] hover:text-gray800"
      @click="emit('dismiss')"
    >
      {{ dismissLabel }}
    </button>
  </div>
</template>
