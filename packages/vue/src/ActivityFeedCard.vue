<script setup lang="ts">
// React ActivityFeedCard 와 동일 스펙 — 활동 피드 카드 (Figma 업데이트_2025 "인재피드" talent_pool_component)
// 갤러리(높이 269) → 프로필 한 줄 → AI 1줄 제목 → 2줄 요약 → 성과(왼쪽 선) → 등록일
import { computed, ref } from 'vue'
import ProfileAvatar from './ProfileAvatar.vue'
import ImageLightbox from './ImageLightbox.vue'

const props = withDefaults(
  defineProps<{
    name: string
    imageUrl?: string
    /** 예: "프런트 엔드" */
    job?: string
    /** 예: "6년차" */
    careerLabel?: string
    /** 1줄 제목 (AI 헤드라인, 없으면 활동명) */
    headline: string
    /** true 면 제목·요약·성과 자리에 같은 틀의 스켈레톤 (AI 생성 중) — 성과는 숨긴다 */
    headlineLoading?: boolean
    /** 2줄 요약 */
    summary?: string
    /** STAR 의 R(성과) — 없으면 블록 미표출 */
    result?: string
    /** 하단 날짜 표기 (예: "2026.05.24") */
    date?: string
    /** isMain 우선. 0장 = 대체 아이콘, 1~2장 = 가로, 3장 이상 = 큰 1장 + 작은 2장 (+N) */
    images?: string[]
    /** 이미지 0장일 때 가운데 90px 아이콘 — @careernote/assets/placeholder/*.png 를 소비자가 넣는다 */
    placeholderImage?: string
    clickable?: boolean
    /** true 면 내장 라이트박스 대신 image-click emit */
    externalLightbox?: boolean
    /** false 면 사진을 눌러도 확대하지 않는다(라이트박스·image-click 없음) — 사진 클릭도 카드 click 으로 간다. 기본 true */
    imageZoom?: boolean
  }>(),
  { images: () => [], headlineLoading: false, clickable: false, externalLightbox: false, imageZoom: true },
)

const emit = defineEmits<{ (e: 'click'): void; (e: 'image-click', index: number): void }>()

const lightbox = ref<number | null>(null)
const more = computed(() => props.images.length - 3)
function open(i: number) {
  if (props.externalLightbox) emit('image-click', i)
  else lightbox.value = i
}
const thumb = computed(() =>
  props.imageZoom
    ? 'relative min-w-0 rounded-[7px] bg-gray800 overflow-hidden border-0 p-0 cursor-zoom-in transition-opacity hover:opacity-90'
    : 'relative min-w-0 rounded-[7px] bg-gray800 overflow-hidden',
)
const thumbTag = computed(() => (props.imageZoom ? 'button' : 'div'))
const thumbType = computed(() => (props.imageZoom ? 'button' : undefined))
// 확대가 꺼져 있으면 아무것도 하지 않고 클릭을 카드로 올려 보낸다
function onThumb(e: MouseEvent, i: number) {
  if (!props.imageZoom) return
  e.stopPropagation()
  open(i)
}
</script>

<template>
  <!-- 피드는 카드가 수백 장 — 이미지는 화면 근처에서만 받고(lazy), 디코딩은 메인 스레드 밖에서(async) -->
  <div class="group w-full flex flex-col gap-3" :class="clickable ? 'cursor-pointer' : ''" @click="clickable && emit('click')">
    <div v-if="images.length === 0" class="h-[269px] w-full rounded-[7px] bg-gray800 flex items-center justify-center">
      <img v-if="placeholderImage" :src="placeholderImage" alt="" loading="lazy" decoding="async" class="w-[90px] h-[90px] object-contain" />
    </div>
    <component :is="thumbTag" v-else-if="images.length === 1" :type="thumbType" :class="thumb" class="h-[269px] w-full" @click="onThumb($event, 0)">
      <img :src="images[0]" alt="" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
    </component>
    <div v-else-if="images.length === 2" class="h-[269px] grid grid-cols-2 gap-3">
      <component :is="thumbTag" v-for="(src, i) in images" :key="i" :type="thumbType" :class="thumb" @click="onThumb($event, i)">
        <img :src="src" alt="" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
      </component>
    </div>
    <div v-else class="h-[269px] grid grid-cols-[1fr_122px] gap-3">
      <component :is="thumbTag" :type="thumbType" :class="thumb" @click="onThumb($event, 0)">
        <img :src="images[0]" alt="" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
      </component>
      <div class="flex flex-col gap-3 min-h-0">
        <component :is="thumbTag" :type="thumbType" :class="thumb" class="flex-1 min-h-0" @click="onThumb($event, 1)">
          <img :src="images[1]" alt="" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
        </component>
        <div class="relative flex-1 min-h-0 flex">
          <component :is="thumbTag" :type="thumbType" :class="thumb" class="flex-1" @click="onThumb($event, 2)">
            <img :src="images[2]" alt="" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
          </component>
          <component
            :is="thumbTag"
            v-if="more > 0"
            :type="thumbType"
            class="absolute inset-0 rounded-[7px] bg-black60 border-0 p-0 flex items-center justify-center text-subtitle3 font-semibold text-white100"
            :class="imageZoom ? 'cursor-zoom-in' : ''"
            @click="onThumb($event, 3)"
          >
            +{{ more }}
          </component>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <ProfileAvatar :name="name" :image-url="imageUrl" :size="28" />
        <div class="min-w-0 flex-1 flex items-center gap-1 text-body2 truncate">
          <span class="font-medium text-gray900">{{ name }}</span>
          <span v-if="job" class="text-gray700 truncate">{{ job }}</span>
          <span v-if="careerLabel" class="shrink-0 text-gray700">{{ careerLabel }}</span>
        </div>
        <slot name="aside" />
      </div>

      <!-- 실제 카드와 같은 틀 — 제목 1줄 · 요약 2줄 · 성과(왼쪽 선) 2줄. 줄 높이를 맞춰 글이 들어와도 카드가 덜컹이지 않는다 -->
      <template v-if="headlineLoading">
        <div class="h-[22px] flex items-center" aria-label="AI 제목 생성 중">
          <div class="rounded-xsmall bg-gray400 animate-pulse h-[18px] w-4/5" />
        </div>
        <div class="flex flex-col">
          <div v-for="w in ['w-full', 'w-3/5']" :key="w" class="h-[19.6px] flex items-center">
            <div class="rounded-xsmall bg-gray400 animate-pulse h-[14px]" :class="w" />
          </div>
        </div>
        <div class="pl-3 border-l border-gray400 flex flex-col">
          <div v-for="w in ['w-full', 'w-2/3']" :key="w" class="h-[19.6px] flex items-center">
            <div class="rounded-xsmall bg-gray400 animate-pulse h-[14px]" :class="w" />
          </div>
        </div>
      </template>
      <template v-else>
        <p class="text-subtitle3 font-semibold text-gray900 truncate" :class="clickable ? 'group-hover:underline underline-offset-2' : ''">
          {{ headline }}
        </p>
        <p v-if="summary" class="text-body2 leading-[1.4] text-gray700 line-clamp-2 whitespace-pre-line">{{ summary }}</p>
      </template>

      <div v-if="!headlineLoading && result" class="pl-3 border-l border-gray900">
        <p class="text-body2 leading-[1.4] text-gray900 line-clamp-4">{{ result }}</p>
      </div>
    </div>

    <span v-if="date" class="text-body2 text-gray700">{{ date }}</span>

    <ImageLightbox v-if="imageZoom && !externalLightbox" :images="images" :index="lightbox" @close="lightbox = null" />
  </div>
</template>
