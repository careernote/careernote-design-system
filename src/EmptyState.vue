<script setup lang="ts">
// 빈 상태(목록·표·패널에 보여 줄 데이터가 없을 때) — React EmptyState 와 같은 스펙.
// md: 화면·목록 영역용(아이콘 + 제목 + 설명 + 행동 버튼), sm: 패널·팝오버 안 한 줄용(글자만).
// 아이콘은 iconName(회색 원 + 라인 아이콘, 화면 내용에 맞춰 고른다)이 기본, 그림은 icon(주소) 또는 #icon 슬롯, 버튼은 #action 슬롯.
import { computed } from 'vue'
import Icon from './icons/Icon.vue'

const props = withDefaults(
  defineProps<{
    /** "~없어요" 한 문장(해요체) */
    title: string
    /** 다음에 할 일 안내 — 한 문장(해요체) */
    description?: string
    /** 라인 아이콘 이름 — 연회색 원(md 64px·sm 40px) 안에 그린다. 공고=file, 인재=user2, 검색 0건=search 처럼 화면 내용에 맞춘다 */
    iconName?: string
    /** iconName 대신 그림 주소 — 72px(sm 40px) 정사각 */
    icon?: string
    size?: 'md' | 'sm'
  }>(),
  { size: 'md' },
)

const SIZE = {
  md: { box: 'gap-4 px-6 py-16', circle: 'h-16 w-16', glyph: 28, icon: 72, title: 'text-body1 font-semibold text-gray800', desc: 'text-body2 text-gray600' },
  sm: { box: 'gap-2 px-4 py-6', circle: 'h-10 w-10', glyph: 20, icon: 40, title: 'text-body2 font-medium text-gray600', desc: 'text-detail text-gray500' },
} as const

const s = computed(() => SIZE[props.size])
</script>

<template>
  <div :class="['flex w-full flex-col items-center justify-center text-center', s.box]" role="status">
    <slot name="icon">
      <span
        v-if="iconName"
        :class="['flex shrink-0 items-center justify-center rounded-full bg-bg_gray2 text-gray600', s.circle]"
      >
        <Icon :name="iconName" :size="s.glyph" />
      </span>
      <img v-else-if="icon" :src="icon" alt="" :width="s.icon" :height="s.icon" class="select-none" draggable="false" />
    </slot>
    <div class="flex flex-col items-center gap-1">
      <p :class="['m-0 font-pretendard', s.title]">{{ title }}</p>
      <p v-if="description" :class="['m-0 font-pretendard', s.desc]">{{ description }}</p>
    </div>
    <div v-if="$slots.action" class="mt-1"><slot name="action" /></div>
  </div>
</template>
