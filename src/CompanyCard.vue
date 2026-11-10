<script setup lang="ts">
// React CompanyCard 와 동일 스펙 — 인재풀 회사 카드 (로고·이름·메타 · 맞음 표시 · 소개 3줄+더보기 · 칩 · 강점 박스 · #actions)
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import Chip from './Chip.vue'
import Icon from './icons/Icon.vue'

const props = withDefaults(
  defineProps<{
    name: string
    logoUrl?: string | null
    /** 이름 아래 한 줄 (지역·업종·설립연도 등) */
    meta?: string | null
    /** 강조 한 줄 — 체크 아이콘 + sky (예: '내 활동과 맞아요'). 없으면 숨김 */
    fitLabel?: string | null
    intro?: string | null
    tags?: string[]
    highlights?: string[]
    /** 루트 testid — 하위는 `${testId}-fit` · `-intro-more` · `-highlights` */
    testId?: string
  }>(),
  { logoUrl: null, meta: null, fitLabel: null, intro: null, tags: () => [], highlights: () => [], testId: undefined },
)
const slots = useSlots()
const sub = (s: string) => (props.testId ? `${props.testId}-${s}` : undefined)

/** 로고 자리 첫 글자 — (주)·㈜·주식회사 같은 앞 꼬리표를 건너뛴다 */
const PREFIX = /^\s*(?:[([{【<][^)\]}】>]*[)\]}】>]|㈜|주식회사|유한회사|사단법인|재단법인)\s*/
const initial = computed(() => {
  let rest = props.name ?? ''
  for (let i = 0; i < 5 && PREFIX.test(rest); i++) rest = rest.replace(PREFIX, '')
  const ch = rest.match(/[\p{L}\p{N}]/u)?.[0] ?? (props.name ?? '').match(/[\p{L}\p{N}]/u)?.[0]
  return ch ? ch.toUpperCase() : ''
})

// 소개가 3줄을 넘을 때만 '더보기' — 마우스를 올리거나 포커스하면 전문을 툴팁으로
const introEl = ref<HTMLParagraphElement | null>(null)
const introClamped = ref(false)
const check = () => {
  const el = introEl.value
  introClamped.value = !!el && el.scrollHeight > el.clientHeight + 1
}
let observer: ResizeObserver | null = null
onMounted(() => {
  check()
  if (introEl.value) {
    observer = new ResizeObserver(check)
    observer.observe(introEl.value)
  }
})
onBeforeUnmount(() => observer?.disconnect())
watch(() => props.intro, () => requestAnimationFrame(check))
</script>

<template>
  <article
    class="flex h-full flex-col gap-4 rounded-xlarge border border-gray400 bg-white100 p-6 mobile:p-5"
    :data-testid="testId"
  >
    <div class="flex min-h-[142px] flex-col gap-4">
      <div class="flex items-center gap-4">
        <div
          class="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-large border border-border-gray bg-bg-gray1"
        >
          <img v-if="logoUrl" :src="logoUrl" :alt="`${name} 로고`" class="h-full w-full bg-white100 object-contain p-2" />
          <span v-else class="text-[20px] font-semibold text-gray700">{{ initial }}</span>
        </div>
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <p class="truncate text-[24px] font-semibold leading-[29px] text-gray900 mobile:text-[20px]">{{ name }}</p>
          <p v-if="meta" class="text-[14px] leading-[1.4] text-gray700">{{ meta }}</p>
        </div>
      </div>
      <p v-if="fitLabel" class="flex items-center gap-1 text-[14px] font-semibold leading-[1.4] text-sky" :data-testid="sub('fit')">
        <Icon name="check" :size="16" />
        {{ fitLabel }}
      </p>
      <!-- 소개가 짧아도 3줄 높이를 잡아 카드끼리 칩 줄을 맞춘다. 셋째 줄 끝 더보기 왼쪽은 흰색으로 서서히 덮는다 -->
      <div class="group relative">
        <p ref="introEl" class="h-[66px] overflow-hidden text-[14px] leading-[22px] text-gray800">{{ intro }}</p>
        <template v-if="introClamped">
          <!-- 카드 전체가 선택 영역일 때 더보기를 눌러도 선택이 바뀌지 않게 -->
          <button
            type="button"
            class="absolute bottom-0 right-0 bg-linear-to-r from-transparent to-white100 to-[20px] pl-6 text-[14px] font-semibold leading-[22px] text-gray700 underline underline-offset-2"
            :aria-describedby="sub('intro-full')"
            :data-testid="sub('intro-more')"
            @click.stop
          >
            더보기
          </button>
          <div
            :id="sub('intro-full')"
            role="tooltip"
            class="invisible absolute left-0 right-0 top-full z-20 mt-2 rounded-medium bg-gray900 p-3 text-[13px] leading-[20px] text-white100 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
          >
            {{ intro }}
          </div>
        </template>
      </div>
      <div v-if="tags.length > 0" class="flex flex-wrap gap-1.5">
        <Chip v-for="tag in tags" :key="tag" size="M" color="blue" variant="soft" class="!rounded-small !px-2.5 !leading-[18px]">
          {{ tag }}
        </Chip>
      </div>
    </div>

    <div class="mt-auto flex flex-col gap-4">
      <!-- 강점이 없어도 박스 자리(3줄 높이)는 남겨 카드끼리 버튼 위치를 맞춘다 -->
      <ul
        class="flex min-h-[96px] flex-col gap-1.5 rounded-[10px] px-3.5 py-3"
        :class="highlights.length > 0 ? 'bg-bg-gray1' : ''"
        :data-testid="sub('highlights')"
      >
        <li v-for="line in highlights" :key="line" class="flex items-center gap-2 text-[14px] leading-[20px] text-gray800">
          <span class="ml-0.5 h-1 w-1 shrink-0 rounded-full bg-sky" aria-hidden="true" />
          <span class="truncate">{{ line }}</span>
        </li>
      </ul>
      <div v-if="slots.actions" class="flex gap-5 mobile:gap-2"><slot name="actions" /></div>
    </div>
  </article>
</template>
