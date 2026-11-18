<script setup lang="ts">
// React TemplatePagesPreview 와 동일 스펙 — 페이지가 세로로 이어진 preview.png 를 페이지별로 잘라 넘겨 본다.
// 자르기는 CSS(넘침 숨김 + 음수 margin-top)라 canvas·CORS 가 필요 없다. ← → Esc 키, 모바일은 목록 없이 아래 이전·다음.
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import ResponsiveModal from './ResponsiveModal.vue'
import Icon from './icons/Icon.vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    /** 페이지가 세로로 이어진 미리보기 이미지 */
    imageUrl: string | null
    /** 원본 이미지 기준 한 페이지 높이·페이지 사이 간격(px) */
    pageHeight?: number
    pageGap?: number
    ariaLabel?: string
  }>(),
  { pageHeight: 720, pageGap: 100, ariaLabel: '템플릿 미리보기' },
)
const emit = defineEmits<{ (e: 'close'): void }>()

/** 페이지 수 — 이미지 높이 = 페이지 높이 × n + 간격 × (n-1) */
function templatePageCount(naturalHeight: number, pageHeight: number, pageGap: number) {
  return Math.max(1, Math.round((naturalHeight + pageGap) / (pageHeight + pageGap)))
}

const size = ref<{ w: number; h: number } | null>(null)
const failed = ref(false)
const index = ref(0)
let img: HTMLImageElement | null = null

watch(
  () => [props.open, props.imageUrl] as const,
  ([open, url]) => {
    if (!open || !url) return
    size.value = null
    failed.value = false
    index.value = 0
    img = new Image()
    img.onload = () => (size.value = { w: img!.naturalWidth, h: img!.naturalHeight })
    img.onerror = () => (failed.value = true)
    img.src = url
  },
  { immediate: true },
)

const count = computed(() => (size.value ? templatePageCount(size.value.h, props.pageHeight, props.pageGap) : 0))
const ready = computed(() => !!(props.imageUrl && size.value && !failed.value))
const go = (i: number) => (index.value = Math.min(Math.max(i, 0), Math.max(count.value - 1, 0)))
const cropStyle = (y: number) => ({ marginTop: `-${(y / (size.value?.w ?? 1)) * 100}%` })
const boxStyle = computed(() => ({ aspectRatio: `${size.value?.w ?? 1} / ${props.pageHeight}` }))

function onKey(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'ArrowRight') go(index.value + 1)
  if (e.key === 'ArrowLeft') go(index.value - 1)
}
window.addEventListener('keydown', onKey)
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (img) img.onload = img.onerror = null
})
watch(index, async (i) => {
  await nextTick()
  document.querySelector(`[data-template-page="${i}"]`)?.scrollIntoView({ block: 'nearest' })
})

const nav = 'grid h-7 w-7 place-items-center rounded-small text-gray800 hover:bg-bg-gray1 disabled:opacity-30 disabled:hover:bg-transparent'
const mobileBtn = 'flex-1 rounded-medium border border-gray400 bg-white100 py-3 text-body2 font-semibold text-gray800 disabled:opacity-40'
</script>

<template>
  <ResponsiveModal :open="open" pc-class="!max-w-none !w-[min(1000px,92vw)] !h-[min(640px,86vh)] !p-0 overflow-hidden" :aria-label="ariaLabel" @close="emit('close')">
    <div class="flex h-full min-h-0 w-full mobile:h-[78vh]">
      <aside class="w-[100px] shrink-0 overflow-y-auto border-r border-border-gray2 bg-bg-gray1 px-2 py-4 mobile:hidden">
        <div class="mx-1 mb-2.5 text-[11px] font-semibold tracking-[0.5px] text-gray700">PAGES</div>
        <template v-if="ready">
          <button
            v-for="k in count"
            :key="k"
            type="button"
            :data-template-page="k - 1"
            :aria-label="`${k}페이지`"
            :aria-current="k - 1 === index"
            :class="['mb-2 block w-full rounded-medium border-2 bg-white100 p-1', k - 1 === index ? 'border-sky' : 'border-transparent']"
            @click="go(k - 1)"
          >
            <div class="overflow-hidden rounded-xsmall border border-border-gray">
              <div class="relative w-full overflow-hidden" :style="boxStyle">
                <img :src="imageUrl!" alt="" draggable="false" class="block w-full max-w-none" :style="cropStyle((k - 1) * (pageHeight + pageGap))" />
              </div>
            </div>
            <div :class="['mt-1 text-center text-[11px]', k - 1 === index ? 'text-sky' : 'text-gray700']">{{ String(k).padStart(2, '0') }}</div>
          </button>
        </template>
      </aside>
      <div class="flex min-w-0 flex-1 flex-col">
        <div class="flex items-center justify-between border-b border-border-gray2 px-4 py-3">
          <span class="text-[13px] text-gray800" data-testid="template-pages-count">{{ ready ? `${index + 1} / ${count}` : '' }}</span>
          <div class="flex items-center gap-1">
            <button type="button" :class="[nav, 'mobile:hidden']" :disabled="!ready || index === 0" aria-label="이전 페이지" @click="go(index - 1)">
              <Icon name="arrow2" :size="16" class="rotate-180" />
            </button>
            <button type="button" :class="[nav, 'mobile:hidden']" :disabled="!ready || index >= count - 1" aria-label="다음 페이지" @click="go(index + 1)">
              <Icon name="arrow2" :size="16" />
            </button>
            <span class="mx-1.5 h-4 w-px bg-border-gray mobile:hidden" />
            <button type="button" :class="nav" aria-label="닫기" data-testid="template-pages-close" @click="emit('close')">
              <Icon name="close" :size="18" />
            </button>
          </div>
        </div>
        <div class="flex min-h-0 flex-1 items-center justify-center bg-bg-gray3 p-8 mobile:p-4">
          <p v-if="failed || !imageUrl" class="text-body2 text-gray700">미리보기를 불러오지 못했어요.</p>
          <div v-else-if="!ready" class="h-8 w-8 animate-spin rounded-full border-2 border-border-gray border-t-sky" aria-label="불러오는 중" />
          <div v-else class="w-full max-w-[720px] overflow-hidden rounded-xsmall bg-white100 shadow-wide-light" data-testid="template-pages-stage">
            <div class="relative w-full overflow-hidden" :style="boxStyle">
              <img :src="imageUrl" alt="" draggable="false" class="block w-full max-w-none" :style="cropStyle(index * (pageHeight + pageGap))" />
            </div>
          </div>
        </div>
        <div v-if="ready && count > 1" class="hidden gap-2 px-4 pb-3 mobile:flex">
          <button type="button" :class="mobileBtn" :disabled="index === 0" @click="go(index - 1)">이전</button>
          <button type="button" :class="mobileBtn" :disabled="index >= count - 1" @click="go(index + 1)">다음</button>
        </div>
      </div>
    </div>
  </ResponsiveModal>
</template>
